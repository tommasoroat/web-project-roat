import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import Chatbot from '@/components/Chatbot';
import { getDictionary } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    <html lang={locale} className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
