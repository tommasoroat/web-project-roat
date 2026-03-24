'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminPage() {
    const params = useParams();
    const locale = params?.locale || 'it';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [token, setToken] = useState('');
    const [vacationMode, setVacationMode] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [togglingVacation, setTogglingVacation] = useState(false);
    const [togglingMaintenance, setTogglingMaintenance] = useState(false);
    const [maintenanceNotice, setMaintenanceNotice] = useState('');

    // Check for existing session
    useEffect(() => {
        const savedToken = sessionStorage.getItem('rtd_admin_token');
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
            fetchVacationStatus(savedToken);
            fetchMaintenanceStatus(savedToken);
        }
    }, []);

    const fetchVacationStatus = async (authToken) => {
        try {
            const res = await fetch('/api/admin/vacation', {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            if (res.ok) {
                const data = await res.json();
                setVacationMode(data.vacationMode);
            }
        } catch {
            // Ignore errors
        }
    };

    const fetchMaintenanceStatus = async (authToken) => {
        try {
            const res = await fetch('/api/admin/maintenance', {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            if (res.ok) {
                const data = await res.json();
                setMaintenanceMode(data.maintenanceMode);
            }
        } catch {
            // Ignore errors
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setLoginError(data.error || 'Credenziali non valide');
                setLoading(false);
                return;
            }

            setToken(data.token);
            sessionStorage.setItem('rtd_admin_token', data.token);
            setIsLoggedIn(true);
            setLoading(false);
            fetchVacationStatus(data.token);
            fetchMaintenanceStatus(data.token);
        } catch {
            setLoginError('Errore di connessione');
            setLoading(false);
        }
    };

    const handleToggleVacation = async () => {
        setTogglingVacation(true);
        try {
            const res = await fetch('/api/admin/vacation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ vacationMode: !vacationMode }),
            });

            if (res.ok) {
                const data = await res.json();
                setVacationMode(data.vacationMode);
            }
        } catch {
            // Ignore
        }
        setTogglingVacation(false);
    };

    const handleToggleMaintenance = async () => {
        setTogglingMaintenance(true);
        setMaintenanceNotice('');
        try {
            const res = await fetch('/api/admin/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ maintenanceMode: !maintenanceMode }),
            });

            if (res.ok) {
                const data = await res.json();
                setMaintenanceMode(data.maintenanceMode);
                setMaintenanceNotice(
                    data.maintenanceMode
                        ? '✅ Manutenzione attivata — i visitatori vedranno la pagina 503'
                        : '✅ Manutenzione disattivata — sito accessibile a tutti'
                );
                setTimeout(() => setMaintenanceNotice(''), 4000);
            } else {
                setMaintenanceNotice('❌ Errore durante l\'aggiornamento');
                setTimeout(() => setMaintenanceNotice(''), 4000);
            }
        } catch {
            setMaintenanceNotice('❌ Errore di connessione');
            setTimeout(() => setMaintenanceNotice(''), 4000);
        }
        setTogglingMaintenance(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('rtd_admin_token');
        // Clear the session cookie
        document.cookie = 'rtd_admin_session=; Path=/; Max-Age=0; SameSite=Lax';
        setIsLoggedIn(false);
        setToken('');
        setUsername('');
        setPassword('');
    };

    if (!isLoggedIn) {
        return (
            <section className="min-h-[70vh] flex items-center justify-center py-20">
                <div className="glass-card p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">
                        Area Riservata
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="admin-user" className="block text-sm font-medium text-text-primary mb-2">
                                Username
                            </label>
                            <input
                                id="admin-user"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                                placeholder="Username"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label htmlFor="admin-pass" className="block text-sm font-medium text-text-primary mb-2">
                                Password
                            </label>
                            <input
                                id="admin-pass"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                placeholder="Password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {loginError && (
                            <p className="text-error text-sm" role="alert">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center"
                        >
                            {loading ? 'Accesso in corso...' : 'Accedi'}
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-[70vh] flex items-center justify-center py-20">
            <div className="glass-card p-8 w-full max-w-lg">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-text-primary">
                        Pannello Admin
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-text-muted hover:text-error transition-colors"
                    >
                        Esci
                    </button>
                </div>

                {/* Fattura Link */}
                <Link href={`/${locale}/admin/fattura`} className="admin-card-link">
                    <h2>📄 Genera Fattura</h2>
                    <p>Compila e scarica fatture in formato PDF</p>
                </Link>

                {/* Maintenance Mode Toggle */}
                <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-text-primary mb-1">
                                🔧 Modalità Manutenzione
                            </h2>
                            <p className="text-text-secondary text-sm">
                                {maintenanceMode
                                    ? 'Attiva — Sito bloccato per i visitatori (503). Solo admin può navigare.'
                                    : 'Disattiva — Sito accessibile a tutti normalmente.'
                                }
                            </p>
                        </div>

                        {/* iOS-style toggle */}
                        <button
                            onClick={handleToggleMaintenance}
                            disabled={togglingMaintenance}
                            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${maintenanceMode ? 'bg-warning' : 'bg-surface-500'
                                } ${togglingMaintenance ? 'opacity-50' : ''}`}
                            role="switch"
                            aria-checked={maintenanceMode}
                            aria-label="Attiva o disattiva modalità manutenzione"
                        >
                            <span
                                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Status notice */}
                    {maintenanceNotice && (
                        <div className="mt-4 p-3 bg-surface-700 rounded-xl text-center">
                            <p className="text-text-primary text-sm font-medium">{maintenanceNotice}</p>
                        </div>
                    )}

                    {/* Preview if maintenance is on */}
                    {maintenanceMode && (
                        <div className="mt-4 p-4 bg-surface-700 rounded-xl text-center">
                            <div className="text-3xl mb-2">🔧</div>
                            <p className="text-text-primary font-semibold">
                                I visitatori vedono: &ldquo;Sito in manutenzione&rdquo;
                            </p>
                            <p className="text-text-secondary text-xs mt-1">
                                HTTP 503 + Retry-After: 3600s
                            </p>
                        </div>
                    )}
                </div>

                {/* Vacation Mode Toggle */}
                <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-text-primary mb-1">
                                🏖️ Modalità Vacanza
                            </h2>
                            <p className="text-text-secondary text-sm">
                                {vacationMode
                                    ? 'Attiva — Il form contatti è sostituito dal messaggio vacanza'
                                    : 'Disattiva — Il form contatti è visibile normalmente'
                                }
                            </p>
                        </div>

                        {/* iOS-style toggle */}
                        <button
                            onClick={handleToggleVacation}
                            disabled={togglingVacation}
                            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${vacationMode ? 'bg-success' : 'bg-surface-500'
                                } ${togglingVacation ? 'opacity-50' : ''}`}
                            role="switch"
                            aria-checked={vacationMode}
                            aria-label="Attiva o disattiva modalità vacanza"
                        >
                            <span
                                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${vacationMode ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Preview if vacation is on */}
                    {vacationMode && (
                        <div className="mt-6 p-4 bg-surface-700 rounded-xl text-center">
                            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src="/sea-holydays.png"
                                    alt="Spiaggia con mare e palme per la modalità vacanza"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <p className="text-text-primary font-semibold text-lg">
                                Siamo in vacanza, torneremo presto a realizzare il vostro sito dei sogni
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
