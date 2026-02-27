import ContactForm from '@/components/ContactForm';
import VacationBox from '@/components/VacationBox';
import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Contatti',
    description:
        'Contatta RTD per una consulenza gratuita o per richiedere un preventivo. Siti web professionali da €400.',
};

export default async function ContattiPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    // Fetch vacation mode status from API
    let isVacation = false;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/admin/vacation`, {
            cache: 'no-store',
        });
        if (res.ok) {
            const data = await res.json();
            isVacation = !!data.vacationMode;
        }
    } catch {
        // If fetch fails, default to non-vacation
    }

    const vacationTexts = {
        it: 'Siamo in vacanza, torneremo presto a realizzare il vostro sito dei sogni',
        en: 'We are on holiday, we will be back soon to build your dream website',
        de: 'Wir sind im Urlaub, wir werden bald zurück sein, um Ihre Traum-Website zu erstellen',
    };

    const headerTexts = {
        it: { t1: 'Parliamo', t2: ' del tuo progetto' },
        en: { t1: "Let's talk", t2: ' about your project' },
        de: { t1: 'Sprechen wir', t2: ' über Ihr Projekt' },
    };

    const formTitle = {
        it: 'Richiedi un preventivo gratuito',
        en: 'Request a free quote',
        de: 'Kostenloses Angebot anfordern',
    };

    const sidebar = {
        it: {
            email: 'Email',
            emailReply: 'Risposta entro 24 ore lavorative',
            consultation: 'Consulenza Gratuita',
            consultationDesc: 'Disponibile <strong>di persona o online</strong>. Analisi delle necessità e fattibilità del progetto senza alcun impegno.',
            responseTimes: 'Tempi di Risposta',
            emailTime: 'Email: entro 24h lavorative',
            quoteTime: 'Preventivo: entro 48h lavorative',
            consultTime: 'Consulenza: su appuntamento',
            didYouKnow: 'Lo sapevi?',
            priceInfo: 'Il sito vetrina parte da <strong class="text-text-primary">€400</strong> e la manutenzione da <strong class="text-text-primary">€40/mese</strong> (hosting incluso).',
        },
        en: {
            email: 'Email',
            emailReply: 'Response within 24 business hours',
            consultation: 'Free Consultation',
            consultationDesc: 'Available <strong>in person or online</strong>. Needs analysis and project feasibility without commitment.',
            responseTimes: 'Response Times',
            emailTime: 'Email: within 24 business hours',
            quoteTime: 'Quote: within 48 business hours',
            consultTime: 'Consultation: by appointment',
            didYouKnow: 'Did you know?',
            priceInfo: 'Showcase website starts from <strong class="text-text-primary">€400</strong> and maintenance from <strong class="text-text-primary">€40/month</strong> (hosting included).',
        },
        de: {
            email: 'E-Mail',
            emailReply: 'Antwort innerhalb von 24 Geschäftsstunden',
            consultation: 'Kostenlose Beratung',
            consultationDesc: 'Verfügbar <strong>persönlich oder online</strong>. Bedarfsanalyse und Projektmachbarkeit ohne Verpflichtung.',
            responseTimes: 'Antwortzeiten',
            emailTime: 'E-Mail: innerhalb 24 Geschäftsstunden',
            quoteTime: 'Angebot: innerhalb 48 Geschäftsstunden',
            consultTime: 'Beratung: nach Vereinbarung',
            didYouKnow: 'Wussten Sie?',
            priceInfo: 'Showcase-Website ab <strong class="text-text-primary">€400</strong> und Wartung ab <strong class="text-text-primary">€40/Monat</strong> (Hosting inklusive).',
        },
    };

    const h = headerTexts[locale] || headerTexts.it;
    const s = sidebar[locale] || sidebar.it;

    return (
        <>
            {/* Header */}
            <section className="py-24 relative overflow-hidden" aria-label="Intestazione contatti">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="section-container relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        <span className="gradient-text">{h.t1}</span>{h.t2}
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
                        {/* Form or Vacation Box */}
                        <div className="lg:col-span-3">
                            {isVacation ? (
                                <VacationBox message={vacationTexts[locale] || vacationTexts.it} />
                            ) : (
                                <div className="glass-card p-8">
                                    <h2 className="text-xl font-bold text-text-primary mb-6">
                                        {formTitle[locale] || formTitle.it}
                                    </h2>
                                    <ContactForm locale={locale} dict={dict} />
                                </div>
                            )}
                        </div>

                        {/* Contact info sidebar */}
                        <aside className="lg:col-span-2 space-y-6" aria-label="Informazioni di contatto">
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">@</span> {s.email}
                                </h3>
                                <a
                                    href="mailto:rtd.devlab@gmail.com"
                                    className="text-primary-light hover:underline font-medium"
                                >
                                    rtd.devlab@gmail.com
                                </a>
                                <p className="text-text-muted text-xs mt-2">
                                    {s.emailReply}
                                </p>
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">✉️</span> {s.consultation}
                                </h3>
                                <p className="text-text-secondary text-sm" dangerouslySetInnerHTML={{ __html: s.consultationDesc }} />
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">⏱</span> {s.responseTimes}
                                </h3>
                                <ul className="text-text-secondary text-sm space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true" />
                                        {s.emailTime}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-warning rounded-full" aria-hidden="true" />
                                        {s.quoteTime}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-light rounded-full" aria-hidden="true" />
                                        {s.consultTime}
                                    </li>
                                </ul>
                            </div>

                            <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent/5">
                                <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                                    <span aria-hidden="true" className="w-5 h-5 flex justify-center items-center">!</span> {s.didYouKnow}
                                </h3>
                                <p className="text-text-secondary text-sm" dangerouslySetInnerHTML={{ __html: s.priceInfo }} />
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
