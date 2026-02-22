'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LanguageSwitcher({ currentLocale }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const locales = [
        { code: 'it', label: 'IT' },
        { code: 'de', label: 'DE' },
        { code: 'en', label: 'EN' }
    ];

    // Helper to replace the locale in the current path
    const redirectedPathName = (locale) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale; // Replace the locale (which is always at index 1 due to our middleware)
        return segments.join('/');
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full px-3 py-1.5 text-sm font-medium text-text-primary bg-surface-800 border border-primary/20 rounded-md hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    id="language-menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    {locales.find((l) => l.code === currentLocale)?.label || 'IT'}
                    <svg
                        className="-mr-1 ml-1 h-5 w-5 text-text-secondary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-surface-800 border border-primary/20 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {locales.map((locale) => (
                            <Link
                                href={redirectedPathName(locale.code)}
                                key={locale.code}
                                className={`block px-4 py-2 text-sm hover:bg-surface-700 hover:text-primary-light transition-colors ${currentLocale === locale.code ? 'text-primary-light font-bold' : 'text-text-primary'
                                    }`}
                                role="menuitem"
                                tabIndex="-1"
                                onClick={() => setIsOpen(false)}
                            >
                                {locale.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
