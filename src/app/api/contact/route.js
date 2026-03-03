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

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">
                Nuova Richiesta di Contatto — RTD
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 8px 12px; font-weight: bold; color: #374151; width: 140px;">Nome:</td>
                    <td style="padding: 8px 12px; color: #1f2937;">${sanitizedData.nome}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                    <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 12px;"><a href="mailto:${sanitizedData.email}" style="color: #0284c7;">${sanitizedData.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Telefono:</td>
                    <td style="padding: 8px 12px; color: #1f2937;">${sanitizedData.telefono || '—'}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                    <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Servizio:</td>
                    <td style="padding: 8px 12px; color: #1f2937;">${sanitizedData.servizio}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Messaggio:</td>
                    <td style="padding: 8px 12px; color: #1f2937; white-space: pre-wrap;">${sanitizedData.messaggio}</td>
                </tr>
            </table>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
                Ricevuto il ${sanitizedData.timestamp} | IP: ${sanitizedData.ip} | Consenso privacy: ✅
            </p>
        </div>
    `;

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
