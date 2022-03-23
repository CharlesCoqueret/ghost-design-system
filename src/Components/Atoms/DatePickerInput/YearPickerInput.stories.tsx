import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YearPickerInput, { IYearPickerProps } from './YearPickerInput';

export default {
  title: 'Atom/YearPickerInput',
  component: YearPickerInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof YearPickerInput>;

const Template: ComponentStory<typeof YearPickerInput> = ({ inputValue, ...args }: IYearPickerProps) => {
  const [date, setDate] = useState<number | undefined>(inputValue);

  return (
    <YearPickerInput
      {...args}
      inputValue={date}
      onChange={(v) => {
        if (args.onChange) {
          args.onChange(v);
        }
        setDate(v);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'date',
  isClearable: true,
  disabled: false,
  readOnly: false,
  highlighted: false,
  placeholder: 'Clearable year',
  inputValue: new Date().getFullYear(),
};
