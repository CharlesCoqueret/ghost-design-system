import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip, { ITooltipProps, MenuDirectionEnum } from './Tooltip';

export default {
  title: 'Atom/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args: ITooltipProps) => (
  <div style={{ width: '70%', margin: 'auto' }}>
    <Tooltip {...args}>
      <div
        style={{
          height: '100px',
          width: 200,
          lineHeight: '100px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
        }}>
        Hover me
      </div>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  tooltip: (
    <ul>
      <li>Item #1</li>
      <li>Item #2</li>
      <li>Item #3</li>
    </ul>
  ),
  direction: MenuDirectionEnum.BOTTOM,
  delay: 300,
};
