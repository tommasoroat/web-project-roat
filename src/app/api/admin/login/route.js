import crypto from 'crypto';
import { createToken } from '@/lib/auth';

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

        // Generate a signed token (stateless, works across serverless functions)
        const token = createToken();

        return Response.json({ token, message: 'Login effettuato con successo.' });
    } catch {
        return Response.json(
            { error: 'Errore durante il login.' },
            { status: 500 }
        );
    }
}
