import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { IButtonProps } from './Button';

export default {
  title: 'Molecule/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    onSelectItem: { action: 'item selected' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IButtonProps) => <Button {...args} />;

const itemList = [
  { itemId: 'key1', value: 'First option' },
  { itemId: 'key2', value: 'Second option' },
  { itemId: 'key3', value: 'Third option', divider: true },
];

export const Simple = Template.bind({});
Simple.args = {
  label: 'Simple button',
  tooltip: 'Simple button primary',
  color: 'primary',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button primary',
  tooltip: 'Button primary',
  icon: ['fal', 'cog'],
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button secondary',
  tooltip: 'Button secondary',
  color: 'secondary',
};

export const Reversed = Template.bind({});
Reversed.args = {
  label: 'Button reversed',
  tooltip: 'Button reversed',
  color: 'reversed',
};

export const ListPrimary = Template.bind({});
ListPrimary.args = {
  label: 'Button primary',
  tooltip: 'Dropdown primary',
  color: 'primary',
  itemList,
};

export const ListSecondary = Template.bind({});
ListSecondary.args = {
  label: 'Button secondary',
  tooltip: 'Dropdown secondary',
  itemList,
  dropdownAlign: 'start',
};

export const ListLoading = Template.bind({});
ListLoading.args = {
  label: 'Button secondary',
  tooltip: 'Dropdown secondary',
  itemList,
  dropdownAlign: 'start',
  loading: true,
};

export const ListReversed = Template.bind({});
ListReversed.args = {
  label: 'Button reversed',
  tooltip: 'Dropdown reversed',
  color: 'reversed',
  itemList,
};

export const IconReversed = Template.bind({});
IconReversed.args = {
  icon: ['fal', 'arrow-to-bottom'],
  color: 'reversed',
  tooltip: 'Icon reversed',
};
