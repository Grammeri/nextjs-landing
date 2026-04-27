import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/shared/config/i18n';

export { DEFAULT_LOCALE, SUPPORTED_LOCALES };
export type { Locale };

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

function isExternalHref(href: string) {
    return (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
    );
}

function splitHref(href: string) {
    const match = href.match(/^([^?#]*)([?#].*)?$/);

    return {
        pathname: match?.[1] || '/',
        suffix: match?.[2] || '',
    };
}

function normalizePathname(pathname: string) {
    if (!pathname) {
        return '/';
    }

    return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function isSupportedLocale(value: string | undefined): value is Locale {
    return Boolean(value && LOCALE_SET.has(value));
}

export function getLocaleFromPathname(pathname: string): Locale {
    const firstSegment = pathname.split('/')[1];

    if (isSupportedLocale(firstSegment)) {
        return firstSegment;
    }

    return DEFAULT_LOCALE;
}

export function stripLocaleFromPathname(pathname: string): string {
    const normalizedPathname = normalizePathname(pathname);
    const segments = normalizedPathname.split('/');
    const firstSegment = segments[1];

    if (!isSupportedLocale(firstSegment)) {
        return normalizedPathname;
    }

    const pathWithoutLocale = `/${segments.slice(2).join('/')}`;

    return pathWithoutLocale === '/' ? '/' : pathWithoutLocale.replace(/\/$/, '');
}

export function getLocalizedHref(locale: Locale, href: string) {
    if (isExternalHref(href)) {
        return href;
    }

    const { pathname, suffix } = splitHref(href);
    const pathWithoutLocale = stripLocaleFromPathname(normalizePathname(pathname));

    const isDocsPath = pathWithoutLocale === '/docs' || pathWithoutLocale.startsWith('/docs/');

    if (isDocsPath) {
        return `/${locale}${pathWithoutLocale}${suffix}`;
    }

    const localizedPathname = pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`;

    return `${localizedPathname}${suffix}`;
}
