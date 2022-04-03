import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip, { ITooltipProps } from './Tooltip';
import { MenuDirectionEnum } from './tooltipUtils';

export default {
  title: 'Atom/Tooltip',
  component: Tooltip,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Tooltip>;

const ManagedTemplate: ComponentStory<typeof Tooltip> = (args: ITooltipProps) => (
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

const Template: ComponentStory<typeof Tooltip> = (args: ITooltipProps) => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        <Tooltip {...args}>
          <big>TOOLTIP HERE</big>
        </Tooltip>{' '}
        vulputate sit amet mi nec fringilla. Curabitur nibh elit, lobortis at tincidunt hendrerit, placerat vel velit.
        Sed pellentesque venenatis nisi, tincidunt tincidunt purus sodales vitae. Quisque pharetra augue eu aliquet
        ornare. Maecenas facilisis, tortor eu tincidunt dictum, tortor erat scelerisque arcu, id accumsan nisl enim et
        ex. In elementum sagittis leo, quis convallis velit ullamcorper quis. Sed elementum nec ipsum et interdum. Nam
        vel sollicitudin justo, eu feugiat{' '}
        <Tooltip {...args}>
          <big>TOOLTIP HERE</big>
        </Tooltip>{' '}
        neque. Quisque a magna augue.
      </p>
    </div>
  );
};

export const Default = ManagedTemplate.bind({});
Default.args = {
  tooltip: 'Tooltip',
  delay: 200,
};

export const Text = Template.bind({});
Text.args = {
  tooltip: 'Tooltip',
  direction: MenuDirectionEnum.TOP,
  delay: 200,
};
