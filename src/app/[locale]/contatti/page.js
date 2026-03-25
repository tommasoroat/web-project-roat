import ContactForm from '@/components/ContactForm';
import VacationBox from '@/components/VacationBox';
import { ContactCard } from '@/components/ui/contact-card';
import { Mail as MailIcon, MessageCircle as MessageCircleIcon, Clock as ClockIcon, Info as InfoIcon } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import { getVacationState } from '@/lib/vacationState';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Contatti',
    description:
        'Contatta RTD per una consulenza gratuita o per richiedere un preventivo. Siti web professionali da €400.',
};

export default async function ContattiPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    // Read vacation mode directly from shared state (no HTTP self-fetch)
    const isVacation = await getVacationState();

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
            priceInfo: 'Il sito vetrina parte da <strong class="text-text-primary">€650</strong> e la manutenzione da <strong class="text-text-primary">€69/mese</strong> (hosting incluso).',
            hostingOnly: 'Se non hai bisogno della manutenzione, l\'hosting puro costa <strong class="text-text-primary">€25/mese</strong>. Il Dominio (il tuo indirizzo web) si rinnova a circa <strong class="text-text-primary">10/20€</strong> all\'anno.',
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
            priceInfo: 'Showcase website starts from <strong class="text-text-primary">€650</strong> and maintenance from <strong class="text-text-primary">€69/month</strong> (hosting included).',
            hostingOnly: 'If you don\'t need maintenance, pure hosting costs <strong class="text-text-primary">€25/month</strong>. Your Domain name roughly renews at <strong class="text-text-primary">10/20€</strong> per year.',
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
            priceInfo: 'Showcase-Website ab <strong class="text-text-primary">€650</strong> und Wartung ab <strong class="text-text-primary">€69/Monat</strong> (Hosting inklusive).',
            hostingOnly: 'Wenn Sie keine Wartung benötigen, kostet das reine Hosting <strong class="text-text-primary">€25/Monat</strong>. Die Domain kostet ca. <strong class="text-text-primary">10/20€</strong> pro Jahr.',
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
                    {isVacation ? (
                        <div className="max-w-3xl mx-auto">
                            <VacationBox message={vacationTexts[locale] || vacationTexts.it} />
                        </div>
                    ) : (
                        <ContactCard 
                            title={locale === 'it' ? 'Informazioni di Contatto' : locale === 'en' ? 'Contact Information' : 'Kontaktinformationen'}
                            description={locale === 'it' ? 'Siamo a tua disposizione per qualsiasi domanda, consulenza o per discutere i dettagli del tuo nuovo progetto web.' : locale === 'en' ? 'We are at your disposal for any questions, consultation, or to discuss the details of your new web project.' : 'Wir stehen Ihnen für alle Fragen, Beratungen oder zur Besprechung der Details Ihres neuen Webprojekts zur Verfügung.'}
                            contactInfo={[
                                {
                                    icon: MailIcon,
                                    label: s.email,
                                    value: `<a href="mailto:info@rtd-solutions.eu" class="text-primary-light hover:underline font-medium block mb-1">info@rtd-solutions.eu</a><span class="text-text-muted text-xs">${s.emailReply}</span>`
                                },
                                {
                                    icon: MessageCircleIcon,
                                    label: s.consultation,
                                    value: `<span class="text-text-secondary">${s.consultationDesc}</span>`
                                },
                                {
                                    icon: ClockIcon,
                                    label: s.responseTimes,
                                    value: `<ul class="space-y-1.5 pt-1 text-text-secondary">
                                            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-success rounded-full"></span>${s.emailTime}</li>
                                            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-warning rounded-full"></span>${s.quoteTime}</li>
                                            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-primary-light rounded-full"></span>${s.consultTime}</li>
                                        </ul>`
                                },
                                {
                                    icon: InfoIcon,
                                    label: s.didYouKnow,
                                    value: `<span class="text-text-secondary block mb-1">${s.priceInfo}</span><span class="text-text-secondary block mt-1">${s.hostingOnly}</span>`
                                }
                            ]}
                        >
                            <div className="w-full">
                                <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-6">
                                    {formTitle[locale] || formTitle.it}
                                </h2>
                                <ContactForm locale={locale} dict={dict} />
                            </div>
                        </ContactCard>
                    )}
                </div>
            </section>
        </>
    );
}
