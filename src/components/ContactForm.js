'use client';

import { useState } from 'react';

const serviceOptions = [
    'Informazioni',
    'Consulenza',
    'Preventivo',
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefono: '',
        servizio: '',
        messaggio: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error, rateLimit
    const [serverMessage, setServerMessage] = useState('');

    const validateField = (name, value) => {
        switch (name) {
            case 'nome':
                if (!value.trim()) return 'Il nome è obbligatorio';
                if (value.trim().length < 2) return 'Il nome deve avere almeno 2 caratteri';
                if (value.trim().length > 100) return 'Il nome non può superare i 100 caratteri';
                return '';
            case 'email':
                if (!value.trim()) return 'L\'email è obbligatoria';
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
                    return 'Inserisci un indirizzo email valido';
                return '';
            case 'telefono':
                if (value && !/^[+]?[\d\s()-]{6,20}$/.test(value))
                    return 'Inserisci un numero di telefono valido';
                return '';
            case 'servizio':
                if (!value) return 'Seleziona un servizio';
                return '';
            case 'messaggio':
                if (!value.trim()) return 'Il messaggio è obbligatorio';
                if (value.trim().length < 10) return 'Il messaggio deve avere almeno 10 caratteri';
                if (value.trim().length > 2000) return 'Il messaggio non può superare i 2000 caratteri';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateAll = () => {
        const newErrors = {};
        let isValid = true;
        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(key, value);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateAll()) return;

        setStatus('submitting');
        setServerMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.status === 429) {
                setStatus('rateLimit');
                setServerMessage(data.error || 'Troppe richieste. Riprova tra qualche minuto.');
                return;
            }

            if (!res.ok) {
                setStatus('error');
                setServerMessage(data.error || 'Si è verificato un errore. Riprova più tardi.');
                return;
            }

            setStatus('success');
            setServerMessage(data.message || 'Messaggio inviato con successo!');
            setFormData({ nome: '', email: '', telefono: '', servizio: '', messaggio: '' });
        } catch {
            setStatus('error');
            setServerMessage('Errore di connessione. Controlla la tua connessione internet e riprova.');
        }
    };

    return (
        <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            aria-label="Modulo di contatto"
        >
            {/* Status messages */}
            {status === 'success' && (
                <div
                    className="p-4 bg-success/10 border border-success/20 rounded-xl text-success text-sm flex items-center gap-2"
                    role="alert"
                    aria-live="polite"
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {serverMessage}
                </div>
            )}
            {(status === 'error' || status === 'rateLimit') && (
                <div
                    className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm flex items-center gap-2"
                    role="alert"
                    aria-live="assertive"
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {serverMessage}
                </div>
            )}

            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="contact-nome" className="block text-sm font-medium text-text-primary mb-2">
                        Nome e Cognome <span className="text-error" aria-hidden="true">*</span>
                    </label>
                    <input
                        id="contact-nome"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input"
                        placeholder="Mario Rossi"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.nome}
                        aria-describedby={errors.nome ? 'error-nome' : undefined}
                        maxLength={100}
                    />
                    {errors.nome && (
                        <p id="error-nome" className="mt-1.5 text-error text-xs" role="alert">{errors.nome}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-2">
                        Email <span className="text-error" aria-hidden="true">*</span>
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input"
                        placeholder="mario@esempio.it"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {errors.email && (
                        <p id="error-email" className="mt-1.5 text-error text-xs" role="alert">{errors.email}</p>
                    )}
                </div>
            </div>

            {/* Phone + Service row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="contact-telefono" className="block text-sm font-medium text-text-primary mb-2">
                        Telefono <span className="text-text-muted text-xs">(opzionale)</span>
                    </label>
                    <input
                        id="contact-telefono"
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input"
                        placeholder="+39 XXX XXX XXXX"
                        aria-invalid={!!errors.telefono}
                        aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                    />
                    {errors.telefono && (
                        <p id="error-telefono" className="mt-1.5 text-error text-xs" role="alert">{errors.telefono}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="contact-servizio" className="block text-sm font-medium text-text-primary mb-2">
                        Servizio di interesse <span className="text-error" aria-hidden="true">*</span>
                    </label>
                    <select
                        id="contact-servizio"
                        name="servizio"
                        value={formData.servizio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-input cursor-pointer"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.servizio}
                        aria-describedby={errors.servizio ? 'error-servizio' : undefined}
                    >
                        <option value="">Seleziona un servizio...</option>
                        {serviceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {errors.servizio && (
                        <p id="error-servizio" className="mt-1.5 text-error text-xs" role="alert">{errors.servizio}</p>
                    )}
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-messaggio" className="block text-sm font-medium text-text-primary mb-2">
                    Il tuo messaggio <span className="text-error" aria-hidden="true">*</span>
                </label>
                <textarea
                    id="contact-messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input min-h-[140px] resize-y"
                    placeholder="Descrivi il tuo progetto o la tua richiesta..."
                    required
                    aria-required="true"
                    aria-invalid={!!errors.messaggio}
                    aria-describedby={errors.messaggio ? 'error-messaggio' : undefined}
                    maxLength={2000}
                />
                {errors.messaggio && (
                    <p id="error-messaggio" className="mt-1.5 text-error text-xs" role="alert">{errors.messaggio}</p>
                )}
                <p className="mt-1 text-text-muted text-xs text-right">{formData.messaggio.length}/2000</p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full justify-center text-base"
            >
                {status === 'submitting' ? (
                    <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Invio in corso...
                    </>
                ) : (
                    <>
                        Invia Richiesta
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </button>

            <p className="text-text-muted text-xs text-center mt-2">
                Inviando questo modulo accetti la nostra{' '}
                <a href="/privacy-policy" className="text-primary-light hover:underline">Privacy Policy</a>.
                I tuoi dati saranno trattati in conformità al GDPR.
            </p>
        </form>
    );
}
