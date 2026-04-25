'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { getLocaleFromPathname, getLocalizedHref } from '@/shared/lib/i18n/localizedHref';
import { GlobeIcon } from '@/shared/ui/icons';

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
                <GlobeIcon className={styles.languageDropdownIcon} />

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