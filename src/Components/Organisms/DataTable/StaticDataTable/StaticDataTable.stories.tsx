import React, { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StaticDataTable, { IStaticDataTableProps } from './StaticDataTable';
import { ColumnType, IColumnType } from '../Common/types';
import { Icon } from '../../../Atoms';

export default {
  title: 'Organism/DataTable/StaticDataTable',
  component: StaticDataTable,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof StaticDataTable>;

const columns: IColumnType<IDemoType>[] = [
  {
    title: 'Code',
    dataIndex: 'id',
    sorter: true,
    type: ColumnType.CODE,
    width: '70px',
  },
  {
    title: 'Text',
    dataIndex: 'name',
    type: ColumnType.TEXT,
    ellipsis: true,
    sorter: true,
    width: '20%',
  },
  {
    title: 'Badge',
    dataIndex: 'status',
    sorter: true,
    type: ColumnType.BADGE,
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
  },
  {
    title: 'Percentage',
    dataIndex: 'parts',
    sorter: true,
    type: ColumnType.PERCENTAGE,
  },
  {
    title: 'Date',
    dataIndex: 'startDate',
    sorter: true,
    type: ColumnType.DATE,
  },
  {
    title: 'Actions',
    type: ColumnType.BUTTON,
    moreActionsMessage: 'Nore actions',
    buttons: [
      {
        icon: ['fal', 'arrow-to-bottom'],
        label: 'Download',
        onClick: (row) => {
          console.log(`download icon clicked on row: ${row.id}`);
        },
      },
      {
        icon: ['fal', 'eye'],
        label: 'Watch',
        onClick: (row) => {
          console.log(`Eye icon clicked on row: ${row.id}`);
        },
      },
    ],
  },
];

interface IDemoType {
  id: string;
  name: string;
  status: string;
  price: number;
  parts: number;
  startDate: Date;
}

const data = [
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

const Template: ComponentStory<(args: IStaticDataTableProps<IDemoType>) => ReactElement> = (
  args: IStaticDataTableProps<IDemoType>,
) => {
  return <StaticDataTable<IDemoType> {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  data: data,
  columns: columns,
};

export const ClickableRow = Template.bind({});
ClickableRow.args = {
  data: data,
  columns: columns,
  extra: {
    onRowClick: (row: IDemoType) => {
      console.log(`clicked row: ${row.id}`);
    },
  },
};

export const SelectableRows = Template.bind({});
SelectableRows.args = {
  data: data,
  columns: columns,
  extra: {
    onRowSelect: (rows: Array<IDemoType>, row: IDemoType) => {
      console.log(`Number of rows selected: ${rows.length}\nClicked row: ${row.id}`);
    },
    isSelectable: (row: IDemoType) => {
      return row.id !== 'UGA';
    },
  },
};

export const ComputeTotal = Template.bind({});
ComputeTotal.args = {
  data: data,
  columns: columns,
  extra: {
    computeTotal: (data: Array<IDemoType>, dataIndex: keyof IDemoType) => {
      if (dataIndex === 'price' || dataIndex === 'parts') {
        return data
          .map((row: IDemoType) => {
            return row[dataIndex];
          })
          .reduce((a, b) => Number(a) + Number(b), 0);
      } else {
        return '-';
      }
    },
  },
};

export const SelectableAndComputeTotal = Template.bind({});
SelectableAndComputeTotal.args = {
  data: data,
  columns: columns,
  extra: {
    onRowSelect: (rows: Array<IDemoType>, row: IDemoType) => {
      console.log(`Number of rows selected: ${rows.length}\nClicked row: ${row.id}`);
    },
    computeTotal: (data: Array<IDemoType>, dataIndex: keyof IDemoType) => {
      if (dataIndex === 'price' || dataIndex === 'parts') {
        return data
          .map((row: IDemoType) => {
            return row[dataIndex];
          })
          .reduce((a, b) => Number(a) + Number(b), 0);
      } else {
        return '-';
      }
    },
  },
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  columns: columns,
  extra: {
    onRowSelect: (rows: Array<IDemoType>, row: IDemoType) => {
      console.log(`Number of rows selected: ${rows.length}\nClicked row: ${row.id}`);
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  data: data,
  columns: columns,
  loading: (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Icon icon={['fal', 'spinner']} size='3x' spin />
    </div>
  ),
  extra: {
    onRowSelect: (rows: Array<IDemoType>, row: IDemoType) => {
      console.log(`Number of rows selected: ${rows.length}\nClicked row: ${row.id}`);
    },
    computeTotal: (data: Array<IDemoType>, dataIndex: keyof IDemoType) => {
      if (dataIndex === 'price' || dataIndex === 'parts') {
        return data
          .map((row: IDemoType) => {
            return row[dataIndex];
          })
          .reduce((a, b) => Number(a) + Number(b), 0);
      } else {
        return '-';
      }
    },
  },
};
