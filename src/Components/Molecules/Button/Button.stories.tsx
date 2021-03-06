import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { ColorButtonEnum, IButtonProps } from './Button';

export default {
  title: 'Molecule/Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' }, layout: 'centered' },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IButtonProps) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <Button {...args} />
    </div>
  );
};

const itemList = [
  { itemId: 'key1', label: 'First option' },
  { itemId: 'key2', label: 'Second option' },
  { itemId: 'key3', label: 'Third option', divider: true },
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
  icon: ['fal', 'arrow-down-to-line'],
  color: ColorButtonEnum.REVERSED,
  tooltip: 'Icon reversed',
};

export const IconReversedWithItemList = Template.bind({});
IconReversedWithItemList.args = {
  icon: ['fal', 'arrow-down-to-line'],
  color: ColorButtonEnum.REVERSED,
  tooltip: 'Icon reversed',
  itemList,
};

export const Popover = Template.bind({});
Popover.args = {
  icon: ['fal', 'trash-alt'],
  color: ColorButtonEnum.REVERSED,
  tooltip: 'Delete',
  popover: {
    title: 'Delete?',
    buttons: [
      {
        label: 'Cancel',
        color: ColorButtonEnum.SECONDARY,
      },
      {
        label: 'Confirm',
        color: ColorButtonEnum.PRIMARY,
      },
    ],
  },
};
