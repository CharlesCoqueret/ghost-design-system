import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';
import cloneDeep from 'lodash/cloneDeep';
import * as yup from 'yup';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { ButtonColorEnum } from '../../Molecules';

import useFormLegacy, { IUseFormProps } from './useFormLegacy';
import { FieldLegacyTypeEnum, IFieldAndLayoutLegacyProps } from './types';
import Section from '../../Atoms/Layout/Section';
import { Link, Typography } from '../../Atoms';
import { ActionBar } from '../ActionBar';

export default {
  title: 'Organism/useFormLegacy',
};

interface IDataType {
  amount: number | undefined;
  checkbox: Array<IToggleEntry>;
  date: Date | undefined | null;
  description?: string;
}

const Template: ComponentStory<(props: IUseFormProps<IDataType> & { title: string }) => ReactElement> = (
  args: IUseFormProps<IDataType> & { title: string },
) => {
  const { title, ...props } = args;
  const { formElement, getData, isModified, submit, reset } = useFormLegacy<IDataType>(props);

  return (
    <>
      <ActionBar
        title={title}
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

const fields: Array<IFieldAndLayoutLegacyProps<IDataType>> = [
  {
    description: (
      <div>
        <Typography.Text>Any description</Typography.Text>
        <Link to='https://hamster.dance/hamsterdance/' text='external link' externalLink />
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
  date: yup.date().required(),
  percentage: yup.number().optional(),
  year: yup.number().required(),
});

export const Highlighted = Template.bind({});
Highlighted.args = {
  enableOldData: true,
  enableSideBySide: true,
  fields: fields,
  initialData: initialData,
  previousData: previousData,
  title: 'useFormLegacy - Side by side enabled and highlighted',
  validationSchema: validationSchema,
};

export const SideBySideEnabled = Template.bind({});
SideBySideEnabled.args = {
  enableSideBySide: true,
  fields: fields,
  initialData: initialData,
  title: 'useFormLegacy - Side by side enabled',
  validationSchema: validationSchema,
};

export const SideBySideDisabled = Template.bind({});
SideBySideDisabled.args = {
  enableSideBySide: false,
  fields: fields,
  initialData: initialData,
  previousData: previousData,
  title: 'useFormLegacy - Side by side disabled',
  validationSchema: validationSchema,
};
