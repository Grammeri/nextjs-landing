'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { getLocaleFromPathname, getLocalizedHref } from '@/shared/lib/i18n/localizedHref';

import styles from './Header.module.css';

const LANGUAGES = [
    {
        code: 'en',
        shortLabel: 'EN',
    },
    {
        code: 'ru',
        shortLabel: 'RU',
    },
] as const;

function GlobeIcon() {
    return (
        <svg
            className={styles.languageDropdownIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.35 3.25 5.35 3.25 9S14.2 18.65 12 21M12 3C9.8 5.35 8.75 8.35 8.75 12S9.8 18.65 12 21"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.7"
            />
        </svg>
    );
}

export function LanguageDropdown() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = getLocaleFromPathname(pathname);

    const currentLanguage = useMemo(() => {
        return LANGUAGES.find((language) => language.code === currentLocale) ?? LANGUAGES[0];
    }, [currentLocale]);

    return (
        <div className={styles.languageDropdown}>
            <button
                type="button"
                className={styles.languageDropdownButton}
                aria-label="Select language"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((value) => !value)}
            >
                <GlobeIcon />

                <span className={styles.languageDropdownCurrent}>{currentLanguage.shortLabel}</span>
            </button>

            {isOpen ? (
                <div className={styles.languageDropdownMenu}>
                    <div className={styles.languageDropdownList}>
                        {LANGUAGES.map((language) => {
                            const href = getLocalizedHref(language.code, pathname);
                            const isActive = language.code === currentLocale;

                            return (
                                <Link
                                    key={language.code}
                                    href={href}
                                    className={`${styles.languageDropdownItem} ${isActive ? styles.languageDropdownItemActive : ''
                                        }`}
                                    aria-current={isActive ? 'page' : undefined}
                                    prefetch={false}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {language.shortLabel}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}