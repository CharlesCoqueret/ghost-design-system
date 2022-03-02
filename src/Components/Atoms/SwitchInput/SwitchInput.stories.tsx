import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IToggleEntry } from '../CheckBoxInput/types';
import SwitchInput, { ISwitchInputProps } from './SwitchInput';

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
  title: 'Atom/SwitchInput',
  component: SwitchInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof SwitchInput>;

const Template: ComponentStory<typeof SwitchInput> = ({ options, ...args }: ISwitchInputProps) => {
  const [localOption, setLocalOption] = useState<Array<IToggleEntry>>(options);

  return (
    <>
      <SwitchInput {...args} options={localOption} onChange={setLocalOption} />
      <div style={{ height: '10vh' }} />
      <SwitchInput {...args} readOnly={true} options={localOption} onChange={setLocalOption} />
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
