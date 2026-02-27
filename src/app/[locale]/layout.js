import Script from 'next/script';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Chatbot from '@/components/Chatbot';
import { getDictionary } from '@/lib/i18n';

export const metadata = {
  title: {
    default: 'RTD — Siti Web Professionali | Tommaso Roat',
    template: '%s | RTD',
  },
  description:
    'Realizzo siti web professionali, veloci e conformi alle normative. Sito vetrina da €400, abbonamento da €40/mese. Consulenza iniziale gratuita.',
  keywords: [
    'siti web',
    'web developer',
    'realizzazione siti',
    'sito vetrina',
    'web design',
    'Tommaso Roat',
    'RTD',
  ],
  authors: [{ name: 'Tommaso Roat' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'RTD',
    title: 'RTD — Siti Web Professionali',
    description:
      'Realizzo siti web professionali, veloci e conformi. Consulenza iniziale gratuita.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* Google Analytics 4 — Consent Mode v2 (default: denied) */}
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SZ0EVYF2ER"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SZ0EVYF2ER');
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        {/* Accessibility: Skip to content */}
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>

        <Navbar dict={dict} locale={locale} />

        <main id="main-content" className="flex-1 pt-18" role="main">
          {children}
        </main>

        <Footer dict={dict} locale={locale} />
        <CookieBanner />
        <Chatbot />
      </body>
    </html>
  );
}
