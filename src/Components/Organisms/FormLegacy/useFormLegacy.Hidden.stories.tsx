import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';
import * as yup from 'yup';

import Section from '../../Atoms/Layout/Section';
import { Typography } from '../../Atoms/Typography';
import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { ButtonColorEnum } from '../../Molecules/Button/Button';
import ActionBar from '../ActionBar/ActionBar';

import useFormLegacy, { IUseFormProps } from './useFormLegacy';
import { FieldLegacyTypeEnum, IFieldAndLayoutLegacyProps } from './types';

export default {
  title: 'Organism/useFormLegacy',
};

interface IDataType {
  amount: number | undefined;
  description?: string;
  percentage: number | undefined;
  checkbox: Array<IToggleEntry>;
  year: number | undefined;
}

const Template: ComponentStory<(props: IUseFormProps<IDataType>) => ReactElement> = (
  args: IUseFormProps<IDataType>,
) => {
  const { formElement, getData, isModified, submit, reset } = useFormLegacy<IDataType>(args);

  return (
    <>
      <ActionBar
        title='useFormLegacy - Hidden field'
        actions={[
          {
            label: 'Submit',
            color: ButtonColorEnum.PRIMARY,
            onClick: () => {
              console.log('submit', JSON.stringify(submit()));
            },
          },
          {
            label: 'Reset',
            color: ButtonColorEnum.SECONDARY,
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

const fields: Array<IFieldAndLayoutLegacyProps<IDataType>> = [
  {
    description: <Typography.Text>Description should only be visible if amount is above 1000</Typography.Text>,
    fieldType: FieldLegacyTypeEnum.DESCRIPTION,
    hidden: (data: IDataType) => {
      return data.amount ? data.amount < 1000 : false;
    },
  },
  {
    label: 'Amount',
    dataIndex: 'amount',
    fieldType: FieldLegacyTypeEnum.AMOUNT,
  },
  {
    label: 'Percentage is only visible when amount is above 0',
    dataIndex: 'percentage',
    fieldType: FieldLegacyTypeEnum.PERCENTAGE,
    hidden: (data: IDataType) => {
      return data.amount ? data.amount < 0 : false;
    },
  },
  { label: 'Checbox', dataIndex: 'checkbox', fieldType: FieldLegacyTypeEnum.CHECKBOX },
  {
    label: 'Year',
    dataIndex: 'year',
    fieldType: FieldLegacyTypeEnum.YEAR,
    hidden: (data: IDataType) => {
      return !data.checkbox[0].checked;
    },
  },
];

const validationSchema: yup.ObjectSchema<IDataType> = yup.object({
  amount: yup.number().required('Amount is required'),
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
  description: yup.string().optional(),
  percentage: yup.number().optional(),
  year: yup.number().required(),
});

export const WithHiddenFields = Template.bind({});
WithHiddenFields.args = {
  initialData: initialData,
  validationSchema: validationSchema,
  fields: fields,
};
