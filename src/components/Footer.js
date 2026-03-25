'use client';

import Link from 'next/link';
import Image from 'next/image';
import FeedbackDrawer from '@/components/FeedbackDrawer';

function CookiePreferencesButton({ label }) {
    return (
        <button
            onClick={() => {
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('openCookieSettings'));
                }
            }}
            className="text-text-secondary hover:text-primary-light transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left"
            type="button"
        >
            {label}
        </button>
    );
}

const cookiePrefLabels = {
    it: 'Rivedi preferenze cookie',
    en: 'Review cookie preferences',
    de: 'Cookie-Einstellungen überprüfen',
};

const feedbackLabels = {
    it: 'Lascia un Feedback',
    en: 'Leave Feedback',
    de: 'Feedback geben',
};

/* Instagram SVG Icon — official outline style */
function InstagramIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
    );
}

export default function Footer({ dict, locale }) {
    const currentYear = new Date().getFullYear();
    const footer = dict.footer || {};

    return (
        <footer
            className="bg-surface-800 border-t border-primary/10 mt-auto"
            role="contentinfo"
            aria-label={footer.legalInfoTitle || 'Informazioni legali e contatti'}
        >
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href={`/${locale}`} className="group" aria-label="RTD - Homepage">
                            <div className="relative w-28 h-10 transition-opacity group-hover:opacity-80">
                                <Image src="/logo.png" alt="RTD Logo" fill className="object-contain object-left" />
                            </div>
                        </Link>
                        <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                            {dict.hero.subtitle}
                        </p>

                        {/* Social — Instagram */}
                        <div className="mt-5">
                            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                                {footer.followUs || 'Seguici'}
                            </p>
                            <a
                                href="https://instagram.com/rtd.solutions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-light transition-colors group"
                                aria-label="Instagram RTD Solutions — @rtd.solutions"
                            >
                                <InstagramIcon className="w-5 h-5 text-primary group-hover:text-primary-light transition-colors" />
                                <span className="text-sm font-medium">@rtd.solutions</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigazione */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            {footer.servicesTitle}
                        </h3>
                        <nav aria-label="Link del footer">
                            <ul className="space-y-3">
                                <li>
                                    <Link href={`/${locale}`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {dict.navigation.home}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${locale}/servizi`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {dict.navigation.services}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${locale}/contatti`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {dict.navigation.contact}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Legale */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            {footer.legalTitle}
                        </h3>
                        <nav aria-label="Link legali">
                            <ul className="space-y-3">
                                <li>
                                    <Link href={`/${locale}/privacy-policy`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {footer.privacy}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${locale}/cookie-policy`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {footer.cookie}
                                    </Link>
                                </li>
                                <li>
                                    <CookiePreferencesButton label={cookiePrefLabels[locale] || cookiePrefLabels.it} />
                                </li>
                                <li>
                                    <FeedbackDrawer>
                                        <button className="text-text-secondary hover:text-primary-light transition-colors text-sm cursor-pointer bg-transparent border-none p-0 text-left">
                                            {feedbackLabels[locale] || feedbackLabels.it}
                                        </button>
                                    </FeedbackDrawer>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Info Legali — Art. 2250 C.C. + D.Lgs. 70/2003 Art. 7 */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            {footer.legalInfoTitle || 'Informazioni Legali'}
                        </h3>
                        <address className="not-italic text-text-secondary text-sm space-y-2">
                            <p>
                                <span className="text-text-muted">{footer.businessName || 'Ragione Sociale:'}</span><br />
                                Tommaso Roat
                            </p>
                            <p>
                                <span className="text-text-muted">{footer.registeredOffice || 'Sede Legale:'}</span><br />
                                Merano (BZ)
                            </p>
                            <p>
                                <span className="text-text-muted">{footer.vatNumber || 'P.IVA:'}</span><br />
                                Soon
                            </p>
                            <p>
                                <span className="text-text-muted">{footer.emailLabel || 'Email:'}</span><br />
                                <a
                                    href="mailto:info@rtd-solutions.eu"
                                    className="hover:text-primary-light transition-colors"
                                >
                                    info@rtd-solutions.eu
                                </a>
                            </p>

                        </address>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-surface-600 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-xs">
                        &copy; {currentYear} RTD — Tommaso Roat. {footer.rights}
                    </p>
                    <p className="text-text-muted text-xs">
                        Conforme al D.Lgs. 70/2003 Art. 7, Art. 2250 C.C. e al GDPR (Reg. UE 2016/679)
                    </p>
                </div>
            </div>
        </footer>
    );
}
