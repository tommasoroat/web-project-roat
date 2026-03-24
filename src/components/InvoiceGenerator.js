'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import InvoicePreview from './InvoicePreview';

const EMPTY_VOCE = {
    descrizione: '',
    quantita: 1,
    costoUnitario: 0,
    sconto: 0,
    aliquotaIVA: 22,
};

const DEFAULT_EMITTENTE = {
    nome: 'RTD Solutions',
    indirizzo: 'Via Example 123, 38100 Trento (TN)',
    piva: '00000000000',
    cf: 'XXXXXXXXXXXXXXXX',
    telefono: '',
    email: 'info@rtd-solutions.eu',
    pec: '',
    iban: 'IT00 X000 0000 0000 0000 0000 000',
    banca: '',
};

const DEFAULT_NOTE = `Operazione effettuata ai sensi dell'art. 1, commi da 54 a 89, della Legge n. 190/2014 — Regime forfettario.
Imposta di bollo da € 2,00 assolta sull'originale per importi superiori a € 77,47 (D.M. 17/06/2014).
Il compenso non è soggetto a ritenuta d'acconto ai sensi dell'art. 1, comma 67, L. 190/2014.`;

export default function InvoiceGenerator() {
    /* ── State ──────────────────────────────────── */
    const [emittente, setEmittente] = useState(DEFAULT_EMITTENTE);
    const [cliente, setCliente] = useState({
        ragioneSociale: '',
        piva: '',
        indirizzo: '',
        sdi: '',
        pec: '',
    });
    const [fattura, setFattura] = useState({
        numero: '',
        data: new Date().toISOString().split('T')[0],
    });
    const [voci, setVoci] = useState([{ ...EMPTY_VOCE }]);
    const [ritenutaAcconto, setRitenutaAcconto] = useState(false);
    const [rivalsaINPS, setRivalsaINPS] = useState(false);
    const [noteLegali, setNoteLegali] = useState(DEFAULT_NOTE);
    const [showPreview, setShowPreview] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const previewRef = useRef(null);

    /* ── Calcoli real-time ──────────────────────── */
    const calculations = useMemo(() => {
        const totaliRiga = voci.map((v) => {
            const base = (parseFloat(v.quantita) || 0) * (parseFloat(v.costoUnitario) || 0);
            const scontoPerc = parseFloat(v.sconto) || 0;
            return base * (1 - scontoPerc / 100);
        });

        const subtotale = totaliRiga.reduce((sum, t) => sum + t, 0);

        // IVA raggruppata per aliquota
        const ivaPerAliquota = {};
        voci.forEach((v, i) => {
            const aliquota = parseFloat(v.aliquotaIVA) || 0;
            const key = aliquota.toString();
            if (!ivaPerAliquota[key]) ivaPerAliquota[key] = 0;
            ivaPerAliquota[key] += totaliRiga[i] * (aliquota / 100);
        });

        const totaleIVA = Object.values(ivaPerAliquota).reduce((s, v) => s + v, 0);
        const rivalsaAmount = rivalsaINPS ? subtotale * 0.04 : 0;
        const ritenutaAmount = ritenutaAcconto ? subtotale * 0.20 : 0;
        const totaleDocumento = subtotale + totaleIVA + rivalsaAmount - ritenutaAmount;

        return {
            totaliRiga,
            subtotale,
            ivaPerAliquota,
            totaleIVA,
            rivalsaAmount,
            ritenutaAmount,
            totaleDocumento,
        };
    }, [voci, ritenutaAcconto, rivalsaINPS]);

    /* ── Handlers voci ─────────────────────────── */
    const addVoce = useCallback(() => {
        setVoci((prev) => [...prev, { ...EMPTY_VOCE }]);
    }, []);

    const removeVoce = useCallback((index) => {
        setVoci((prev) => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
    }, []);

    const updateVoce = useCallback((index, field, value) => {
        setVoci((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    /* ── PDF Generation ────────────────────────── */
    const handleGeneratePDF = useCallback(async () => {
        if (!previewRef.current) return;
        setIsGenerating(true);

        try {
            const html2pdf = (await import('html2pdf.js')).default;

            const clienteName = cliente.ragioneSociale
                ? cliente.ragioneSociale.replace(/[^a-zA-Z0-9]/g, '_')
                : 'Cliente';
            const fileName = `Fattura_${fattura.numero || '0'}_${clienteName}.pdf`;

            const opt = {
                margin: 0,
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            };

            await html2pdf().set(opt).from(previewRef.current).save();
        } catch (error) {
            console.error('Errore generazione PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    }, [cliente.ragioneSociale, fattura.numero]);

    /* ── Format ─────────────────────────────────── */
    const formatCurrency = (amount) =>
        new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount || 0);

    const invoiceData = { emittente, cliente, fattura, voci, noteLegali, ritenutaAcconto, rivalsaINPS };

    /* ── Render ─────────────────────────────────── */
    return (
        <div className="invoice-generator">
            {/* ══════════════ FORM PANEL ══════════════ */}
            <div className="invoice-form-panel no-print">
                <h2 className="invoice-form-title">📄 Compila Fattura</h2>

                {/* ── Dati Emittente ─── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Dati Emittente</legend>
                    <div className="invoice-grid-2">
                        <div className="invoice-field">
                            <label htmlFor="emit-nome">Ragione Sociale</label>
                            <input id="emit-nome" type="text" className="form-input"
                                value={emittente.nome}
                                onChange={(e) => setEmittente({ ...emittente, nome: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-piva">P.IVA</label>
                            <input id="emit-piva" type="text" className="form-input"
                                value={emittente.piva}
                                onChange={(e) => setEmittente({ ...emittente, piva: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-cf">Codice Fiscale</label>
                            <input id="emit-cf" type="text" className="form-input"
                                value={emittente.cf}
                                onChange={(e) => setEmittente({ ...emittente, cf: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-indirizzo">Indirizzo</label>
                            <input id="emit-indirizzo" type="text" className="form-input"
                                value={emittente.indirizzo}
                                onChange={(e) => setEmittente({ ...emittente, indirizzo: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-email">Email</label>
                            <input id="emit-email" type="email" className="form-input"
                                value={emittente.email}
                                onChange={(e) => setEmittente({ ...emittente, email: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-pec">PEC</label>
                            <input id="emit-pec" type="email" className="form-input"
                                value={emittente.pec}
                                onChange={(e) => setEmittente({ ...emittente, pec: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-telefono">Telefono</label>
                            <input id="emit-telefono" type="text" className="form-input"
                                value={emittente.telefono}
                                onChange={(e) => setEmittente({ ...emittente, telefono: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-iban">IBAN</label>
                            <input id="emit-iban" type="text" className="form-input"
                                value={emittente.iban}
                                onChange={(e) => setEmittente({ ...emittente, iban: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="emit-banca">Banca</label>
                            <input id="emit-banca" type="text" className="form-input"
                                value={emittente.banca}
                                onChange={(e) => setEmittente({ ...emittente, banca: e.target.value })} />
                        </div>
                    </div>
                </fieldset>

                {/* ── Dati Cliente ──── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Dati Cliente</legend>
                    <div className="invoice-grid-2">
                        <div className="invoice-field">
                            <label htmlFor="cli-ragione">Ragione Sociale</label>
                            <input id="cli-ragione" type="text" className="form-input"
                                value={cliente.ragioneSociale}
                                onChange={(e) => setCliente({ ...cliente, ragioneSociale: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="cli-piva">P.IVA / C.F.</label>
                            <input id="cli-piva" type="text" className="form-input"
                                value={cliente.piva}
                                onChange={(e) => setCliente({ ...cliente, piva: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="cli-indirizzo">Indirizzo</label>
                            <input id="cli-indirizzo" type="text" className="form-input"
                                value={cliente.indirizzo}
                                onChange={(e) => setCliente({ ...cliente, indirizzo: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="cli-sdi">Codice SDI</label>
                            <input id="cli-sdi" type="text" className="form-input" maxLength={7}
                                value={cliente.sdi}
                                onChange={(e) => setCliente({ ...cliente, sdi: e.target.value })} />
                        </div>
                        <div className="invoice-field invoice-field-full">
                            <label htmlFor="cli-pec">PEC</label>
                            <input id="cli-pec" type="email" className="form-input"
                                value={cliente.pec}
                                onChange={(e) => setCliente({ ...cliente, pec: e.target.value })} />
                        </div>
                    </div>
                </fieldset>

                {/* ── Dati Fattura ──── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Dati Fattura</legend>
                    <div className="invoice-grid-2">
                        <div className="invoice-field">
                            <label htmlFor="fat-numero">Numero Fattura</label>
                            <input id="fat-numero" type="text" className="form-input"
                                placeholder="es. 001/2026"
                                value={fattura.numero}
                                onChange={(e) => setFattura({ ...fattura, numero: e.target.value })} />
                        </div>
                        <div className="invoice-field">
                            <label htmlFor="fat-data">Data Emissione</label>
                            <input id="fat-data" type="date" className="form-input"
                                value={fattura.data}
                                onChange={(e) => setFattura({ ...fattura, data: e.target.value })} />
                        </div>
                    </div>
                </fieldset>

                {/* ── Voci di Fatturazione ── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Voci di Fatturazione</legend>

                    {voci.map((voce, index) => (
                        <div key={index} className="invoice-voce-card">
                            <div className="invoice-voce-header">
                                <span className="invoice-voce-number">Voce {index + 1}</span>
                                {voci.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVoce(index)}
                                        className="invoice-voce-remove"
                                        aria-label={`Rimuovi voce ${index + 1}`}
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>

                            <div className="invoice-field invoice-field-full">
                                <label htmlFor={`voce-desc-${index}`}>Descrizione</label>
                                <input id={`voce-desc-${index}`} type="text" className="form-input"
                                    placeholder="Descrizione servizio/prodotto"
                                    value={voce.descrizione}
                                    onChange={(e) => updateVoce(index, 'descrizione', e.target.value)} />
                            </div>

                            <div className="invoice-voce-numbers">
                                <div className="invoice-field">
                                    <label htmlFor={`voce-qty-${index}`}>Q.tà / Ore</label>
                                    <input id={`voce-qty-${index}`} type="number" className="form-input"
                                        min="0" step="0.5"
                                        value={voce.quantita}
                                        onChange={(e) => updateVoce(index, 'quantita', e.target.value)} />
                                </div>
                                <div className="invoice-field">
                                    <label htmlFor={`voce-price-${index}`}>Costo Unit. (€)</label>
                                    <input id={`voce-price-${index}`} type="number" className="form-input"
                                        min="0" step="0.01"
                                        value={voce.costoUnitario}
                                        onChange={(e) => updateVoce(index, 'costoUnitario', e.target.value)} />
                                </div>
                                <div className="invoice-field">
                                    <label htmlFor={`voce-sconto-${index}`}>Sconto %</label>
                                    <input id={`voce-sconto-${index}`} type="number" className="form-input"
                                        min="0" max="100" step="1"
                                        value={voce.sconto}
                                        onChange={(e) => updateVoce(index, 'sconto', e.target.value)} />
                                </div>
                                <div className="invoice-field">
                                    <label htmlFor={`voce-iva-${index}`}>Aliquota IVA %</label>
                                    <input id={`voce-iva-${index}`} type="number" className="form-input"
                                        min="0" max="100" step="1"
                                        value={voce.aliquotaIVA}
                                        onChange={(e) => updateVoce(index, 'aliquotaIVA', e.target.value)} />
                                </div>
                            </div>

                            <div className="invoice-voce-total">
                                Totale riga: <strong>{formatCurrency(calculations.totaliRiga[index])}</strong>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={addVoce} className="invoice-add-voce">
                        ➕ Aggiungi Voce
                    </button>
                </fieldset>

                {/* ── Opzioni ──────── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Opzioni Fiscali</legend>
                    <div className="invoice-checkbox-group">
                        <label className="invoice-checkbox-label">
                            <input
                                type="checkbox"
                                checked={rivalsaINPS}
                                onChange={(e) => setRivalsaINPS(e.target.checked)}
                            />
                            <span>Rivalsa INPS 4%</span>
                        </label>
                        <label className="invoice-checkbox-label">
                            <input
                                type="checkbox"
                                checked={ritenutaAcconto}
                                onChange={(e) => setRitenutaAcconto(e.target.checked)}
                            />
                            <span>Ritenuta d&apos;acconto 20%</span>
                        </label>
                    </div>
                </fieldset>

                {/* ── Riepilogo Real-time ── */}
                <div className="invoice-realtime-summary">
                    <div className="invoice-summary-line">
                        <span>Subtotale</span>
                        <span>{formatCurrency(calculations.subtotale)}</span>
                    </div>
                    {Object.entries(calculations.ivaPerAliquota).map(([aliq, imp]) => (
                        <div key={aliq} className="invoice-summary-line">
                            <span>IVA {aliq}%</span>
                            <span>{formatCurrency(imp)}</span>
                        </div>
                    ))}
                    {rivalsaINPS && (
                        <div className="invoice-summary-line">
                            <span>Rivalsa INPS 4%</span>
                            <span>{formatCurrency(calculations.rivalsaAmount)}</span>
                        </div>
                    )}
                    {ritenutaAcconto && (
                        <div className="invoice-summary-line invoice-summary-line-negative">
                            <span>Ritenuta d&apos;acconto 20%</span>
                            <span>- {formatCurrency(calculations.ritenutaAmount)}</span>
                        </div>
                    )}
                    <div className="invoice-summary-line invoice-summary-line-total">
                        <span>TOTALE</span>
                        <span>{formatCurrency(calculations.totaleDocumento)}</span>
                    </div>
                </div>

                {/* ── Note Legali ───── */}
                <fieldset className="invoice-fieldset">
                    <legend className="invoice-legend">Note Legali</legend>
                    <textarea
                        id="note-legali"
                        className="form-input invoice-textarea"
                        rows={5}
                        value={noteLegali}
                        onChange={(e) => setNoteLegali(e.target.value)}
                    />
                </fieldset>

                {/* ── Actions ────────── */}
                <div className="invoice-actions">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="btn-secondary"
                    >
                        {showPreview ? '🙈 Nascondi Anteprima' : '👁️ Mostra Anteprima'}
                    </button>
                    <button
                        type="button"
                        onClick={handleGeneratePDF}
                        disabled={isGenerating}
                        className="btn-primary"
                    >
                        {isGenerating ? '⏳ Generazione in corso...' : '📥 Genera e Scarica PDF'}
                    </button>
                </div>
            </div>

            {/* ══════════════ PREVIEW PANEL ══════════════ */}
            <div className={`invoice-preview-panel ${showPreview ? 'invoice-preview-visible' : ''}`}>
                <InvoicePreview
                    ref={previewRef}
                    invoiceData={invoiceData}
                    calculations={calculations}
                />
            </div>
        </div>
    );
}
