import ContactForm from '@/components/ContactForm';
import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Contatti',
    description:
        'Contatta RTD per una consulenza gratuita o per richiedere un preventivo. Siti web professionali da €400.',
};

export default async function ContattiPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <>
            {/* Header */}
            <section className="py-24 relative overflow-hidden" aria-label="Intestazione contatti">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="section-container relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        <span className="gradient-text">Parliamo</span> del tuo progetto
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {dict.cta.desc.split('. ')[0]}.<br />
                        {dict.cta.desc.split('. ').slice(1).join('. ')}
                    </p>
                </div>
            </section>

            {/* Contact section */}
            <section id="modulo-contatti" className="pb-24 scroll-mt-24" aria-label="Modulo di contatto">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="glass-card p-8">
                                <h2 className="text-xl font-bold text-text-primary mb-6">
                                    Richiedi un preventivo gratuito
                                </h2>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact info sidebar */}
                        <aside className="lg:col-span-2 space-y-6" aria-label="Informazioni di contatto">
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">@</span> Email
                                </h3>
                                <a
                                    href="mailto:info@rtd.it"
                                    className="text-primary-light hover:underline font-medium"
                                >
                                    info@rtd.it
                                </a>
                                <p className="text-text-muted text-xs mt-2">
                                    Risposta entro 24 ore lavorative
                                </p>
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">✉️</span> Consulenza Gratuita
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    Disponibile <strong>di persona o online</strong>.
                                    Analisi delle necessità e fattibilità del progetto senza alcun impegno.
                                </p>
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">⏱</span> Tempi di Risposta
                                </h3>
                                <ul className="text-text-secondary text-sm space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true" />
                                        Email: entro 24h lavorative
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-warning rounded-full" aria-hidden="true" />
                                        Preventivo: entro 48h lavorative
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-light rounded-full" aria-hidden="true" />
                                        Consulenza: su appuntamento
                                    </li>
                                </ul>
                            </div>

                            <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent/5">
                                <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">!</span> Lo sapevi?
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    Il sito vetrina parte da <strong className="text-text-primary">€400</strong> e la
                                    manutenzione da <strong className="text-text-primary">€40/mese</strong> (hosting incluso).
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
