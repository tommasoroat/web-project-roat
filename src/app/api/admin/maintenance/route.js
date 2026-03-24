import { getMaintenanceState, setMaintenanceState } from '@/lib/maintenanceState';
import { verifyToken } from '@/lib/auth';

function isAuthenticated(request) {
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) return false;
    const token = auth.replace('Bearer ', '');
    return verifyToken(token);
}

// GET — public: returns maintenance status
export async function GET() {
    const maintenanceMode = await getMaintenanceState();
    return Response.json({ maintenanceMode });
}

// POST — authenticated: toggle maintenance mode
export async function POST(request) {
    if (!isAuthenticated(request)) {
        return Response.json({ error: 'Non autorizzato.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const newMode = !!body.maintenanceMode;
        await setMaintenanceState(newMode);
        return Response.json({ maintenanceMode: newMode, message: 'Stato manutenzione aggiornato.' });
    } catch {
        return Response.json({ error: 'Errore nell\'aggiornamento.' }, { status: 500 });
    }
}
