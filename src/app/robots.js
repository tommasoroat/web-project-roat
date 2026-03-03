/**
 * Robots.txt — Next.js automatic generation
 * Allows all crawlers and points to the sitemap.
 */

const BASE_URL = 'https://rtd.solutions';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
