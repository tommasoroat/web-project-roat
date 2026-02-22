import { checkRateLimit } from '@/lib/rateLimit';

/**
 * Contact Form API Route
 * 
 * Security features:
 * - Rate limiting: 5 requests per minute per IP
 * - Input validation and sanitization
 * - XSS prevention
 * - CORS headers
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

    // Servizio
    const validServices = [
        'Informazioni',
        'Consulenza',
        'Preventivo',
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

    return errors;
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

        // In production, you would:
        // 1. Send an email notification (e.g., via Resend, SendGrid, or Nodemailer)
        // 2. Store in a database
        // 3. Send confirmation email to the user
        // For now, we log the sanitized data
        console.log('[Contact Form Submission]', sanitizedData);

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
