import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LineEditableDataTable, { ILineEditableDataTableProps } from './LineEditableDataTable';
import { ColumnType, IColumnType } from '../StaticDataTable/types';

export default {
  title: 'Organism/LineEditableDataTable',
  component: LineEditableDataTable,
} as ComponentMeta<typeof LineEditableDataTable>;

interface demoType {
  id: string;
  name: string;
  status: string;
  price: number;
  parts: number;
  startDate: Date;
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

const Template: ComponentStory<typeof LineEditableDataTable> = (args: ILineEditableDataTableProps<demoType>) => {
  const [editedRowIndex, setEditedRowIndex] = useState<number | undefined>(undefined);
  const [data, setData] = useState<Array<demoType>>(initialData);

  const columns: IColumnType<demoType>[] = [
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
    {
      title: 'Actions',
      type: ColumnType.BUTTON,
      moreActionsMessage: 'Nore actions',
      buttons: [
        {
          icon: ['fal', 'edit'],
          label: 'Edit',
          hidden: (_row, rowIndex) => {
            return editedRowIndex === rowIndex;
          },
          onClick: (_row, rowIndex) => {
            setEditedRowIndex(rowIndex);
          },
        },
        {
          icon: ['fal', 'trash-alt'],
          label: 'Delete',
          hidden: (_row, rowIndex) => {
            return editedRowIndex === rowIndex;
          },
          onClick: (_row, rowIndex) => {
            setData((prev) => [...prev.filter((_item, index) => index !== rowIndex)]);
          },
        },
        {
          icon: ['fal', 'check'],
          label: 'Submit',
          hidden: (_row, rowIndex) => {
            return editedRowIndex !== rowIndex;
          },
          onClick: (row, rowIndex) => {
            setEditedRowIndex(undefined);
            setData((prev) => {
              prev[rowIndex] = row;
              return [...prev];
            });
          },
        },
        {
          icon: ['fal', 'times'],
          label: 'Cancel',
          hidden: (_row, rowIndex) => {
            return editedRowIndex !== rowIndex;
          },
          onClick: (row) => {
            setEditedRowIndex(undefined);
          },
        },
      ],
    },
  ];

  return (
    <LineEditableDataTable<demoType>
      data={data}
      columns={columns}
      extra={{ editedRowIndex: editedRowIndex }}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
