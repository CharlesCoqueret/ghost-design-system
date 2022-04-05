import React, { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import LineEditableDataTable, { ILineEditableDataTableProps } from './LineEditableDataTable';
import { ColumnType, IColumnType } from '../Common/types';
import { IOption } from '../../../Atoms/SelectInput';

export default {
  title: 'Organism/DataTable/LineEditableDataTable',
  component: LineEditableDataTable,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof LineEditableDataTable>;

interface ITeam {
  teamId?: number;
  name?: string;
  description?: string;
}

const teams: Array<ITeam> = [
  {
    teamId: 1,
    name: 'Accountant',
    description: 'Accountant',
  },
  {
    teamId: 2,
    name: 'Developer',
    description: 'Making the impossible possible',
  },
  {
    teamId: 3,
    name: 'Product',
    description: 'Making the possible impossible',
  },
];

enum LinkedObjectType {
  PROJECT = 'project',
  TASK = 'task',
  STORY = 'story',
  EPIC = 'epic',
}

interface ITaskView {
  assignee?: number;
  comment?: string;
  creationDate?: Date;
  description?: string;
  dueDate?: Date;
  linkedId?: number;
  linkedType?: LinkedObjectType;
  taskId?: number;
  taskType?: string;
  team?: number;
}

const initialData: Array<ITaskView> = [
  {
    assignee: undefined,
    comment: undefined,
    creationDate: new Date('2022-04-05'),
    description: 'Description of task id 12',
    dueDate: undefined,
    linkedId: 10,
    linkedType: LinkedObjectType.EPIC,
    taskType: 'Task type 1',
    taskId: 12,
    team: 2,
  },
  {
    assignee: 1001,
    comment: undefined,
    creationDate: new Date('2020-09-01'),
    description: 'Description of task id 13',
    dueDate: undefined,
    linkedId: 11,
    linkedType: LinkedObjectType.STORY,
    taskType: 'Task type 2',
    taskId: 13,
    team: 1,
  },
];

const columns: Array<IColumnType<ITaskView>> = [
  {
    dataIndex: 'creationDate',
    sorter: true,
    title: 'Start date',
    type: ColumnType.DATE,
  },
  {
    dataIndex: 'taskType',
    ellipsis: true,
    title: 'Type',
    type: ColumnType.TEXT,
  },
  {
    dataIndex: 'description',
    ellipsis: true,
    title: 'Description',
    type: ColumnType.TEXT,
  },
  {
    dataIndex: 'dueDate',
    editable: true,
    sorter: true,
    title: 'Due date',
    type: ColumnType.DATE,
  },
  {
    dataIndex: 'assignee',
    editable: true,
    ellipsis: true,
    title: 'Assigned to',
    type: ColumnType.DYNAMICSEARCH,
    isClearable: true,
    resolveValue: (value: string | number): Promise<IOption> => {
      if (value === 1001) return Promise.resolve({ value: 1001, label: 'Jean' });
      if (value === 1002) return Promise.resolve({ value: 1002, label: 'Pierre' });
      if (value === 1003) return Promise.resolve({ value: 1003, label: 'Roger' });
      Promise.resolve(undefined);
    },
    noOptionsMessage: (obj): string => {
      if (!obj.inputValue) return `Please type a few characters to search`;
      return `No option found for ${obj.inputValue}`;
    },
    searchOptions: (): Promise<Array<IOption>> =>
      Promise.resolve([
        { value: 1001, label: 'Jean' },
        { value: 1002, label: 'Pierre' },
        { value: 1003, label: 'Roger' },
      ]),
  },
  {
    dataIndex: 'team',
    editable: true,
    ellipsis: true,
    title: 'Team',
    isClearable: true,
    type: ColumnType.BADGE,
    options: teams.map((team) => ({
      label: team.name,
      value: team.teamId,
    })),
  },
  {
    dataIndex: 'comment',
    editable: true,
    title: 'Comment',
    type: ColumnType.TEXTAREA,
    hidden: true,
  },
];

const validationSchema: yup.SchemaOf<ITaskView> = yup.object({
  assignee: yup.number().required(),
  comment: yup
    .string()
    .required()
    .min(3)
    .transform((value) => value.trim()),
  creationDate: yup.date(),
  description: yup.string(),
  dueDate: yup.date().required(),
  linkedId: yup.number(),
  linkedType: yup.mixed().nullable(),
  taskId: yup.number(),
  taskType: yup.string(),
  team: yup.number().required(),
});

const Template: ComponentStory<(args: ILineEditableDataTableProps<ITaskView>) => ReactElement> = (
  args: ILineEditableDataTableProps<ITaskView>,
) => {
  return <LineEditableDataTable<ITaskView> {...args} />;
};

export const TaskExample = Template.bind({});
TaskExample.args = {
  data: initialData,
  columns: columns,
  extra: {
    onRowSubmit: (task: ITaskView) => {
      console.log('submit: ', task);
    },
    validationSchema: validationSchema,
    actionColumnWidth: '50px',
    localization: {
      actionColumn: '',
      modalTitle: '',
    },
  },
};
