import { getDictionary } from '@/lib/i18n';

export const metadata = {
    title: 'Privacy Policy',
    description:
        'Informativa sulla privacy di RTD ai sensi del GDPR (Reg. UE 2016/679).',
};

export default async function PrivacyPolicyPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const pp = dict.privacyPolicy || {};

    return (
        <section className="py-24" aria-label="Privacy Policy">
            <div className="section-container max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">
                    <span className="gradient-text">{dict.footer.privacy.split(' ')[0]}</span> {dict.footer.privacy.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-text-muted text-sm mb-12">
                    {pp.lastUpdated || 'Last updated: February 2026'}
                </p>

                <div className="prose prose-invert max-w-none space-y-8 text-text-secondary text-sm leading-relaxed">
                    {/* Section 1 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s1Title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pp.s1Text || '' }} />
                        <p className="mt-2">
                            {pp.s1Email}{' '}
                            <a href="mailto:info@rtd-solutions.eu" className="text-primary-light hover:underline">info@rtd-solutions.eu</a>
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s2Title}</h2>
                        <p>{pp.s2Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(pp.s2Items || []).map((item, i) => (
                                <li key={i}><strong className="text-text-primary">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s3Title}</h2>
                        <p>{pp.s3Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(pp.s3Items || []).map((item, i) => (
                                <li key={i}><strong className="text-text-primary">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s4Title}</h2>
                        <p>{pp.s4Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(pp.s4Items || []).map((item, i) => (
                                <li key={i}><strong className="text-text-primary">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s5Title}</h2>
                        <p>{pp.s5Text1}</p>
                        <p className="mt-2" dangerouslySetInnerHTML={{ __html: pp.s5Text2 || '' }} />
                    </div>

                    {/* Section 6 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s6Title}</h2>
                        <p>{pp.s6Intro}</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {(pp.s6Items || []).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className="mt-3">
                            {pp.s6Contact}{' '}
                            <a href="mailto:info@rtd-solutions.eu" className="text-primary-light hover:underline">info@rtd-solutions.eu</a>
                        </p>
                    </div>

                    {/* Section 7 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s7Title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pp.s7Text || '' }} />
                    </div>

                    {/* Section 8 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s8Title}</h2>
                        <p>{pp.s8Text}</p>
                    </div>

                    {/* Section 9 */}
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-3">{pp.s9Title}</h2>
                        <p>{pp.s9Text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
