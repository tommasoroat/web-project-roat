'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { findAnswer, getFallbackResponse, chatbotStrings } from '@/lib/chatbotKnowledge';

const proactiveMessages = {
    it: 'Posso aiutarti a rispondere a qualche domanda? 😊',
    en: 'Can I help answer any questions? 😊',
    de: 'Kann ich Ihnen bei Fragen helfen? 😊',
};

export default function Chatbot() {
    const pathname = usePathname();
    const locale = pathname?.split('/')[1] || 'it';
    const strings = chatbotStrings[locale] || chatbotStrings.it;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showProactive, setShowProactive] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const prevLocaleRef = useRef(locale);
    const proactiveShownRef = useRef(false);

    // Reset messages when locale changes
    useEffect(() => {
        if (prevLocaleRef.current !== locale) {
            prevLocaleRef.current = locale;
            const newStrings = chatbotStrings[locale] || chatbotStrings.it;
            setMessages([
                {
                    role: 'bot',
                    text: newStrings.welcome,
                    timestamp: new Date(),
                },
            ]);
        }
    }, [locale]);

    // Initial welcome message
    useEffect(() => {
        setMessages([
            {
                role: 'bot',
                text: strings.welcome,
                timestamp: new Date(),
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Proactive popup after 2 minutes
    useEffect(() => {
        if (proactiveShownRef.current) return;
        const timer = setTimeout(() => {
            if (!isOpen && !proactiveShownRef.current) {
                setShowProactive(true);
                proactiveShownRef.current = true;
                // Auto-hide after 10 seconds
                setTimeout(() => setShowProactive(false), 10000);
            }
        }, 120000); // 2 minutes
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen]);

    const sendMessage = async () => {
        const text = inputValue.trim();
        if (!text) return;

        const userMsg = { role: 'user', text, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

        const result = findAnswer(text, locale);
        let botResponse;

        if (result.matched) {
            botResponse = { role: 'bot', text: result.response, timestamp: new Date() };
        } else {
            botResponse = {
                role: 'bot',
                text: getFallbackResponse(locale),
                timestamp: new Date(),
                showContactButton: true,
            };
        }

        setIsTyping(false);
        setMessages(prev => [...prev, botResponse]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToContact = () => {
        setIsOpen(false);
        const contactSection = document.getElementById('modulo-contatti');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = `/${locale}/contatti#modulo-contatti`;
        }
    };

    const renderText = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <>
            {/* Proactive yellow popup */}
            {showProactive && !isOpen && (
                <div className="fixed bottom-24 right-6 z-[9991] animate-fade-in-up" style={{ willChange: 'transform' }}>
                    <div className="relative bg-amber-400 text-surface-900 text-sm font-medium px-4 py-3 rounded-2xl shadow-lg max-w-[250px]" style={{ boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)' }}>
                        {proactiveMessages[locale] || proactiveMessages.it}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowProactive(false); }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-surface-900 text-white rounded-full flex items-center justify-center text-xs hover:bg-surface-700 transition-colors"
                            aria-label="Chiudi"
                        >
                            ✕
                        </button>
                        {/* Arrow pointing down */}
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-amber-400 rotate-45" />
                    </div>
                </div>
            )}

            {/* Chat bubble button */}
            <button
                onClick={() => { setIsOpen(!isOpen); setShowProactive(false); }}
                className={`fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isOpen
                    ? 'bg-surface-700 rotate-0'
                    : 'bg-gradient-to-br from-primary to-primary-dark animate-pulse-glow hover:scale-110'
                    }`}
                style={{ willChange: 'transform' }}
                aria-label={isOpen ? strings.closeLabel : strings.openLabel}
                aria-expanded={isOpen}
                aria-controls="chatbot-window"
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {/* Chat window */}
            <div
                id="chatbot-window"
                role="dialog"
                aria-label={strings.title}
                aria-hidden={!isOpen}
                className={`fixed bottom-24 right-6 z-[9990] w-[360px] max-w-[calc(100vw-3rem)] glass-card rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-4 scale-95'
                    }`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/20 to-accent/10 px-5 py-4 border-b border-primary/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                            RT
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-text-primary">{strings.title}</h2>
                            <p className="text-xs text-text-muted flex items-center gap-1">
                                <span className="w-2 h-2 bg-success rounded-full inline-block"></span>
                                {strings.online}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div
                    className="h-80 overflow-y-auto p-4 space-y-4 scroll-smooth"
                    role="log"
                    aria-live="polite"
                    aria-label="Chat messages"
                >
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-primary text-white rounded-br-md'
                                : 'bg-surface-700 text-text-secondary rounded-bl-md'
                                }`}>
                                <div className="whitespace-pre-line">
                                    {renderText(msg.text)}
                                </div>
                                {msg.showContactButton && (
                                    <button
                                        onClick={scrollToContact}
                                        className="mt-4 w-full btn-primary justify-center text-[15px]"
                                    >
                                        {strings.moreInfo}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex justify-start" aria-label={strings.typingLabel}>
                            <div className="bg-surface-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-primary/10 bg-surface-800">
                    <div className="flex gap-2">
                        <label htmlFor="chatbot-input" className="sr-only">{strings.inputLabel}</label>
                        <input
                            id="chatbot-input"
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={strings.placeholder}
                            className="form-input !py-2.5 !text-sm !rounded-xl flex-1"
                            disabled={isTyping}
                            aria-label={strings.inputLabel}
                            autoComplete="off"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0"
                            aria-label={strings.sendLabel}
                        >
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
