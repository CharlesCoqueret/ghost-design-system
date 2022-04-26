import React, { ReactElement, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import LineEditableDataTable, { ILineEditableDataTableProps } from './LineEditableDataTable';
import { ColumnType, IColumnType } from '../Common/types';
import { Icon } from '../../../Atoms/Icon';

export default {
  title: 'Organism/DataTable/LineEditableDataTable',
  component: LineEditableDataTable,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof LineEditableDataTable>;

interface IDemoType {
  dynamicSearch: string;
  id: string;
  name?: string;
  status?: string;
  price?: number;
  parts?: number;
  startDate?: Date;
}

const initialData = [];

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

const columns: IColumnType<IDemoType>[] = [
  {
    title: 'Code',
    dataIndex: 'id',
    sorter: true,
    type: ColumnType.CODE,
    hiddenInForm: true,
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
    options: [],
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
      return Promise.resolve(undefined);
    },
    noOptionsMessage: () => {
      return 'No results';
    },
    searchOptions: () => {
      return Promise.resolve([]);
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

const Template: ComponentStory<(args: ILineEditableDataTableProps<IDemoType>) => ReactElement> = (
  args: ILineEditableDataTableProps<IDemoType>,
) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <LineEditableDataTable<IDemoType>
      {...args}
      loading={loading ? <Icon icon={['fal', 'spinner']} size='3x' /> : undefined}
    />
  );
};

export const NoDataAfter5Sec = Template.bind({});
NoDataAfter5Sec.args = {
  columns: columns,
  data: initialData,
  extra: {
    validationSchema: validationSchema,
  },
};
