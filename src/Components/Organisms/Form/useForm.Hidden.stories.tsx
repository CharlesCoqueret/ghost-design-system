import React from 'react';

import { ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import Section from '../../Atoms/Layout/Section';
import { IToggleEntry, Typography } from '../../Atoms';
import { ActionBar } from '../ActionBar';

export default {
  title: 'Organism/useForm',
};

interface IDataType {
  amount: number | undefined;
  description?: string;
  percentage: number | undefined;
  checkbox: Array<IToggleEntry>;
  year: number | undefined;
}

const Template = (args: IUseFormProps<IDataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<IDataType>(args);

  return (
    <>
      <ActionBar
        title='Hidden field'
        actions={[
          {
            label: 'Submit',
            color: ColorButtonEnum.PRIMARY,
            onClick: () => {
              console.log('submit', JSON.stringify(submit()));
            },
          },
          {
            label: 'Reset',
            color: ColorButtonEnum.SECONDARY,
            onClick: () => {
              console.log('reset', JSON.stringify(reset()));
            },
          },
        ]}
      />

      <Section title='Form' collapsible={false}>
        {formElement}
      </Section>

      <Section title='Data' openInitially={false} separator={false}>
        <pre>Has been modified: {isModified().toString()}</pre>
        Current data:
        <textarea
          style={{ width: '100%', boxSizing: 'border-box', height: '300px' }}
          value={JSON.stringify(getData(), null, 2)}
          readOnly
        />
      </Section>
    </>
  );
};

const checkboxOption = [{ value: 'value 1', label: 'When checked the date is visible' }];

const initialData: IDataType = {
  amount: 100000,
  description: 'Description',
  percentage: 50,
  checkbox: checkboxOption,
  year: 1984,
};

const fields: Array<IFieldAndLayoutProps<IDataType>> = [
  {
    description: <Typography.Text>Description should only be visible if amount is above 1000</Typography.Text>,
    fieldType: FieldTypeEnum.DESCRIPTION,
    hidden: (data: IDataType) => {
      return data.amount ? data.amount < 1000 : false;
    },
  },
  {
    label: 'Amount',
    dataIndex: 'amount',
    fieldType: FieldTypeEnum.AMOUNT,
  },
  {
    label: 'Percentage is only visible when amount is above 0',
    dataIndex: 'percentage',
    fieldType: FieldTypeEnum.PERCENTAGE,
    hidden: (data: IDataType) => {
      return data.amount ? data.amount < 0 : false;
    },
  },
  { label: 'Checbox', dataIndex: 'checkbox', fieldType: FieldTypeEnum.CHECKBOX },
  {
    label: 'Year',
    dataIndex: 'year',
    fieldType: FieldTypeEnum.YEAR,
    hidden: (data: IDataType) => {
      return !data.checkbox[0].checked;
    },
  },
];

export const WithHiddenFields = Template.bind({});
WithHiddenFields.args = {
  initialData: initialData,
  fields: fields,
};
