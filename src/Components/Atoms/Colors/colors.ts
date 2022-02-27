export enum COLORSENUM {
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
  TANGERINE = 'tangerine',
  ERROR = 'error',
}

export interface IColor {
  name: string;
  rgb: string;
  hex: string;
  code: string;
}

const colorBuilder = (name: string, rgb: string, hex: string, code: string) => {
  return {
    name,
    rgb,
    hex,
    code,
  };
};

const colors: Record<COLORSENUM, IColor> = {
  [COLORSENUM.PRIMARY]: colorBuilder(COLORSENUM.PRIMARY, '', '', ''),
  [COLORSENUM.SECONDARY]: colorBuilder(COLORSENUM.SECONDARY, '', '', ''),
  [COLORSENUM.TERTIARY]: colorBuilder(COLORSENUM.TERTIARY, '', '', ''),
  [COLORSENUM.CHALK]: colorBuilder(COLORSENUM.CHALK, 'rgb(228, 228, 228)', '#e4e4e4', 'colors[COLORSENUM.CHALK]'),
  [COLORSENUM.CHARCOAL]: colorBuilder(COLORSENUM.CHARCOAL, 'rgb(51, 51, 51)', '#333333', 'colors[COLORSENUM.CHARCOAL]'),
  [COLORSENUM.PEBBLE]: colorBuilder(COLORSENUM.PEBBLE, 'rgb(117, 117, 117)', '#757575', 'colors[COLORSENUM.PEBBLE]'),
  [COLORSENUM.SILVER]: colorBuilder(COLORSENUM.SILVER, 'rgb(196, 196, 196)', '#c4c4c4', 'colors[COLORSENUM.SILVER]'),
  [COLORSENUM.SMOKE]: colorBuilder(COLORSENUM.SMOKE, 'rgb(248, 248, 248)', '#f8f8f8', 'colors[COLORSENUM.SMOKE]'),
  [COLORSENUM.WHITE]: colorBuilder(COLORSENUM.WHITE, 'rgb(255, 255, 255)', '#ffffff', 'colors[COLORSENUM.WHITE]'),
  [COLORSENUM.CERULEAN]: colorBuilder(COLORSENUM.CERULEAN, 'rgb(1, 82, 129)', '#015281', 'colors[COLORSENUM.CERULEAN]'),
  [COLORSENUM.FERN]: colorBuilder(COLORSENUM.FERN, 'rgb(92, 184, 92)', '#5cb85c', 'colors[COLORSENUM.FERN]'),
  [COLORSENUM.SKY]: colorBuilder(COLORSENUM.SKY, 'rgb(16, 156, 241)', '#109cf1', 'colors[COLORSENUM.SKY]'),
  [COLORSENUM.SCOOTER]: colorBuilder(COLORSENUM.SCOOTER, 'rgb(38, 186, 212)', '#26bad4', 'colors[COLORSENUM.SCOOTER]'),
  [COLORSENUM.ERROR]: colorBuilder(COLORSENUM.ERROR, 'rgb(255, 52, 24)', '#ff3418', 'colors[COLORSENUM.ERROR]'),
  [COLORSENUM.BUTTERCUP]: colorBuilder(
    COLORSENUM.BUTTERCUP,
    'rgb(244, 174, 38)',
    '#f4ae26',
    'colors[COLORSENUM.BUTTERCUP]',
  ),
  [COLORSENUM.CINNABAR]: colorBuilder(
    COLORSENUM.CINNABAR,
    'rgb(232, 61, 71)',
    '#e83d47',
    'colors[COLORSENUM.CINNABAR]',
  ),
  [COLORSENUM.TANGERINE]: colorBuilder(
    COLORSENUM.TANGERINE,
    'rgb(229, 114, 0)',
    '#e57200',
    'colors[COLORSENUM.TANGERINE]',
  ),
};

colors[COLORSENUM.PRIMARY] = colors[COLORSENUM.SCOOTER];
colors[COLORSENUM.SECONDARY] = colors[COLORSENUM.PEBBLE];
colors[COLORSENUM.TERTIARY] = colors[COLORSENUM.CHARCOAL];

export default colors;
