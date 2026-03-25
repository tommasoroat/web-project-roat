import { NextResponse } from 'next/server';
import { i18n } from './src/lib/i18n';

// ─── Edge-compatible maintenance state reader ────────────────────────────────
async function getMaintenanceStateEdge() {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (url && token) {
        try {
            const res = await fetch(`${url}/get/rtd:maintenance_mode`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store',
            });
            if (res.ok) {
                const data = await res.json();
                return data.result === 'true';
            }
        } catch {
            // Fall through
        }
        return false;
    }

    // Local dev: read via internal API
    try {
        const res = await fetch('http://localhost:3000/api/admin/maintenance', {
            cache: 'no-store',
        });
        if (res.ok) {
            const data = await res.json();
            return !!data.maintenanceMode;
        }
    } catch {
        // Fall through
    }
    return false;
}

// ─── Edge-compatible HMAC token verification ─────────────────────────────────
async function verifyTokenEdge(token) {
    try {
        if (!token || !token.includes('.')) return false;

        const [payloadB64, signature] = token.split('.');
        const secret = process.env.ADMIN_PASS || 'fallback-secret-key';

        // Use Web Crypto API (available in Edge Runtime)
        const key = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const sig = await crypto.subtle.sign(
            'HMAC',
            key,
            new TextEncoder().encode(payloadB64)
        );

        const expectedSig = btoa(String.fromCharCode(...new Uint8Array(sig)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        if (signature !== expectedSig) return false;

        // Check expiration
        const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
        if (payload.exp < Date.now()) return false;

        return true;
    } catch {
        return false;
    }
}

// ─── Maintenance page HTML ───────────────────────────────────────────────────
function getMaintenanceHtml(locale) {
    const messages = {
        it: {
            title: 'Sito in manutenzione',
            subtitle: 'Stiamo lavorando per migliorare il nostro sito. Torneremo online a breve.',
            note: 'Ci scusiamo per il disagio.',
        },
        en: {
            title: 'Site under maintenance',
            subtitle: 'We are working to improve our website. We will be back online shortly.',
            note: 'We apologize for the inconvenience.',
        },
        de: {
            title: 'Seite in Wartung',
            subtitle: 'Wir arbeiten daran, unsere Website zu verbessern. Wir sind in Kürze wieder online.',
            note: 'Wir entschuldigen uns für die Unannehmlichkeiten.',
        },
    };

    const msg = messages[locale] || messages.it;

    return `<!DOCTYPE html>
<html lang="${locale || 'it'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${msg.title} | RTD</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #bae6fd 100%);
      color: #082f49;
      text-align: center;
      padding: 2rem;
    }
    .container {
      max-width: 480px;
      width: 100%;
    }
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 24px rgba(186,230,253,0.4);
      margin-bottom: 2rem;
    }
    .gear {
      width: 48px;
      height: 48px;
      color: #0284c7;
      animation: spin 4s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-size: 1.125rem;
      color: #0c4a6e;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .note {
      font-size: 0.875rem;
      color: #0284c7;
    }
    .card {
      background: rgba(255,255,255,0.5);
      border: 1px solid rgba(255,255,255,0.8);
      border-radius: 1.5rem;
      backdrop-filter: blur(20px);
      padding: 3rem 2rem;
      box-shadow: 0 10px 30px rgba(186,230,253,0.4);
    }
    footer {
      margin-top: 3rem;
      font-size: 0.75rem;
      color: #0284c7;
    }
    .admin-backdoor {
      position: fixed;
      top: 1.25rem;
      left: 1.25rem;
      opacity: 0.2;
      transition: opacity 0.3s ease;
      display: block;
      line-height: 0;
    }
    .admin-backdoor:hover {
      opacity: 1;
    }
    .admin-backdoor img {
      width: 24px;
      height: auto;
      display: block;
    }
  </style>
</head>
<body>
  <a
    class="admin-backdoor"
    href="https://www.rtd-solutions.eu/it/admin"
    aria-hidden="true"
    tabindex="-1"
  >
    <img src="/logo.png" alt="" />
  </a>
  <div class="container">
    <div class="card">
      <div class="icon-wrapper">
        <svg class="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      </div>
      <h1>${msg.title}</h1>
      <p class="subtitle">${msg.subtitle}</p>
      <p class="note">${msg.note}</p>
    </div>
    <footer>&copy; ${new Date().getFullYear()} RTD</footer>
  </div>
</body>
</html>`;
}

// ─── Main middleware ─────────────────────────────────────────────────────────
export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // ── i18n redirect (existing logic) ───────────────────────────────────
    const pathnameHasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Skip static assets and API
    const isStaticOrApi =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.');

    if (!pathnameHasLocale && !isStaticOrApi) {
        const locale = i18n.defaultLocale;
        request.nextUrl.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(request.nextUrl);
    }

    // ── Maintenance mode guard ───────────────────────────────────────────

    // Routes always excluded from maintenance block
    if (isStaticOrApi) return NextResponse.next();

    // Always allow admin pages (login + dashboard)
    const isAdminPage = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/admin`)
    );
    if (isAdminPage) return NextResponse.next();

    // Check maintenance state
    let isMaintenanceActive = false;
    try {
        isMaintenanceActive = await getMaintenanceStateEdge();
    } catch {
        // If check fails, don't block — fail open
        return NextResponse.next();
    }

    if (!isMaintenanceActive) return NextResponse.next();

    // Maintenance is active — check for admin session cookie
    const sessionCookie = request.cookies.get('rtd_admin_session');
    if (sessionCookie) {
        const isValid = await verifyTokenEdge(sessionCookie.value);
        if (isValid) return NextResponse.next();
    }

    // Block: return 503 with maintenance page
    const locale = i18n.locales.find((l) => pathname.startsWith(`/${l}`)) || i18n.defaultLocale;

    return new Response(getMaintenanceHtml(locale), {
        status: 503,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Retry-After': '3600',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
    });
}

export const config = {
    matcher: ['/((?!_next).*)'],
};
