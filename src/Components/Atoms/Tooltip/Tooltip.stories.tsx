import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { default as TooltipComponent, ITooltipProps } from './Tooltip';
import { MenuDirectionEnum } from './types';

export default {
  title: 'Atom/Tooltip',
  component: TooltipComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TooltipComponent>;

const ManagedTemplate: ComponentStory<typeof TooltipComponent> = (args: ITooltipProps) => (
  <>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        rowGap: '50px',
        columnGap: '50px',
        gridAutoRows: 'minmax(100px, auto)',
      }}>
      <TooltipComponent {...args} direction={MenuDirectionEnum.BOTTOM}>
        <div
          style={{
            height: '100px',
            lineHeight: '100px',
            textAlign: 'center',
            backgroundColor: 'lightblue',
          }}>
          Hover me (bottom)
        </div>
      </TooltipComponent>
      <TooltipComponent {...args} direction={MenuDirectionEnum.LEFT}>
        <div
          style={{
            height: '100px',
            lineHeight: '100px',
            textAlign: 'center',
            backgroundColor: 'lightblue',
          }}>
          Hover me (left)
        </div>
      </TooltipComponent>
      <TooltipComponent {...args} direction={MenuDirectionEnum.RIGHT}>
        <div
          style={{
            height: '100px',
            lineHeight: '100px',
            textAlign: 'center',
            backgroundColor: 'lightblue',
          }}>
          Hover me (right)
        </div>
      </TooltipComponent>
      <TooltipComponent {...args} direction={MenuDirectionEnum.TOP}>
        <div
          style={{
            height: '100px',
            lineHeight: '100px',
            textAlign: 'center',
            backgroundColor: 'lightblue',
          }}>
          Hover me (top)
        </div>
      </TooltipComponent>
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <TooltipComponent {...args}>
          <b>
            <u> TOOLTIP HERE </u>
          </b>
        </TooltipComponent>
        vulputate sit amet mi nec fringilla. Curabitur nibh elit, lobortis at tincidunt hendrerit, placerat vel velit.
        Sed pellentesque venenatis nisi, tincidunt tincidunt purus sodales vitae. Quisque pharetra augue eu aliquet
        ornare. Maecenas facilisis, tortor eu tincidunt dictum, tortor erat scelerisque arcu, id accumsan nisl enim et
        ex. In elementum sagittis leo, quis convallis velit ullamcorper quis. Sed elementum nec ipsum et interdum. Nam
        vel sollicitudin justo, eu feugiat
        <TooltipComponent {...args}>
          <b>
            <u> TOOLTIP HERE </u>
          </b>
        </TooltipComponent>
        neque. Quisque a magna augue.
      </p>
    </div>
  </>
);

export const Tooltip = ManagedTemplate.bind({});
Tooltip.args = {
  tooltip: 'Tooltip',
  delay: 200,
};
