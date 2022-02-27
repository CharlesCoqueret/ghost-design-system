import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MultiSelect, { IMultiSelectProps } from './MultiSelect';
import { IOption } from '../../Molecules/SelectField/types';

const options = [
  { label: 'selection label 0', value: 'KEY_0' },
  { label: 'selection label 1', value: 'KEY_1' },
  {
    label: 'selection label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
    value: 'KEY_2',
  },
  {
    label: 'selection label 3 - which can sometimes be ' + 'extremely '.repeat(50) + ' long',
    value: 'KEY_3',
  },
  { label: 'selection label 4', value: 'KEY_4' },
  { label: 'selection label 5', value: 'KEY_5' },
  { label: 'selection label 6', value: 'KEY_6' },
  { label: 'selection label 7', value: 'KEY_7' },
  { label: 'selection label 8', value: 'KEY_8' },
  { label: 'selection label 9', value: 'KEY_9' },
  { label: 'selection label 10', value: 'KEY_10' },
];

export default {
  title: 'Atom/MultiSelect',
  component: MultiSelect,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof MultiSelect>;

const Template: ComponentStory<typeof MultiSelect> = (args: IMultiSelectProps) => {
  const [inputValue, setInputValue] = useState<Readonly<Array<IOption>> | undefined>(undefined);
  return <MultiSelect {...args} selectedOptions={inputValue} onChange={setInputValue} />;
};

export const Default = Template.bind({});
Default.args = {
  options: options,
  placeholder: 'Multi select placeholder',
};
