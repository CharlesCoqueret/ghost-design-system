import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatePickerInput, { IDatePickerProps } from './DatePickerInput';
import { DateFormatEnum, WeekDayEnum } from './types';
import { importFnsLocaleFile } from './dateUtils';
import { Icon } from '../Icon';

export default {
  title: 'Atom/DatePickerInput',
  component: DatePickerInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof DatePickerInput>;

const Template: ComponentStory<typeof DatePickerInput> = ({ inputValue, ...args }: IDatePickerProps) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(inputValue ? inputValue : null);

  useEffect(() => {
    const loadLocale = async () => {
      setLoading(true);
      if (args.locale) {
        await importFnsLocaleFile(args.locale)
          .catch(console.error)
          .finally(() => {
            setLoading(false);
          });
      }
    };

    loadLocale();
  }, [args.locale]);

  if (loading)
    return (
      <>
        <Icon icon={['fal', 'spinner']} size='1x' />
        Loading locale
      </>
    );

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
  calendarStartDay: WeekDayEnum.MONDAY,
  dateFormat: DateFormatEnum.MMMddyyyy,
  disabled: false,
  highlighted: false,
  inputValue: new Date(),
  isClearable: true,
  locale: 'fr',
  name: 'date',
  placeholder: 'Clearable date',
  readOnly: false,
};
