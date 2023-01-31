import React from 'react';

import { default as rgbaParser } from 'color-rgba';
import { defaultTheme } from './ThemeProvider';

export default {
  title: 'Atom/Theme',
};

enum COLORSENUM {
  BLACK = 'black',
  BUTTERCUP = 'buttercup',
  CERULEAN = 'cerulean',
  CHALK = 'chalk',
  CHARCOAL = 'charcoal',
  CINNABAR = 'cinnarbar',
  ERROR = 'error',
  FERN = 'fern',
  PEBBLE = 'pebble',
  PRIMARY = 'primary',
  SCOOTER = 'scooter',
  SECONDARY = 'secondary',
  SILVER = 'silver',
  SKY = 'sky',
  SMOKE = 'smoke',
  TANGERINE = 'tangerine',
  TERTIARY = 'tertiary',
  WHITE = 'white',
}

interface IConvertedColor {
  rgba: string;
  hex: string;
}

interface IColor {
  name: string;
  rgb: string;
  hex: string;
  code: string;
}

const valueToHex = (component: number): string => {
  const value = Math.min(Math.max(0, component), 255);
  return value.toString(16).padStart(2, '0');
};

const rgbToHex = ([r, g, b]: Array<number>): string => {
  return '#' + valueToHex(r) + valueToHex(g) + valueToHex(b);
};

const colorConverter = (color: string): IConvertedColor => {
  const rgba = rgbaParser(`rgba(${color})`);
  if (rgba && rgba.length === 4) {
    return { rgba: `rgba(${rgba.join(', ')})`, hex: rgbToHex(rgba).toUpperCase() };
  }
  return { rgba: `rgba(0, 0, 0, 0)`, hex: '#000000' };
};

const colorBuilder = (name: string, inputColor: string): IColor => {
  const convertedColor = colorConverter(inputColor);
  return {
    name,
    rgb: convertedColor.rgba,
    hex: convertedColor.hex,
    code: `colors[COLORSENUM.${name.toUpperCase()}]`,
  };
};

const colors: Record<COLORSENUM, IColor> = {
  [COLORSENUM.BLACK]: colorBuilder(COLORSENUM.BLACK, defaultTheme.black),
  [COLORSENUM.BUTTERCUP]: colorBuilder(COLORSENUM.BUTTERCUP, defaultTheme.buttercup),
  [COLORSENUM.CERULEAN]: colorBuilder(COLORSENUM.CERULEAN, defaultTheme.cerulean),
  [COLORSENUM.CHALK]: colorBuilder(COLORSENUM.CHALK, defaultTheme.chalk),
  [COLORSENUM.CHARCOAL]: colorBuilder(COLORSENUM.CHARCOAL, defaultTheme.charcoal),
  [COLORSENUM.CINNABAR]: colorBuilder(COLORSENUM.CINNABAR, defaultTheme.cinnabar),
  [COLORSENUM.ERROR]: colorBuilder(COLORSENUM.ERROR, defaultTheme.error),
  [COLORSENUM.FERN]: colorBuilder(COLORSENUM.FERN, defaultTheme.fern),
  [COLORSENUM.PEBBLE]: colorBuilder(COLORSENUM.PEBBLE, defaultTheme.pebble),
  [COLORSENUM.PRIMARY]: colorBuilder(COLORSENUM.PRIMARY, defaultTheme.primary),
  [COLORSENUM.SCOOTER]: colorBuilder(COLORSENUM.SCOOTER, defaultTheme.scooter),
  [COLORSENUM.SECONDARY]: colorBuilder(COLORSENUM.SECONDARY, defaultTheme.secondary),
  [COLORSENUM.SILVER]: colorBuilder(COLORSENUM.SILVER, defaultTheme.silver),
  [COLORSENUM.SKY]: colorBuilder(COLORSENUM.SKY, defaultTheme.sky),
  [COLORSENUM.SMOKE]: colorBuilder(COLORSENUM.SMOKE, defaultTheme.smoke),
  [COLORSENUM.TANGERINE]: colorBuilder(COLORSENUM.TANGERINE, defaultTheme.tangerine),
  [COLORSENUM.TERTIARY]: colorBuilder(COLORSENUM.TERTIARY, defaultTheme.tertiary),
  [COLORSENUM.WHITE]: colorBuilder(COLORSENUM.WHITE, defaultTheme.white),
};

const Template = (args: { colors: Array<IColor> }) => {
  const { colors } = args;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '20px',
        gridAutoRows: 'minmax(100px, auto)',
      }}>
      {colors.map((color) => {
        return (
          <div key={color.name} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: color.rgb, minHeight: '100px', marginBottom: '10px' }} />
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '5px' }}>{color.name.toUpperCase()}</div>
            <div style={{ fontWeight: '400', fontSize: '14px', marginBottom: '5px' }}>{color.rgb}</div>
            <div style={{ fontWeight: '400', fontSize: '14px', marginBottom: '5px' }}>{color.hex}</div>
          </div>
        );
      })}
    </div>
  );
};

export const BrandPalette = Template.bind({});
BrandPalette.args = { colors: [colors[COLORSENUM.PRIMARY], colors[COLORSENUM.SECONDARY], colors[COLORSENUM.TERTIARY]] };

export const NeutralPalette = Template.bind({});
NeutralPalette.args = {
  colors: [
    colors[COLORSENUM.BLACK],
    colors[COLORSENUM.CHARCOAL],
    colors[COLORSENUM.PEBBLE],
    colors[COLORSENUM.SILVER],
    colors[COLORSENUM.CHALK],
    colors[COLORSENUM.SMOKE],
    colors[COLORSENUM.WHITE],
  ],
};

export const ExtendedPaletter = Template.bind({});
ExtendedPaletter.args = {
  colors: [
    colors[COLORSENUM.SKY],
    colors[COLORSENUM.FERN],
    colors[COLORSENUM.BUTTERCUP],
    colors[COLORSENUM.TANGERINE],
    colors[COLORSENUM.CINNABAR],
  ],
};
