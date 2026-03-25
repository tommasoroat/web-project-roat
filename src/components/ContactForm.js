'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm({ locale = 'it', dict = {} }) {
    const t = dict.contactForm || {};
    const v = t.validation || {};

    const serviceOptions = t.serviceOptions || ['Informazioni', 'Consulenza', 'Preventivo'];

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefono: '',
        servizio: '',
        messaggio: '',
    });
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error, rateLimit
    const [serverMessage, setServerMessage] = useState('');

    const validateField = (name, value) => {
        switch (name) {
            case 'nome':
                if (!value.trim()) return v.nameRequired || 'Name is required';
                if (value.trim().length < 2) return v.nameMinLength || 'Name must be at least 2 characters';
                if (value.trim().length > 100) return v.nameMaxLength || 'Name cannot exceed 100 characters';
                return '';
            case 'email':
                if (!value.trim()) return v.emailRequired || 'Email is required';
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
                    return v.emailInvalid || 'Please enter a valid email address';
                return '';
            case 'telefono':
                if (value && !/^[+]?[\d\s()-]{6,20}$/.test(value))
                    return v.phoneInvalid || 'Please enter a valid phone number';
                return '';
            case 'servizio':
                if (!value) return v.serviceRequired || 'Please select a service';
                return '';
            case 'messaggio':
                if (!value.trim()) return v.messageRequired || 'Message is required';
                if (value.trim().length < 10) return v.messageMinLength || 'Message must be at least 10 characters';
                if (value.trim().length > 2000) return v.messageMaxLength || 'Message cannot exceed 2000 characters';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!privacyCheck) {
            newErrors.privacy_check = v.privacyRequired || 'You must accept the Privacy Policy to proceed';
            isValid = false;
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
                body: JSON.stringify({ ...formData, privacy_check: privacyCheck }),
            });

            const data = await res.json();

            if (res.status === 429) {
                setStatus('rateLimit');
                setServerMessage(data.error || t.rateLimitMessage || 'Too many requests. Please try again in a few minutes.');
                return;
            }

            if (!res.ok) {
                setStatus('error');
                setServerMessage(data.error || t.errorMessage || 'An error occurred. Please try again later.');
                return;
            }

            setStatus('success');
            setServerMessage(data.message || t.successMessage || 'Message sent successfully!');
            setFormData({ nome: '', email: '', telefono: '', servizio: '', messaggio: '' });
            setPrivacyCheck(false);
        } catch {
            setStatus('error');
            setServerMessage(t.connectionError || 'Connection error. Check your internet connection and try again.');
        }
    };

    const isSubmitDisabled = status === 'submitting' || !privacyCheck;

    return (
        <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            aria-label={t.title || 'Contact form'}
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
                    <Label htmlFor="contact-nome" className="mb-2 block">
                        {t.nameLabel || 'Full Name'} <span className="text-error" aria-hidden="true">*</span>
                    </Label>
                    <Input
                        id="contact-nome"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t.namePlaceholder || 'Mario Rossi'}
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
                    <Label htmlFor="contact-email" className="mb-2 block">
                        {t.emailLabel || 'Email'} <span className="text-error" aria-hidden="true">*</span>
                    </Label>
                    <Input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t.emailPlaceholder || 'mario@esempio.it'}
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
                    <Label htmlFor="contact-telefono" className="mb-2 block">
                        {t.phoneLabel || 'Phone'} <span className="text-text-muted text-xs">{t.phoneOptional || '(optional)'}</span>
                    </Label>
                    <Input
                        id="contact-telefono"
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t.phonePlaceholder || '+39 XXX XXX XXXX'}
                        aria-invalid={!!errors.telefono}
                        aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                    />
                    {errors.telefono && (
                        <p id="error-telefono" className="mt-1.5 text-error text-xs" role="alert">{errors.telefono}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="contact-servizio" className="mb-2 block">
                        {t.serviceLabel || 'Service of interest'} <span className="text-error" aria-hidden="true">*</span>
                    </Label>
                    <select
                        id="contact-servizio"
                        name="servizio"
                        value={formData.servizio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="flex h-11 w-full rounded-lg border border-surface-600 bg-white/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.servizio}
                        aria-describedby={errors.servizio ? 'error-servizio' : undefined}
                    >
                        <option value="">{t.servicePlaceholder || 'Select a service...'}</option>
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
                <Label htmlFor="contact-messaggio" className="mb-2 block">
                    {t.messageLabel || 'Your message'} <span className="text-error" aria-hidden="true">*</span>
                </Label>
                <Textarea
                    id="contact-messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t.messagePlaceholder || 'Describe your project or request...'}
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

            {/* Privacy Checkbox — GDPR Compliance */}
            <div className="flex items-start gap-3">
                <input
                    id="privacy_check"
                    type="checkbox"
                    checked={privacyCheck}
                    onChange={(e) => {
                        setPrivacyCheck(e.target.checked);
                        if (errors.privacy_check) {
                            setErrors(prev => ({ ...prev, privacy_check: '' }));
                        }
                    }}
                    className="mt-1 w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/50 cursor-pointer accent-primary"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.privacy_check}
                    aria-describedby={errors.privacy_check ? 'error-privacy' : 'privacy-desc'}
                />
                <label htmlFor="privacy_check" className="text-text-secondary text-sm cursor-pointer leading-relaxed" id="privacy-desc">
                    {t.privacyText || 'I accept the processing of personal data according to the'}{' '}
                    <Link href={`/${locale}/privacy-policy`} className="text-primary-light hover:underline" target="_blank" rel="noopener noreferrer">
                        {t.privacyLinkText || 'Privacy Policy'}
                    </Link>.
                    <span className="text-error ml-1" aria-hidden="true">*</span>
                </label>
            </div>
            {errors.privacy_check && (
                <p id="error-privacy" className="text-error text-xs -mt-3" role="alert">{errors.privacy_check}</p>
            )}

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full text-base"
                size="lg"
            >
                {status === 'submitting' ? (
                    <>
                        <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.submittingButton || 'Sending...'}
                    </>
                ) : (
                    <>
                        {t.submitButton || 'Send Request'}
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </Button>

            <p className="text-text-muted text-xs text-center mt-2">
                {t.gdprDisclaimer || 'Your data will be processed in compliance with GDPR (EU Reg. 2016/679).'}
            </p>
        </form>
    );
}
