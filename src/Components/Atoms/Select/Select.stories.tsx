import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select, { ISelectProps } from './Select';
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
  title: 'Atom/Select',
  component: Select,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: ISelectProps) => {
  const [inputValue, setInputValue] = useState<IOption | null | undefined>(undefined);
  return (
    <>
      <Select {...args} selectedOption={inputValue} onChange={setInputValue} />
      <div style={{ height: '10vh' }} />
      <Select {...args} readOnly selectedOption={inputValue} onChange={setInputValue} />
    </>
  );
};

export const Simple = Template.bind({});
Simple.args = {
  options: options,
  placeholder: 'Select placeholder',
};
