import crypto from 'crypto';

// Simple in-memory token storage (per-process)
const validTokens = new Set();

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const adminUser = process.env.ADMIN_USER;
        const adminPass = process.env.ADMIN_PASS;

        if (!adminUser || !adminPass) {
            return Response.json(
                { error: 'Configurazione admin mancante.' },
                { status: 500 }
            );
        }

        // Constant-time comparison to prevent timing attacks
        const userMatch = username && crypto.timingSafeEqual(
            Buffer.from(username.padEnd(256)),
            Buffer.from(adminUser.padEnd(256))
        );
        const passMatch = password && crypto.timingSafeEqual(
            Buffer.from(password.padEnd(256)),
            Buffer.from(adminPass.padEnd(256))
        );

        if (!userMatch || !passMatch) {
            return Response.json(
                { error: 'Credenziali non valide.' },
                { status: 401 }
            );
        }

        // Generate a random token
        const token = crypto.randomUUID();
        validTokens.add(token);

        // Auto-expire after 2 hours
        setTimeout(() => validTokens.delete(token), 2 * 60 * 60 * 1000);

        return Response.json({ token, message: 'Login effettuato con successo.' });
    } catch {
        return Response.json(
            { error: 'Errore durante il login.' },
            { status: 500 }
        );
    }
}

// Export token validation for use by other routes
export { validTokens };
