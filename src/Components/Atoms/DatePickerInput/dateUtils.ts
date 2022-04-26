import setMonth from 'date-fns/setMonth';
import format from 'date-fns/format';
import { registerLocale } from 'react-datepicker';
import { Locale } from 'date-fns';

interface IGlobalThis extends Window {
  __localeData__?: Record<string, Locale>;
}

export type existingLocale =
  | 'af'
  | 'ar'
  | 'ar-DZ'
  | 'ar-EG'
  | 'ar-MA'
  | 'ar-SA'
  | 'ar-TN'
  | 'az'
  | 'be'
  | 'bg'
  | 'bn'
  | 'bs'
  | 'ca'
  | 'cs'
  | 'cy'
  | 'da'
  | 'de'
  | 'de-AT'
  | 'el'
  | 'en-AU'
  | 'en-CA'
  | 'en-GB'
  | 'en-IE'
  | 'en-IN'
  | 'en-NZ'
  | 'en-US'
  | 'en-ZA'
  | 'eo'
  | 'es'
  | 'et'
  | 'eu'
  | 'fa-IR'
  | 'fi'
  | 'fr'
  | 'fr-CA'
  | 'fr-CH'
  | 'fy'
  | 'gd'
  | 'gl'
  | 'gu'
  | 'he'
  | 'hi'
  | 'hr'
  | 'ht'
  | 'hu'
  | 'hy'
  | 'id'
  | 'is'
  | 'it'
  | 'ja'
  | 'ja-Hira'
  | 'ka'
  | 'kk'
  | 'km'
  | 'kn'
  | 'ko'
  | 'lb'
  | 'lt'
  | 'lv'
  | 'mk'
  | 'mn'
  | 'ms'
  | 'mt'
  | 'nb'
  | 'nl'
  | 'nl-BE'
  | 'nn'
  | 'pl'
  | 'pt'
  | 'pt-BR'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sr'
  | 'sr-Latn'
  | 'sv'
  | 'ta'
  | 'te'
  | 'th'
  | 'tr'
  | 'ug'
  | 'uk'
  | 'uz'
  | 'uz-Cyrl'
  | 'vi'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW'
  | string;

export const importFnsLocaleFile = async (locale: existingLocale): Promise<void> => {
  return await import(`date-fns/locale/${locale}/index.js`)
    .then((localeDataset) => {
      registerLocale(locale, localeDataset);
    })
    .catch(console.error);
};

const getLocaleObject = (localeSpec: string): Locale | undefined => {
  // Treat it as a locale name registered by registerLocale
  const scope = Object.assign({}, window, globalThis) as unknown as IGlobalThis;

  return scope.__localeData__ && Object.prototype.hasOwnProperty.call(scope.__localeData__, localeSpec)
    ? scope.__localeData__[localeSpec]
    : undefined;
};

export const formatDate = (date: Date, formatStr: string, locale?: string): string => {
  if (locale === 'en' || locale === undefined) {
    return format(date, formatStr);
  }

  const localeObj = getLocaleObject(locale);
  if (!localeObj) {
    console.warn(`A locale object was not found for the provided string ["${locale}"].`);
    return format(date, formatStr);
  }

  return format(date, formatStr, {
    locale: localeObj,
  });
};

export const getMonthInLocale = (month: number, locale?: string): string => {
  return formatDate(setMonth(new Date(), month), 'LLLL', locale);
};
