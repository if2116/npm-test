import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is valid
  const validLocale = (locale && locales.includes(locale as Locale)) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./locales/${validLocale}.json`)).default
  };
});
