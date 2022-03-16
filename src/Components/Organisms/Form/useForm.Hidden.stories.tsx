import React from 'react';

import { Button, ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import { IToggleEntry, Typography } from '../../Atoms';

export default {
  title: 'Organism/useForm',
};

interface dataType {
  amount: number | undefined;
  date: Date | undefined | null;
  description?: string;
  number: number | undefined;
  percentage: number | undefined;
  checkbox: Array<IToggleEntry>;
  year: number | undefined;
}

const Template = (args: IUseFormProps<dataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<dataType>(args);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography.Title level={1}>Some fields can be hidden conditionally</Typography.Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          label='Submit'
          onClick={() => {
            console.log('submit', JSON.stringify(submit()));
          }}
          color={ColorButtonEnum.PRIMARY}
        />
        <Button
          label='Reset'
          onClick={() => {
            console.log('reset', JSON.stringify(reset()));
          }}
          color={ColorButtonEnum.SECONDARY}
        />
      </div>
      <div>{formElement}</div>
      <div>
        <pre>Has been modified: {isModified().toString()}</pre>
      </div>
      <div>
        Current data:
        <textarea style={{ width: '100%', height: '300px' }} value={JSON.stringify(getData(), null, 2)} readOnly />
      </div>
    </>
  );
};

const checkboxOption = [{ value: 'value 1', label: 'When checked the magic happens' }];

const initialData: dataType = {
  amount: 100000,
  date: new Date(),
  description: 'Description',
  number: 10,
  percentage: 50,
  checkbox: checkboxOption,
  year: 1984,
};

const fields: Array<IFieldAndLayoutProps<dataType>> = [
  {
    description: (
      <div>
        <Typography.Text>Description should only be visible if amount is above 1000</Typography.Text>
      </div>
    ),
    fieldType: FieldTypeEnum.DESCRIPTION,
    hidden: (data: dataType) => {
      return data.amount < 1000;
    },
  },
  {
    label: 'Amount',
    dataIndex: 'amount',
    fieldType: FieldTypeEnum.AMOUNT,
  },
  { label: 'Date', dataIndex: 'date', fieldType: FieldTypeEnum.DATE },
  {
    label: 'Number',
    dataIndex: 'number',
    fieldType: FieldTypeEnum.NUMBER,
    mandatory: true,
  },
  {
    label: 'Percentage is only visible when number is above 0',
    dataIndex: 'percentage',
    fieldType: FieldTypeEnum.PERCENTAGE,
    hidden: (data: dataType) => {
      return data.number < 0;
    },
  },
  { label: 'Checbox', dataIndex: 'checkbox', fieldType: FieldTypeEnum.CHECKBOX },
  {
    label: 'Year',
    dataIndex: 'year',
    fieldType: FieldTypeEnum.YEAR,
    hidden: (data: dataType) => {
      return !data.checkbox[0].checked;
    },
  },
];

export const WithHiddenFields = Template.bind({});
WithHiddenFields.args = {
  initialData: initialData,
  fields: fields,
};
