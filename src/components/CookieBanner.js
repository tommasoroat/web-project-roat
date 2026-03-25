'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const CONSENT_KEY = 'rtd_cookie_consent';
const CONSENT_MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

const defaultConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
};

const cookieStrings = {
    it: {
        title: 'Questo sito utilizza i cookie',
        description: 'Utilizziamo cookie tecnici necessari per il funzionamento del sito e, previo consenso, cookie di profilazione per migliorare la tua esperienza. Per maggiori informazioni consulta la nostra',
        policyLink: 'Cookie Policy',
        acceptAll: 'Accetta Tutti',
        rejectAll: 'Solo Tecnici',
        savePrefs: 'Salva preferenze',
        customize: 'Personalizza',
        necessary: { label: 'Necessari', desc: 'Essenziali per il funzionamento del sito. Non possono essere disattivati.' },
        analytics: { label: 'Statistici (GA4)', desc: 'Ci aiutano a comprendere come utilizzi il sito per migliorarlo.' },
        marketing: { label: 'Marketing', desc: 'Utilizzati per mostrarti pubblicità pertinente.' },
    },
    en: {
        title: 'This site uses cookies',
        description: 'We use essential cookies for the site to function and, with your consent, profiling cookies to improve your experience. For more information, see our',
        policyLink: 'Cookie Policy',
        acceptAll: 'Accept All',
        rejectAll: 'Reject All',
        savePrefs: 'Save preferences',
        customize: 'Customize',
        necessary: { label: 'Necessary', desc: 'Essential for the website to function. Cannot be disabled.' },
        analytics: { label: 'Analytics (GA4)', desc: 'Help us understand how you use the site to improve it.' },
        marketing: { label: 'Marketing', desc: 'Used to show you relevant advertising.' },
    },
    de: {
        title: 'Diese Website verwendet Cookies',
        description: 'Wir verwenden technische Cookies, die für den Betrieb der Website erforderlich sind, und mit Ihrer Zustimmung Profiling-Cookies zur Verbesserung Ihrer Erfahrung. Weitere Informationen finden Sie in unserer',
        policyLink: 'Cookie-Richtlinie',
        acceptAll: 'Alle akzeptieren',
        rejectAll: 'Alle ablehnen',
        savePrefs: 'Einstellungen speichern',
        customize: 'Anpassen',
        necessary: { label: 'Notwendig', desc: 'Wesentlich für den Betrieb der Website. Können nicht deaktiviert werden.' },
        analytics: { label: 'Analytisch (GA4)', desc: 'Helfen uns zu verstehen, wie Sie die Website nutzen, um sie zu verbessern.' },
        marketing: { label: 'Marketing', desc: 'Werden verwendet, um Ihnen relevante Werbung zu zeigen.' },
    },
};

/**
 * Update Google Consent Mode v2 based on user choices.
 */
function updateGtagConsent(consentState) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            analytics_storage: consentState.analytics ? 'granted' : 'denied',
            ad_storage: consentState.marketing ? 'granted' : 'denied',
            ad_user_data: consentState.marketing ? 'granted' : 'denied',
            ad_personalization: consentState.marketing ? 'granted' : 'denied',
        });
    }
}

export default function CookieBanner() {
    const pathname = usePathname();
    const locale = pathname?.split('/')[1] || 'it';
    const strings = cookieStrings[locale] || cookieStrings.it;

    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [consent, setConsent] = useState(defaultConsent);
    const bannerRef = useRef(null);
    const firstFocusRef = useRef(null);

    // Check localStorage for existing consent
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const timestamp = parsed.timestamp ? new Date(parsed.timestamp).getTime() : 0;
                const now = Date.now();

                // If consent is less than 6 months old, apply it and don't show banner
                if (now - timestamp < CONSENT_MAX_AGE_MS) {
                    const restoredConsent = {
                        necessary: true,
                        analytics: !!parsed.analytics,
                        marketing: !!parsed.marketing,
                    };
                    setConsent(restoredConsent);
                    updateGtagConsent(restoredConsent);
                    setVisible(false);
                    return;
                }
            }
        } catch {
            // If parsing fails, show banner
        }
        // No valid consent found — show the banner
        setVisible(true);
    }, []);

    // Listen for "reopen cookie settings" event from footer
    useEffect(() => {
        const handler = () => {
            setVisible(true);
            setShowDetails(true);
        };
        window.addEventListener('openCookieSettings', handler);
        return () => window.removeEventListener('openCookieSettings', handler);
    }, []);

    // Trap focus inside the banner when visible
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Tab' && bannerRef.current) {
            const focusableEls = bannerRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableEls.length === 0) return;
            const first = focusableEls[0];
            const last = focusableEls[focusableEls.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }, []);

    // Focus first button when banner opens
    useEffect(() => {
        if (visible && firstFocusRef.current) {
            setTimeout(() => firstFocusRef.current?.focus(), 100);
        }
    }, [visible]);

    const saveConsent = (consentState) => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({
            ...consentState,
            timestamp: new Date().toISOString(),
        }));
        setConsent(consentState);
        updateGtagConsent(consentState);
        setVisible(false);
        setShowDetails(false);
    };

    const acceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
    };

    const rejectAll = () => {
        saveConsent({ ...defaultConsent });
    };

    const saveCustom = () => {
        saveConsent(consent);
    };

    const toggleCategory = (category) => {
        if (category === 'necessary') return;
        setConsent(prev => ({ ...prev, [category]: !prev[category] }));
    };

    if (!visible) return null;

    const categories = [
        { key: 'necessary', ...strings.necessary, locked: true },
        { key: 'analytics', ...strings.analytics },
        { key: 'marketing', ...strings.marketing },
    ];

    return (
        <div
            className="fixed inset-0 z-[9998] flex items-end justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-banner-title"
            onKeyDown={handleKeyDown}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

            <div
                ref={bannerRef}
                className="relative w-full max-w-2xl bg-surface-800 border border-primary/15 rounded-2xl shadow-2xl p-6 animate-fade-in-up"
            >
                <h2 id="cookie-banner-title" className="text-lg font-bold text-text-primary mb-2">
                    {strings.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {strings.description}{' '}
                    <Link href={`/${locale}/cookie-policy`} className="text-primary-light hover:underline">
                        {strings.policyLink}
                    </Link>.
                </p>

                {showDetails && (
                    <div className="mb-4 space-y-4 pt-2" role="group" aria-label="Cookie categories">
                        {categories.map(cat => (
                            <div key={cat.key} className="flex items-start gap-3">
                                <label className="relative inline-flex items-center cursor-pointer mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={consent[cat.key]}
                                        onChange={() => toggleCategory(cat.key)}
                                        disabled={cat.locked}
                                        className="sr-only peer"
                                        aria-label={`Cookie ${cat.label}`}
                                    />
                                    <div className={`w-10 h-5 rounded-full transition-colors
                                        ${consent[cat.key] ? 'bg-primary' : 'bg-surface-500'}
                                        ${cat.locked ? 'opacity-60 cursor-not-allowed' : ''}
                                        peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-800
                                    `}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${consent[cat.key] ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                                    </div>
                                </label>
                                <div>
                                    <span className="text-sm font-medium text-text-primary">{cat.label}</span>
                                    <p className="text-xs text-text-muted">{cat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 items-center">
                    <button
                        ref={firstFocusRef}
                        onClick={acceptAll}
                        className="btn-primary text-sm !py-2.5 !px-6"
                    >
                        {strings.acceptAll}
                    </button>
                    <button onClick={rejectAll} className="btn-secondary text-sm !py-2.5 !px-6">
                        {strings.rejectAll}
                    </button>
                    {showDetails ? (
                        <button onClick={saveCustom} className="btn-secondary text-sm !py-2.5 !px-6">
                            {strings.savePrefs}
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowDetails(true)}
                            className="text-sm text-primary-light hover:underline ml-auto"
                        >
                            {strings.customize} →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
