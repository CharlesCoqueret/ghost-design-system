import React from 'react';

import { default as rgbaParser } from 'color-rgba';
import colorsVariables from './variables.module.scss';

export default {
  title: 'Atom/Colors',
};

enum COLORSENUM {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  CHALK = 'chalk',
  CHARCOAL = 'charcoal',
  PEBBLE = 'pebble',
  SILVER = 'silver',
  SMOKE = 'smoke',
  WHITE = 'white',
  SCOOTER = 'scooter',
  BUTTERCUP = 'buttercup',
  CERULEAN = 'cerulean',
  CINNABAR = 'cinnarbar',
  FERN = 'fern',
  SKY = 'sky',
  SKYHIGH = 'skyhigh',
  TANGERINE = 'tangerine',
  ERROR = 'error',
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
  const rgba = rgbaParser(color);
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
  [COLORSENUM.PRIMARY]: colorBuilder(COLORSENUM.PRIMARY, colorsVariables.primary),
  [COLORSENUM.SECONDARY]: colorBuilder(COLORSENUM.SECONDARY, colorsVariables.secondary),
  [COLORSENUM.TERTIARY]: colorBuilder(COLORSENUM.TERTIARY, colorsVariables.tertiary),
  [COLORSENUM.CHALK]: colorBuilder(COLORSENUM.CHALK, colorsVariables.chalk),
  [COLORSENUM.CHARCOAL]: colorBuilder(COLORSENUM.CHARCOAL, colorsVariables.charcoal),
  [COLORSENUM.PEBBLE]: colorBuilder(COLORSENUM.PEBBLE, colorsVariables.pebble),
  [COLORSENUM.SILVER]: colorBuilder(COLORSENUM.SILVER, colorsVariables.silver),
  [COLORSENUM.SMOKE]: colorBuilder(COLORSENUM.SMOKE, colorsVariables.smoke),
  [COLORSENUM.WHITE]: colorBuilder(COLORSENUM.WHITE, colorsVariables.whiteColor),
  [COLORSENUM.CERULEAN]: colorBuilder(COLORSENUM.CERULEAN, colorsVariables.cerulean),
  [COLORSENUM.FERN]: colorBuilder(COLORSENUM.FERN, colorsVariables.fern),
  [COLORSENUM.SKY]: colorBuilder(COLORSENUM.SKY, colorsVariables.sky),
  [COLORSENUM.SKYHIGH]: colorBuilder(COLORSENUM.SKYHIGH, colorsVariables.skyhigh),
  [COLORSENUM.SCOOTER]: colorBuilder(COLORSENUM.SCOOTER, colorsVariables.scooter),
  [COLORSENUM.ERROR]: colorBuilder(COLORSENUM.ERROR, colorsVariables.error),
  [COLORSENUM.BUTTERCUP]: colorBuilder(COLORSENUM.BUTTERCUP, colorsVariables.buttercup),
  [COLORSENUM.CINNABAR]: colorBuilder(COLORSENUM.CINNABAR, colorsVariables.cinnabar),
  [COLORSENUM.TANGERINE]: colorBuilder(COLORSENUM.TANGERINE, colorsVariables.tangerine),
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
            <div style={{ fontWeight: '400', fontSize: '12px', marginBottom: '5px' }}>{color.code}</div>
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
    colors[COLORSENUM.SKYHIGH],
    colors[COLORSENUM.FERN],
    colors[COLORSENUM.BUTTERCUP],
    colors[COLORSENUM.TANGERINE],
    colors[COLORSENUM.CINNABAR],
  ],
};
