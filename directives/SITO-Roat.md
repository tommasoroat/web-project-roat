# 👤 Progetto: Sito Personale & Listino Tariffe Professionali

Questo documento definisce le linee guida operative, i requisiti legali e il listino prezzi ufficiale per il mio sito web personale.

---

## 💰 Listino Servizi & Tariffe (Trasparenza Totale)

Le tariffe sono pensate per offrire flessibilità sia a chi cerca un investimento unico, sia a chi preferisce un canone mensile gestito.

| Servizio | Tariffa Base | Note |
| :--- | :--- | :--- |
| **Consulenza Iniziale(di persona o online)** | **Gratis** | Analisi delle necessità e fattibilità progetto. |
| **Sito Vetrina (Standardizzato)** | **da €400** | Realizzazione completa "chiavi in mano". |
| **Abbonamento Light** | **da €40/mese** | Per piccoli ritocchi e aggiornamenti, inoltre l'hosting è incluso nel canone mensile. |
| **Abbonamento Pro** | **da €60/mese** | Include tutti i servizi dell'abbonamento light. In + offre un report trimestrale dettagliato sull’andamento e sulle visite del proprio sito. |
|**Modifiche importanti (su sito già online)**| **Consulenza + Preventivo** | Per modifiche importanti su siti già online. |
| **Progetti Complessi** | **Preventivo** | Per siti 100%custom e con molte personalizzazioni. |
| **Dominio Privato** | **€10 - €20/anno** | Nome dell'esercizio commerciale o del brand, costo vivo di registrazione (es. .it, .com). |

> **Nota per l'Agente:** Per i "lavori laboriosi", specifica sempre che il preventivo viene calcolato *ad hoc* in base alle richieste specifiche del cliente per garantire la massima equità.

---

## 🛡️ Sicurezza e Protezione Dati

Il sito deve riflettere la mia professionalità anche tecnicamente:
- **HTTPS:** Certificato SSL attivo (essenziale per la fiducia del cliente).
- **Rate Limiting:** Protezione sul form contatti per evitare spam e bot.
- **Validazione:** Controllo rigoroso dei dati inseriti nei moduli di richiesta preventivo.

---

## ⚖️ Conformità Legale & Accessibilità

Essendo un sito professionale con listino prezzi, deve rispettare le normative vigenti:

### 1. D.Lgs. 70/2003 (Trasparenza)
Il footer deve contenere: Ragione Sociale (Nome Cognome), Sede Legale/Indirizzo, **Partita IVA**, e contatti diretti (Email/PEC).

### 2. GDPR & Cookie (Privacy)
- **Cookie Banner:** Deve bloccare i cookie non necessari fino al consenso.
- **Privacy Policy:** Chiara spiegazione di come tratto i dati dei contatti.

### 3. Accessibilità (WCAG 2.1 AA)
- **Leggibilità:** Contrasto elevato per rendere il listino prezzi leggibile a tutti.
- **Responsive:** Navigazione fluida da smartphone (fondamentale per i clienti in mobilità).
- **Semantica:** Uso di titoli `<h1>`, `<h2>` e `<h3>` per una gerarchia chiara.

---

## 🏗️ Architettura Operativa

1. **Direttive (`directives/`):** Contengono questo listino e il "tono di voce" del mio brand.
2. **Esecuzione (`execution/`):** Script per l'ottimizzazione delle immagini del portfolio e la verifica periodica dei link esterni.
3. **Design:** Utilizzo di **Next.js + Tailwind CSS** per garantire velocità di caricamento fulminea (fondamentale per il ranking su Google).