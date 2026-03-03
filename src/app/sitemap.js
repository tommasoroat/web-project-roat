/**
 * Sitemap.js — Next.js automatic XML sitemap generation
 * Generates sitemap entries for all locale-specific pages.
 */

const BASE_URL = 'https://rtd.solutions';

const locales = ['it', 'en', 'de'];
const pages = ['', '/servizi', '/contatti', '/privacy-policy', '/cookie-policy'];

export default function sitemap() {
    const entries = [];

    for (const locale of locales) {
        for (const page of pages) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : page === '/servizi' ? 0.9 : 0.7,
            });
        }
    }

    return entries;
}
