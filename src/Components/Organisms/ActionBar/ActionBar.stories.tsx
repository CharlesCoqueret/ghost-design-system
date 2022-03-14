import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionBar, { IActionBarProps } from './ActionBar';
import { ColorButtonEnum } from '../../Molecules';

export default {
  title: 'Organism/ActionBar',
  component: ActionBar,
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args: IActionBarProps) => {
  return <ActionBar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  prefix: 'prefix',
  title: 'title',
  suffix: 'suffix',
  placeholder: 'placeholder',
  entityId: 'entityId',
  onTitleEdit: (newTitle) => {
    console.log(newTitle);
  },
  actions: [
    {
      label: 'Cancel',
      color: ColorButtonEnum.SECONDARY,
      onClick: () => {
        console.log('Cancel clicked');
      },
    },
    {
      label: 'Submit',
      icon: ['fal', 'paper-plane'],
      color: ColorButtonEnum.PRIMARY,
      onClick: () => {
        console.log('Submit clicked');
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
