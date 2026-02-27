import { getVacationState, setVacationState } from '@/lib/vacationState';
import { verifyToken } from '@/lib/auth';

function isAuthenticated(request) {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) return false;
    const token = auth.replace('Bearer ', '');
    return verifyToken(token);
}

// GET — public: returns vacation status
export async function GET() {
    const vacationMode = await getVacationState();
    return Response.json({ vacationMode });
}

// POST — authenticated: toggle vacation mode
export async function POST(request) {
    if (!isAuthenticated(request)) {
        return Response.json({ error: 'Non autorizzato.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const newMode = !!body.vacationMode;
        await setVacationState(newMode);
        return Response.json({ vacationMode: newMode, message: 'Stato aggiornato.' });
    } catch {
        return Response.json({ error: 'Errore nell\'aggiornamento.' }, { status: 500 });
    }
}
