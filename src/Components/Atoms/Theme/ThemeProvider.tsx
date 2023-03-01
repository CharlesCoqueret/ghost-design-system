import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

type RGB = `${number}, ${number}, ${number}`;

type Color = RGB;

export interface ITheme {
  black: Color;
  buttercup: Color;
  cerulean: Color;
  chalk: Color;
  charcoal: Color;
  cinnabar: Color;
  error: Color;
  fern: Color;
  pebble: Color;
  primary: Color;
  scooter: Color;
  secondary: Color;
  silver: Color;
  sky: Color;
  skyhigh: Color;
  smoke: Color;
  tangerine: Color;
  tertiary: Color;
  white: Color;
  fontFamily: string;
}

const black = '0, 0, 0';
const buttercup = '244, 174, 38';
const cerulean = '1, 82, 129';
const chalk = '228, 228, 228';
const charcoal = '51, 51, 51';
const cinnabar = '232, 61, 71';
const error = '255, 52, 24';
const fern = '92, 184, 92';
const pebble = '117, 117, 117';
const scooter = '38, 186, 212';
const silver = '196, 196, 196';
const sky = '16, 156, 241';
const skyhigh = '206, 228, 255';
const smoke = '248, 248, 248';
const tangerine = '229, 114, 0';
const white = '255, 255, 255';
const fontFamily = 'Montserrat, Arial, sans-serif';

export const defaultTheme: ITheme = {
  black,
  buttercup,
  cerulean,
  chalk,
  charcoal,
  cinnabar,
  error,
  fern,
  pebble,
  primary: scooter,
  scooter,
  secondary: pebble,
  silver,
  sky,
  skyhigh,
  smoke,
  tangerine,
  tertiary: charcoal,
  white,
  fontFamily,
};

export interface IThemeContext {
  theme: ITheme;
  setCurrentTheme: (theme: ITheme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: defaultTheme,
  setCurrentTheme: () => {
    return;
  },
});

export interface IThemeProvider {
  theme?: ITheme;
}

const ThemeProvider = (props: PropsWithChildren<IThemeProvider>) => {
  const { children, theme } = props;

  const [currentTheme, setCurrentTheme] = useState(theme || defaultTheme);

  useEffect(() => {
    const rootDocumentStyle = document.documentElement.style;
    rootDocumentStyle.setProperty('--theme-provider-black', currentTheme.black);
    rootDocumentStyle.setProperty('--theme-provider-buttercup', currentTheme.buttercup);
    rootDocumentStyle.setProperty('--theme-provider-cerulean', currentTheme.cerulean);
    rootDocumentStyle.setProperty('--theme-provider-chalk', currentTheme.chalk);
    rootDocumentStyle.setProperty('--theme-provider-charcoal', currentTheme.charcoal);
    rootDocumentStyle.setProperty('--theme-provider-cinnabar', currentTheme.cinnabar);
    rootDocumentStyle.setProperty('--theme-provider-error', currentTheme.error);
    rootDocumentStyle.setProperty('--theme-provider-fern', currentTheme.fern);
    rootDocumentStyle.setProperty('--theme-provider-pebble', currentTheme.pebble);
    rootDocumentStyle.setProperty('--theme-provider-primary', currentTheme.primary);
    rootDocumentStyle.setProperty('--theme-provider-scooter', currentTheme.scooter);
    rootDocumentStyle.setProperty('--theme-provider-secondary', currentTheme.secondary);
    rootDocumentStyle.setProperty('--theme-provider-silver', currentTheme.silver);
    rootDocumentStyle.setProperty('--theme-provider-sky', currentTheme.sky);
    rootDocumentStyle.setProperty('--theme-provider-skyhigh', currentTheme.skyhigh);
    rootDocumentStyle.setProperty('--theme-provider-smoke', currentTheme.smoke);
    rootDocumentStyle.setProperty('--theme-provider-tangerine', currentTheme.tangerine);
    rootDocumentStyle.setProperty('--theme-provider-tertiary', currentTheme.tertiary);
    rootDocumentStyle.setProperty('--theme-provider-white', currentTheme.white);
    rootDocumentStyle.setProperty('--theme-provider-font-family', currentTheme.fontFamily);
  }, [currentTheme]);

  return <ThemeContext.Provider value={{ theme: currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
  children: undefined,
};

export default ThemeProvider;
