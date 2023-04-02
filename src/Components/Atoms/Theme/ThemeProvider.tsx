import React, { PropsWithChildren, useEffect, useState } from 'react';

export type RGB = `${number}, ${number}, ${number}`;

type Color = RGB;

export interface ITheme {
  black: Color;
  buttercup: Color;
  buttercuphigh: Color;
  cerulean: Color;
  chalk: Color;
  charcoal: Color;
  cinnabar: Color;
  cinnabarhigh: Color;
  error: Color;
  fern: Color;
  fernhigh: Color;
  pebble: Color;
  primary: Color;
  scooter: Color;
  secondary: Color;
  silver: Color;
  sky: Color;
  skyhigh: Color;
  smoke: Color;
  tangerine: Color;
  tangerinehigh: Color;
  tertiary: Color;
  white: Color;
  fontFamily: string;
}

const black = '0, 0, 0';
const buttercup = '244, 174, 38';
const buttercuphigh = '255, 243, 205';
const cerulean = '1, 82, 129';
const chalk = '228, 228, 228';
const charcoal = '51, 51, 51';
const cinnabar = '232, 61, 71';
const cinnabarhigh = '248, 215, 218';
const error = '255, 52, 24';
const fern = '92, 184, 92';
const fernhigh = '209, 231, 222';
const pebble = '117, 117, 117';
const scooter = '38, 186, 212';
const silver = '196, 196, 196';
const sky = '16, 156, 241';
const skyhigh = '206, 228, 255';
const smoke = '248, 248, 248';
const tangerine = '229, 114, 0';
const tangerinehigh = '255, 230, 210';
const white = '255, 255, 255';
const fontFamily = 'Montserrat, Arial, sans-serif';

export const defaultTheme: ITheme = {
  black,
  buttercup,
  buttercuphigh,
  cerulean,
  chalk,
  charcoal,
  cinnabar,
  cinnabarhigh,
  error,
  fern,
  fernhigh,
  pebble,
  primary: scooter,
  scooter,
  secondary: pebble,
  silver,
  sky,
  skyhigh,
  smoke,
  tangerine,
  tangerinehigh,
  tertiary: charcoal,
  white,
  fontFamily,
};

export interface IThemeProvider {
  theme?: Partial<ITheme>;
}

const ThemeProvider = (props: PropsWithChildren<IThemeProvider>) => {
  const { children, theme } = props;

  const [currentTheme] = useState({ ...defaultTheme, ...theme });

  useEffect(() => {
    const rootDocumentStyle = document.documentElement.style;
    rootDocumentStyle.setProperty('--theme-provider-black', currentTheme.black);
    rootDocumentStyle.setProperty('--theme-provider-buttercup', currentTheme.buttercup);
    rootDocumentStyle.setProperty('--theme-provider-buttercuphigh', currentTheme.buttercuphigh);
    rootDocumentStyle.setProperty('--theme-provider-cerulean', currentTheme.cerulean);
    rootDocumentStyle.setProperty('--theme-provider-chalk', currentTheme.chalk);
    rootDocumentStyle.setProperty('--theme-provider-charcoal', currentTheme.charcoal);
    rootDocumentStyle.setProperty('--theme-provider-cinnabar', currentTheme.cinnabar);
    rootDocumentStyle.setProperty('--theme-provider-cinnabarhigh', currentTheme.cinnabarhigh);
    rootDocumentStyle.setProperty('--theme-provider-error', currentTheme.error);
    rootDocumentStyle.setProperty('--theme-provider-fern', currentTheme.fern);
    rootDocumentStyle.setProperty('--theme-provider-fernhigh', currentTheme.fernhigh);
    rootDocumentStyle.setProperty('--theme-provider-pebble', currentTheme.pebble);
    rootDocumentStyle.setProperty('--theme-provider-primary', currentTheme.primary);
    rootDocumentStyle.setProperty('--theme-provider-scooter', currentTheme.scooter);
    rootDocumentStyle.setProperty('--theme-provider-secondary', currentTheme.secondary);
    rootDocumentStyle.setProperty('--theme-provider-silver', currentTheme.silver);
    rootDocumentStyle.setProperty('--theme-provider-sky', currentTheme.sky);
    rootDocumentStyle.setProperty('--theme-provider-skyhigh', currentTheme.skyhigh);
    rootDocumentStyle.setProperty('--theme-provider-smoke', currentTheme.smoke);
    rootDocumentStyle.setProperty('--theme-provider-tangerine', currentTheme.tangerine);
    rootDocumentStyle.setProperty('--theme-provider-tangerinehigh', currentTheme.tangerinehigh);
    rootDocumentStyle.setProperty('--theme-provider-tertiary', currentTheme.tertiary);
    rootDocumentStyle.setProperty('--theme-provider-white', currentTheme.white);
    rootDocumentStyle.setProperty('--theme-provider-font-family', currentTheme.fontFamily);
  }, [currentTheme]);

  return <>{children}</>;
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
  children: undefined,
};

export default ThemeProvider;
