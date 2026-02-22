/**
 * RTD Chatbot Knowledge Base — Multilingual
 * Supports: IT, EN, DE
 * 
 * Provides keyword-based Q&A matching for the chatbot.
 */

const knowledgeBases = {
    it: [
        {
            keywords: ['prezzo', 'prezzi', 'costo', 'costi', 'tariff', 'quanto', 'listino', 'pagare', 'spendere', 'budget'],
            response: `Ecco il nostro listino servizi:\n\n• **Consulenza Iniziale** — **Gratuita** (di persona o online)\n• **Sito Vetrina** — da **€400** (chiavi in mano)\n• **Abbonamento** — da **€40/mese** (ritocchi, aggiornamenti + hosting incluso)\n• **Modifiche importanti** — Consulenza + Preventivo ad hoc\n• **Progetti Complessi** — Preventivo personalizzato\n• **Dominio Privato** — €10–€20/anno\n\nVuoi maggiori dettagli su un servizio specifico?`,
        },
        {
            keywords: ['consulenza', 'gratuita', 'gratis', 'analisi', 'incontro', 'parlare', 'appuntamento'],
            response: `La **consulenza iniziale è completamente gratuita**! Può essere fatta **di persona o online**.\n\nDurante la consulenza analizziamo le tue necessità e la fattibilità del progetto. Nessun impegno!\n\nVuoi prenotare una consulenza?`,
        },
        {
            keywords: ['vetrina', 'sito web', 'sito', 'realizzazione', 'creare sito', 'nuovo sito', 'fare un sito'],
            response: `Il **Sito Vetrina** parte da **€400** ed è una realizzazione completa "chiavi in mano".\n\nInclude design professionale, responsive per mobile, ottimizzazione SEO e conformità legale.\n\nPer progetti più complessi o personalizzati, il preventivo viene calcolato ad hoc in base alle tue richieste specifiche.`,
        },
        {
            keywords: ['abbonamento', 'mensile', 'manutenzione', 'aggiornament', 'hosting', 'gestione'],
            response: `L'**Abbonamento** parte da **€40/mese** e include:\n\n• Piccoli ritocchi e aggiornamenti continui\n• **Hosting incluso** nel canone mensile\n• Assistenza tecnica\n\nÈ la soluzione ideale per chi vuole un sito sempre aggiornato senza pensieri!`,
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
            response: `La sicurezza è una priorità! I siti RTD includono:\n\n• **HTTPS** con certificato SSL attivo\n• **Protezione anti-spam** sui form di contatto\n• **Validazione rigorosa** dei dati inseriti\n• Conformità **GDPR** per la protezione dei dati personali\n\nLa tua sicurezza e quella dei tuoi clienti è garantita.`,
        },
        {
            keywords: ['contatt', 'email', 'telefon', 'scrivere', 'raggiungere', 'dove siete'],
            response: `Puoi contattarmi in diversi modi:\n\n• **Email:** info@rtd.it\n• **Form di contatto:** nella sezione Contatti del sito\n• **Consulenza gratuita:** prenotala per un incontro di persona o online\n\nSarò felice di aiutarti!`,
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
    ],
    en: [
        {
            keywords: ['price', 'prices', 'cost', 'costs', 'rate', 'rates', 'how much', 'budget', 'pay', 'spend', 'fee'],
            response: `Here are our service rates:\n\n• **Initial Consultation** — **Free** (in person or online)\n• **Showcase Website** — from **€400** (turnkey)\n• **Subscription** — from **€40/month** (updates + hosting included)\n• **Major Changes** — Consultation + Custom Quote\n• **Complex Projects** — Personalized Quote\n• **Private Domain** — €10–€20/year\n\nWould you like more details about a specific service?`,
        },
        {
            keywords: ['consultation', 'free', 'meeting', 'appointment', 'talk', 'discuss', 'analysis'],
            response: `The **initial consultation is completely free**! It can be done **in person or online**.\n\nDuring the consultation we analyze your needs and the feasibility of the project. No commitment!\n\nWould you like to book a consultation?`,
        },
        {
            keywords: ['website', 'site', 'build', 'create', 'new site', 'web design', 'showcase'],
            response: `The **Showcase Website** starts from **€400** and is a complete "turnkey" solution.\n\nIt includes professional design, mobile responsive layout, SEO optimization, and legal compliance.\n\nFor more complex or customized projects, the quote is calculated based on your specific requirements.`,
        },
        {
            keywords: ['subscription', 'monthly', 'maintenance', 'updates', 'hosting', 'management'],
            response: `The **Subscription** starts from **€40/month** and includes:\n\n• Minor tweaks and continuous updates\n• **Hosting included** in the monthly fee\n• Technical support\n\nIt's the ideal solution for those who want an always up-to-date website without worries!`,
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
            keywords: ['complex', 'custom', 'personalized', 'ecommerce', 'e-commerce', 'application', 'webapp'],
            response: `For **complex projects** and 100% custom websites with extensive customizations, we prepare a **dedicated quote**.\n\nEach project is evaluated individually to offer you the best solution at the fairest price.\n\nLet's discuss it during a free consultation!`,
        },
        {
            keywords: ['security', 'secure', 'https', 'ssl', 'protection', 'data', 'privacy', 'gdpr'],
            response: `Security is a priority! RTD websites include:\n\n• **HTTPS** with active SSL certificate\n• **Anti-spam protection** on contact forms\n• **Rigorous data validation**\n• **GDPR** compliance for personal data protection\n\nYour security and that of your customers is guaranteed.`,
        },
        {
            keywords: ['contact', 'email', 'phone', 'write', 'reach', 'where'],
            response: `You can contact me in several ways:\n\n• **Email:** info@rtd.it\n• **Contact form:** in the Contact section of the website\n• **Free consultation:** book an in-person or online meeting\n\nI'll be happy to help!`,
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
    ],
    de: [
        {
            keywords: ['preis', 'preise', 'kosten', 'tarif', 'tarife', 'wieviel', 'budget', 'zahlen', 'ausgeben', 'gebühr'],
            response: `Hier sind unsere Servicetarife:\n\n• **Erstberatung** — **Kostenlos** (persönlich oder online)\n• **Schaufenster-Website** — ab **€400** (schlüsselfertig)\n• **Abonnement** — ab **€40/Monat** (Updates + Hosting inklusive)\n• **Größere Änderungen** — Beratung + individuelles Angebot\n• **Komplexe Projekte** — Personalisiertes Angebot\n• **Private Domain** — €10–€20/Jahr\n\nMöchten Sie mehr Details zu einem bestimmten Service?`,
        },
        {
            keywords: ['beratung', 'kostenlos', 'gratis', 'analyse', 'treffen', 'gespräch', 'termin'],
            response: `Die **Erstberatung ist komplett kostenlos**! Sie kann **persönlich oder online** durchgeführt werden.\n\nWährend der Beratung analysieren wir Ihre Bedürfnisse und die Machbarkeit des Projekts. Keine Verpflichtung!\n\nMöchten Sie eine Beratung buchen?`,
        },
        {
            keywords: ['webseite', 'website', 'seite', 'erstellen', 'neue seite', 'webdesign', 'schaufenster'],
            response: `Die **Schaufenster-Website** beginnt ab **€400** und ist eine komplette "schlüsselfertige" Lösung.\n\nSie umfasst professionelles Design, mobile-responsive Layout, SEO-Optimierung und rechtliche Konformität.\n\nFür komplexere oder individuellere Projekte wird das Angebot basierend auf Ihren spezifischen Anforderungen berechnet.`,
        },
        {
            keywords: ['abonnement', 'monatlich', 'wartung', 'aktualisierung', 'hosting', 'verwaltung'],
            response: `Das **Abonnement** beginnt ab **€40/Monat** und beinhaltet:\n\n• Kleinere Anpassungen und laufende Updates\n• **Hosting inklusive** in der Monatsgebühr\n• Technischer Support\n\nEs ist die ideale Lösung für alle, die eine stets aktuelle Website ohne Sorgen wollen!`,
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
            keywords: ['komplex', 'custom', 'individuell', 'ecommerce', 'e-commerce', 'anwendung', 'webapp'],
            response: `Für **komplexe Projekte** und 100% individuelle Websites mit umfangreichen Anpassungen erstellen wir ein **spezielles Angebot**.\n\nJedes Projekt wird einzeln bewertet, um Ihnen die beste Lösung zum fairsten Preis zu bieten.\n\nLassen Sie uns darüber in einer kostenlosen Beratung sprechen!`,
        },
        {
            keywords: ['sicherheit', 'sicher', 'https', 'ssl', 'schutz', 'daten', 'datenschutz', 'dsgvo'],
            response: `Sicherheit hat Priorität! RTD-Websites beinhalten:\n\n• **HTTPS** mit aktivem SSL-Zertifikat\n• **Anti-Spam-Schutz** bei Kontaktformularen\n• **Strenge Datenvalidierung**\n• **DSGVO**-Konformität zum Schutz personenbezogener Daten\n\nIhre Sicherheit und die Ihrer Kunden ist gewährleistet.`,
        },
        {
            keywords: ['kontakt', 'email', 'telefon', 'schreiben', 'erreichen', 'wo'],
            response: `Sie können mich auf verschiedene Weisen kontaktieren:\n\n• **E-Mail:** info@rtd.it\n• **Kontaktformular:** im Kontaktbereich der Website\n• **Kostenlose Beratung:** buchen Sie ein persönliches oder Online-Treffen\n\nIch helfe Ihnen gerne!`,
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
        fallback: "Mi dispiace, non ho informazioni specifiche su questo al momento. Per darti un'assistenza precisa, ti invito a contattarmi direttamente: sarò felice di aiutarti!",
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
        fallback: "I'm sorry, I don't have specific information about this right now. For precise assistance, please contact me directly — I'll be happy to help!",
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
        fallback: "Leider habe ich momentan keine spezifischen Informationen dazu. Für eine genaue Unterstützung lade ich Sie ein, mich direkt zu kontaktieren — ich helfe Ihnen gerne!",
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
