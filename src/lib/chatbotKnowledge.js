/**
 * RTD Chatbot Knowledge Base — Multilingual
 * Supports: IT, EN, DE
 * 
 * Provides keyword-based Q&A matching for the chatbot.
 * 
 * Prices aligned with SITO-Roat.md (March 2026):
 * - Consulenza Iniziale: Gratis
 * - Manutenzione Mensile: da €69/mese (Hosting incluso + 2h interventi)
 * - Manutenzione Annuale: da €750/anno (Hosting + SEO Report + 24h/anno)
 * - Solo Hosting: €25/mese
 * - Preventivo: ad hoc
 * - Dominio Privato: €10–€20/anno
 */

const knowledgeBases = {
    it: [
        {
            keywords: ['prezzo', 'prezzi', 'costo', 'costi', 'tariff', 'quanto', 'listino', 'pagare', 'spendere', 'budget'],
            response: `Ecco il nostro listino servizi:\n\n• **Consulenza Iniziale** — **Gratuita** (di persona o online)\n• **Piano Mensile** — **€69/mese** (Hosting incluso + monitoraggio uptime e backup + fino a **2h/mese** di interventi)\n• ⭐ **Piano Annuale** — **€750/anno** (Hosting incluso + report dettagliato + fino a **24h/anno** di assistenza prioritaria)\n• **Solo Hosting** (senza manutenzione) — **€25/mese**\n• **Preventivo Sviluppo** — Personalizzato su richiesta\n• **Dominio Privato** — €10–€20/anno\n\nIl piano **Annuale** è molto vantaggioso, risparmi due mesi e hai un Report SEO trimestrale e Analisi Competence della concorrenza 🚀\n\nVuoi maggiori dettagli su un servizio specifico?`,
        },
        {
            keywords: ['consulenza', 'gratuita', 'gratis', 'analisi', 'incontro', 'parlare', 'appuntamento'],
            response: `La **consulenza iniziale è completamente gratuita**! Può essere fatta **di persona o online**.\n\nDurante la consulenza analizziamo le tue necessità e la fattibilità del progetto. Nessun impegno!\n\nVuoi prenotare una consulenza?`,
        },
        {
            keywords: ['sito', 'sito web', 'realizzazione', 'creare sito', 'nuovo sito', 'fare un sito', 'preventivo', 'personalizzato'],
            response: `Per la **realizzazione del tuo sito web (Sito Vetrina a partire da €650)**, procediamo con una **consulenza gratuita** per capire le tue esigenze, seguita da un **preventivo personalizzato**.\n\nOgni progetto viene valutato singolarmente per offrirti la soluzione migliore al prezzo più giusto.\n\nInclude design professionale, responsive per mobile, ottimizzazione SEO e conformità legale.\n\nContattatami per una consulenza gratuita!`,
        },
        {
            keywords: ['abbonamento', 'mensile', 'manutenzione', 'aggiornament', 'hosting', 'gestione', 'light'],
            response: `La **Manutenzione Mensile** costa **€69/mese** e garantisce sonni tranquilli:\n\n• Fino a **2h al mese** garantite per tue modifiche\n• Backup e Manutenzioni\n• **Hosting di massima prestazione** (SSD incluso)\n\nC'è anche il ⭐ **Piano Consigliato Annuale** da **€750/anno** (più conveniente) che aggiunge Report trimestrali su traffico e visite.\n\nE ricorda, se hai idee o spunti per i tuoi clienti, puoi usare l'apposita scheda di "**Lascia un Feedback**" a fondo pagina sul nostro sito!`,
        },
        {
            keywords: ['pro', 'consigliato', 'report', 'visite', 'statistiche', 'analytics', 'frequenza', 'premium', 'annuale'],
            response: `⭐ Il Piano **Manutenzione Annuale** è la nostra soluzione ammiraglia a **€750/anno**. Oltre a un risparmio netto include:\n\n• Fino a **24 ore annue** sfruttabili senza freni temporali (in un mese ne puoi spendere anche 10).\n• **Report SEO ogni 3 Mesi** con traffico, posizioni su Google e analisi di mercato\n• Update strutturali tempestivi.\n\nUna pacchetto ideale per un sito in vetta! Ti interessa saperne di più?`,
        },
        {
            keywords: ['dominio', '.it', '.com', 'nome sito', 'url', 'indirizzo web'],
            response: `Il **Dominio Privato** costa tra **€10 e €20/anno**.\n\nÈ il nome del tuo esercizio commerciale o brand (es. tuonome.it, tuobrand.com). Il costo è quello vivo di registrazione.\n\nPosso aiutarti a scegliere il dominio perfetto durante la consulenza gratuita!`,
        },
        {
            keywords: ['modific', 'cambiament', 'aggiornare sito', 'già online', 'esistente', 'restyling'],
            response: `Per **modifiche importanti su siti già online**, procediamo con una consulenza seguita da un **preventivo personalizzato**.\n\nIl preventivo viene calcolato ad hoc in base alle richieste specifiche per garantire la massima equità.\n\nContattami per una valutazione gratuita!`,
        },
        {
            keywords: ['complesso', 'custom', 'personalizzat', 'ecommerce', 'e-commerce', 'applicazione', 'webapp', 'complessi'],
            response: `Per **progetti complessi** e siti 100% custom con molte personalizzazioni, prepariamo un **preventivo dedicato**.\n\nOgni progetto viene valutato singolarmente per offrirti la soluzione migliore al prezzo più giusto.\n\nParliamone durante una consulenza gratuita!`,
        },
        {
            keywords: ['sicurezza', 'sicuro', 'https', 'ssl', 'protezione', 'dati', 'privacy', 'gdpr'],
            response: `La sicurezza è una priorità! I siti RTD includono:\n\n• **HTTPS** con certificato SSL attivo\n• **Protezione anti-spam** sui form di contatto\n• **Validazione rigorosa** dei dati inseriti\n• Conformità **GDPR** per la protezione dei dati personali\n• **Google Analytics 4** con Consent Mode v2\n\nLa tua sicurezza e quella dei tuoi clienti è garantita.`,
        },
        {
            keywords: ['contatt', 'email', 'telefon', 'scrivere', 'raggiungere', 'dove siete'],
            response: `Puoi contattarmi in diversi modi:\n\n• **Email:** info@rtd-solutions.eu\n• **Form di contatto:** nella sezione Contatti del sito\n• **Lascia un Feedback:** Usa comodamente il cassetto in fondo alla pagina (Footer) per inviarmi la tua opinione.\n• **Instagram:** @rtd.solutions\n\nSarò felice di aiutarti!`,
        },
        {
            keywords: ['chi sei', 'chi siete', 'about', 'informazione', 'racconta', 'presentati'],
            response: `Sono **Tommaso Roat**, sviluppatore web professionista.\n\nRealizzo siti web professionali, veloci e conformi alle normative vigenti. Dal progetto al lancio, con **trasparenza totale** su costi e servizi.\n\nLa consulenza iniziale è sempre gratuita!`,
        },
        {
            keywords: ['ciao', 'hello', 'buongiorno', 'buonasera', 'salve', 'hey', 'hola'],
            response: `Ciao! Benvenuto su RTD!\n\nSono l'assistente virtuale di Tommaso. Posso aiutarti con informazioni su:\n\n• Servizi e tariffe\n• Consulenza gratuita\n• Realizzazione siti web\n• Domande generali\n\nCome posso aiutarti?`,
        },
        {
            keywords: ['grazie', 'thanks', 'perfetto', 'ottimo', 'gentile'],
            response: `Grazie a te! Se hai altre domande, sono qui per aiutarti.\n\nRicorda che puoi sempre prenotare una **consulenza gratuita** per discutere del tuo progetto!`,
        },
        {
            keywords: ['vacanza', 'chiuso', 'ferie', 'disponibil'],
            response: `Se al momento non sono disponibile, troverai un avviso nella sezione Contatti.\n\nPuoi comunque scrivermi via email a **info@rtd-solutions.eu** e ti risponderò appena possibile!\n\nGrazie per la pazienza 🏖️`,
        },
        {
            keywords: ['instagram', 'social', 'seguire', 'segui'],
            response: `Puoi seguirmi su **Instagram**: @rtd.solutions\n\n👉 https://instagram.com/rtd.solutions\n\nTroverai aggiornamenti sui miei progetti e novità dal mondo web!`,
        },
    ],
    en: [
        {
            keywords: ['price', 'prices', 'cost', 'costs', 'rate', 'rates', 'how much', 'budget', 'pay', 'spend', 'fee'],
            response: `Here are our service rates:\n\n• **Initial Consultation** — **Free** (in person or online)\n• **Monthly Plan** — **€69/month** (Hosting included + 2h requests)\n• ⭐ **Annual Plan** — **€750/year** (Recommended Plan! Huge savings + SEO quarterly reports + 24h pool)\n• **Hosting Only** (no maintenance) — **€25/month**\n• **Custom Quote** — Personalized on request\n• **Private Domain** — €10–€20/year\n\nOur ⭐ **Annual Plan** is our smartest option. It gathers up hours without limits per month!\n\nWould you like more details about a specific service?`,
        },
        {
            keywords: ['consultation', 'free', 'meeting', 'appointment', 'talk', 'discuss', 'analysis'],
            response: `The **initial consultation is completely free**! It can be done **in person or online**.\n\nDuring the consultation we analyze your needs and the feasibility of the project. No commitment!\n\nWould you like to book a consultation?`,
        },
        {
            keywords: ['website', 'site', 'build', 'create', 'new site', 'web design', 'showcase', 'quote', 'custom'],
            response: `For your **website project (Showcase site starting from €650)**, we start with a **free consultation** to understand your needs, followed by a **personalized quote**.\n\nEach project is evaluated individually to offer you the best solution at the fairest price.\n\nIncludes professional design, mobile responsive layout, SEO optimization, and legal compliance.\n\nContact me for a free consultation!`,
        },
        {
            keywords: ['subscription', 'monthly', 'maintenance', 'updates', 'hosting', 'management', 'light'],
            response: `**Monthly Maintenance** is **€69/month** and includes:\n\n• Up to **2 hours/month** of technical support/edits\n• **Premium Solid State Hosting included** \n• Routine secure backups\n\nThere's also the ⭐ **Annual Plan** at **€750/year** which saves you money and includes a quarterly detailed report on your web presence, plus a grand total of 24h of assistance!\n\nAlso, if you'd like to reach me to drop a quick review of your experience, check out the **Feedback Button** at the bottom of our web pages!`,
        },
        {
            keywords: ['pro', 'recommended', 'report', 'monthly', 'visits', 'statistics', 'analytics', 'bounce', 'premium', 'annual', 'yearly'],
            response: `⭐ Our **Annual Maintenance Plan** is our standout **Recommended Plan** at **€750/year**. It includes:\n\n• A pool of 24 hours to spend freely across the year\n• **Detailed Quarterly SEO reports** on site performance and audience\n• **Premium Hosting included**\n\nIt's the ultimate hassle-free solution. Shall we chat?`,
        },
        {
            keywords: ['domain', '.it', '.com', 'site name', 'url', 'web address'],
            response: `A **Private Domain** costs between **€10 and €20/year**.\n\nIt's the name of your business or brand (e.g., yourname.it, yourbrand.com). The cost is the actual registration fee.\n\nI can help you choose the perfect domain during the free consultation!`,
        },
        {
            keywords: ['change', 'modify', 'update site', 'already online', 'existing', 'redesign', 'restyling'],
            response: `For **major changes on existing websites**, we proceed with a consultation followed by a **customized quote**.\n\nThe quote is calculated based on your specific requests to ensure maximum fairness.\n\nContact me for a free evaluation!`,
        },
        {
            keywords: ['complex', 'personalized', 'ecommerce', 'e-commerce', 'application', 'webapp'],
            response: `For **complex projects** and 100% custom websites with extensive customizations, we prepare a **dedicated quote**.\n\nEach project is evaluated individually to offer you the best solution at the fairest price.\n\nLet's discuss it during a free consultation!`,
        },
        {
            keywords: ['security', 'secure', 'https', 'ssl', 'protection', 'data', 'privacy', 'gdpr'],
            response: `Security is a priority! RTD websites include:\n\n• **HTTPS** with active SSL certificate\n• **Anti-spam protection** on contact forms\n• **Rigorous data validation**\n• **GDPR** compliance for personal data protection\n• **Google Analytics 4** with Consent Mode v2\n\nYour security and that of your customers is guaranteed.`,
        },
        {
            keywords: ['contact', 'email', 'phone', 'write', 'reach', 'where'],
            response: `You can contact me in several ways:\n\n• **Email:** info@rtd-solutions.eu\n• **Contact form:** in the Contact section of the website\n• **Instagram:** @rtd.solutions\n• **Free consultation:** book an in-person or online meeting\n\nI'll be happy to help!`,
        },
        {
            keywords: ['who are you', 'about', 'info', 'tell me', 'introduce'],
            response: `I'm **Tommaso Roat**, a professional web developer.\n\nI create professional, fast, and regulation-compliant websites. From project to launch, with **total transparency** on costs and services.\n\nThe initial consultation is always free!`,
        },
        {
            keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings'],
            response: `Hello! Welcome to RTD!\n\nI'm Tommaso's virtual assistant. I can help you with information about:\n\n• Services and rates\n• Free consultation\n• Website creation\n• General questions\n\nHow can I help you?`,
        },
        {
            keywords: ['thank', 'thanks', 'perfect', 'great', 'excellent', 'awesome'],
            response: `Thank you! If you have more questions, I'm here to help.\n\nRemember that you can always book a **free consultation** to discuss your project!`,
        },
        {
            keywords: ['vacation', 'holiday', 'closed', 'available'],
            response: `If I'm currently unavailable, you'll find a notice in the Contact section.\n\nYou can still email me at **info@rtd-solutions.eu** and I'll get back to you as soon as possible!\n\nThank you for your patience 🏖️`,
        },
        {
            keywords: ['instagram', 'social', 'follow'],
            response: `You can follow me on **Instagram**: @rtd.solutions\n\n👉 https://instagram.com/rtd.solutions\n\nYou'll find updates on my projects and news from the web world!`,
        },
    ],
    de: [
        {
            keywords: ['preis', 'preise', 'kosten', 'tarif', 'tarife', 'wieviel', 'budget', 'zahlen', 'ausgeben', 'gebühr'],
            response: `Hier sind unsere Servicetarife:\n\n• **Erstberatung** — **Kostenlos** (persönlich oder online)\n• **Monatlicher Plan** — **€69/Monat** (Hosting + 2 Std. Support)\n• ⭐ **Jahresplan** — **€750/Jahr** (Empfohlener Plan! Sparen Sie Geld + 24 Std. flexibles Guthaben)\n• **Nur Hosting** (ohne Wartung) — **€25/Monat**\n• **Individuelles Angebot** — Auf Anfrage\n• **Private Domain** — €10–€20/Jahr\n\nMöchten Sie mehr Details zu einem bestimmten Service?`,
        },
        {
            keywords: ['beratung', 'kostenlos', 'gratis', 'analyse', 'treffen', 'gespräch', 'termin'],
            response: `Die **Erstberatung ist komplett kostenlos**! Sie kann **persönlich oder online** durchgeführt werden.\n\nWährend der Beratung analysieren wir Ihre Bedürfnisse und die Machbarkeit des Projekts. Keine Verpflichtung!\n\nMöchten Sie eine Beratung buchen?`,
        },
        {
            keywords: ['webseite', 'website', 'seite', 'erstellen', 'neue seite', 'webdesign', 'schaufenster', 'angebot', 'individuell'],
            response: `Für Ihr **Website-Projekt (Showcase-Website ab €650)** beginnen wir mit einer **kostenlosen Beratung** zur Klärung Ihrer Anforderungen, gefolgt von einem **personalisierten Angebot**.\n\nJedes Projekt wird einzeln bewertet, um die beste Lösung zum fairsten Preis zu bieten.\n\nBeinhaltet professionelles Design, mobile-responsive Layout, SEO-Optimierung und rechtliche Konformität.\n\nKontaktieren Sie mich für eine kostenlose Beratung!`,
        },
        {
            keywords: ['abonnement', 'monatlich', 'wartung', 'aktualisierung', 'hosting', 'verwaltung', 'light'],
            response: `**Monatliche Wartung** kostet **€69/Monat** und beinhaltet:\n\n• Bis zu **2 Stunden/Monat** für Updates\n• **Premium Hosting inklusive**\n• Technischer Support und Backups\n\nEs gibt auch den empfehlenswerten ⭐ **Jahresplan** für **€750/Jahr**, der flexibler ist und alle 3 Monate Reports bietet.\n\nÜbrigens: Hinterlassen Sie mir gerne Feedback über den Button im Footer der Seite!`,
        },
        {
            keywords: ['pro', 'empfohlen', 'bericht', 'monatlich', 'besuche', 'statistik', 'analytics', 'absprung', 'premium', 'jahr'],
            response: `⭐ Der **Jahresplan** für **€750/Jahr** ist unsere beste Lösung. Er enthält:\n\n• Einen Pool von 24 Stunden, der dynamisch genutzt werden kann\n• **Alle 3 Monate** ein detaillierter SEO- und Leistungsbericht\n• Premium-Hosting inklusive\n\nEs ist die ideale Lösung für alle, die eine schnelle und verlässliche Site wollen!`,
        },
        {
            keywords: ['domain', '.it', '.com', 'name', 'url', 'webadresse'],
            response: `Eine **Private Domain** kostet zwischen **€10 und €20/Jahr**.\n\nEs ist der Name Ihres Unternehmens oder Ihrer Marke (z.B. ihrname.it, ihremarke.com). Die Kosten entsprechen den tatsächlichen Registrierungsgebühren.\n\nIch kann Ihnen bei der Wahl der perfekten Domain während der kostenlosen Beratung helfen!`,
        },
        {
            keywords: ['änderung', 'ändern', 'aktualisieren', 'online', 'bestehend', 'redesign', 'restyling'],
            response: `Für **größere Änderungen an bestehenden Websites** gehen wir mit einer Beratung und einem **individuellen Angebot** vor.\n\nDas Angebot wird basierend auf Ihren spezifischen Anforderungen berechnet, um maximale Fairness zu gewährleisten.\n\nKontaktieren Sie mich für eine kostenlose Bewertung!`,
        },
        {
            keywords: ['komplex', 'custom', 'ecommerce', 'e-commerce', 'anwendung', 'webapp'],
            response: `Für **komplexe Projekte** und 100% individuelle Websites mit umfangreichen Anpassungen erstellen wir ein **spezielles Angebot**.\n\nJedes Projekt wird einzeln bewertet, um Ihnen die beste Lösung zum fairsten Preis zu bieten.\n\nLassen Sie uns darüber in einer kostenlosen Beratung sprechen!`,
        },
        {
            keywords: ['sicherheit', 'sicher', 'https', 'ssl', 'schutz', 'daten', 'datenschutz', 'dsgvo'],
            response: `Sicherheit hat Priorität! RTD-Websites beinhalten:\n\n• **HTTPS** mit aktivem SSL-Zertifikat\n• **Anti-Spam-Schutz** bei Kontaktformularen\n• **Strenge Datenvalidierung**\n• **DSGVO**-Konformität zum Schutz personenbezogener Daten\n• **Google Analytics 4** mit Consent Mode v2\n\nIhre Sicherheit und die Ihrer Kunden ist gewährleistet.`,
        },
        {
            keywords: ['kontakt', 'email', 'telefon', 'schreiben', 'erreichen', 'wo'],
            response: `Sie können mich auf verschiedene Weisen kontaktieren:\n\n• **E-Mail:** info@rtd-solutions.eu\n• **Kontaktformular:** im Kontaktbereich der Website\n• **Instagram:** @rtd.solutions\n• **Kostenlose Beratung:** buchen Sie ein persönliches oder Online-Treffen\n\nIch helfe Ihnen gerne!`,
        },
        {
            keywords: ['wer bist du', 'über', 'info', 'erzähl', 'vorstellen'],
            response: `Ich bin **Tommaso Roat**, professioneller Webentwickler.\n\nIch erstelle professionelle, schnelle und vorschriftenkonforme Websites. Vom Projekt bis zum Launch, mit **totaler Transparenz** bei Kosten und Services.\n\nDie Erstberatung ist immer kostenlos!`,
        },
        {
            keywords: ['hallo', 'hi', 'hey', 'guten morgen', 'guten abend', 'grüß gott', 'servus', 'moin'],
            response: `Hallo! Willkommen bei RTD!\n\nIch bin der virtuelle Assistent von Tommaso. Ich kann Ihnen helfen mit Informationen zu:\n\n• Services und Tarifen\n• Kostenloser Beratung\n• Website-Erstellung\n• Allgemeinen Fragen\n\nWie kann ich Ihnen helfen?`,
        },
        {
            keywords: ['danke', 'dankeschön', 'perfekt', 'toll', 'super', 'ausgezeichnet'],
            response: `Vielen Dank! Wenn Sie weitere Fragen haben, bin ich hier, um zu helfen.\n\nDenken Sie daran, dass Sie jederzeit eine **kostenlose Beratung** buchen können, um Ihr Projekt zu besprechen!`,
        },
        {
            keywords: ['urlaub', 'ferien', 'geschlossen', 'verfügbar'],
            response: `Wenn ich gerade nicht verfügbar bin, finden Sie einen Hinweis im Kontaktbereich.\n\nSie können mir trotzdem an **info@rtd-solutions.eu** schreiben und ich werde mich so bald wie möglich bei Ihnen melden!\n\nVielen Dank für Ihre Geduld 🏖️`,
        },
        {
            keywords: ['instagram', 'social', 'folgen'],
            response: `Sie können mir auf **Instagram** folgen: @rtd.solutions\n\n👉 https://instagram.com/rtd.solutions\n\nDort finden Sie Updates zu meinen Projekten und Neuigkeiten aus der Webwelt!`,
        },
    ],
};

// UI strings per locale
export const chatbotStrings = {
    it: {
        welcome: "Ciao! Sono l'assistente virtuale di RTD. Come posso aiutarti?",
        placeholder: "Scrivi un messaggio...",
        title: "Assistente RTD",
        online: "Online",
        sendLabel: "Invia messaggio",
        inputLabel: "Messaggio per l'assistente",
        openLabel: "Apri chat assistente",
        closeLabel: "Chiudi chat assistente",
        typingLabel: "L'assistente sta scrivendo",
        moreInfo: "Maggiori informazioni",
        fallback: "Mi dispiace, non ho informazioni specifiche su questo al momento. Per darti un'assistenza precisa, ti invito a contattarmi direttamente a info@rtd-solutions.eu: sarò felice di aiutarti!",
    },
    en: {
        welcome: "Hi! I'm RTD's virtual assistant. How can I help you?",
        placeholder: "Type a message...",
        title: "RTD Assistant",
        online: "Online",
        sendLabel: "Send message",
        inputLabel: "Message for the assistant",
        openLabel: "Open chat assistant",
        closeLabel: "Close chat assistant",
        typingLabel: "The assistant is typing",
        moreInfo: "More information",
        fallback: "I'm sorry, I don't have specific information about this right now. For precise assistance, please email me at info@rtd-solutions.eu — I'll be happy to help!",
    },
    de: {
        welcome: "Hallo! Ich bin der virtuelle Assistent von RTD. Wie kann ich Ihnen helfen?",
        placeholder: "Nachricht schreiben...",
        title: "RTD Assistent",
        online: "Online",
        sendLabel: "Nachricht senden",
        inputLabel: "Nachricht an den Assistenten",
        openLabel: "Chat-Assistent öffnen",
        closeLabel: "Chat-Assistent schließen",
        typingLabel: "Der Assistent schreibt",
        moreInfo: "Mehr Informationen",
        fallback: "Leider habe ich momentan keine spezifischen Informationen dazu. Für eine genaue Unterstützung schreiben Sie mir an info@rtd-solutions.eu — ich helfe Ihnen gerne!",
    },
};

/**
 * Find the best matching response for a user message.
 * Uses keyword overlap scoring with locale-specific knowledge base.
 */
export function findAnswer(message, locale = 'it') {
    if (!message || typeof message !== 'string') {
        return { matched: false, response: '' };
    }

    const normalized = message.toLowerCase().trim();
    if (normalized.length === 0) {
        return { matched: false, response: '' };
    }

    const kb = knowledgeBases[locale] || knowledgeBases.it;

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of kb) {
        let score = 0;
        for (const keyword of entry.keywords) {
            if (normalized.includes(keyword.toLowerCase())) {
                score += keyword.length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    if (bestMatch && bestScore > 0) {
        return { matched: true, response: bestMatch.response };
    }

    return { matched: false, response: '' };
}

/**
 * Get the fallback response when no match is found.
 */
export function getFallbackResponse(locale = 'it') {
    const strings = chatbotStrings[locale] || chatbotStrings.it;
    return strings.fallback;
}
