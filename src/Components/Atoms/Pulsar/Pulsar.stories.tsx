import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pulsar from './Pulsar';

export default {
  title: 'Atom/Pulsar',
  component: Pulsar,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof Pulsar>;

const Template: ComponentStory<typeof Pulsar> = () => {
  return <Pulsar />;
};

export const Default = Template.bind({});
