import fs from 'fs';
import path from 'path';
import os from 'os';

const VACATION_FILE = path.join(os.tmpdir(), 'rtd-vacation-state.json');
const REDIS_KEY = 'rtd:vacation_mode';

/**
 * Get Redis client if Upstash is configured
 */
function getRedis() {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) return null;

    // Dynamic import workaround — use REST API directly
    return { url, token };
}

/**
 * Read vacation state from Upstash Redis via REST API
 */
async function getFromRedis(redis) {
    try {
        const res = await fetch(`${redis.url}/get/${REDIS_KEY}`, {
            headers: { Authorization: `Bearer ${redis.token}` },
            cache: 'no-store',
        });
        if (res.ok) {
            const data = await res.json();
            return data.result === 'true';
        }
    } catch (e) {
        console.error('[Vacation] Redis read error:', e.message);
    }
    return false;
}

/**
 * Write vacation state to Upstash Redis via REST API
 */
async function setToRedis(redis, mode) {
    try {
        const res = await fetch(`${redis.url}/set/${REDIS_KEY}/${mode}`, {
            headers: { Authorization: `Bearer ${redis.token}` },
            cache: 'no-store',
        });
        return res.ok;
    } catch (e) {
        console.error('[Vacation] Redis write error:', e.message);
        return false;
    }
}

/**
 * Read vacation state from filesystem (local dev fallback)
 */
function getFromFile() {
    try {
        if (fs.existsSync(VACATION_FILE)) {
            const data = JSON.parse(fs.readFileSync(VACATION_FILE, 'utf-8'));
            return !!data.vacationMode;
        }
    } catch {
        // fallback
    }
    return false;
}

/**
 * Write vacation state to filesystem (local dev fallback)
 */
function setToFile(mode) {
    try {
        fs.writeFileSync(VACATION_FILE, JSON.stringify({
            vacationMode: mode,
            updatedAt: new Date().toISOString(),
        }));
        return true;
    } catch (e) {
        console.error('[Vacation] File write error:', e.message);
        return false;
    }
}

/**
 * Get vacation state — uses Redis on Vercel, filesystem locally
 */
export async function getVacationState() {
    const redis = getRedis();
    if (redis) {
        return await getFromRedis(redis);
    }
    return getFromFile();
}

/**
 * Set vacation state — uses Redis on Vercel, filesystem locally
 */
export async function setVacationState(mode) {
    const redis = getRedis();
    if (redis) {
        return await setToRedis(redis, mode);
    }
    return setToFile(mode);
}
