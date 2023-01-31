import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BadgeComponent, { BadgeColorsEnum, IBadgeProps } from './Badge';

export default {
  title: 'Atom',
  component: BadgeComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof BadgeComponent>;

const getRandomInt = (min = 1, max = 100): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const Template: ComponentStory<typeof BadgeComponent> = (args: IBadgeProps) => {
  if (args.className || args.color || args.tooltip || args.tooltipDirection || args.type) {
    return <BadgeComponent {...args}>{args.type === 'notification' ? '+1' : 'STATUS'}</BadgeComponent>;
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '20px',
        gridAutoRows: 'minmax(100px, auto)',
        textAlign: 'center',
      }}>
      {Object.keys(BadgeColorsEnum).map((color) => {
        return (
          <div key={color} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '5px' }}>{color}</div>
            <div>
              <BadgeComponent type='notification' color={BadgeColorsEnum[color]}>
                +{getRandomInt()}
              </BadgeComponent>
              <BadgeComponent type='indicator' color={BadgeColorsEnum[color]}>
                STATUS
              </BadgeComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Badge = Template.bind({});
Badge.args = {};
