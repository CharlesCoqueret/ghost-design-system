import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip, { ITooltipProps } from './Tooltip';

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
  tooltip: 'Tooltip',
};

export const Right = Template.bind({});
Right.args = {
  tooltip: 'Tooltip on the right',
  direction: 'right',
};

export const VeryLong = Template.bind({});
VeryLong.args = {
  tooltip: 'Very very very long tooltip on the beginning left of the component',
  direction: 'right',
};

export const Component = Template.bind({});
Component.args = {
  tooltip: (
    <>
      <p>- Item #1</p>
      <p>- Item #2</p>
      <p>- Item #3</p>
    </>
  ),
  direction: 'right',
};

export const Empty = Template.bind({});
Empty.args = {};
