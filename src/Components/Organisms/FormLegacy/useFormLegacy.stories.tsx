import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { ColorButtonEnum } from '../../Molecules/Button';
import { FileStatusEnum, IFile } from '../../Atoms/FileInput';
import { Link } from '../../Atoms/Link';
import { Typography } from '../../Atoms/Typography';

import useFormLegacy, { IUseFormProps } from './useFormLegacy';
import { FieldLegacyTypeEnum, IFieldAndLayoutLegacyProps } from './types';
import Section from '../../Atoms/Layout/Section';
import { ActionBar } from '../ActionBar';

export default {
  title: 'Organism/useFormLegacy',
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
  text: string | undefined;
  textarea: string | undefined;
  year: number | undefined;
}

const Template: ComponentStory<(props: IUseFormProps<IDataType>) => ReactElement> = (
  args: IUseFormProps<IDataType>,
) => {
  const { formElement, getData, isModified, submit, reset } = useFormLegacy<IDataType>(args);
  return (
    <>
      <ActionBar
        title='useFormLegacy'
        actions={[
          {
            label: 'Submit',
            color: ColorButtonEnum.PRIMARY,
            onClick: () => {
              console.log(`Submit ${JSON.stringify(submit())}`);
            },
          },
          {
            label: 'Reset',
            color: ColorButtonEnum.SECONDARY,
            onClick: () => {
              console.log(`Reset ${JSON.stringify(reset())}`);
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
  file: [{ uid: '1', name: 'test file.png', size: 1234, type: 'image/png', status: FileStatusEnum.DONE }],
  multiselect: options.map((option) => option.value),
  number: 10,
  percentage: 50,
  richtext: '<p><span style="font-size: 16px;"><strong>Test</strong></span></p><p>Test 2</p>',
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

const validationSchema: yup.ObjectSchema<IDataType> = yup.object({
  amount: yup.number().required(),
  checkbox: yup
    .array()
    .of(
      yup.object().shape({
        checked: yup.boolean().optional(),
        highlighted: yup.boolean().optional(),
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .test({
      name: 'one-true',
      message: 'At least one required',
      test: (val) => (val ? val.some((entry) => (entry.checked || false) === true) : false),
    })
    .required(),
  date: yup.date().min(new Date('01/01/1980'), 'Date needs to be after Jan 1 1980').required(),
  description: yup.string().optional(),
  dynamicsearch: yup.string().optional(),
  file: yup
    .array()
    .of(
      yup.object({
        id: yup.string().optional(),
        uid: yup.string().optional(),
        name: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
        status: yup.mixed<FileStatusEnum>().oneOf(Object.values(FileStatusEnum)).optional(),
        progress: yup.number().optional(),
        error: yup.string().optional(),
      }),
    )
    .min(1)
    .required(),
  multiselect: yup.array().of(yup.string().required()).min(1, 'At least one item required').required(),
  number: yup.number().required('Value for number is required').min(5, 'Minimum value is 5'),
  percentage: yup.number().required(),
  richtext: yup.string().required(),
  select: yup.string().required(),
  switch: yup
    .array()
    .of(
      yup.object().shape({
        checked: yup.boolean().optional(),
        highlighted: yup.boolean().optional(),
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .test({
      name: 'one-true',
      message: 'At least one required',
      test: (val) => (val ? val.some((entry) => (entry.checked || false) === true) : false),
    })
    .required(),
  table: yup
    .array()
    .of(yup.mixed() as yup.Schema<IDataTableType>)
    .min(1)
    .required(),
  fulleditabletable: yup
    .array()
    .of(yup.mixed() as yup.Schema<IDataTableType>)
    .min(1)
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

const fields: Array<IFieldAndLayoutLegacyProps<IDataType>> = [
  {
    description: (
      <div>
        <Typography.Text>Any description</Typography.Text>
        <Link to='https://hamster.dance/hamsterdance/' text='external link' />
        <Link to='#' text='internal link' />
      </div>
    ),
    fieldType: FieldLegacyTypeEnum.DESCRIPTION,
  },
  {
    label: 'Amount',
    dataIndex: 'amount',
    fieldType: FieldLegacyTypeEnum.AMOUNT,
  },
  { label: 'Checkbox', dataIndex: 'checkbox', fieldType: FieldLegacyTypeEnum.CHECKBOX },
  { label: 'Date', dataIndex: 'date', fieldType: FieldLegacyTypeEnum.DATE },
  {
    label: 'DynamicSearch',
    dataIndex: 'dynamicsearch',
    fieldType: FieldLegacyTypeEnum.DYNAMICSEARCH,
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
    fieldType: FieldLegacyTypeEnum.FILE,
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
    fieldType: FieldLegacyTypeEnum.MULTISELECT,
    numberOfItemLabel: '{} item selected',
    numberOfItemsLabel: '{} items selected',
    options: options,
  },
  {
    label: 'Number',
    dataIndex: 'number',
    fieldType: FieldLegacyTypeEnum.NUMBER,
    mandatory: true,
  },
  {
    label: 'Percentage',
    dataIndex: 'percentage',
    fieldType: FieldLegacyTypeEnum.PERCENTAGE,
  },
  {
    label: 'Richtext',
    helperText: 'does not support data reset for performance reason, reload the form if this is needed',
    dataIndex: 'richtext',
    fieldType: FieldLegacyTypeEnum.RICHTEXT,
  },
  { label: 'Select', dataIndex: 'select', fieldType: FieldLegacyTypeEnum.SELECT, options: options },
  { label: 'Switch', dataIndex: 'switch', fieldType: FieldLegacyTypeEnum.SWITCH },
  { label: 'Text', dataIndex: 'text', fieldType: FieldLegacyTypeEnum.TEXT },
  { label: 'Textarea', dataIndex: 'textarea', fieldType: FieldLegacyTypeEnum.TEXTAREA },
  { label: 'Year', dataIndex: 'year', fieldType: FieldLegacyTypeEnum.YEAR },
];

export const Default = Template.bind({});
Default.args = {
  initialData: initialData,
  fields: fields,
  validationSchema: validationSchema,
};
