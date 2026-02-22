import Link from 'next/link';
import Image from 'next/image';
import PricingTable from '@/components/PricingTable';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import { getDictionary } from '@/lib/i18n';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <BackgroundAnimation />
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

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-in-up animation-delay-200">
              {dict.hero.title1}{' '}
              <span className="gradient-text">{dict.hero.title2}</span>
              <br />
              {dict.hero.title3}
            </h1>

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

      {/* Trust indicators */}
      <section className="py-16 border-y border-surface-600" aria-label="Perché scegliere RTD">
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

      {/* Pricing preview */}
      <section className="py-24" aria-label="Servizi e tariffe" id="servizi-preview">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              {dict.pricingPreview.title1} <span className="gradient-text">{dict.pricingPreview.title2}</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              {dict.pricingPreview.subtitle}
            </p>
          </div>

          <PricingTable dict={dict} locale={locale} />

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

      {/* Reviews */}
      <ReviewsMarquee />

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
