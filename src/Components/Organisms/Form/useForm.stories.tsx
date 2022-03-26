import React from 'react';
import * as yup from 'yup';
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
  multiselect: Array<string> | undefined;
  number: number | undefined;
  percentage: number | undefined;
  select: string | undefined;
  switch: Array<IToggleEntry> | undefined;
  text: string | undefined;
  textarea: string | undefined;
  year: number | undefined;
}

const Template = (args: IUseFormProps<IDataType>) => {
  const { formElement, submit, reset } = useForm<IDataType>(args);
  return (
    <>
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
    </>
  );
};

const checkboxOption = [
  { value: 'value 1', label: 'label 1' },
  { value: 'value 2', checked: true, label: 'label 2' },
];

const switchOption = [
  { value: 'value 1', label: 'label 1' },
  { value: 'value 2', checked: true, label: 'label 2' },
];

const options = [
  { value: 'CASE', label: 'case' },
  { value: 'CLAIM', label: 'claim' },
  { value: 'COMPANY', label: 'company' },
  { value: 'COUNTRY', label: 'country' },
];

const initialData: IDataType = {
  amount: 100000,
  checkbox: cloneDeep(checkboxOption),
  date: new Date(),
  description: 'Description',
  multiselect: options.map((option) => option.value),
  number: 10,
  percentage: 50,
  select: options[2].value,
  switch: cloneDeep(switchOption),
  text: 'text',
  textarea:
    'Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam ' +
    'rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed ' +
    'laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo ' +
    'illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio ' +
    'tempora.',
  year: 1984,
};

const validationSchema = yup.object({
  amount: yup.number().required(),
  checkbox: yup
    .array()
    .of(
      yup.object().shape({
        checked: yup.boolean(),
        value: yup.string(),
        label: yup.string(),
        highlighted: yup.boolean().optional(),
      }),
    )
    .test({
      name: 'one-true',
      message: 'At least one required',
      test: (val) => val.some((entry) => entry.checked === true),
    })
    .required(),
  date: yup.date().min(new Date('01/01/1980'), 'Date needs to be after Jan 1 1980').required(),
  description: yup.string().optional(),
  multiselect: yup.array().of(yup.string()).min(1, 'At least one item required').required(),
  number: yup.number().required('Value for number is required').min(5, 'Minimum value is 5'),
  percentage: yup.number().required(),
  select: yup.string().required(),
  switch: yup
    .array()
    .of(
      yup.object().shape({
        checked: yup.boolean(),
        value: yup.string(),
        label: yup.string(),
        highlighted: yup.boolean().optional(),
      }),
    )
    .test({
      name: 'one-true',
      message: 'At least one required',
      test: (val) => val.some((entry) => entry.checked === true),
    })
    .required(),
  text: yup
    .string()
    .required()
    .transform((value) => value.trim())
    .min(3, 'minimun length is 3 without spaces at the end of beginning'),
  textarea: yup
    .string()
    .required()
    .transform((value) => value.trim())
    .min(3, 'minimun length is 10 without spaces at the end of beginning'),
  year: yup.number().min(1984, 'Date needs to be after 1984').required(),
});

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
  {
    label: 'Multiselect',
    dataIndex: 'multiselect',
    fieldType: FieldTypeEnum.MULTISELECT,
    numberOfItemLabel: '{} item selected',
    numberOfItemsLabel: '{} items selected',
    options: options,
  },
  {
    label: 'Section collapsable and open initially',
    fieldType: FieldTypeEnum.SECTION,
    collapsable: true,
    openInitially: true,
    fields: [
      {
        label: 'Number',
        dataIndex: 'number',
        fieldType: FieldTypeEnum.NUMBER,
        mandatory: true,
      },
      {
        label: 'Percentage',
        dataIndex: 'percentage',
        fieldType: FieldTypeEnum.PERCENTAGE,
      },
    ],
  },
  {
    label: 'Section collapsable and closed initially',
    fieldType: FieldTypeEnum.SECTION,
    collapsable: true,
    openInitially: false,
    fields: [
      { label: 'Select', dataIndex: 'select', fieldType: FieldTypeEnum.SELECT, options: options },
      { label: 'Switch', dataIndex: 'switch', fieldType: FieldTypeEnum.SWITCH },
    ],
  },
  {
    label: 'Section not collapsable',
    fieldType: FieldTypeEnum.SECTION,
    collapsable: false,
    fields: [
      { label: 'Text', dataIndex: 'text', fieldType: FieldTypeEnum.TEXT },
      { label: 'Textarea', dataIndex: 'textarea', fieldType: FieldTypeEnum.TEXTAREA },
      { label: 'Year', dataIndex: 'year', fieldType: FieldTypeEnum.YEAR },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  initialData: initialData,
  fields: fields,
  validationSchema: validationSchema,
};
