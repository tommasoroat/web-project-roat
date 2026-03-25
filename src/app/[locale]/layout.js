import Script from 'next/script';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Chatbot from '@/components/Chatbot';
import NeuralBackground from '@/components/ui/neural-background';
import { getDictionary } from '@/lib/i18n';

export const metadata = {
  metadataBase: new URL('https://www.rtd-solutions.eu'),
  title: {
    default: 'RTD — Siti Web Professionali | Tommaso Roat',
    template: '%s | RTD',
  },
  description:
    'Realizzo siti web professionali, veloci e conformi alle normative. Manutenzione da €40/mese, piano Pro consigliato da €55/mese. Consulenza iniziale gratuita.',
  keywords: [
    'siti web',
    'web developer',
    'realizzazione siti',
    'web design',
    'Tommaso Roat',
    'RTD',
    'manutenzione siti web',
    'siti web Merano',
  ],
  authors: [{ name: 'Tommaso Roat' }],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'RTD',
    title: 'RTD — Siti Web Professionali',
    description:
      'Realizzo siti web professionali, veloci e conformi. Consulenza iniziale gratuita. Manutenzione Pro da €55/mese.',
  },
  twitter: {
    card: 'summary',
    title: 'RTD — Siti Web Professionali | Tommaso Roat',
    description:
      'Siti web professionali, veloci e conformi. Consulenza gratuita.',
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
          {locale === 'en' ? 'Skip to main content' : locale === 'de' ? 'Zum Hauptinhalt springen' : 'Vai al contenuto principale'}
        </a>

        <Navbar dict={dict} locale={locale} />

        <main id="main-content" className="flex-1 pt-18" role="main">
          {children}
        </main>

        <Footer dict={dict} locale={locale} />
        <CookieBanner />
        <Chatbot />
        <NeuralBackground className="fixed inset-0 z-[-1] pointer-events-none" />
      </body>
    </html>
  );
}
