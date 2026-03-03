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
    maintenance: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    pro: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20V10" />
            <path d="M18 20V4" />
            <path d="M6 20v-4" />
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
    const pt = dict.pricingTable;

    const services = [
        {
            name: pt.item1.title,
            price: pt.item1.price,
            priceNote: null,
            description: pt.item1.desc,
            icon: icons.consultation,
            highlight: false,
            ctaStyle: 'primary',
            row: 'top',
        },
        {
            name: pt.item2.title,
            price: `${pt.priceFrom} ${pt.item2.price}`,
            priceNote: pt.month,
            description: pt.item2.desc,
            icon: icons.maintenance,
            highlight: false,
            ctaStyle: 'ghost',
            row: 'top',
        },
        {
            name: pt.item3.title,
            price: `${pt.priceFrom} ${pt.item3.price}`,
            priceNote: pt.month,
            description: pt.item3.desc,
            icon: icons.pro,
            highlight: 'recommended',
            ctaStyle: 'primary',
            row: 'top',
        },
        {
            name: pt.item4.title,
            price: pt.item4.price,
            priceNote: null,
            description: pt.item4.desc,
            icon: icons.quote,
            highlight: false,
            ctaStyle: 'ghost',
            row: 'bottom',
        },
        {
            name: pt.item5.title,
            price: pt.item5.price,
            priceNote: pt.year,
            description: pt.item5.desc,
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
                    ${isRecommended
                        ? 'ring-2 ring-amber-400/60 shadow-[0_8px_40px_rgba(245,158,11,0.25)] scale-[1.03] lg:scale-105 z-10'
                        : ''
                    }
                `}
            >
                {/* Recommended Badge — dominant golden badge */}
                {isRecommended && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-bold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {pt.recommendedBadge || 'Consigliato'}
                    </span>
                )}

                {/* Icon */}
                <div className={`mb-3 ${isRecommended ? 'text-amber-500' : 'text-primary'}`}>
                    {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary">{service.name}</h3>

                {/* Price */}
                <div className="mt-3 mb-4">
                    <span className={`text-3xl font-extrabold ${isRecommended ? 'bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent' : 'gradient-text'}`}>
                        {service.price}
                    </span>
                    {service.priceNote && (
                        <span className="text-sm font-medium text-slate-500 ml-1">{service.priceNote}</span>
                    )}
                </div>

                {/* Description — improved contrast */}
                <p className="text-slate-600 text-sm flex-1 leading-relaxed">{service.description}</p>

                {/* CTA — forced to bottom */}
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
            {/* Top row — 3 cards: Consultation, Light, PRO (featured) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {topRow.map(renderCard)}
            </div>

            {/* Bottom row — 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {bottomRow.map(renderCard)}
            </div>
        </motion.div>
    );
}
