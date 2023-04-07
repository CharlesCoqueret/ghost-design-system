import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import mdx from './Layout.mdx';
import SeparatorComponent from './Separator';

export default {
  title: 'Atom/Layout',
  component: SeparatorComponent,
  parameters: {
    actions: 'hidden',
    controls: { sort: 'requiredFirst' },
    docs: {
      page: mdx,
    },
  },
} as ComponentMeta<typeof SeparatorComponent>;

const Template: ComponentStory<typeof SeparatorComponent> = (args) => {
  return <SeparatorComponent {...args} />;
};

export const Separator = Template.bind({});
