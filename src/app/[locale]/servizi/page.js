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
    const sv = dict.servizi || {};

    return (
        <>
            {/* Header */}
            <section className="py-24 relative overflow-hidden" aria-label="Services header">
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
            <section className="pb-20" aria-label="Pricing table">
                <div className="section-container">
                    <PricingTable dict={dict} locale={locale} />
                </div>
            </section>

            {/* Details — How it works */}
            <section className="py-20 border-t border-surface-600" aria-label="How it works">
                <div className="section-container">
                    <div className="flex justify-center mb-12">
                        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-2xl shadow-lg shadow-primary/20">{sv.howItWorks || 'How it works'}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(sv.steps || []).map((item) => (
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
            <section className="py-20 border-t border-surface-600" aria-label="Pricing summary">
                <div className="section-container">
                    <div className="flex justify-center mb-8">
                        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-2xl shadow-lg shadow-primary/20">{sv.pricingSummary || 'Pricing Summary'}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm" role="table" aria-label="Services and pricing summary">
                            <thead>
                                <tr className="border-b border-surface-600">
                                    {(sv.tableHeaders || ['Service', 'Base Price', 'Notes']).map((h, i) => (
                                        <th key={i} className="py-4 px-4 text-text-primary font-semibold" scope="col">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-text-secondary">
                                {(sv.tableRows || []).map((row, i) => (
                                    <tr key={i} className={`border-b border-surface-700 hover:bg-surface-700/50 transition-colors ${row.highlight ? 'bg-amber-50/30' : ''}`}>
                                        <td className="py-4 px-4 font-medium text-text-primary">{row.service}</td>
                                        <td className={`py-4 px-4 font-bold ${row.priceClass || 'gradient-text'}`}>{row.price}</td>
                                        <td className="py-4 px-4">{row.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" aria-label="Call to action">
                <div className="section-container text-center">
                    <h2 className="text-3xl font-extrabold mb-4">{sv.ctaTitle || 'Found the right service?'}</h2>
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
