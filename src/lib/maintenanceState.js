import fs from 'fs';
import path from 'path';
import os from 'os';

const MAINTENANCE_FILE = path.join(os.tmpdir(), 'rtd-maintenance-state.json');
const REDIS_KEY = 'rtd:maintenance_mode';

/**
 * Get Redis config if Upstash is configured
 */
function getRedis() {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) return null;
    return { url, token };
}

/**
 * Read maintenance state from Upstash Redis via REST API
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
        console.error('[Maintenance] Redis read error:', e.message);
    }
    return false;
}

/**
 * Write maintenance state to Upstash Redis via REST API
 */
async function setToRedis(redis, mode) {
    try {
        const res = await fetch(`${redis.url}/set/${REDIS_KEY}/${mode}`, {
            headers: { Authorization: `Bearer ${redis.token}` },
            cache: 'no-store',
        });
        return res.ok;
    } catch (e) {
        console.error('[Maintenance] Redis write error:', e.message);
        return false;
    }
}

/**
 * Read maintenance state from filesystem (local dev fallback)
 */
function getFromFile() {
    try {
        if (fs.existsSync(MAINTENANCE_FILE)) {
            const data = JSON.parse(fs.readFileSync(MAINTENANCE_FILE, 'utf-8'));
            return !!data.maintenanceMode;
        }
    } catch {
        // fallback
    }
    return false;
}

/**
 * Write maintenance state to filesystem (local dev fallback)
 */
function setToFile(mode) {
    try {
        fs.writeFileSync(MAINTENANCE_FILE, JSON.stringify({
            maintenanceMode: mode,
            updatedAt: new Date().toISOString(),
        }));
        return true;
    } catch (e) {
        console.error('[Maintenance] File write error:', e.message);
        return false;
    }
}

/**
 * Get maintenance state — uses Redis on Vercel, filesystem locally
 */
export async function getMaintenanceState() {
    const redis = getRedis();
    if (redis) {
        return await getFromRedis(redis);
    }
    return getFromFile();
}

/**
 * Set maintenance state — uses Redis on Vercel, filesystem locally
 */
export async function setMaintenanceState(mode) {
    const redis = getRedis();
    if (redis) {
        return await setToRedis(redis, mode);
    }
    return setToFile(mode);
}
