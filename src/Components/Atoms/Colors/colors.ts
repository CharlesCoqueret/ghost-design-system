import { colorBuilder, IColor } from './colorUtils';
import colorsVariables from './variables.module.scss';

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
  [COLORSENUM.SCOOTER]: colorBuilder(COLORSENUM.SCOOTER, colorsVariables.scooter),
  [COLORSENUM.ERROR]: colorBuilder(COLORSENUM.ERROR, colorsVariables.error),
  [COLORSENUM.BUTTERCUP]: colorBuilder(COLORSENUM.BUTTERCUP, colorsVariables.buttercup),
  [COLORSENUM.CINNABAR]: colorBuilder(COLORSENUM.CINNABAR, colorsVariables.cinnabar),
  [COLORSENUM.TANGERINE]: colorBuilder(COLORSENUM.TANGERINE, colorsVariables.tangerine),
};

export default colors;
