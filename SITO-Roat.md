# Progetto: Sito Personale & Listino Tariffe Professionali

Questo documento definisce le linee guida operative, i requisiti legali e il listino prezzi ufficiale per il mio sito web personale.

---

## Listino Servizi & Tariffe (Trasparenza Totale)

Le tariffe sono pensate per offrire flessibilità sia a chi cerca un investimento unico, sia a chi preferisce un canone mensile gestito.

| Servizio | Tariffa Base | Note |
| :--- | :--- | :--- |
| **Consulenza Iniziale(di persona o online)** | **Gratis** | Analisi delle necessità e fattibilità progetto. |
| **Sito Vetrina (Standardizzato)** | **da €400** | Soluzione standard con struttura predefinita. |
| **Abbonamento** | **da €40/mese** | Per mantenere il sito sempre aggiornato, sicuro e funzionante nel tempo. Hosting incluso|
| **Progetti Complessi** | **Preventivo** | Per siti 100% custom e con molte personalizzazioni. |
| **Dominio Privato** | **€10 - €20/anno** | Nome dell'esercizio commerciale o del brand, costo vivo di registrazione (es. .it, .com). |

> **Nota per l'Agente:** Per i "lavori laboriosi", specifica sempre che il preventivo viene calcolato *ad hoc* in base alle richieste specifiche del cliente per garantire la massima equità.

---

## Sicurezza e Protezione Dati

Il sito deve riflettere la mia professionalità anche tecnicamente:
- **HTTPS:** Certificato SSL attivo (essenziale per la fiducia del cliente).
- **Rate Limiting:** Protezione sul form contatti per evitare spam e bot.
- **Validazione:** Controllo rigoroso dei dati inseriti nei moduli di richiesta preventivo.

---

## Conformità Legale & Accessibilità

Essendo un sito professionale con listino prezzi, deve rispettare le normative vigenti:

### 1. D.Lgs. 70/2003 (Trasparenza)
Il footer deve contenere: Ragione Sociale (Tommaso Roat), Sede Legale/Indirizzo che corrisponde a Merano,BZ, **Partita IVA** che momentaneamente non ho, e contatti diretti (Email/PEC), ma ho solo la mail
- **Email Aziendale:** [info@rtd-developing.com]

### 2. GDPR & Cookie (Privacy)
- **Cookie Banner:** Deve bloccare i cookie non necessari fino al consenso.
- **Privacy Policy:** Chiara spiegazione di come tratto i dati dei contatti.

### 3. Accessibilità (WCAG 2.1 AA)
- **Leggibilità:** Contrasto elevato per rendere il listino prezzi leggibile a tutti.
- **Responsive:** Navigazione fluida da smartphone (fondamentale per i clienti in mobilità).
- **Semantica:** Uso di titoli `<h1>`, `<h2>` e `<h3>` per una gerarchia chiara.

---

## 🤖 Contatti e Interazione Smart

Questa sezione definisce il comportamento del Chatbot per il brand RTD:

1. **Logica Chatbot:** Il bot risponde basandosi esclusivamente sui dati di questo file (prezzi e servizi).
2. **Fallback Strategico:** Se l'utente pone una domanda a cui il bot non sa rispondere, deve comparire un messaggio cordiale seguito da un **bottone in stile iPhone**.
3. **Azione Bottone:** Il bottone "Maggiori informazioni" deve attivare uno **smooth scroll** (scorrimento fluido) verso la sezione del modulo contatti (`#modulo-contatti`) per permettere all'utente di compilare la richiesta.

---

## Architettura Operativa

1. **Direttive (`directives/`):** Contengono questo listino e il "tono di voce" del mio brand.
2. **Esecuzione (`execution/`):** Script per l'ottimizzazione delle immagini del portfolio e la verifica periodica dei link esterni.
3. **Design:** Utilizzo di **Next.js + Tailwind CSS** per garantire velocità di caricamento fulminea (fondamentale per il ranking su Google).