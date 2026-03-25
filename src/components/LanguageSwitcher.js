'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher({ currentLocale }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const locales = ['it', 'de', 'en'];

    // Move to next locale cyclically: IT -> DE -> EN -> IT
    const handleSwitch = () => {
        const currentIndex = locales.indexOf(currentLocale);
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];

        let targetPath = '/';
        if (pathname) {
            const segments = pathname.split('/');
            segments[1] = nextLocale;
            targetPath = segments.join('/');
        } else {
            targetPath = `/${nextLocale}`;
        }
        
        startTransition(() => {
            router.replace(targetPath);
            router.refresh();
        });
    };

    return (
        <button
            onClick={handleSwitch}
            disabled={isPending}
            className={`inline-flex items-center justify-center px-4 py-1.5 min-w-[56px] text-sm font-bold tracking-wider text-text-primary bg-surface-800 border-2 border-primary/40 rounded-full hover:bg-surface-700 hover:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 shadow-sm ${isPending ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
            aria-label={`Current language: ${currentLocale.toUpperCase()}. Click to switch language.`}
        >
            {isPending ? (
                <span className="w-4 h-4 border-2 border-text-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
                currentLocale.toUpperCase()
            )}
        </button>
    );
}
