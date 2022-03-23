import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatePickerInput, { IDatePickerProps } from './DatePickerInput';
import { DateFormatEnum, WeekDayEnum } from './types';

export default {
  title: 'Atom/DatePickerInput',
  component: DatePickerInput,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof DatePickerInput>;

const Template: ComponentStory<typeof DatePickerInput> = ({ inputValue, ...args }: IDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(inputValue ? inputValue : null);

  return (
    <DatePickerInput
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
  placeholder: 'Clearable date',
  calendarStartDay: WeekDayEnum.MONDAY,
  dateFormat: DateFormatEnum.MMMddyyyy,
  inputValue: new Date(),
};
