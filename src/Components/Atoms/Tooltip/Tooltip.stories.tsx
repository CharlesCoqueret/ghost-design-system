import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip, { ITooltipProps, MenuDirectionEnum } from './Tooltip';

export default {
  title: 'Atom/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args: ITooltipProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '20px',
      gridAutoRows: 'minmax(100px, auto)',
    }}>
    <Tooltip {...args} direction={MenuDirectionEnum.BOTTOM}>
      <div
        style={{
          height: '100px',
          lineHeight: '100px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
        }}>
        Hover me (bottom)
      </div>
    </Tooltip>

    <Tooltip {...args} direction={MenuDirectionEnum.RIGHT}>
      <div
        style={{
          height: '100px',
          lineHeight: '100px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
        }}>
        Hover me (right)
      </div>
    </Tooltip>

    <Tooltip {...args} direction={MenuDirectionEnum.LEFT}>
      <div
        style={{
          height: '100px',
          lineHeight: '100px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
        }}>
        Hover me (left)
      </div>
    </Tooltip>

    <Tooltip {...args} direction={MenuDirectionEnum.TOP}>
      <div
        style={{
          height: '100px',
          lineHeight: '100px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
        }}>
        Hover me (top)
      </div>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  tooltip: 'Tooltip',
  delay: 200,
};
