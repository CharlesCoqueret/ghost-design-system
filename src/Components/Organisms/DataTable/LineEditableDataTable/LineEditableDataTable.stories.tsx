import React, { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import LineEditableDataTable, { ILineEditableDataTableProps } from './LineEditableDataTable';
import { ColumnType, IColumnType } from '../Common/types';

export default {
  title: 'Organism/DataTable/LineEditableDataTable',
  component: LineEditableDataTable,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof LineEditableDataTable>;

interface IDemoType {
  dynamicSearch: string;
  id: string;
  name?: string;
  hidden?: string;
  status?: string;
  price?: number;
  parts?: number;
  startDate?: Date;
}

const initialData = [
  {
    dynamicSearch: 'test',
    id: 'UGA',
    name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    hidden: 'hidden value',
    status: 'INACTIVE',
    price: -100000,
    parts: -10,
    startDate: new Date(2021, 2, 24),
  },
  {
    dynamicSearch: 'test',
    id: 'ARE',
    name: 'Consecte',
    hidden: 'hidden value',
    status: 'ACTIVE',
    price: -2500000,
    parts: 15,
    startDate: new Date(2021, 1, 13),
  },
  {
    dynamicSearch: 'test',
    id: 'GBR',
    name: 'Sed',
    hidden: 'hidden value',
    status: 'IN_PROGRESS',
    price: 150000,
    parts: 3,
    startDate: new Date(2021, 1, 4),
  },
  {
    dynamicSearch: 'test',
    id: 'JUF',
    name: 'dolore eu fugiat nulla pariatur',
    hidden: 'hidden value',
    status: 'IN_PROGRESS',
    price: -354000,
    parts: 70,
    startDate: new Date(2021, 1, 15),
  },
  {
    dynamicSearch: 'test',
    id: 'YAI',
    name: 'Sed ut perspiciatis',
    hidden: 'hidden value',
    status: 'ACTIVE',
    price: 4150000,
    parts: 30,
    startDate: new Date(2021, 2, 17),
  },
  {
    dynamicSearch: 'test',
    id: 'SML',
    name: 'Ut enim ad minima veniam',
    hidden: 'hidden value',
    status: 'ACTIVE',
    price: -70500,
    parts: 10,
    startDate: new Date(2021, 3, 10),
  },
];

const columns: IColumnType<IDemoType>[] = [
  {
    title: 'Code',
    dataIndex: 'id',
    sorter: true,
    type: ColumnType.CODE,
  },
  {
    title: 'Text',
    dataIndex: 'name',
    type: ColumnType.TEXT,
    ellipsis: true,
    sorter: true,
    editable: true,
  },
  {
    title: 'Hidden',
    dataIndex: 'hidden',
    type: ColumnType.TEXT,
    editable: true,
    hidden: true,
  },
  {
    title: 'Badge',
    dataIndex: 'status',
    sorter: true,
    type: ColumnType.BADGE,
    editable: true,
    options: [
      { label: 'Inactive', value: 'INACTIVE' },
      { label: 'In progress', value: 'IN_PROGRESS' },
      { label: 'Active', value: 'ACTIVE' },
    ],
  },
  {
    title: 'Amount',
    dataIndex: 'price',
    sorter: true,
    type: ColumnType.AMOUNT,
    currency: '€',
    editable: true,
  },
  {
    title: 'Dynamic Search',
    dataIndex: 'dynamicSearch',
    type: ColumnType.DYNAMICSEARCH,
    editable: true,
    resolveValue: () => {
      return Promise.resolve({ value: 'test', label: 'LABEL 1' });
    },
    noOptionsMessage: () => {
      return 'No results';
    },
    searchOptions: () => {
      return Promise.resolve([
        { value: 'test', label: 'LABEL 1' },
        { value: 'test2', label: 'LABEL 2' },
      ]);
    },
  },
  {
    title: 'Percentage',
    dataIndex: 'parts',
    sorter: true,
    type: ColumnType.PERCENTAGE,
    editable: true,
  },
  {
    title: 'Date',
    dataIndex: 'startDate',
    sorter: true,
    type: ColumnType.DATE,
    editable: true,
  },
];

const validationSchema: yup.SchemaOf<IDemoType> = yup.object({
  dynamicSearch: yup.mixed().optional(),
  hidden: yup.string().required(),
  id: yup.string().required(),
  name: yup.string().required(),
  status: yup.string().required(),
  price: yup.number().required(),
  parts: yup.number().required(),
  startDate: yup.date().min(new Date(), 'start date must be after today').required(),
});

const Template: ComponentStory<(args: ILineEditableDataTableProps<IDemoType>) => ReactElement> = (
  args: ILineEditableDataTableProps<IDemoType>,
) => {
  return <LineEditableDataTable<IDemoType> {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  data: initialData,
  columns: columns,
  extra: {
    onRowDelete: () => {
      return;
    },
    onRowDownload: () => {
      return;
    },
    onRowSubmit: () => {
      return;
    },
    canAddNewLine: () => true,
    onNewLine: () => {
      return {
        id: 'TEST',
      };
    },
    isEditable: (row) => {
      return row.id !== 'GBR';
    },
    validationSchema: validationSchema,
  },
};
