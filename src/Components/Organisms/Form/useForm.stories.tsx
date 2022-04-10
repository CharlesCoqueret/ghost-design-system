import React from 'react';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { Button, ColorButtonEnum } from '../../Molecules/Button';
import { IFile } from '../../Atoms/FileInput';
import { Link } from '../../Atoms/Link';
import { Typography } from '../../Atoms/Typography';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps, IFieldTableProps } from './types';
import { ColumnType } from '../DataTable/Common';

export default {
  title: 'Organism/useForm',
};

type IDataTableType = {
  number: number;
  text: string;
};

interface IDataType {
  amount: number | undefined;
  checkbox: Array<IToggleEntry>;
  date: Date | undefined | null;
  description?: string;
  dynamicsearch?: string;
  file: Array<IFile>;
  multiselect: Array<string> | undefined;
  number: number | undefined;
  percentage: number | undefined;
  richtext: string;
  select: string | undefined;
  switch: Array<IToggleEntry> | undefined;
  table: Array<IDataTableType>;
  text: string | undefined;
  textarea: string | undefined;
  year: number | undefined;
}

const Template = (args: IUseFormProps<IDataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<IDataType>(args);
  return (
    <div>
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
        <textarea
          style={{ width: '100%', boxSizing: 'border-box', height: '300px' }}
          value={JSON.stringify(getData(), null, 2)}
          readOnly
        />
      </div>
    </div>
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
  dynamicsearch: 'value1',
  file: [],
  multiselect: options.map((option) => option.value),
  number: 10,
  percentage: 50,
  richtext: '<p><span style="font-size: 16px;"><strong>Test</strong></span></p><p>Test 2</p>',
  select: options[2].value,
  switch: cloneDeep(switchOption),
  table: [
    { number: 1, text: 'text 1' },
    { number: 2, text: 'text 2' },
    { number: 3, text: 'text 3' },
  ],
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
  dynamicsearch: yup.mixed().optional(),
  file: yup.array().min(1).required(),
  multiselect: yup.array().of(yup.mixed()).min(1, 'At least one item required').required(),
  number: yup.number().required('Value for number is required').min(5, 'Minimum value is 5'),
  percentage: yup.number().required(),
  richtext: yup.string().required(),
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
  table: yup.array().min(1).required(),
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
        <Link link='https://hamster.dance/hamsterdance/' text='external link' />
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
    label: 'DynamicSearch',
    dataIndex: 'dynamicsearch',
    fieldType: FieldTypeEnum.DYNAMICSEARCH,
    noOptionsMessage: () => 'No option',
    resolveValue: (value) => {
      if (value === 'value1') return Promise.resolve({ value: 'value1', label: 'Label 1' });
      else if (value === 'value2') return Promise.resolve({ value: 'value2', label: 'Label 2' });
      else if (value === 'value3') return Promise.resolve({ value: 'value3', label: 'Label 3' });
      return Promise.resolve(undefined);
    },
    searchOptions: () => {
      return Promise.resolve([
        { value: 'value1', label: 'Label 1' },
        { value: 'value2', label: 'Label 2' },
        { value: 'value3', label: 'Label 3' },
      ]);
    },
  },
  {
    dataIndex: 'file',
    fieldType: FieldTypeEnum.FILE,
    helperText: 'does not support data reset as uploaded files are now uploaded, and deleted files are deleted',
    label: 'File',
    onDelete: () => {
      return Promise.resolve();
    },
    requestMethod: 'POST',
    requestUrl: 'https://file-upload-tester.herokuapp.com/upload/file',
  },
  {
    label: 'Multiselect',
    dataIndex: 'multiselect',
    fieldType: FieldTypeEnum.MULTISELECT,
    numberOfItemLabel: '{} item selected',
    numberOfItemsLabel: '{} items selected',
    options: options,
  },
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
  {
    label: 'Richtext',
    helperText: 'does not support data reset for performance reason, reload the form if this is needed',
    dataIndex: 'richtext',
    fieldType: FieldTypeEnum.RICHTEXT,
  },
  { label: 'Select', dataIndex: 'select', fieldType: FieldTypeEnum.SELECT, options: options },
  { label: 'Switch', dataIndex: 'switch', fieldType: FieldTypeEnum.SWITCH },
  {
    columns: [
      {
        dataIndex: 'number',
        editable: true,
        title: 'Number',
        type: ColumnType.NUMBER,
      },
      {
        dataIndex: 'text',
        editable: true,
        title: 'Text',
        type: ColumnType.TEXT,
      },
    ],
    dataIndex: 'table',
    extra: {
      validationSchema: yup.object({
        number: yup.number().required(),
        text: yup.string().required(),
      }),
      onRowDelete: () => {
        // Enabling deletion
        return;
      },
      canAddNewLine: () => {
        // Enabling Add new line
        return true;
      },
      onNewLine: () => ({ number: 100, text: 'text' }),
    },
    fieldType: FieldTypeEnum.TABLE,
    label: 'Table',
  } as IFieldTableProps<IDataType, IDataTableType>,
  { label: 'Text', dataIndex: 'text', fieldType: FieldTypeEnum.TEXT },
  { label: 'Textarea', dataIndex: 'textarea', fieldType: FieldTypeEnum.TEXTAREA },
  { label: 'Year', dataIndex: 'year', fieldType: FieldTypeEnum.YEAR },
];

export const Default = Template.bind({});
Default.args = {
  initialData: initialData,
  fields: fields,
  validationSchema: validationSchema,
};
