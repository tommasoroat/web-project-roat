'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const reviewsData = {
    it: {
        title: 'Cosa dicono i',
        titleHighlight: 'nostri clienti',
        subtitle: 'La soddisfazione dei clienti è la nostra migliore pubblicità.',
        row1: [
            { name: 'Marco Bianchi', role: 'Libero Professionista', text: 'Finalmente un sito che rappresenta davvero la mia attività. Professionalità e velocità impeccabili!', stars: 5 },
            { name: 'Anna Gruber', role: 'Titolare - Panificio Gruber', text: 'Il sito è bellissimo e i clienti lo trovano subito. Servizio eccellente e prezzi onesti.', stars: 5 },
            { name: 'Luca Moretti', role: 'Fotografo', text: 'Velocissimo nella realizzazione e sempre disponibile per qualsiasi modifica. Super consigliato!', stars: 5 },
            { name: 'Elena Fischer', role: 'Titolare - Boutique Elena', text: 'Ha capito esattamente cosa volevo. Il sito è elegante e funzionale, i clienti lo adorano.', stars: 5 },
            { name: 'Giovanni Rossi', role: 'Artigiano', text: 'Rapporto qualità/prezzo imbattibile. Il sito è professionale e si carica in un attimo!', stars: 5 },
            { name: 'Sofia Mair', role: 'Insegnante di Yoga', text: 'Comunicazione chiara e trasparente fin dal primo giorno. Il risultato ha superato le aspettative.', stars: 5 },
            { name: 'Thomas Hofer', role: 'Ristorante Da Thomas', text: 'Ora i clienti prenotano direttamente online. Il sito ha dato una svolta al mio ristorante!', stars: 5 },
            { name: 'Chiara Conti', role: 'Avvocato', text: 'Serio, puntuale e competente. Ha realizzato un sito pulito e conforme alle normative. Top!', stars: 5 },
            { name: 'Karl Pichler', role: 'Falegnameria Pichler', text: 'Non pensavo che un sito potesse portarmi così tanti nuovi clienti. Investimento migliore di sempre.', stars: 5 },
            { name: 'Martina Zanetti', role: 'Wedding Planner', text: 'Il design è stupendo! Ogni coppia che visita il sito rimane colpita. Grazie mille!', stars: 5 },
        ],
        row2: [
            { name: 'Fabio Lombardi', role: 'Personal Trainer', text: 'Sito perfetto per chi cerca qualcosa di professionale senza spendere una fortuna.', stars: 5 },
            { name: 'Lisa Steiner', role: 'B&B Stella Alpina', text: 'Le prenotazioni sono aumentate del 40% da quando abbiamo il nuovo sito. Fantastico!', stars: 5 },
            { name: 'Andrea Pellegrini', role: 'Grafico Freelance', text: 'Collaborazione perfetta. Ha rispettato ogni mia richiesta e il risultato è eccezionale.', stars: 5 },
            { name: 'Maria Unterweger', role: 'Fioraia', text: 'Il sito è come un bouquet: colorato, elegante e profuma di professionalità!', stars: 5 },
            { name: 'Roberto Ferraro', role: 'Consulente Finanziario', text: 'Competenza tecnica impressionante. Il sito è velocissimo e ottimizzato al massimo.', stars: 5 },
            { name: 'Julia Oberhofer', role: 'Parrucchiera', text: 'Le mie clienti mi trovano subito su Google ora. Il sito è semplice da navigare e molto bello.', stars: 5 },
            { name: 'Davide Costa', role: 'Titolare - Pizzeria da Davide', text: 'Mai pensato che un sito potesse fare la differenza. Ora abbiamo ordinazioni anche online!', stars: 5 },
            { name: 'Claudia Rauch', role: 'Architetto', text: 'Design moderno e minimale, esattamente come piace a me. Servizio impeccabile sotto ogni aspetto.', stars: 5 },
            { name: 'Stefano Marini', role: 'Elettricista', text: 'Semplice, diretto e funzionante. Il sito si è fatto da solo praticamente e ora ricevo più chiamate!', stars: 5 },
            { name: 'Valentina Kofler', role: 'Gelateria Dolce Vita', text: 'Il sito è una delizia come i nostri gelati! Bello, veloce e sempre aggiornato. Consigliatissimo.', stars: 5 },
        ],
    },
    en: {
        title: 'What our',
        titleHighlight: 'clients say',
        subtitle: 'Client satisfaction is our best advertisement.',
        row1: [
            { name: 'Marco Bianchi', role: 'Freelancer', text: 'Finally a website that truly represents my business. Impeccable professionalism and speed!', stars: 5 },
            { name: 'Anna Gruber', role: 'Owner - Gruber Bakery', text: 'The site is beautiful and customers find it right away. Excellent service and honest prices.', stars: 5 },
            { name: 'Luca Moretti', role: 'Photographer', text: 'Super fast delivery and always available for any changes. Highly recommended!', stars: 5 },
            { name: 'Elena Fischer', role: 'Owner - Boutique Elena', text: 'He understood exactly what I wanted. The site is elegant and functional, clients love it.', stars: 5 },
            { name: 'Giovanni Rossi', role: 'Craftsman', text: 'Unbeatable value for money. The site is professional and loads in an instant!', stars: 5 },
            { name: 'Sofia Mair', role: 'Yoga Instructor', text: 'Clear and transparent communication from day one. The result exceeded expectations.', stars: 5 },
            { name: 'Thomas Hofer', role: 'Restaurant Da Thomas', text: 'Now customers book directly online. The website gave my restaurant a real boost!', stars: 5 },
            { name: 'Chiara Conti', role: 'Lawyer', text: 'Serious, punctual, and competent. He created a clean, regulation-compliant website. Top!', stars: 5 },
            { name: 'Karl Pichler', role: 'Pichler Carpentry', text: 'I never thought a website could bring me so many new clients. Best investment ever.', stars: 5 },
            { name: 'Martina Zanetti', role: 'Wedding Planner', text: 'The design is stunning! Every couple that visits the site is impressed. Thank you so much!', stars: 5 },
        ],
        row2: [
            { name: 'Fabio Lombardi', role: 'Personal Trainer', text: 'Perfect site for anyone looking for something professional without breaking the bank.', stars: 5 },
            { name: 'Lisa Steiner', role: 'B&B Stella Alpina', text: 'Bookings increased by 40% since we got the new website. Fantastic!', stars: 5 },
            { name: 'Andrea Pellegrini', role: 'Freelance Designer', text: 'Perfect collaboration. He respected every request and the result is exceptional.', stars: 5 },
            { name: 'Maria Unterweger', role: 'Florist', text: 'The website is like a bouquet: colorful, elegant, and it smells of professionalism!', stars: 5 },
            { name: 'Roberto Ferraro', role: 'Financial Consultant', text: 'Impressive technical skills. The site is super fast and optimized to the max.', stars: 5 },
            { name: 'Julia Oberhofer', role: 'Hairdresser', text: 'My clients find me on Google immediately now. The site is easy to navigate and beautiful.', stars: 5 },
            { name: 'Davide Costa', role: 'Owner - Pizzeria da Davide', text: 'Never thought a website could make such a difference. Now we get online orders too!', stars: 5 },
            { name: 'Claudia Rauch', role: 'Architect', text: 'Modern and minimal design, exactly the way I like it. Impeccable service in every way.', stars: 5 },
            { name: 'Stefano Marini', role: 'Electrician', text: 'Simple, straightforward, and it works. The site practically built itself and now I get more calls!', stars: 5 },
            { name: 'Valentina Kofler', role: 'Dolce Vita Ice Cream', text: 'The website is a delight like our gelato! Beautiful, fast, and always up to date. Highly recommended.', stars: 5 },
        ],
    },
    de: {
        title: 'Was unsere',
        titleHighlight: 'Kunden sagen',
        subtitle: 'Die Zufriedenheit unserer Kunden ist unsere beste Werbung.',
        row1: [
            { name: 'Marco Bianchi', role: 'Freiberufler', text: 'Endlich eine Website, die mein Unternehmen wirklich repräsentiert. Tadellose Professionalität und Geschwindigkeit!', stars: 5 },
            { name: 'Anna Gruber', role: 'Inhaberin - Bäckerei Gruber', text: 'Die Seite ist wunderschön und Kunden finden sie sofort. Ausgezeichneter Service und faire Preise.', stars: 5 },
            { name: 'Luca Moretti', role: 'Fotograf', text: 'Blitzschnelle Umsetzung und immer für Änderungen verfügbar. Absolut empfehlenswert!', stars: 5 },
            { name: 'Elena Fischer', role: 'Inhaberin - Boutique Elena', text: 'Er hat genau verstanden, was ich wollte. Die Seite ist elegant und funktional, die Kunden lieben sie.', stars: 5 },
            { name: 'Giovanni Rossi', role: 'Handwerker', text: 'Unschlagbares Preis-Leistungs-Verhältnis. Die Seite ist professionell und lädt blitzschnell!', stars: 5 },
            { name: 'Sofia Mair', role: 'Yogalehrerin', text: 'Klare und transparente Kommunikation vom ersten Tag an. Das Ergebnis hat die Erwartungen übertroffen.', stars: 5 },
            { name: 'Thomas Hofer', role: 'Restaurant Da Thomas', text: 'Jetzt buchen Kunden direkt online. Die Website hat meinem Restaurant einen echten Schub gegeben!', stars: 5 },
            { name: 'Chiara Conti', role: 'Rechtsanwältin', text: 'Seriös, pünktlich und kompetent. Er hat eine saubere, vorschriftenkonforme Website erstellt. Top!', stars: 5 },
            { name: 'Karl Pichler', role: 'Tischlerei Pichler', text: 'Hätte nie gedacht, dass eine Website mir so viele neue Kunden bringt. Beste Investition aller Zeiten.', stars: 5 },
            { name: 'Martina Zanetti', role: 'Hochzeitsplanerin', text: 'Das Design ist atemberaubend! Jedes Paar, das die Seite besucht, ist beeindruckt. Vielen Dank!', stars: 5 },
        ],
        row2: [
            { name: 'Fabio Lombardi', role: 'Personal Trainer', text: 'Perfekte Seite für alle, die etwas Professionelles suchen, ohne ein Vermögen auszugeben.', stars: 5 },
            { name: 'Lisa Steiner', role: 'B&B Stella Alpina', text: 'Die Buchungen sind um 40% gestiegen, seit wir die neue Website haben. Fantastisch!', stars: 5 },
            { name: 'Andrea Pellegrini', role: 'Freier Grafikdesigner', text: 'Perfekte Zusammenarbeit. Jede meiner Anfragen wurde respektiert und das Ergebnis ist außergewöhnlich.', stars: 5 },
            { name: 'Maria Unterweger', role: 'Floristin', text: 'Die Website ist wie ein Blumenstrauß: farbenfroh, elegant und sie duftet nach Professionalität!', stars: 5 },
            { name: 'Roberto Ferraro', role: 'Finanzberater', text: 'Beeindruckende technische Kompetenz. Die Seite ist superschnell und maximal optimiert.', stars: 5 },
            { name: 'Julia Oberhofer', role: 'Friseurin', text: 'Meine Kundinnen finden mich jetzt sofort auf Google. Die Seite ist leicht zu navigieren und sehr schön.', stars: 5 },
            { name: 'Davide Costa', role: 'Inhaber - Pizzeria da Davide', text: 'Hätte nie gedacht, dass eine Website so viel ausmacht. Jetzt haben wir auch Online-Bestellungen!', stars: 5 },
            { name: 'Claudia Rauch', role: 'Architektin', text: 'Modernes und minimales Design, genau so, wie ich es mag. Tadelloser Service in jeder Hinsicht.', stars: 5 },
            { name: 'Stefano Marini', role: 'Elektriker', text: 'Einfach, direkt und funktionierend. Die Seite hat sich praktisch von selbst gebaut und jetzt bekomme ich mehr Anrufe!', stars: 5 },
            { name: 'Valentina Kofler', role: 'Eisdiele Dolce Vita', text: 'Die Website ist so köstlich wie unser Eis! Schön, schnell und immer aktuell. Sehr empfehlenswert.', stars: 5 },
        ],
    },
};

function ReviewCard({ review }) {
    return (
        <div className="flex-shrink-0 w-[320px] glass-card p-5 mx-3">
            <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
            <div>
                <p className="text-text-primary font-semibold text-sm">{review.name}</p>
                <p className="text-text-muted text-xs">{review.role}</p>
            </div>
        </div>
    );
}

function MarqueeRow({ reviews, direction = 'left' }) {
    const rowRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        let animationId;
        let position = direction === 'left' ? 0 : -row.scrollWidth / 2;

        const animate = () => {
            if (direction === 'left') {
                position -= 0.5;
                if (position <= -row.scrollWidth / 2) {
                    position = 0;
                }
            } else {
                position += 0.5;
                if (position >= 0) {
                    position = -row.scrollWidth / 2;
                }
            }
            row.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [direction]);

    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <div className="overflow-hidden">
            <div ref={rowRef} className="flex will-change-transform">
                {duplicatedReviews.map((review, i) => (
                    <ReviewCard key={`${review.name}-${i}`} review={review} />
                ))}
            </div>
        </div>
    );
}

export default function ReviewsMarquee() {
    const pathname = usePathname();
    const locale = pathname?.split('/')[1] || 'it';
    const data = reviewsData[locale] || reviewsData.it;

    return (
        <section className="py-20 overflow-hidden" aria-label="Recensioni dei clienti">
            <div className="section-container mb-12">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                        {data.title} <span className="gradient-text">{data.titleHighlight}</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        {data.subtitle}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <MarqueeRow reviews={data.row1} direction="left" />
                <MarqueeRow reviews={data.row2} direction="right" />
            </div>
        </section>
    );
}
