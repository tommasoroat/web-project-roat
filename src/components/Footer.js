import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ dict, locale }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-surface-800 border-t border-primary/10 mt-auto"
            role="contentinfo"
            aria-label="Informazioni legali e contatti"
        >
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href={`/${locale}`} className="group" aria-label="RTD - Torna alla homepage">
                            <div className="relative w-28 h-10 transition-opacity group-hover:opacity-80">
                                <Image src="/logo.png" alt="RTD Logo" fill className="object-contain object-left" />
                            </div>
                        </Link>
                        <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                            {dict.hero.subtitle}
                        </p>
                    </div>

                    {/* Navigazione */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            {dict.footer.servicesTitle}
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
                            {dict.footer.legalTitle}
                        </h3>
                        <nav aria-label="Link legali">
                            <ul className="space-y-3">
                                <li>
                                    <Link href={`/${locale}/privacy-policy`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {dict.footer.privacy}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${locale}/cookie-policy`} className="text-text-secondary hover:text-primary-light transition-colors text-sm">
                                        {dict.footer.cookie}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Info Legali - D.Lgs. 70/2003 Art. 7 */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                            Informazioni Legali
                        </h3>
                        <address className="not-italic text-text-secondary text-sm space-y-2">
                            <p>
                                <span className="text-text-muted">Ragione Sociale:</span><br />
                                Tommaso Roat
                            </p>
                            <p>
                                <span className="text-text-muted">Sede Legale:</span><br />
                                Merano (BZ)
                            </p>
                            <p>
                                <span className="text-text-muted">P.IVA:</span><br />
                                In fase di apertura
                            </p>
                            <p>
                                <span className="text-text-muted">Email:</span><br />
                                <a
                                    href="mailto:info@rtd.it"
                                    className="hover:text-primary-light transition-colors"
                                >
                                    info@rtd.it
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-surface-600 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-xs">
                        &copy; {currentYear} RTD — Tommaso Roat. {dict.footer.rights}
                    </p>
                    <p className="text-text-muted text-xs">
                        Conforme al D.Lgs. 70/2003 Art. 7 e al GDPR (Reg. UE 2016/679)
                    </p>
                </div>
            </div>
        </footer>
    );
}
