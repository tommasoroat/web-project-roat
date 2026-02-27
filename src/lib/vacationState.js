import fs from 'fs';
import path from 'path';
import os from 'os';

const VACATION_FILE = path.join(os.tmpdir(), 'rtd-vacation-state.json');

export function getVacationState() {
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

export function setVacationState(mode) {
    try {
        fs.writeFileSync(VACATION_FILE, JSON.stringify({
            vacationMode: mode,
            updatedAt: new Date().toISOString(),
        }));
        return true;
    } catch (e) {
        console.error('[Vacation] Failed to write state:', e);
        return false;
    }
}
