import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionBar, { IActionBarProps } from './ActionBar';
import { ColorButtonEnum } from '../../Molecules';
import { Badge, BadgeColorsEnum, Icon, Tooltip } from '../../Atoms';

export default {
  title: 'Organism/ActionBar',
  component: ActionBar,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args: IActionBarProps) => {
  return <ActionBar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  prefix: 'prefix',
  title: 'title',
  suffix: 'suffix',
  primary: true,
  placeholder: 'placeholder',
  entityId: 'entityId',
  onBackClicked: () => {
    console.log('Back clicked');
  },
  backTooltip: 'Back',
  onTitleEdit: (newTitle) => {
    console.log(newTitle);
  },
  icon: (
    <Tooltip tooltip='icon'>
      <Icon icon={['fal', 'question-circle']} size='lg' />
    </Tooltip>
  ),
  indicator: (
    <Badge color={BadgeColorsEnum.HIGH} tooltip='indicator' type='notification'>
      1
    </Badge>
  ),
  status: (
    <Badge color={BadgeColorsEnum.SECONDARY} tooltip='status' type='indicator'>
      Status
    </Badge>
  ),
  actions: [
    {
      label: 'Submit',
      icon: ['fal', 'paper-plane'],
      color: ColorButtonEnum.PRIMARY,
      onClick: () => {
        console.log('Submit clicked');
      },
    },
    {
      label: 'Cancel',
      color: ColorButtonEnum.SECONDARY,
      onClick: () => {
        console.log('Cancel clicked');
      },
    },
  ],
  basicActions: [
    {
      tooltip: 'Save',
      color: ColorButtonEnum.REVERSED,
      icon: ['fal', 'save'],
      onClick: () => {
        console.log('Save clicked');
      },
    },
    {
      tooltip: 'Undo',
      icon: ['fal', 'undo'],
      color: ColorButtonEnum.REVERSED,
      onClick: () => {
        console.log('Undo clicked');
      },
    },
  ],
};
