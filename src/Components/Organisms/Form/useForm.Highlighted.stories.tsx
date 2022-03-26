import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { Button, ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import { Link, Typography } from '../../Atoms';

export default {
  title: 'Organism/useForm',
};

interface IDataType {
  amount: number | undefined;
  checkbox: Array<IToggleEntry>;
  date: Date | undefined | null;
  description?: string;
}

const Template = (args: IUseFormProps<IDataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<IDataType>(args);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography.Title level={1}>With changed highlighted</Typography.Title>
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

const checkboxOption = [
  { value: 'value 1', label: 'label 1' },
  { value: 'value 2', checked: true, label: 'label 2' },
];

const initialData: IDataType = {
  amount: 100000,
  checkbox: cloneDeep(checkboxOption),
  date: new Date(),
  description: 'Description',
};

const previousData: IDataType = {
  amount: 10000,
  checkbox: cloneDeep(checkboxOption).map((option) => {
    option.checked = !option.checked;
    return option;
  }),
  date: new Date('09/24/1984'),
};

const fields: Array<IFieldAndLayoutProps<IDataType>> = [
  {
    description: (
      <div>
        <Typography.Text>Any description</Typography.Text>
        <Link link='http://google.com' text='external link' />
        <Link link='#' text='internal link' />
      </div>
    ),
    fieldType: FieldTypeEnum.DESCRIPTION,
  },
  {
    label: 'Amount',
    dataIndex: 'amount',
    fieldType: FieldTypeEnum.AMOUNT,
  },
  { label: 'Checkbox', dataIndex: 'checkbox', fieldType: FieldTypeEnum.CHECKBOX },
  { label: 'Date', dataIndex: 'date', fieldType: FieldTypeEnum.DATE },
];

export const Highlighted = Template.bind({});
Highlighted.args = {
  initialData: initialData,
  fields: fields,
  previousData: previousData,
};
