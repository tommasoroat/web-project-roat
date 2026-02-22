/**
 * In-memory Token Bucket Rate Limiter
 * Limits requests per IP to prevent spam/abuse on the contact form.
 * 
 * Configuration:
 * - MAX_REQUESTS: 5 requests
 * - WINDOW_MS: 60 seconds (1 minute)
 */

const rateMap = new Map();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

// Clean up old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateMap) {
        if (now - data.windowStart > WINDOW_MS * 2) {
            rateMap.delete(key);
        }
    }
}, 5 * 60 * 1000);

/**
 * Check if a request from the given IP is within rate limits.
 * @param {string} ip - The client IP address
 * @returns {{ allowed: boolean, remaining: number, retryAfter?: number }}
 */
export function checkRateLimit(ip) {
    const now = Date.now();
    const key = ip || 'unknown';

    if (!rateMap.has(key)) {
        rateMap.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }

    const record = rateMap.get(key);

    // Reset window if expired
    if (now - record.windowStart > WINDOW_MS) {
        rateMap.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }

    // Within window
    if (record.count < MAX_REQUESTS) {
        record.count += 1;
        return { allowed: true, remaining: MAX_REQUESTS - record.count };
    }

    // Rate limited
    const retryAfter = Math.ceil((WINDOW_MS - (now - record.windowStart)) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
}
