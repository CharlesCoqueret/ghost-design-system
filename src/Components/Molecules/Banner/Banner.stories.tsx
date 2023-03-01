import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { default as BannerComponent, IBannerProps } from './Banner';

export default {
  title: 'Molecule',
  component: BannerComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof BannerComponent>;

const Template: ComponentStory<typeof BannerComponent> = (args: IBannerProps) => {
  return (
    <BannerComponent {...args}>
      <ul>
        <li>Signature #1</li>
        <li>Signature #2</li>
      </ul>
    </BannerComponent>
  );
};

export const Banner = Template.bind({});
Banner.args = {
  title: 'Signatures',
  openInitially: true,
  collapsible: true,
};
