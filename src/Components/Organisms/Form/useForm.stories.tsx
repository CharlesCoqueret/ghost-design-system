import React, { ReactElement, useState } from 'react';
import { ComponentStory } from '@storybook/react';
import * as yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import Section from '../../Atoms/Layout/Section';
import { ButtonColorEnum } from '../../Molecules/Button';
import { AmountField } from '../../Molecules/AmountField/AmountField';
import { CheckboxField } from '../../Molecules/CheckboxField/CheckboxField';
import { DatePickerField } from '../../Molecules/DatePickerField/DatePickerField';
import { ActionBar } from '../ActionBar';

import useForm, { IUseFormProps } from './useForm';
import Form from './Form';

export default {
  title: 'Organism/useForm',
};

interface IDataType {
  amount: number | undefined;
  checkbox: Array<IToggleEntry>;
  date: Date | undefined;
}

const Template: ComponentStory<(props: IUseFormProps<IDataType>) => ReactElement> = (
  args: IUseFormProps<IDataType>,
) => {
  const [values, setValues] = useState(cloneDeep(args.values));

  const { fieldsProps, submit, reset, hasBeenSubmitted } = useForm<IDataType>({
    ...args,
    values: values,
    onChange: (key, value) => {
      console.log(key, value);
      setValues((prev) => {
        return { ...prev, [key]: value };
      });
    },
  });
  return (
    <>
      <ActionBar
        title='useForm'
        actions={[
          {
            label: 'Submit',
            color: ButtonColorEnum.PRIMARY,
            onClick: () => {
              console.log(`Submit ${JSON.stringify(submit())}`);
            },
          },
          {
            label: 'Reset',
            color: ButtonColorEnum.SECONDARY,
            onClick: () => {
              console.log(`Reset ${JSON.stringify(reset())}`);
              setValues(args.values);
            },
          },
        ]}
      />
      <Section title='Form' collapsible={false} separator={false}>
        <Form>
          <AmountField
            label='Amount'
            {...fieldsProps.amount}
            errorMessage={hasBeenSubmitted ? fieldsProps.amount.errorMessage : undefined}
          />
          <CheckboxField
            label='Checkbox'
            {...fieldsProps.checkbox}
            errorMessage={hasBeenSubmitted ? fieldsProps.checkbox.errorMessage : undefined}
          />
          <DatePickerField
            label='DatePicker'
            {...fieldsProps.date}
            errorMessage={hasBeenSubmitted ? fieldsProps.date.errorMessage : undefined}
          />
        </Form>
      </Section>
    </>
  );
};

const initialValues: IDataType = {
  amount: 100000,
  checkbox: [
    { value: 'value 1', label: 'label 1' },
    { value: 'value 2', checked: true, label: 'label 2' },
  ],
  date: new Date(),
};

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
  date: yup
    .date()
    .required('Date is required')
    .default(undefined)
    .min('01/01/1980', 'Date needs to be after Jan 1 1980'),
});

export const Basic = Template.bind({});
Basic.args = {
  values: initialValues,
  validationSchema: validationSchema,
};
