import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import LineEditableDataTable, { ILineEditableDataTableProps } from './LineEditableDataTable';
import { ColumnType, IColumnType } from '../StaticDataTable/types';

export default {
  title: 'Organism/LineEditableDataTable',
  component: LineEditableDataTable,
} as ComponentMeta<typeof LineEditableDataTable>;

interface IDemoType {
  id: string;
  name?: string;
  status?: string;
  price?: number;
  parts?: number;
  startDate?: Date;
}

const initialData = [
  {
    id: 'UGA',
    name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    status: 'INACTIVE',
    price: -100000,
    parts: -10,
    startDate: new Date(2021, 2, 24),
  },
  {
    id: 'ARE',
    name: 'Consecte',
    status: 'ACTIVE',
    price: -2500000,
    parts: 15,
    startDate: new Date(2021, 1, 13),
  },
  {
    id: 'GBR',
    name: 'Sed',
    status: 'IN_PROGRESS',
    price: 150000,
    parts: 3,
    startDate: new Date(2021, 1, 4),
  },
  {
    id: 'JUF',
    name: 'dolore eu fugiat nulla pariatur',
    status: 'IN_PROGRESS',
    price: -354000,
    parts: 70,
    startDate: new Date(2021, 1, 15),
  },
  {
    id: 'YAI',
    name: 'Sed ut perspiciatis',
    status: 'ACTIVE',
    price: 4150000,
    parts: 30,
    startDate: new Date(2021, 2, 17),
  },
  {
    id: 'SML',
    name: 'Ut enim ad minima veniam',
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
  id: yup.string().required(),
  name: yup.string().required(),
  status: yup.string().required(),
  price: yup.number().required(),
  parts: yup.number().required(),
  startDate: yup.date().min(new Date(), 'start date must be after today').required(),
});

const Template: ComponentStory<typeof LineEditableDataTable> = (args: ILineEditableDataTableProps<IDemoType>) => {
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
