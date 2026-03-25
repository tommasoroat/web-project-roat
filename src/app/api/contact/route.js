import { checkRateLimit } from '@/lib/rateLimit';
import { Resend } from 'resend';

/**
 * Contact Form API Route
 * 
 * Security features:
 * - Rate limiting: 5 requests per minute per IP
 * - Input validation and sanitization
 * - XSS prevention
 * - GDPR privacy consent check
 * - Email notification via Resend (HTTP API — serverless-safe)
 */

// Simple HTML/XSS sanitizer
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}

function validateContactData(data) {
    const errors = [];

    // Nome
    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length < 2) {
        errors.push('Il nome è obbligatorio e deve avere almeno 2 caratteri.');
    }
    if (data.nome && data.nome.length > 100) {
        errors.push('Il nome non può superare i 100 caratteri.');
    }

    // Email
    if (!data.email || typeof data.email !== 'string') {
        errors.push('L\'email è obbligatoria.');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
        errors.push('Inserisci un indirizzo email valido.');
    }

    // Telefono (optional)
    if (data.telefono && typeof data.telefono === 'string' && data.telefono.trim()) {
        if (!/^[+]?[\d\s()-]{6,20}$/.test(data.telefono)) {
            errors.push('Inserisci un numero di telefono valido.');
        }
    }

    // Servizio — accept all supported locale names
    const validServices = [
        // Italian
        'Informazioni',
        'Consulenza',
        'Preventivo',
        // English
        'Information',
        'Consultation',
        'Quote',
        // German
        'Informationen',
        'Beratung',
        'Angebot',
        // System / Internal
        'Feedback'
    ];
    if (!data.servizio || !validServices.includes(data.servizio)) {
        errors.push('Seleziona un servizio valido.');
    }

    // Messaggio
    if (!data.messaggio || typeof data.messaggio !== 'string' || data.messaggio.trim().length < 10) {
        errors.push('Il messaggio è obbligatorio e deve avere almeno 10 caratteri.');
    }
    if (data.messaggio && data.messaggio.length > 2000) {
        errors.push('Il messaggio non può superare i 2000 caratteri.');
    }

    // Privacy consent
    if (!data.privacy_check) {
        errors.push('Devi accettare la Privacy Policy per procedere.');
    }

    return errors;
}

async function sendEmail(sanitizedData) {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'rtd.devlab@gmail.com';

    if (!apiKey) {
        console.error('[Contact] RESEND_API_KEY non configurata.');
        throw new Error('Configurazione email mancante.');
    }

    const resend = new Resend(apiKey);

    let htmlBody = '';

    if (sanitizedData.servizio === 'Feedback') {
        const match = sanitizedData.messaggio.match(/\[RATING:\s*(\d)\s*Stelle\]\s*(.*)/is);
        let rating = 5;
        let reviewText = sanitizedData.messaggio;
        
        if (match) {
            rating = parseInt(match[1], 10) || 5;
            reviewText = match[2].trim();
        }

        const filledStars = '★'.repeat(rating);
        const emptyStars = '★'.repeat(5 - rating);

        htmlBody = `
        <div style="background-color: #f8fafc; padding: 40px 20px;">
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="padding: 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <span style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Nuova Recensione Ricevuta</span>
                    
                    <div style="font-size: 32px; margin: 16px 0; letter-spacing: 2px;">
                        <span style="color: #f59e0b;">${filledStars}</span><span style="color: #e2e8f0;">${emptyStars}</span>
                    </div>
                    
                    <span style="display: inline-block; background-color: #fef3c7; color: #b45309; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">Voto: ${rating} / 5</span>
                </div>
                <div style="padding: 24px;">
                    <div style="margin-bottom: 16px;">
                        <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">Autore Recensione</span>
                        <span style="font-size: 15px; color: #1e293b; font-weight: 500;">${sanitizedData.nome}</span>
                    </div>
                    <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 3px solid #f59e0b;">
                        <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 6px;">Testo della recensione</span>
                        <span style="font-size: 14px; color: #334155; font-style: italic; line-height: 1.5;">"${reviewText}"</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else {
        const dateObj = new Date(sanitizedData.timestamp);
        const formattedDate = dateObj.toLocaleDateString('it-IT') + ' ' + dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        
        const telHtml = sanitizedData.telefono 
            ? `<a href="tel:${sanitizedData.telefono}" style="font-size: 15px; color: #0f172a; text-decoration: none;">${sanitizedData.telefono}</a>`
            : `<span style="font-size: 15px; color: #94a3b8;">Nessun telefono</span>`;

        htmlBody = `
        <div style="padding: 40px 20px; background-color: #f8fafc;">
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-top: 4px solid #8ebce4; border-radius: 8px; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                
                <div style="padding: 24px; border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
                    <h2 style="margin: 0; font-size: 20px; color: #0f172a;">Nuova Richiesta dal Sito Web</h2>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">Dati inviati tramite il modulo contatti.</p>
                </div>
                
                <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 10px 0; width: 50%; vertical-align: top;">
                                <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">Nome e Cognome</span>
                                <span style="font-size: 15px; color: #0f172a; font-weight: 500;">${sanitizedData.nome}</span>
                            </td>
                            <td style="padding: 10px 0; width: 50%; vertical-align: top;">
                                <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">Servizio di interesse</span>
                                <span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: 600;">${sanitizedData.servizio}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; width: 50%; vertical-align: top; border-top: 1px solid #f1f5f9;">
                                <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">Email</span>
                                <a href="mailto:${sanitizedData.email}" style="font-size: 15px; color: #0284c7; text-decoration: none;">${sanitizedData.email}</a>
                            </td>
                            <td style="padding: 10px 0; width: 50%; vertical-align: top; border-top: 1px solid #f1f5f9;">
                                <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px;">Telefono</span>
                                ${telHtml}
                            </td>
                        </tr>
                    </table>

                    <div style="margin-bottom: 24px;">
                        <span style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 8px;">Il messaggio</span>
                        <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.messaggio}</div>
                    </div>

                    <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                        <strong>Consenso Privacy:</strong> <span style="color: #50C878;">✓</span> Accettato<br>
                        <strong>Log Sistema:</strong> ${formattedDate} | IP: ${sanitizedData.ip}
                    </div>
                </div>

            </div>
        </div>
        `;
    }

    const { data, error } = await resend.emails.send({
        from: 'RTD Website <onboarding@resend.dev>',
        to: [contactEmail],
        replyTo: sanitizedData.email,
        subject: `[RTD] Nuova richiesta da ${sanitizedData.nome} — ${sanitizedData.servizio}`,
        html: htmlBody,
    });

    if (error) {
        console.error('[Contact] Resend error:', error);
        throw new Error(error.message || 'Errore invio email');
    }

    console.log('[Contact] Email inviata con successo, id:', data?.id);
}

export async function POST(request) {
    try {
        // Get client IP for rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

        // Rate limit check
        const rateLimitResult = checkRateLimit(ip);
        if (!rateLimitResult.allowed) {
            return Response.json(
                {
                    error: `Troppe richieste. Riprova tra ${rateLimitResult.retryAfter} secondi.`,
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimitResult.retryAfter),
                        'X-RateLimit-Remaining': '0',
                    },
                }
            );
        }

        // Parse body
        let body;
        try {
            body = await request.json();
        } catch {
            return Response.json(
                { error: 'Formato della richiesta non valido.' },
                { status: 400 }
            );
        }

        // Validate
        const validationErrors = validateContactData(body);
        if (validationErrors.length > 0) {
            return Response.json(
                { error: validationErrors[0], errors: validationErrors },
                { status: 422 }
            );
        }

        // Sanitize data
        const sanitizedData = {
            nome: sanitize(body.nome),
            email: sanitize(body.email),
            telefono: sanitize(body.telefono || ''),
            servizio: sanitize(body.servizio),
            messaggio: sanitize(body.messaggio),
            timestamp: new Date().toISOString(),
            ip: ip,
        };

        console.log('[Contact Form Submission]', sanitizedData);

        // Send email notification via Resend (HTTP — works on serverless)
        try {
            await sendEmail(sanitizedData);
        } catch (emailError) {
            console.error('[Contact Email Error]', emailError.message || emailError);
            return Response.json(
                { error: 'Il messaggio è stato registrato ma non è stato possibile inviare la notifica email. Riprova più tardi o contattaci direttamente a rtd.devlab@gmail.com.' },
                { status: 502 }
            );
        }

        return Response.json(
            {
                message: 'Grazie! Il tuo messaggio è stato inviato con successo. Ti ricontatteremo entro 24 ore lavorative.',
                id: crypto.randomUUID(),
            },
            {
                status: 200,
                headers: {
                    'X-RateLimit-Remaining': String(rateLimitResult.remaining),
                },
            }
        );
    } catch (error) {
        console.error('[Contact API Error]', error);
        return Response.json(
            { error: 'Si è verificato un errore interno. Riprova più tardi.' },
            { status: 500 }
        );
    }
}

// Block other methods
export async function GET() {
    return Response.json(
        { error: 'Metodo non consentito.' },
        { status: 405 }
    );
}
