import React from 'react';
import * as yup from 'yup';

import { Button, ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import { IOption } from '../../Atoms';

export default {
  title: 'Organism/useForm',
};

interface dataType {
  select1: string;
  select2: string;
  select3: string;
}

const Template = (args: IUseFormProps<dataType>) => {
  const { formElement, submit, reset } = useForm<dataType>(args);
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

const initialData: dataType = {
  select1: option1[0].value,
  select2: option2[option1[0].value][0].value,
  select3: option3[option2[option1[0].value][0].value][0].value,
};

const validationSchema = yup.object({
  select1: yup
    .string()
    .oneOf(option1.map((option) => option.value))
    .required(),
  select2: yup
    .string()
    .required()
    .when('select1', (select1: string) => {
      if (!select1) {
        return yup.string().required();
      }
      return yup
        .string()
        .oneOf(option2[select1]?.map((option) => option.value))
        .required(`option2 must be on of ${option2[select1].map((option) => option.label)}`);
    }),
  select3: yup
    .string()
    .required()
    .when('select2', (select2: string) => {
      if (!select2) {
        return yup.string().required();
      }
      return yup
        .string()
        .oneOf(option3[select2]?.map((option) => option.value))
        .required(`option3 must be on of ${option3[select2].map((option) => option.label)}`);
    }),
});

const fields: Array<IFieldAndLayoutProps<dataType>> = [
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
    options: (data: dataType) => {
      if (data.select1) return option2[data.select1];
      return [];
    },
  },
  {
    label: 'Select 3',
    dataIndex: 'select3',
    eraseValueWhenNotInOptions: true,
    fieldType: FieldTypeEnum.SELECT,
    options: (data: dataType) => {
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
