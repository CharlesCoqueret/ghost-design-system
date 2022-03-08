import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { ColorButtonEnum, IButtonProps } from './Button';

export default {
  title: 'Molecule/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    onSelectItem: { action: 'item selected' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IButtonProps) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <Button {...args} />
    </div>
  );
};

const itemList = [
  { itemId: 'key1', value: 'First option' },
  { itemId: 'key2', value: 'Second option' },
  { itemId: 'key3', value: 'Third option', divider: true },
];

export const Simple = Template.bind({});
Simple.args = {
  label: 'Simple button',
  tooltip: 'Simple button primary',
  color: ColorButtonEnum.PRIMARY,
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button primary',
  tooltip: 'Button primary',
  icon: ['fal', 'cog'],
  color: ColorButtonEnum.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button secondary',
  tooltip: 'Button secondary',
  color: ColorButtonEnum.SECONDARY,
};

export const Reversed = Template.bind({});
Reversed.args = {
  label: 'Button reversed',
  tooltip: 'Button reversed',
  color: ColorButtonEnum.REVERSED,
};

export const ListPrimary = Template.bind({});
ListPrimary.args = {
  label: 'Button primary',
  tooltip: 'Dropdown primary',
  color: ColorButtonEnum.PRIMARY,
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
  color: ColorButtonEnum.REVERSED,
  itemList,
};

export const IconReversed = Template.bind({});
IconReversed.args = {
  icon: ['fal', 'arrow-to-bottom'],
  color: ColorButtonEnum.REVERSED,
  tooltip: 'Icon reversed',
};

export const IconReversedWithItemList = Template.bind({});
IconReversedWithItemList.args = {
  icon: ['fal', 'arrow-to-bottom'],
  color: ColorButtonEnum.REVERSED,
  tooltip: 'Icon reversed',
  itemList,
};
