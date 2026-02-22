import Link from 'next/link';
import PricingTable from '@/components/PricingTable';
import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Servizi & Tariffe',
    description:
        'Listino completo dei servizi web di RTD: sito vetrina da €400, abbonamento da €40/mese, consulenza gratuita. Trasparenza totale sui prezzi.',
};

export default async function ServiziPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <>
            {/* Header */}
            <section className="py-24 relative overflow-hidden" aria-label="Intestazione servizi">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="section-container relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        {dict.pricingPreview.title1} <span className="gradient-text">{dict.pricingPreview.title2}</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {dict.pricingPreview.subtitle}
                    </p>
                </div>
            </section>

            {/* Pricing */}
            <section className="pb-20" aria-label="Tabella tariffe">
                <div className="section-container">
                    <PricingTable dict={dict} locale={locale} />
                </div>
            </section>

            {/* Details */}
            <section className="py-20 border-t border-surface-600" aria-label="Dettaglio servizi">
                <div className="section-container">
                    <div className="flex justify-center mb-12">
                        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-2xl shadow-lg shadow-primary/20">Come funziona</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Consulenza Gratuita',
                                desc: 'Analizziamo insieme le tue necessità e la fattibilità del progetto. Di persona o online, senza impegno.',
                            },
                            {
                                step: '02',
                                title: 'Preventivo Trasparente',
                                desc: 'Ricevi un preventivo chiaro e dettagliato, calcolato ad hoc in base alle tue richieste specifiche.',
                            },
                            {
                                step: '03',
                                title: 'Realizzazione & Lancio',
                                desc: 'Sviluppo il tuo sito "chiavi in mano": design, codice, ottimizzazione e messa online.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="glass-card p-6 text-center">
                                <span className="text-4xl font-extrabold gradient-text block mb-3" aria-hidden="true">
                                    {item.step}
                                </span>
                                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                                <p className="text-text-secondary text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Table format for accessibility */}
            <section className="py-20 border-t border-surface-600" aria-label="Riepilogo tariffe accessibile">
                <div className="section-container">
                    <div className="flex justify-center mb-8">
                        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-2xl shadow-lg shadow-primary/20">Riepilogo Tariffe</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm" role="table" aria-label="Tabella riassuntiva servizi e tariffe">
                            <thead>
                                <tr className="border-b border-surface-600">
                                    <th className="py-4 px-4 text-text-primary font-semibold" scope="col">Servizio</th>
                                    <th className="py-4 px-4 text-text-primary font-semibold" scope="col">Tariffa Base</th>
                                    <th className="py-4 px-4 text-text-primary font-semibold" scope="col">Note</th>
                                </tr>
                            </thead>
                            <tbody className="text-text-secondary">
                                <tr className="border-b border-surface-700 hover:bg-surface-700/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">Consulenza Iniziale (di persona o online)</td>
                                    <td className="py-4 px-4 font-bold text-success">Gratis</td>
                                    <td className="py-4 px-4">Analisi delle necessità e fattibilità progetto.</td>
                                </tr>
                                <tr className="border-b border-surface-700 hover:bg-surface-700/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">Sito Vetrina (Standardizzato)</td>
                                    <td className="py-4 px-4 font-bold gradient-text">da €400</td>
                                    <td className="py-4 px-4">Soluzione standard con struttura predefinita.</td>
                                </tr>
                                <tr className="border-b border-surface-700 hover:bg-surface-700/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">Manutenzione</td>
                                    <td className="py-4 px-4 font-bold gradient-text">da €40/mese</td>
                                    <td className="py-4 px-4">Per mantenere il sito sempre aggiornato, sicuro e funzionante nel tempo. Hosting incluso.</td>
                                </tr>
                                <tr className="border-b border-surface-700 hover:bg-surface-700/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">Sito web personalizzato</td>
                                    <td className="py-4 px-4 font-bold text-text-primary">Preventivo</td>
                                    <td className="py-4 px-4">Progetto su misura, realizzato dalla A alla Z in base alle tue esigenze.</td>
                                </tr>
                                <tr className="hover:bg-surface-700/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">Dominio & Email</td>
                                    <td className="py-4 px-4 font-bold gradient-text">€10 – €20/anno</td>
                                    <td className="py-4 px-4">Nome dell&apos;esercizio commerciale o del brand.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" aria-label="Contattaci">
                <div className="section-container text-center">
                    <h2 className="text-3xl font-extrabold mb-4">Hai trovato il servizio giusto?</h2>
                    <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                        {dict.cta.desc}
                    </p>
                    <Link href={`/${locale}/contatti`} className="btn-primary text-lg">
                        {dict.cta.button}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
}
