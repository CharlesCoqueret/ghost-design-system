import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatePickerField, { IDatePickerFieldProps } from './DatePickerField';
import { DateFormatEnum, Icon, importFnsLocaleFile } from '../..';

export default {
  title: 'Molecule/DatePickerField',
  component: DatePickerField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof DatePickerField>;

const Template: ComponentStory<typeof DatePickerField> = ({ inputValue, ...args }: IDatePickerFieldProps) => {
  const [loading, setLoading] = useState(false);
  const [localValue, setLocalValue] = useState<Date | null | undefined>(inputValue);

  useEffect(() => {
    const loadLocale = async (): Promise<void> => {
      if (args.locale) {
        setLoading(true);
        await importFnsLocaleFile(args.locale)
          .catch(console.error)
          .finally(() => {
            setLoading(false);
          });
        return;
      }
    };

    loadLocale();
  }, [args.locale]);

  if (loading)
    return (
      <>
        <Icon icon={['fal', 'spinner']} size='2x' />
        Loading locale
      </>
    );

  return <DatePickerField {...args} inputValue={localValue} onChange={setLocalValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Date picker field',
  name: 'name',
  locale: 'fr',
  placeholder: 'Select a date',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'Date picker field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  placeholder: 'Date picker placeholder',
  readOnly: true,
  inputValue: new Date(),
};

export const Error = Template.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Date picker field in error with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  placeholder: 'Date picker placeholder',
  errorMessage: 'This text is on error',
  inputValue: new Date(),
};

export const Helper = Template.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Date picker field with helper and counter',
  mandatory: true,
  name: 'name',
  placeholder: 'Date picker placeholder',
};

export const InLine = Template.bind({});
InLine.args = {
  name: 'name',
  label: 'Date picker inline mandatory',
  inline: true,
  mandatory: true,
  dateFormat: DateFormatEnum.MDY,
  isClearable: true,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  readOnly: true,
  label: 'Date picker field highlighted',
  name: 'name',
  placeholder: 'Date picker placeholder',
  inputValue: new Date(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Date picker field disabled',
  name: 'name',
  placeholder: 'Date picker placeholder',
  inputValue: new Date(),
};
