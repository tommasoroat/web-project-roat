import Link from 'next/link';
import Image from 'next/image';
import PricingSectionAnimated from '@/components/PricingSectionAnimated';
import CircularTestimonials from '@/components/CircularTestimonials';
import StickyTabs from '@/components/ui/sticky-tabs';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';
import FeedbackDrawer from '@/components/FeedbackDrawer';
import { getDictionary } from '@/lib/i18n';

const BASE_URL = 'https://www.rtd-solutions.eu';

const metaByLocale = {
  it: {
    title: 'RTD - Siti Web Professionali',
    description:
      'Siti web professionali e ultra-veloci a Merano. Sviluppo su misura, conformit\u00e0 GDPR e piani di manutenzione da 40\u20ac/mese. Richiedi un preventivo!',
  },
  de: {
    title: 'RTD - Professionelle Webseiten',
    description:
      'Professionelle und ultraschnelle Webseiten in Meran. Ma\u00dfgeschneidertes Design, DSGVO-konform und Wartungspl\u00e4ne ab 40\u20ac/Monat. Jetzt Angebot anfordern!',
  },
  en: {
    title: 'RTD - Professional Web Development',
    description:
      'Professional and ultra-fast websites in Merano. Custom development, GDPR compliance and maintenance plans from \u20ac40/month. Request a free quote!',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = metaByLocale[locale] ?? metaByLocale.it;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        it: `${BASE_URL}/it`,
        de: `${BASE_URL}/de`,
        en: `${BASE_URL}/en`,
      },
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        aria-label="Sezione principale"
      >
        {/* Background decorations handled by BackgroundAnimation globally */}

        <div className="section-container relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 opacity-0 animate-fade-in-up">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-sm text-primary-light font-medium">{dict.hero.badge}</span>
            </div>

            <div className="w-full mb-6 max-w-4xl">
              <VerticalCutReveal
                splitBy="lines"
                staggerDuration={0.08}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 200, damping: 21 }}
                wordLevelClassName="pb-2"
                elementLevelClassName="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary leading-tight tracking-tight relative z-10 drop-shadow-sm"
                dangerouslySetHTML={true}
              >
                {`${dict.hero.title1} ${dict.hero.title2}\n${dict.hero.title3}`}
              </VerticalCutReveal>
            </div>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mb-10 opacity-0 animate-fade-in-up animation-delay-400">
              {dict.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-600">
              <Link href={`/${locale}/contatti`} className="btn-primary text-base">
                {dict.hero.ctaPrimary}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href={`/${locale}/servizi`} className="btn-secondary text-base">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators via StickyTabs */}
      <StickyTabs>
        <StickyTabs.Item title={locale === 'it' ? 'Perché Sceglierci' : locale === 'en' ? 'Why Choose Us' : 'Warum uns wählen'} id="trust">
          <section className="py-16" aria-label="Perché scegliere RTD">
            <div className="section-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { iconSrc: '/icon-veloce.png', title: dict.trust.fast.title, desc: dict.trust.fast.desc, containerClass: 'w-24 h-24' },
                  { iconSrc: '/icon-sicuro.png', title: dict.trust.secure.title, desc: dict.trust.secure.desc, containerClass: 'w-24 h-24' },
                  { iconSrc: '/icon-responsive.png', title: dict.trust.responsive.title, desc: dict.trust.responsive.desc, containerClass: 'w-50 h-24' },
                  { iconSrc: '/icon-trasparente.png', title: dict.trust.transparent.title, desc: dict.trust.transparent.desc, containerClass: 'w-50 h-24' },
                ].map((item, i) => (
                  <div key={i} className="text-center flex flex-col items-center">
                    <div className={`relative ${item.containerClass} mb-4`} aria-hidden="true">
                      <Image src={item.iconSrc} alt={item.title} fill className="object-contain" />
                    </div>
                    <h3 className="font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </StickyTabs.Item>

        <StickyTabs.Item title={dict.pricingPreview.title1} id="pricing">
          {/* Pricing preview */}
          <section className="py-24" aria-label="Servizi e tariffe" id="servizi-preview">
            <div className="section-container">
              <PricingSectionAnimated dict={dict} locale={locale} />

              <div className="text-center mt-12">
                <p className="text-text-muted text-sm mb-6">
                  {dict.pricingPreview.note}
                </p>
                <Link href={`/${locale}/servizi`} className="btn-secondary">
                  {dict.pricingPreview.discoverAll}
                </Link>
              </div>
            </div>
          </section>
        </StickyTabs.Item>

      </StickyTabs>

      {/* Feedback Dedicated Section */}
      <section className="pt-8 pb-20 bg-white rounded-b-[4rem] shadow-xl relative z-10" aria-label="Lascia un feedback">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-text-primary">
            {locale === 'it' ? 'La tua opinione conta' : locale === 'en' ? 'Your opinion matters' : 'Ihre Meinung zählt'}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            {locale === 'it'
              ? 'Aiutaci a migliorare! Lascia una recensione o un suggerimento per rendere il nostro servizio ancora più perfetto per te.'
              : locale === 'en'
                ? 'Help us improve! Leave a review or a suggestion to make our service even more perfect for you.'
                : 'Helfen Sie uns, uns zu verbessern! Hinterlassen Sie eine Bewertung oder einen Vorschlag, um unseren Service für Sie noch perfekter zu machen.'}
          </p>
          <FeedbackDrawer>
            <button className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-base shadow-md shadow-primary/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              {locale === 'it' ? 'Lascia il tuo Feedback' : locale === 'en' ? 'Leave your Feedback' : 'Hinterlassen Sie Ihr Feedback'}
            </button>
          </FeedbackDrawer>
        </div>
      </section>


      <div className="h-24 bg-transparent pointer-events-none" aria-hidden="true" />
      
      <CircularTestimonials />

      {/* CTA Section */}
      <section
        className="py-24 relative overflow-hidden"
        aria-label="Inizia il tuo progetto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {dict.cta.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
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
