'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ dict, locale }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { href: `/${locale}`, label: dict.navigation.home },
        { href: `/${locale}/servizi`, label: dict.navigation.services },
        { href: `/${locale}/contatti`, label: dict.navigation.contact },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKey);
            return () => document.removeEventListener('keydown', handleKey);
        }
    }, [isOpen]);

    // Logo click → admin area (hidden access)
    const handleLogoClick = (e) => {
        e.preventDefault();
        router.push(`/${locale}/admin`);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-surface-900/90 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5'
                : 'bg-transparent'
                }`}
            role="banner"
        >
            <nav
                className="section-container flex items-center justify-between h-18 py-4"
                aria-label="Navigazione principale"
            >
                {/* Logo — clicking navigates to admin */}
                <button
                    onClick={handleLogoClick}
                    className="group bg-transparent border-none p-0 cursor-pointer"
                    aria-label="RTD"
                >
                    <div className="relative w-36 h-12 transition-opacity group-hover:opacity-80">
                        <Image src="/logo.png" alt="RTD Logo" fill className="object-contain object-left" priority />
                    </div>
                </button>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1" role="menubar">
                    {navLinks.map((link) => (
                        <li key={link.href} role="none">
                            <Link
                                href={link.href}
                                role="menuitem"
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? 'text-primary-light bg-primary/10'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
                                    }`}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li role="none" className="ml-2">
                        <LanguageSwitcher currentLocale={locale} />
                    </li>
                    <li role="none" className="ml-2">
                        <Link
                            href={`/${locale}/contatti`}
                            role="menuitem"
                            className="btn-primary text-sm !py-2 !px-5"
                        >
                            {dict.navigation.getQuote}
                        </Link>
                    </li>
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-700 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
                >
                    <span className="sr-only">{isOpen ? 'Chiudi menu' : 'Apri menu'}</span>
                    <div className="w-5 flex flex-col gap-1">
                        <span
                            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                        />
                    </div>
                </button>

                {/* Mobile menu */}
                <div
                    id="mobile-menu"
                    className={`absolute top-full left-0 right-0 bg-surface-800/98 backdrop-blur-xl border-b border-primary/10 md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                        }`}
                    role="menu"
                    aria-hidden={!isOpen}
                >
                    <ul className="section-container py-4 space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.href} role="none">
                                <Link
                                    href={link.href}
                                    role="menuitem"
                                    tabIndex={isOpen ? 0 : -1}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${pathname === link.href
                                        ? 'text-primary-light bg-primary/10'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'
                                        }`}
                                    aria-current={pathname === link.href ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li role="none" className="px-4 py-2 border-b border-primary/10">
                            <LanguageSwitcher currentLocale={locale} />
                        </li>
                        <li role="none" className="pt-2">
                            <Link
                                href={`/${locale}/contatti`}
                                role="menuitem"
                                tabIndex={isOpen ? 0 : -1}
                                className="btn-primary w-full justify-center text-sm"
                            >
                                {dict.navigation.getQuote}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
