import React from 'react';

import colors, { COLORSENUM, IColor } from './colors';

export default {
  title: 'Atom/Colors',
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
    colors[COLORSENUM.FERN],
    colors[COLORSENUM.BUTTERCUP],
    colors[COLORSENUM.TANGERINE],
    colors[COLORSENUM.CINNABAR],
  ],
};
