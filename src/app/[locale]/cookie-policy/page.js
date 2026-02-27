import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Cookie Policy',
    description: 'Informativa sui cookie utilizzati dal sito RTD ai sensi del GDPR e della Direttiva ePrivacy.',
};

export default async function CookiePolicyPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const cp = dict.cookiePolicy || {};

    return (
        <section className="py-24" aria-label="Cookie Policy">
            <div className="section-container max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">
                    <span className="gradient-text">{dict.footer.cookie.split(' ')[0]}</span> {dict.footer.cookie.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-text-muted text-sm mb-12">
                    {cp.lastUpdated || 'Last updated: February 2026'}
                </p>

                <div className="prose prose-invert max-w-none space-y-8 text-text-secondary text-sm leading-relaxed">
                    {/* Section 1 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s1Title}</h2>
                        <p>{cp.s1Text}</p>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s2Title}</h2>

                        <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">{cp.s2_1Title}</h3>
                        <p>{cp.s2_1Text}</p>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full text-left text-xs" role="table" aria-label="Technical cookies">
                                <thead>
                                    <tr className="border-b border-surface-600">
                                        {(cp.s2_1TableHeaders || ['Cookie', 'Purpose', 'Duration']).map((h, i) => (
                                            <th key={i} className="py-2 px-3 text-text-primary font-semibold" scope="col">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-surface-700">
                                        {(cp.s2_1TableRow || ['rtd_cookie_consent', 'Stores cookie preferences', '12 months']).map((cell, i) => (
                                            <td key={i} className={`py-2 px-3 ${i === 0 ? 'font-mono' : ''}`}>{cell}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">{cp.s2_2Title}</h3>
                        <p>{cp.s2_2Text}</p>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">{cp.s2_3Title}</h3>
                        <p>{cp.s2_3Text}</p>

                        <h3 className="text-lg font-semibold text-text-primary mt-6 mb-2">{cp.s2_4Title}</h3>
                        <p>{cp.s2_4Text}</p>
                    </div>

                    {/* Section 3 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s3Title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: cp.s3Text1 || '' }} />
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(cp.s3Items || []).map((item, i) => (
                                <li key={i}><strong className="text-text-primary">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                        <p className="mt-3" dangerouslySetInnerHTML={{ __html: cp.s3Text2 || '' }} />
                        <p className="mt-3">{cp.s3Text3}</p>
                    </div>

                    {/* Section 4 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s4Title}</h2>
                        <p>{cp.s4Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(cp.s4Browsers || []).map((item, i) => (
                                <li key={i}><strong className="text-text-primary">{item.name}</strong> {item.path}</li>
                            ))}
                        </ul>
                        <p className="mt-3 text-text-muted text-xs">{cp.s4Note}</p>
                    </div>

                    {/* Section 5 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s5Title}</h2>
                        <p>{cp.s5Text}</p>
                    </div>

                    {/* Section 6 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s6Title}</h2>
                        <p>{cp.s6Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(cp.s6Items || []).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 7 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{cp.s7Title}</h2>
                        <p>
                            {cp.s7Text}{' '}
                            <a href="mailto:rtd.devlab@gmail.com" className="text-primary-light hover:underline">rtd.devlab@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
