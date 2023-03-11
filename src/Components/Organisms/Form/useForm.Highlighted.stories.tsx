import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';
import cloneDeep from 'lodash/cloneDeep';

import { IToggleEntry } from '../../Atoms/CheckBoxInput/types';
import { ColorButtonEnum } from '../../Molecules';

import useForm, { IUseFormProps } from './useForm';
import { FieldTypeEnum, IFieldAndLayoutProps } from './types';
import Section from '../../Atoms/Layout/Section';
import { Link, Typography } from '../../Atoms';
import { ActionBar } from '../ActionBar';

export default {
  title: 'Organism/useForm',
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
  const { formElement, getData, isModified, submit, reset } = useForm<IDataType>(props);

  return (
    <>
      <ActionBar
        title={title}
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
        <Link to='https://hamster.dance/hamsterdance/' text='external link' />
        <Link to='#' text='internal link' />
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
  title: 'Side by side enabled and highlighted',
  enableOldData: true,
  enableSideBySide: true,
  initialData: initialData,
  fields: fields,
  previousData: previousData,
};

export const SideBySideEnabled = Template.bind({});
SideBySideEnabled.args = {
  title: 'Side by side enabled',
  enableSideBySide: true,
  initialData: initialData,
  fields: fields,
};

export const SideBySideDisabled = Template.bind({});
SideBySideDisabled.args = {
  title: 'Side by side disabled',
  enableSideBySide: false,
  initialData: initialData,
  fields: fields,
  previousData: previousData,
};
