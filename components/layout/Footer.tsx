'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
              RWAI
            </Link>
            <p className="text-center text-sm text-gray-600 lg:text-left">
              {t('tagline')}
            </p>
          </div>

          <div className="flex gap-8">
            <Link href={`/${locale}/about`} className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              {t('links.about')}
            </Link>
            <Link href={`/${locale}/privacy`} className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              {t('links.privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
              {t('links.terms')}
            </Link>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/rwai-arena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/rwai_arena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
