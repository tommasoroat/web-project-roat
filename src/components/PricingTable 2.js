"use client";

import { motion } from 'framer-motion';

/* ── SVG Icons ── */
const icons = {
    consultation: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
    ),
    website: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </svg>
    ),
    maintenance: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    quote: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
    ),
    domain: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
};

export default function PricingTable({ dict, locale }) {
    const badgeLabels = {
        popular: { it: 'Più richiesto', en: 'Most Popular', de: 'Beliebteste' },
        recommended: { it: 'Consigliato', en: 'Recommended', de: 'Empfohlen' },
    };

    const services = [
        {
            name: dict.pricingTable.item1.title,
            price: dict.pricingTable.item1.price,
            priceNote: null,
            description: dict.pricingTable.item1.desc,
            icon: icons.consultation,
            highlight: false,
            ctaStyle: 'primary',
            row: 'top',
        },
        {
            name: dict.pricingTable.item2.title,
            price: `${dict.pricingTable.priceFrom} ${dict.pricingTable.item2.price}`,
            priceNote: dict.pricingTable.month,
            description: dict.pricingTable.item2.desc,
            icon: icons.website,
            highlight: 'popular',
            ctaStyle: 'primary',
            row: 'top',
        },
        {
            name: dict.pricingTable.item3.title,
            price: `${dict.pricingTable.priceFrom} ${dict.pricingTable.item3.price}`,
            priceNote: dict.pricingTable.month,
            description: dict.pricingTable.item3.desc,
            icon: icons.maintenance,
            highlight: 'recommended',
            ctaStyle: 'ghost',
            row: 'top',
        },
        {
            // ✅ Era item7 (non esisteva) → corretto in item4
            name: dict.pricingTable.item4.title,
            price: dict.pricingTable.item4.price,
            priceNote: null,
            description: dict.pricingTable.item4.desc,
            icon: icons.quote,
            highlight: false,
            ctaStyle: 'ghost',
            row: 'bottom',
        },
        {
            // ✅ Era item5 con icon webapp → ora con icon domain (corretto)
            name: dict.pricingTable.item5.title,
            price: `${dict.pricingTable.item5.price}`,
            priceNote: dict.pricingTable.year,
            description: dict.pricingTable.item5.desc,
            icon: icons.domain,
            highlight: false,
            ctaStyle: 'ghost',
            row: 'bottom',
        },
    ];

    const topRow = services.filter(s => s.row === 'top');
    const bottomRow = services.filter(s => s.row === 'bottom');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    };

    const renderCard = (service) => {
        const isPopular = service.highlight === 'popular';
        const isRecommended = service.highlight === 'recommended';
        const isPrimary = service.ctaStyle === 'primary';
        const isFree = ['Gratis', 'Free', 'Kostenlos'].includes(service.price);

        return (
            <motion.article
                key={service.name}
                role="listitem"
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`
                    glass-card p-7 flex flex-col relative cursor-pointer
                    ${isPopular ? 'ring-2 ring-primary/50 shadow-[0_8px_40px_rgba(2,132,199,0.25)]' : ''}
                    ${isRecommended ? 'ring-1 ring-primary/20' : ''}
                `}
            >
                {/* Badges */}
                {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        {badgeLabels.popular[locale] || badgeLabels.popular.it}
                    </span>
                )}
                {isRecommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                        {badgeLabels.recommended[locale] || badgeLabels.recommended.it}
                    </span>
                )}

                {/* Icon */}
                <div className="text-primary mb-3">
                    {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary">{service.name}</h3>

                {/* Price */}
                <div className="mt-3 mb-4">
                    <span className="text-3xl font-extrabold gradient-text">{service.price}</span>
                    {service.priceNote && (
                        <span className="text-sm font-medium text-slate-500 ml-1">{service.priceNote}</span>
                    )}
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm flex-1 leading-relaxed">{service.description}</p>

                {/* CTA */}
                <a
                    href={`/${locale}/contatti`}
                    className={`text-sm mt-6 justify-center w-full text-center ${isPrimary
                        ? 'btn-primary'
                        : 'inline-flex items-center gap-2 py-3 px-6 rounded-full border border-primary/40 text-primary-dark font-semibold bg-transparent hover:bg-primary/5 hover:border-primary/60 transition-all duration-300 cursor-pointer'
                        }`}
                >
                    {isFree
                        ? dict.cta.button
                        : dict.navigation.getQuote}
                </a>
            </motion.article>
        );
    };

    return (
        <motion.div
            role="list"
            aria-label="Listino servizi e tariffe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
        >
            {/* Top row — 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topRow.map(renderCard)}
            </div>

            {/* Bottom row — 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {bottomRow.map(renderCard)}
            </div>
        </motion.div>
    );
}
