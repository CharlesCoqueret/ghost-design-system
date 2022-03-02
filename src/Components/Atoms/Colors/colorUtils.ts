import { default as rgbaParser } from 'color-rgba';

interface IConvertedColor {
  rgba: string;
  hex: string;
}

export interface IColor {
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

export const colorConverter = (color: string): IConvertedColor => {
  const rgba = rgbaParser(color);
  if (rgba && rgba.length === 4) {
    return { rgba: `rgba(${rgba.join(', ')})`, hex: rgbToHex(rgba).toUpperCase() };
  }
  return { rgba: `rgba(0, 0, 0, 0)`, hex: '#000000' };
};

export const colorBuilder = (name: string, inputColor: string): IColor => {
  const convertedColor = colorConverter(inputColor);
  return {
    name,
    rgb: convertedColor.rgba,
    hex: convertedColor.hex,
    code: `colors[COLORSENUM.${name.toUpperCase()}]`,
  };
};
