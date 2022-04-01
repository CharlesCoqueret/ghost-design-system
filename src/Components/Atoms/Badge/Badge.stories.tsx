import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge, { BadgeColorsEnum, IBadgeProps } from './Badge';
// import { MenuDirectionEnum } from '../Tooltip';

export default {
  title: 'Atom/Badge',
  component: Badge,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Badge>;

const getRandomInt = (min = 1, max = 100): number => {
  return Math.round(Math.random() * (max - min) + min);
};

const Template: ComponentStory<typeof Badge> = (args: IBadgeProps) => {
  if (args.className || args.color || args.tooltip || args.tooltipDirection || args.type) {
    return <Badge {...args}>{args.type === 'notification' ? '+1' : 'STATUS'}</Badge>;
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
              <Badge type='notification' color={BadgeColorsEnum[color]}>
                +{getRandomInt()}
              </Badge>
              <Badge type='indicator' color={BadgeColorsEnum[color]}>
                STATUS
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
