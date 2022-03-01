import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IToggleEntry } from './types';
import CheckboxInput, { ICheckboxInputProps } from './CheckboxInput';

const options: Array<IToggleEntry> = [
  { label: 'checkbox label 0', value: 'KEY_0' },
  { label: 'checkbox label 1', value: 'KEY_1', checked: true },
  {
    label: 'checkbox label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
    value: 'KEY_2',
    checked: false,
  },
  {
    label: 'checkbox label 3 - which can sometimes be ' + 'extremely '.repeat(50) + ' long',
    value: 'KEY_3',
    checked: undefined,
  },
  { label: 'checkbox label 4 highlighted', value: 'KEY_4', highlighted: true },
  { label: 'checkbox label 5', value: 'KEY_5' },
];

export default {
  title: 'Atom/CheckboxInput',
  component: CheckboxInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof CheckboxInput>;

const Template: ComponentStory<typeof CheckboxInput> = ({ options, ...args }: ICheckboxInputProps) => {
  const [localOption, setLocalOption] = useState<Array<IToggleEntry>>(options);

  return (
    <>
      <CheckboxInput {...args} options={localOption} onChange={setLocalOption} />
      <div style={{ height: '10vh' }} />
      <CheckboxInput {...args} readOnly={true} options={localOption} onChange={setLocalOption} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: options,
  disabled: false,
  fieldSize: undefined,
  highlighted: false,
  isInError: false,
  readOnly: false,
};
