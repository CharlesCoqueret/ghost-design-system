import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PulsarComponent from './Pulsar';

export default {
  title: 'Atom',
  component: PulsarComponent,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof PulsarComponent>;

const Template: ComponentStory<typeof PulsarComponent> = () => {
  return <PulsarComponent />;
};

export const Pulsar = Template.bind({});
