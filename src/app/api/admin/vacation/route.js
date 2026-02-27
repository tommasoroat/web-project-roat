import fs from 'fs';
import path from 'path';
import os from 'os';
import { validTokens } from '../login/route';

const VACATION_FILE = path.join(os.tmpdir(), 'rtd-vacation-state.json');

function getVacationState() {
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

function setVacationState(mode) {
    try {
        fs.writeFileSync(VACATION_FILE, JSON.stringify({
            vacationMode: mode,
            updatedAt: new Date().toISOString(),
        }));
    } catch (e) {
        console.error('[Vacation] Failed to write state:', e);
    }
}

function isAuthenticated(request) {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) return false;
    const token = auth.replace('Bearer ', '');
    return validTokens.has(token);
}

// GET — public: returns vacation status
export async function GET() {
    return Response.json({ vacationMode: getVacationState() });
}

// POST — authenticated: toggle vacation mode
export async function POST(request) {
    if (!isAuthenticated(request)) {
        return Response.json({ error: 'Non autorizzato.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const newMode = !!body.vacationMode;
        setVacationState(newMode);
        return Response.json({ vacationMode: newMode, message: 'Stato aggiornato.' });
    } catch {
        return Response.json({ error: 'Errore nell\'aggiornamento.' }, { status: 500 });
    }
}
