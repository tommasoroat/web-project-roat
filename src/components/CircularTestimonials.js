'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// ─── Multilingual testimonial data ───────────────────────────────────────────
const reviewsData = {
    it: {
        sectionTitle: 'Cosa dicono i',
        sectionTitleHighlight: 'nostri clienti',
        sectionSubtitle: 'La soddisfazione dei clienti è la nostra migliore pubblicità.',
        testimonials: [
            { name: 'Marco Bianchi', designation: 'Libero Professionista', quote: 'Finalmente un sito che rappresenta davvero la mia attività. Professionalità e velocità impeccabili!' },
            { name: 'Anna Gruber', designation: 'Titolare - Panificio Gruber', quote: 'Il sito è bellissimo e i clienti lo trovano subito. Servizio eccellente e prezzi onesti.' },
            { name: 'Luca Moretti', designation: 'Fotografo', quote: 'Velocissimo nella realizzazione e sempre disponibile per qualsiasi modifica. Super consigliato!' },
            { name: 'Elena Fischer', designation: 'Titolare - Boutique Elena', quote: 'Ha capito esattamente cosa volevo. Il sito è elegante e funzionale, i clienti lo adorano.' },
            { name: 'Giovanni Rossi', designation: 'Artigiano', quote: 'Rapporto qualità/prezzo imbattibile. Il sito è professionale e si carica in un attimo!' },
            { name: 'Sofia Mair', designation: 'Insegnante di Yoga', quote: 'Comunicazione chiara e trasparente fin dal primo giorno. Il risultato ha superato le aspettative.' },
            { name: 'Thomas Hofer', designation: 'Ristorante Da Thomas', quote: 'Ora i clienti prenotano direttamente online. Il sito ha dato una svolta al mio ristorante!' },
            { name: 'Chiara Conti', designation: 'Avvocato', quote: 'Serio, puntuale e competente. Ha realizzato un sito pulito e conforme alle normative. Top!' },
            { name: 'Karl Pichler', designation: 'Falegnameria Pichler', quote: 'Non pensavo che un sito potesse portarmi così tanti nuovi clienti. Investimento migliore di sempre.' },
            { name: 'Martina Zanetti', designation: 'Wedding Planner', quote: 'Il design è stupendo! Ogni coppia che visita il sito rimane colpita. Grazie mille!' },
            { name: 'Fabio Lombardi', designation: 'Personal Trainer', quote: 'Sito perfetto per chi cerca qualcosa di professionale senza spendere una fortuna.' },
            { name: 'Lisa Steiner', designation: 'B&B Stella Alpina', quote: 'Le prenotazioni sono aumentate del 40% da quando abbiamo il nuovo sito. Fantastico!' },
        ],
    },
    en: {
        sectionTitle: 'What our',
        sectionTitleHighlight: 'clients say',
        sectionSubtitle: 'Client satisfaction is our best advertisement.',
        testimonials: [
            { name: 'Marco Bianchi', designation: 'Freelancer', quote: 'Finally a website that truly represents my business. Impeccable professionalism and speed!' },
            { name: 'Anna Gruber', designation: 'Owner - Gruber Bakery', quote: 'The site is beautiful and customers find it right away. Excellent service and honest prices.' },
            { name: 'Luca Moretti', designation: 'Photographer', quote: 'Super fast delivery and always available for any changes. Highly recommended!' },
            { name: 'Elena Fischer', designation: 'Owner - Boutique Elena', quote: 'He understood exactly what I wanted. The site is elegant and functional, clients love it.' },
            { name: 'Giovanni Rossi', designation: 'Craftsman', quote: 'Unbeatable value for money. The site is professional and loads in an instant!' },
            { name: 'Sofia Mair', designation: 'Yoga Instructor', quote: 'Clear and transparent communication from day one. The result exceeded expectations.' },
            { name: 'Thomas Hofer', designation: 'Restaurant Da Thomas', quote: 'Now customers book directly online. The website gave my restaurant a real boost!' },
            { name: 'Chiara Conti', designation: 'Lawyer', quote: 'Serious, punctual, and competent. He created a clean, regulation-compliant website. Top!' },
            { name: 'Karl Pichler', designation: 'Pichler Carpentry', quote: 'I never thought a website could bring me so many new clients. Best investment ever.' },
            { name: 'Martina Zanetti', designation: 'Wedding Planner', quote: 'The design is stunning! Every couple that visits the site is impressed. Thank you so much!' },
            { name: 'Fabio Lombardi', designation: 'Personal Trainer', quote: 'Perfect site for anyone looking for something professional without breaking the bank.' },
            { name: 'Lisa Steiner', designation: 'B&B Stella Alpina', quote: 'Bookings increased by 40% since we got the new website. Fantastic!' },
        ],
    },
    de: {
        sectionTitle: 'Was unsere',
        sectionTitleHighlight: 'Kunden sagen',
        sectionSubtitle: 'Die Zufriedenheit unserer Kunden ist unsere beste Werbung.',
        testimonials: [
            { name: 'Marco Bianchi', designation: 'Freiberufler', quote: 'Endlich eine Website, die mein Unternehmen wirklich repräsentiert. Tadellose Professionalität und Geschwindigkeit!' },
            { name: 'Anna Gruber', designation: 'Inhaberin - Bäckerei Gruber', quote: 'Die Seite ist wunderschön und Kunden finden sie sofort. Ausgezeichneter Service und faire Preise.' },
            { name: 'Luca Moretti', designation: 'Fotograf', quote: 'Blitzschnelle Umsetzung und immer für Änderungen verfügbar. Absolut empfehlenswert!' },
            { name: 'Elena Fischer', designation: 'Inhaberin - Boutique Elena', quote: 'Er hat genau verstanden, was ich wollte. Die Seite ist elegant und funktional, die Kunden lieben sie.' },
            { name: 'Giovanni Rossi', designation: 'Handwerker', quote: 'Unschlagbares Preis-Leistungs-Verhältnis. Die Seite ist professionell und lädt blitzschnell!' },
            { name: 'Sofia Mair', designation: 'Yogalehrerin', quote: 'Klare und transparente Kommunikation vom ersten Tag an. Das Ergebnis hat die Erwartungen übertroffen.' },
            { name: 'Thomas Hofer', designation: 'Restaurant Da Thomas', quote: 'Jetzt buchen Kunden direkt online. Die Website hat meinem Restaurant einen echten Schub gegeben!' },
            { name: 'Chiara Conti', designation: 'Rechtsanwältin', quote: 'Seriös, pünktlich und kompetent. Er hat eine saubere, vorschriftenkonforme Website erstellt. Top!' },
            { name: 'Karl Pichler', designation: 'Tischlerei Pichler', quote: 'Hätte nie gedacht, dass eine Website mir so viele neue Kunden bringt. Beste Investition aller Zeiten.' },
            { name: 'Martina Zanetti', designation: 'Hochzeitsplanerin', quote: 'Das Design ist atemberaubend! Jedes Paar, das die Seite besucht, ist beeindruckt. Vielen Dank!' },
            { name: 'Fabio Lombardi', designation: 'Personal Trainer', quote: 'Perfekte Seite für alle, die etwas Professionelles suchen, ohne ein Vermögen auszugeben.' },
            { name: 'Lisa Steiner', designation: 'B&B Stella Alpina', quote: 'Die Buchungen sind um 40% gestiegen, seit wir die neue Website haben. Fantastisch!' },
        ],
    },
};

// ─── Color palettes for avatar generation (consistent per name) ──────────────
const avatarGradients = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#fccb90', '#d57eeb'],
    ['#e0c3fc', '#8ec5fc'],
    ['#f5576c', '#ff9a9e'],
    ['#667eea', '#43e97b'],
    ['#fbc2eb', '#a6c1ee'],
    ['#fdcbf1', '#e6dee9'],
];

function getInitials(name) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function hashName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

// ─── Avatar component ─────────────────────────────────────────────────────────
function AvatarPlaceholder({ name, size = 280 }) {
    const idx = hashName(name) % avatarGradients.length;
    const [c1, c2] = avatarGradients[idx];
    const initials = getInitials(name);
    const gradientId = `grad-${name.replace(/\s/g, '')}`;

    return (
        <svg width={size} height={size} viewBox="0 0 280 280" style={{ borderRadius: '1.5rem', width: '100%', height: '100%' }}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={c1} />
                    <stop offset="100%" stopColor={c2} />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" rx="24" fill={`url(#${gradientId})`} />
            <text
                x="140"
                y="150"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="80"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
                style={{ userSelect: 'none' }}
            >
                {initials}
            </text>
            {/* No decorative ring */}
        </svg>
    );
}

// ─── Gap calculation (from reference) ─────────────────────────────────────────
function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// ─── Arrow icons (inline SVG) ─────────────────────────────────────────────────
function ArrowLeft({ size = 20, color = '#f1f1f7' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    );
}

function ArrowRight({ size = 20, color = '#f1f1f7' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count = 5, size = 16 }) {
    return (
        <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#fbbf24">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CircularTestimonials({ autoplay = true }) {
    const pathname = usePathname();
    const locale = pathname?.split('/')[1] || 'it';
    const data = reviewsData[locale] || reviewsData.it;
    const testimonials = data.testimonials;

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);
    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials]
    );

    // Colors — matching the light azzurro theme
    const colorName = '#082f49';
    const colorDesignation = '#0c4a6e';
    const colorTestimony = '#0c4a6e';
    const colorArrowBg = 'rgba(255,255,255,0.6)';
    const colorArrowFg = '#082f49';
    const colorArrowHoverBg = '#0284c7';

    // Responsive
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    // Keyboard
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, testimonialsLength]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    // Compute transforms
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
        const isRight = (activeIndex + 1) % testimonialsLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: 'auto',
                transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
                transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: 'auto',
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: 'auto',
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: 'none',
            transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
        };
    }

    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <section className="ct-section bg-white rounded-[4rem] relative z-10 mx-4 sm:mx-8 lg:mx-auto max-w-7xl" aria-label="Recensioni dei clienti" id="reviews">
            {/* Section header */}
            <div className="ct-section-header">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    {data.sectionTitle}{' '}
                    <span className="gradient-text">{data.sectionTitleHighlight}</span>
                </h2>
                <p className="ct-section-subtitle">
                    {data.sectionSubtitle}
                </p>
            </div>

            {/* Circular Testimonials Widget */}
            <div className="ct-container">
                <div className="ct-grid">
                    {/* Image Stack */}
                    <div className="ct-image-container" ref={imageContainerRef}>
                        {testimonials.map((testimonial, index) => {
                            const isActive = index === activeIndex;
                            const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
                            const isRight = (activeIndex + 1) % testimonialsLength === index;

                            if (!isActive && !isLeft && !isRight) return null;

                            return (
                                <div
                                    key={testimonial.name}
                                    className="ct-image-card bg-transparent"
                                    data-index={index}
                                    style={{ ...getImageStyle(index), background: 'transparent' }}
                                >
                                    {testimonial.image ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '1.5rem', overflow: 'hidden' }}>
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, 300px"
                                            />
                                        </div>
                                    ) : (
                                        <AvatarPlaceholder name={testimonial.name} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="ct-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                variants={quoteVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <Stars count={5} />
                                <h3
                                    className="ct-name"
                                    style={{ color: colorName }}
                                >
                                    {activeTestimonial.name}
                                </h3>
                                <p
                                    className="ct-designation"
                                    style={{ color: colorDesignation }}
                                >
                                    {activeTestimonial.designation}
                                </p>
                                <motion.p
                                    className="ct-quote"
                                    style={{ color: colorTestimony }}
                                >
                                    {activeTestimonial.quote.split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                                            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * i }}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="ct-nav">
                            {/* Dots */}
                            <div className="ct-dots">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`ct-dot ${i === activeIndex ? 'ct-dot--active' : ''}`}
                                        onClick={() => {
                                            setActiveIndex(i);
                                            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
                                        }}
                                        aria-label={`Go to review ${i + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Arrows */}
                            <div className="ct-arrows">
                                <button
                                    className="ct-arrow"
                                    onClick={handlePrev}
                                    style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
                                    onMouseEnter={() => setHoverPrev(true)}
                                    onMouseLeave={() => setHoverPrev(false)}
                                    aria-label="Previous testimonial"
                                >
                                    <ArrowLeft size={20} color={colorArrowFg} />
                                </button>
                                <button
                                    className="ct-arrow"
                                    onClick={handleNext}
                                    style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
                                    onMouseEnter={() => setHoverNext(true)}
                                    onMouseLeave={() => setHoverNext(false)}
                                    aria-label="Next testimonial"
                                >
                                    <ArrowRight size={20} color={colorArrowFg} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
