'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InvoiceGenerator from '@/components/InvoiceGenerator';

export default function FatturaPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);
    const params = useParams();
    const router = useRouter();
    const locale = params?.locale || 'it';

    useEffect(() => {
        const token = sessionStorage.getItem('rtd_admin_token');
        if (!token) {
            router.push(`/${locale}/admin`);
        } else {
            setIsAuthenticated(true);
        }
        setChecking(false);
    }, [locale, router]);

    if (checking || !isAuthenticated) {
        return (
            <section className="min-h-[70vh] flex items-center justify-center py-20">
                <div className="glass-card p-8 w-full max-w-md text-center">
                    <p className="text-text-primary">Verifica sessione...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="invoice-page-section">
            <div className="invoice-page-header no-print">
                <button
                    onClick={() => router.push(`/${locale}/admin`)}
                    className="invoice-back-btn"
                >
                    ← Torna al Pannello
                </button>
                <h1 className="invoice-page-title">Generatore Fattura</h1>
            </div>
            <InvoiceGenerator />
        </section>
    );
}
