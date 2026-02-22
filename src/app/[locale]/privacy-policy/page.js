import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Privacy Policy',
    description: 'Informativa sulla privacy di RTD ai sensi del GDPR (Reg. UE 2016/679).',
};

export default async function PrivacyPolicyPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <section className="py-24" aria-label="Privacy Policy">
            <div className="section-container max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">
                    <span className="gradient-text">{dict.footer.privacy.split(' ')[0]}</span> {dict.footer.privacy.split(' ')[1] || ''}
                </h1>
                <p className="text-text-muted text-sm mb-12">
                    Ultimo aggiornamento: Febbraio 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8 text-text-secondary text-sm leading-relaxed">
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">1. Titolare del Trattamento</h2>
                        <p>
                            Il Titolare del trattamento dei dati è <strong className="text-text-primary">Tommaso Roat</strong> — RTD,
                            con sede legale in Merano (BZ).
                        </p>
                        <p className="mt-2">
                            Email di contatto: <a href="mailto:info@rtd.it" className="text-primary-light hover:underline">info@rtd.it</a>
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">2. Tipologie di Dati Raccolti</h2>
                        <p>I dati personali raccolti tramite il sito web possono includere:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong className="text-text-primary">Dati di contatto:</strong> nome, cognome, indirizzo email, numero di telefono</li>
                            <li><strong className="text-text-primary">Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, orari di accesso</li>
                            <li><strong className="text-text-primary">Dati forniti volontariamente:</strong> informazioni inserite nel modulo di contatto</li>
                        </ul>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">3. Finalità del Trattamento</h2>
                        <p>I dati personali sono trattati per le seguenti finalità:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong className="text-text-primary">Risposta alle richieste:</strong> gestione delle richieste di preventivo e contatto</li>
                            <li><strong className="text-text-primary">Erogazione del servizio:</strong> svolgimento delle attività professionali richieste</li>
                            <li><strong className="text-text-primary">Obblighi di legge:</strong> adempimento di obblighi previsti dalla normativa vigente</li>
                            <li><strong className="text-text-primary">Miglioramento del servizio:</strong> analisi statistiche anonime sull&apos;utilizzo del sito (previo consenso)</li>
                        </ul>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">4. Base Giuridica del Trattamento</h2>
                        <p>Il trattamento dei dati si fonda sulle seguenti basi giuridiche ai sensi dell&apos;Art. 6 del GDPR:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong className="text-text-primary">Consenso:</strong> l&apos;interessato ha espresso il consenso per finalità specifiche (Art. 6, par. 1, lett. a)</li>
                            <li><strong className="text-text-primary">Esecuzione contrattuale:</strong> il trattamento è necessario per l&apos;esecuzione di un contratto (Art. 6, par. 1, lett. b)</li>
                            <li><strong className="text-text-primary">Obbligo legale:</strong> il trattamento è necessario per adempiere a un obbligo di legge (Art. 6, par. 1, lett. c)</li>
                            <li><strong className="text-text-primary">Interesse legittimo:</strong> il trattamento è necessario per perseguire un legittimo interesse del titolare (Art. 6, par. 1, lett. f)</li>
                        </ul>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">5. Conservazione dei Dati</h2>
                        <p>
                            I dati personali saranno conservati per il tempo strettamente necessario al raggiungimento delle finalità
                            per cui sono stati raccolti e comunque non oltre i termini previsti dalla normativa vigente.
                        </p>
                        <p className="mt-2">
                            In particolare: i dati relativi alle richieste di contatto saranno conservati per un massimo di
                            <strong className="text-text-primary"> 24 mesi</strong> dalla raccolta.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">6. Diritti dell&apos;Interessato</h2>
                        <p>Ai sensi degli Artt. 15-22 del GDPR, l&apos;interessato ha diritto di:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Accedere ai propri dati personali</li>
                            <li>Ottenere la rettifica o la cancellazione dei dati</li>
                            <li>Limitare il trattamento</li>
                            <li>Opporsi al trattamento</li>
                            <li>Portabilità dei dati</li>
                            <li>Revocare il consenso in qualsiasi momento</li>
                            <li>Proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali</li>
                        </ul>
                        <p className="mt-3">
                            Per esercitare i propri diritti, contattare il Titolare all&apos;indirizzo:{' '}
                            <a href="mailto:info@rtd.it" className="text-primary-light hover:underline">info@rtd.it</a>
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">7. Sicurezza dei Dati</h2>
                        <p>
                            Il Titolare adotta misure tecniche e organizzative appropriate per garantire la sicurezza dei dati personali,
                            inclusi protocolli <strong className="text-text-primary">HTTPS/SSL</strong>, validazione dei dati,
                            rate limiting e protezione anti-spam.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">8. Trasferimento dei Dati</h2>
                        <p>
                            I dati personali non vengono trasferiti al di fuori dello Spazio Economico Europeo (SEE).
                            In caso di necessità, il trasferimento avverrà nel rispetto delle garanzie previste dal GDPR.
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">9. Modifiche alla Privacy Policy</h2>
                        <p>
                            Il Titolare si riserva il diritto di apportare modifiche alla presente informativa in qualsiasi momento.
                            Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
