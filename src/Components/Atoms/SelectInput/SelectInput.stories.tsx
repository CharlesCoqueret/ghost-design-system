import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectInput, { ISelectInputProps } from './SelectInput';

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
  title: 'Atom/SelectInput',
  component: SelectInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = ({ inputValue, ...args }: ISelectInputProps) => {
  const [localValue, setLocalValue] = useState<string | number | null | undefined>(inputValue);

  return (
    <>
      <SelectInput
        {...args}
        inputValue={localValue}
        onChange={(newValue) => {
          if (args.onChange) {
            args.onChange(newValue);
          }
          setLocalValue(newValue);
        }}
      />
      <div style={{ height: '10vh' }} />
      <SelectInput {...args} readOnly inputValue={localValue} onChange={setLocalValue} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  highlighted: false,
  inputValue: options[0],
  isClearable: true,
  isInError: false,
  name: 'name',
  readOnly: false,
  options: options,
  placeholder: 'Select placeholder',
};
