import React from 'react';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { Button, ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import { Link, Typography } from '../../Atoms';

export default {
  title: 'Organism/Form',
};

interface dataType {
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

const initialData: dataType = {
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
    'tempora.\n\nQuo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe ' +
    'vel consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit. ' +
    'Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea ' +
    'consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!',
  year: 1984,
};

const oldData: dataType = {
  amount: 10000,
  checkbox: cloneDeep(checkboxOption).map((option) => {
    option.checked = !option.checked;
    return option;
  }),
  date: new Date('09/24/1984'),
  multiselect: options.filter((_option, index) => index % 2 === 0).map((option) => option.value),
  number: 11,
  percentage: 51,
  select: options[3].value,
  switch: cloneDeep(switchOption).map((option) => {
    option.checked = !option.checked;
    return option;
  }),
  text: 'old text',
  textarea:
    'Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam ' +
    'rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed ' +
    'laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo ' +
    'illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio ' +
    'tempora.\n\nQuo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe ' +
    'vel consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit. ' +
    'Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea ' +
    'consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!\n\n' +
    'Lorem ipsum dolor sit amet. Ut voluptas reiciendis vel praesentium laborum hic voluptas asperiores nam ' +
    'rerum nihil obcaecati labore. Id praesentium porro ea placeat rerum aut tempore totam aut illum cupiditate sed ' +
    'laborum explicabo. Hic explicabo voluptatibus qui repellat fugiat ex voluptatum fuga qui architecto atque quo ' +
    'illum quas aut facilis nesciunt? Ut suscipit rerum ut perferendis nihil ea autem unde est enim veniam nam odio ' +
    'tempora.\n\nQuo numquam iste est repellendus numquam et galisum omnis ad praesentium dolores aut neque saepe ' +
    'vel consectetur enim aut cumque neque. Et voluptate sapiente quisquam quasi eum beatae voluptas rem iure velit. ' +
    'Sed impedit eaque 33 natus nihil est quaerat porro est quia nisi qui doloribus aperiam. Sit culpa illum ea ' +
    'consectetur perspiciatis ex veritatis dolorem id velit sequi qui maiores asperiores!',
  year: 1994,
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

const fields: Array<IFieldAndLayoutProps<dataType>> = [
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
  { label: 'Multiselect', dataIndex: 'multiselect', fieldType: FieldTypeEnum.MULTISELECT, options: options },
  {
    label: 'Section',
    fieldType: FieldTypeEnum.SECTION,
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
    label: 'Additional Section',
    fieldType: FieldTypeEnum.SECTION,
    openInitially: true,
    fields: [
      { label: 'Select', dataIndex: 'select', fieldType: FieldTypeEnum.SELECT, options: options },
      { label: 'Switch', dataIndex: 'switch', fieldType: FieldTypeEnum.SWITCH },
      { label: 'Text', dataIndex: 'text', fieldType: FieldTypeEnum.TEXT },
      { label: 'Textarea', dataIndex: 'textarea', fieldType: FieldTypeEnum.TEXTAREA },
      { label: 'Year', dataIndex: 'year', fieldType: FieldTypeEnum.YEAR },
    ],
  },
];

const Template = (args: IUseFormProps<dataType>) => {
  const { formElement, submit, reset } = useForm<dataType>({
    initialData: initialData,
    fields: fields,
    validationSchema: validationSchema,
  });
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

const HighlightedTemplate = (args: IUseFormProps<dataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<dataType>({
    initialData: initialData,
    fields: fields,
    validationSchema: validationSchema,
    previousData: oldData,
  });

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

export const Default = Template.bind({});
Default.args = {};

export const Highlighted = HighlightedTemplate.bind({});
Highlighted.args = {};
