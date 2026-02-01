'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Menu, X, Languages } from 'lucide-react';
import { useState, useTransition } from 'react';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'arena', href: '/arena' },
  { name: 'framework', href: '/framework' },
  { name: 'faq', href: '/faq' },
  { name: 'contact', href: '/contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    // Remove locale prefix from pathname if present
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    startTransition(() => {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    });
  };

  const isChina = locale === 'zh';
  const ctaText = isChina ? '联系专家' : 'View GitHub';
  const ctaHref = isChina ? '/contact' : 'https://github.com/howang/rwai-website';

  // Remove locale prefix for comparison
  const getLocalizedHref = (href: string) => {
    const localePrefix = `/${locale}`;
    // If pathname already starts with locale prefix, check remaining path
    const currentPath = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length)
      : pathname;
    return href === currentPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-primary">RWAI</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}${item.href}`}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                getLocalizedHref(item.href)
                  ? 'text-primary'
                  : 'text-gray-900'
              }`}
            >
              {t(item.name as any)}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <button
            onClick={switchLanguage}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title={locale === 'en' ? 'Switch to Chinese' : '切换到英文'}
          >
            <Languages className="h-4 w-4" />
            <span>{locale === 'en' ? '中文' : 'English'}</span>
          </button>
          {ctaHref.startsWith('http') ? (
            <Button asChild size="sm">
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaText}
              </a>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={`/${locale}${ctaHref}`}>{ctaText}</Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.name as any)}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <button
                onClick={switchLanguage}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Languages className="h-5 w-5" />
                <span>{locale === 'en' ? '切换到中文' : 'Switch to English'}</span>
              </button>
              {ctaHref.startsWith('http') ? (
                <Button asChild className="w-full">
                  <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                    {ctaText}
                  </a>
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link href={`/${locale}${ctaHref}`}>{ctaText}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
