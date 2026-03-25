'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Wrench, Umbrella, LogOut, Info } from 'lucide-react';

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
                    <h1 className="text-2xl font-bold text-[#0060aa] mb-6 text-center">
                        Area Riservata
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="admin-user" className="block text-sm font-medium text-[#0060aa] mb-2">
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
                            <label htmlFor="admin-pass" className="block text-sm font-medium text-[#0060aa] mb-2">
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
        <section className="min-h-[85vh] flex flex-col items-center justify-start py-16 px-4" style={{ backgroundColor: '#fcfcfd' }}>
            <div className="w-full max-w-sm">
                <div className="flex items-baseline justify-between mb-8 px-2">
                    <h1 className="text-[1.7rem] leading-tight font-extrabold text-[#0060aa] tracking-tight">
                        Pannello Admin
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-[0.9rem] font-medium text-[#0060aa] hover:text-blue-800 transition-colors"
                    >
                        <LogOut className="w-[1.2rem] h-[1.2rem] rotate-180" />
                        Esci
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Fattura Link */}
                    <Link href={`/${locale}/admin/fattura`} className="block w-full bg-white rounded-[24px] p-6 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.06)] border border-gray-100/50 hover:shadow-[0_4px_20px_-3px_rgba(0,0,0,0.09)] transition-all">
                        <div className="flex items-center gap-3 mb-2.5">
                            <FileText className="w-6 h-6 text-[#0060aa]" strokeWidth={2.2} />
                            <h2 className="text-[1.3rem] leading-tight font-extrabold text-[#0060aa] tracking-tight">Genera Fattura</h2>
                        </div>
                        <p className="text-text-secondary font-medium text-[0.95rem]">Compila e scarica fatture in formato PDF</p>
                    </Link>

                    {/* Maintenance Mode Toggle */}
                    <div className="w-full bg-white rounded-[24px] p-6 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.06)] border border-gray-100/50 relative">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 w-4/5 pt-1">
                                <Wrench className="w-5 h-5 text-[#0060aa] shrink-0 mt-[2px]" strokeWidth={2.2} />
                                <h2 className="text-[1.3rem] leading-[1.15] font-extrabold text-[#0060aa] tracking-tight">Modalità<br />Manutenzione</h2>
                            </div>
                            <button
                                onClick={handleToggleMaintenance}
                                disabled={togglingMaintenance}
                                className={`relative inline-flex h-[30px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out shadow-inner ${maintenanceMode ? 'bg-[#ff3b30]' : 'bg-[#e5e5ea]'
                                    } ${togglingMaintenance ? 'opacity-50' : ''}`}
                                role="switch"
                                aria-checked={maintenanceMode}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15)] ring-0 transition-transform duration-200 ease-in-out ${maintenanceMode ? 'translate-x-[20px]' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Speech Bubble */}
                        <div className="mt-5 relative pb-3">
                            <div className="bg-[#eaf5fc] border border-[#cadaef] rounded-[14px] p-3.5 relative z-10 text-[0.95rem]">
                                <div className="flex gap-2">
                                    <Info className="w-[1.2rem] h-[1.2rem] text-[#2884c6] shrink-0 mt-[3px]" strokeWidth={2} />
                                    <div>
                                        <p className="text-[#0060aa] font-medium leading-snug">
                                            {maintenanceMode ? 'Attiva' : 'Disattiva'} — Sito bloccato (503). Solo admin può navigare.
                                        </p>
                                        <p className="text-text-secondary text-[0.85rem] mt-1 font-mono tracking-tight">
                                            HTTP 503 + Retry-After: 3600s
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Inner Tooltip visual arrow */}
                            <div className="w-full flex justify-center mt-[-6px] relative z-20">
                                <div className="w-3.5 h-3.5 bg-[#eaf5fc] border-b border-r border-[#cadaef] transform rotate-45" />
                            </div>

                            <div className="mx-auto w-[90%] bg-[#eaf5fc] border border-[#cadaef] rounded-full px-4 py-1.5 flex items-center justify-center gap-2 relative z-10 mt-[-7px]">
                                <Wrench className="w-3.5 h-3.5 text-[#527d9c]" strokeWidth={2} />
                                <span className="text-[#0060aa] font-medium text-[0.88rem]">I visitatori vedono: "Sito in manutenzione"</span>
                            </div>
                        </div>
                    </div>

                    {/* Vacation Mode Toggle */}
                    <div className="w-full bg-white rounded-[24px] p-6 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.06)] border border-gray-100/50">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Umbrella className="w-[1.3rem] h-[1.3rem] text-[#0060aa]" strokeWidth={2.2} />
                                <h2 className="text-[1.3rem] leading-tight font-extrabold text-[#0060aa] tracking-tight">Modalità Vacanza</h2>
                            </div>
                            <button
                                onClick={handleToggleVacation}
                                disabled={togglingVacation}
                                className={`relative inline-flex h-[30px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out shadow-inner ${vacationMode ? 'bg-[#ff3b30]' : 'bg-[#e5e5ea]'
                                    } ${togglingVacation ? 'opacity-50' : ''}`}
                                role="switch"
                                aria-checked={vacationMode}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15)] ring-0 transition-transform duration-200 ease-in-out ${vacationMode ? 'translate-x-[20px]' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                        <p className="text-text-secondary font-medium text-[0.95rem]">
                            {vacationMode ? 'Attiva — Il form contatti è bloccato e protetto' : 'Disattiva — Il form contatti è visibile normalmente'}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
