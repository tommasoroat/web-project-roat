import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Cookie Policy',
    description: 'Informativa sui cookie utilizzati dal sito RTD ai sensi del GDPR e della Direttiva ePrivacy.',
};

export default async function CookiePolicyPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <section className="py-24" aria-label="Cookie Policy">
            <div className="section-container max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">
                    <span className="gradient-text">{dict.footer.cookie.split(' ')[0]}</span> {dict.footer.cookie.split(' ')[1] || ''}
                </h1>
                <p className="text-text-muted text-sm mb-12">
                    Ultimo aggiornamento: Febbraio 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8 text-text-secondary text-sm leading-relaxed">
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">1. Cosa sono i Cookie</h2>
                        <p>
                            I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell&apos;utente
                            durante la navigazione su un sito web. Servono a migliorare l&apos;esperienza di navigazione,
                            ricordando le preferenze dell&apos;utente e raccogliendo informazioni statistiche.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">2. Tipologie di Cookie Utilizzati</h2>

                        <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">2.1 Cookie Tecnici (Necessari)</h3>
                        <p>
                            Sono essenziali per il funzionamento del sito e non possono essere disattivati.
                            Non richiedono il consenso dell&apos;utente.
                        </p>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full text-left text-xs" role="table" aria-label="Cookie tecnici">
                                <thead>
                                    <tr className="border-b border-surface-600">
                                        <th className="py-2 px-3 text-text-primary font-semibold" scope="col">Cookie</th>
                                        <th className="py-2 px-3 text-text-primary font-semibold" scope="col">Finalità</th>
                                        <th className="py-2 px-3 text-text-primary font-semibold" scope="col">Durata</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-surface-700">
                                        <td className="py-2 px-3 font-mono">rtd_cookie_consent</td>
                                        <td className="py-2 px-3">Memorizza le preferenze sui cookie</td>
                                        <td className="py-2 px-3">12 mesi</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">2.2 Cookie Funzionali</h3>
                        <p>
                            Migliorano la funzionalità del sito ricordando le preferenze dell&apos;utente
                            (es. lingua, tema). Richiedono il consenso.
                        </p>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">2.3 Cookie Analitici</h3>
                        <p>
                            Raccolgono informazioni statistiche anonime sull&apos;utilizzo del sito per
                            aiutarci a migliorare i contenuti e la navigazione. Richiedono il consenso.
                        </p>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">2.4 Cookie di Marketing</h3>
                        <p>
                            Utilizzati per tracciare i visitatori attraverso i siti web con lo scopo di
                            mostrare pubblicità pertinente e coinvolgente. Richiedono il consenso.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">3. Gestione del Consenso</h2>
                        <p>
                            Al primo accesso al sito viene mostrato un <strong className="text-text-primary">banner informativo</strong> che
                            consente di:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong className="text-text-primary">Accettare tutti</strong> i cookie</li>
                            <li><strong className="text-text-primary">Rifiutare tutti</strong> i cookie non necessari</li>
                            <li><strong className="text-text-primary">Personalizzare</strong> le preferenze per categoria</li>
                        </ul>
                        <p className="mt-3">
                            I cookie non tecnici vengono <strong className="text-text-primary">bloccati preventivamente</strong> fino
                            all&apos;espressione del consenso da parte dell&apos;utente, in conformità con la
                            normativa vigente.
                        </p>
                        <p className="mt-3">
                            È possibile modificare le proprie preferenze in qualsiasi momento cliccando sul link
                            &ldquo;Impostazioni Cookie&rdquo; presente nel footer del sito.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">4. Come Disabilitare i Cookie dal Browser</h2>
                        <p>
                            Oltre alle impostazioni del nostro banner, è possibile gestire i cookie direttamente
                            dalle impostazioni del browser:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong className="text-text-primary">Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                            <li><strong className="text-text-primary">Firefox:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                            <li><strong className="text-text-primary">Safari:</strong> Preferenze → Privacy → Blocca cookie</li>
                            <li><strong className="text-text-primary">Edge:</strong> Impostazioni → Cookie e permessi sito</li>
                        </ul>
                        <p className="mt-3 text-text-muted text-xs">
                            Nota: la disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">5. Cookie di Terze Parti</h2>
                        <p>
                            Il presente sito potrebbe utilizzare servizi di terze parti che installano cookie propri.
                            Il Titolare non ha controllo diretto su questi cookie. Per informazioni, consultare
                            le rispettive informative privacy dei fornitori.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">6. Base Normativa</h2>
                        <p>La presente Cookie Policy è redatta in conformità a:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Regolamento UE 2016/679 (GDPR)</li>
                            <li>Direttiva 2002/58/CE (Direttiva ePrivacy)</li>
                            <li>D.Lgs. 196/2003 (Codice Privacy italiano)</li>
                            <li>Provvedimento del Garante Privacy dell&apos;8 maggio 2014</li>
                            <li>Linee guida del Garante Privacy del 10 giugno 2021</li>
                        </ul>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">7. Contatti</h2>
                        <p>
                            Per qualsiasi domanda relativa alla presente Cookie Policy, contattare il Titolare
                            del trattamento all&apos;indirizzo:{' '}
                            <a href="mailto:info@rtd.it" className="text-primary-light hover:underline">info@rtd.it</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
