import setMonth from 'date-fns/setMonth';
import format from 'date-fns/format';
import { registerLocale } from 'react-datepicker';
import { Locale } from 'date-fns';

const REGISTRAR_LOCALES: { [key: string]: Locale } = {};

export const importFnsLocaleFile = async (locale: string): Promise<void> => {
  if (locale in Object.keys(REGISTRAR_LOCALES)) {
    registerLocale(locale, REGISTRAR_LOCALES[locale]);
  } else {
    import(`date-fns/locale/${locale}/index.js`)
      .then((localeDataset) => {
        registerLocale(locale, localeDataset);
      })
      .catch(console.error);
  }
};

const getLocaleObject = (localeSpec?: string): Locale | string | undefined => {
  if (typeof localeSpec === 'string') {
    // Treat it as a locale name registered by registerLocale
    const scope = typeof window !== 'undefined' ? window : globalThis;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : null;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
};

export const getDefaultLocale = (): string => {
  const scope = typeof window !== 'undefined' ? window : globalThis;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return scope.__localeId__;
};

export const formatDate = (date: Date, formatStr: string, locale?: string): string => {
  if (locale === 'en') {
    return format(date, formatStr);
  }
  let localeObj = getLocaleObject(locale);
  if (locale && !localeObj) {
    console.warn(`A locale object was not found for the provided string ["${locale}"].`);
  }
  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    locale: localeObj ? localeObj : null,
  });
};

export const getMonthInLocale = (month: number, locale?: string): string => {
  return formatDate(setMonth(new Date(), month), 'LLLL', locale);
};

export function getMonthShortInLocale(month: number, locale: string): string {
  return formatDate(setMonth(new Date(), month), 'LLL', locale);
}
