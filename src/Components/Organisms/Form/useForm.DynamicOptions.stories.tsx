import React from 'react';
import * as yup from 'yup';

import { ColorButtonEnum } from '../../Molecules/Button';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import Section from '../../Atoms/Layout/Section';
import { IOption } from '../../Atoms';
import { ActionBar } from '../ActionBar';

export default {
  title: 'Organism/useForm',
};

interface IDataType {
  select1: string | number;
  select2: string | number;
  select3: string | number;
}

const Template = (args: IUseFormProps<IDataType>) => {
  const { formElement, getData, isModified, submit, reset } = useForm<IDataType>(args);
  return (
    <>
      <ActionBar
        title='Conditional select'
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

const option1: Array<IOption> = [
  { value: `option1_1`, label: `option1 - 1` },
  { value: `option1_2`, label: `option1 - 2` },
];

const option2: Record<string, Array<IOption>> = {
  option1_1: [
    { value: `option2_1_for_option1_1`, label: `option2 - 2 for option1 - 1` },
    { value: `option2_2_for_option1_1`, label: `option2 - 2 for option1 - 1` },
  ],
  option1_2: [
    { value: `option2_1_for_option1_2`, label: `option2 - 2 for option1 - 2` },
    { value: `option2_2_for_option1_2`, label: `option2 - 2 for option1 - 2` },
  ],
};

const option3: Record<string, Array<IOption>> = {
  option2_1_for_option1_1: [
    { value: `option3_1_for_option2_1_for_option1_1`, label: `option3 - 1 for option2 - 1 for option1 - 1` },
    { value: `option3_2_for_option2_1_for_option1_1`, label: `option3 - 2 for option2 - 1 for option1 - 1` },
  ],
  option2_2_for_option1_1: [
    { value: `option3_1_for_option2_2_for_option1_1`, label: `option3 - 1 for option2 - 2 for option1 - 1` },
    { value: `option3_2_for_option2_2_for_option1_1`, label: `option3 - 2 for option2 - 2 for option1 - 1` },
  ],
  option2_1_for_option1_2: [
    { value: `option3_1_for_option2_1_for_option1_2`, label: `option3 - 1 for option2 - 1 for option1 - 2` },
    { value: `option3_2_for_option2_1_for_option1_2`, label: `option3 - 2 for option2 - 1 for option1 - 2` },
  ],
  option2_2_for_option1_2: [
    { value: `option3_1_for_option2_2_for_option1_2`, label: `option3 - 1 for option2 - 2 for option1 - 2` },
    { value: `option3_2_for_option2_2_for_option1_2`, label: `option3 - 2 for option2 - 2 for option1 - 2` },
  ],
};

const initialData: IDataType = {
  select1: option1[0].value,
  select2: option2[option1[0].value][0].value,
  select3: option3[option2[option1[0].value][0].value][0].value,
};

const validationSchema = yup.object({
  select1: yup
    .mixed()
    .oneOf(option1.map((option) => option.value))
    .required(),
  select2: yup
    .mixed()
    .required()
    .when('select1', (select1: string | number) => {
      if (!select1) {
        return yup.mixed().required();
      }
      return yup
        .mixed()
        .oneOf(option2[select1]?.map((option) => option.value))
        .required(`option2 must be defined`);
    }),
  select3: yup
    .mixed()
    .required()
    .when('select2', (select2: string | number) => {
      if (!select2) {
        return yup.mixed().required();
      }
      return yup
        .mixed()
        .oneOf(option3[select2]?.map((option) => option.value))
        .required(`option2 must be defined`);
    }),
});

const fields: Array<IFieldAndLayoutProps<IDataType>> = [
  {
    label: 'Select 1',
    dataIndex: 'select1',
    fieldType: FieldTypeEnum.SELECT,
    options: option1,
  },
  {
    label: 'Select 2',
    dataIndex: 'select2',
    eraseValueWhenNotInOptions: true,
    fieldType: FieldTypeEnum.SELECT,
    options: (data: IDataType) => {
      if (data.select1) return option2[data.select1];
      return [];
    },
  },
  {
    label: 'Select 3',
    dataIndex: 'select3',
    eraseValueWhenNotInOptions: true,
    fieldType: FieldTypeEnum.SELECT,
    options: (data: IDataType) => {
      if (data.select2) return option3[data.select2];
      return [];
    },
  },
];

export const ConditionalSelect = Template.bind({});
ConditionalSelect.args = {
  initialData: initialData,
  fields: fields,
  validationSchema: validationSchema,
};
