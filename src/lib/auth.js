import crypto from 'crypto';

// Use ADMIN_PASS as the secret for HMAC signing (server-side only)
function getSecret() {
    return process.env.ADMIN_PASS || 'fallback-secret-key';
}

/**
 * Create a signed token with expiration
 */
export function createToken() {
    const payload = {
        role: 'admin',
        iat: Date.now(),
        exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    };

    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
        .createHmac('sha256', getSecret())
        .update(payloadB64)
        .digest('base64url');

    return `${payloadB64}.${signature}`;
}

/**
 * Verify a signed token
 */
export function verifyToken(token) {
    try {
        if (!token || !token.includes('.')) return false;

        const [payloadB64, signature] = token.split('.');

        // Verify signature
        const expectedSig = crypto
            .createHmac('sha256', getSecret())
            .update(payloadB64)
            .digest('base64url');

        if (signature !== expectedSig) return false;

        // Check expiration
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
        if (payload.exp < Date.now()) return false;

        return true;
    } catch {
        return false;
    }
}
