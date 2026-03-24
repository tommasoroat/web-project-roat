'use client';

import { forwardRef } from 'react';

const InvoicePreview = forwardRef(function InvoicePreview({ invoiceData, calculations }, ref) {
    const {
        emittente,
        cliente,
        fattura,
        voci,
        noteLegali,
        ritenutaAcconto,
        rivalsaINPS,
    } = invoiceData;

    const {
        totaliRiga,
        subtotale,
        ivaPerAliquota,
        totaleIVA,
        rivalsaAmount,
        ritenutaAmount,
        totaleDocumento,
    } = calculations;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount || 0);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div ref={ref} className="invoice-preview" id="invoice-preview">
            {/* ── HEADER ─────────────────────────────── */}
            <header className="invoice-header">
                <div className="invoice-emittente">
                    <h2 className="invoice-emittente-name">{emittente.nome || 'Nome Azienda'}</h2>
                    <p>{emittente.indirizzo}</p>
                    <p>P.IVA: {emittente.piva}</p>
                    <p>C.F.: {emittente.cf}</p>
                    {emittente.telefono && <p>Tel: {emittente.telefono}</p>}
                    {emittente.email && <p>Email: {emittente.email}</p>}
                    {emittente.pec && <p>PEC: {emittente.pec}</p>}
                </div>
                <div className="invoice-logo-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="Logo" className="invoice-logo" />
                </div>
            </header>

            {/* ── TITOLO + DATI FATTURA ────────────────── */}
            <div className="invoice-title-bar">
                <h1 className="invoice-title">FATTURA</h1>
                <div className="invoice-meta">
                    <div className="invoice-meta-item">
                        <span className="invoice-meta-label">N°</span>
                        <span className="invoice-meta-value">{fattura.numero || '—'}</span>
                    </div>
                    <div className="invoice-meta-item">
                        <span className="invoice-meta-label">Data</span>
                        <span className="invoice-meta-value">{formatDate(fattura.data)}</span>
                    </div>
                </div>
            </div>

            {/* ── DATI CLIENTE ──────────────────────────── */}
            <div className="invoice-cliente-section">
                <p className="invoice-cliente-label">Spett.le</p>
                <h3 className="invoice-cliente-name">{cliente.ragioneSociale || '—'}</h3>
                <p>{cliente.indirizzo}</p>
                {cliente.piva && <p>P.IVA/C.F.: {cliente.piva}</p>}
                {cliente.sdi && <p>Cod. SDI: {cliente.sdi}</p>}
                {cliente.pec && <p>PEC: {cliente.pec}</p>}
            </div>

            {/* ── TABELLA VOCI ──────────────────────────── */}
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th className="invoice-th-desc">Descrizione</th>
                        <th className="invoice-th-num">Q.tà</th>
                        <th className="invoice-th-num">Prezzo Unit.</th>
                        <th className="invoice-th-num">Sconto %</th>
                        <th className="invoice-th-num">IVA %</th>
                        <th className="invoice-th-num">Imponibile</th>
                    </tr>
                </thead>
                <tbody>
                    {voci.map((voce, index) => (
                        <tr key={index}>
                            <td className="invoice-td-desc">{voce.descrizione || '—'}</td>
                            <td className="invoice-td-num">{voce.quantita || 0}</td>
                            <td className="invoice-td-num">{formatCurrency(voce.costoUnitario)}</td>
                            <td className="invoice-td-num">{voce.sconto || 0}%</td>
                            <td className="invoice-td-num">{voce.aliquotaIVA || 0}%</td>
                            <td className="invoice-td-num">{formatCurrency(totaliRiga[index])}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ── RIEPILOGO ────────────────────────────── */}
            <div className="invoice-summary">
                <div className="invoice-summary-row">
                    <span>Subtotale Imponibile</span>
                    <span>{formatCurrency(subtotale)}</span>
                </div>

                {Object.entries(ivaPerAliquota).map(([aliquota, importo]) => (
                    <div key={aliquota} className="invoice-summary-row">
                        <span>IVA {aliquota}%</span>
                        <span>{formatCurrency(importo)}</span>
                    </div>
                ))}

                {rivalsaINPS && rivalsaAmount > 0 && (
                    <div className="invoice-summary-row">
                        <span>Rivalsa INPS 4%</span>
                        <span>{formatCurrency(rivalsaAmount)}</span>
                    </div>
                )}

                {ritenutaAcconto && ritenutaAmount > 0 && (
                    <div className="invoice-summary-row invoice-summary-negative">
                        <span>Ritenuta d&apos;acconto 20%</span>
                        <span>- {formatCurrency(ritenutaAmount)}</span>
                    </div>
                )}

                <div className="invoice-summary-row invoice-summary-total">
                    <span>TOTALE DOCUMENTO</span>
                    <span>{formatCurrency(totaleDocumento)}</span>
                </div>
            </div>

            {/* ── FOOTER ───────────────────────────────── */}
            <footer className="invoice-footer">
                {/* Dati pagamento */}
                <div className="invoice-pagamento">
                    <h4 className="invoice-pagamento-title">Modalità di Pagamento</h4>
                    <p>Bonifico Bancario</p>
                    {emittente.iban && <p><strong>IBAN:</strong> {emittente.iban}</p>}
                    {emittente.banca && <p><strong>Banca:</strong> {emittente.banca}</p>}
                    <p><strong>Intestatario:</strong> {emittente.nome}</p>
                </div>

                {/* Note legali */}
                {noteLegali && (
                    <div className="invoice-note-legali">
                        <h4 className="invoice-note-title">Note</h4>
                        <p className="invoice-note-text">{noteLegali}</p>
                    </div>
                )}
            </footer>
        </div>
    );
});

export default InvoicePreview;
