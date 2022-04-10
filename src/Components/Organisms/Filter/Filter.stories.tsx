import React, { ReactElement } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Filter, { IFilterProps } from './Filter';
import { FilterTypeEnum } from './types';
import { IToggleEntry } from '../../Atoms/CheckBoxInput';
import { IOption } from '../../Atoms/SelectInput';

interface IDemoType {
  checkbox: Array<IToggleEntry>;
  dateFrom: Date;
  dateTo: Date;
  dynamicsearch: string;
  multiselect: Array<string>;
  number: number;
  select: string;
  text: string;
}

const requestInit: RequestInit = {
  method: 'GET',
};

const datasetId = 'liste_des_prenoms';

const searchRecords = async (
  searchTerm = '',
  inPage?: number,
  inPageSize?: number,
): Promise<IPaginatedResult<IRecord>> => {
  const page = inPage || 0;
  const pageSize = inPageSize || 50;

  const baseUrl = new URL('https://opendata.paris.fr/api/records/1.0/search/');

  baseUrl.searchParams.append('dataset', datasetId);

  if (searchTerm && searchTerm.trim().length > 0) {
    baseUrl.searchParams.append('q', encodeURIComponent(searchTerm));
  }

  baseUrl.searchParams.append('facet', 'sexe');
  baseUrl.searchParams.append('facet', 'prenoms');
  baseUrl.searchParams.append('facet', 'annee');

  // Add rows parameter
  baseUrl.searchParams.append('rows', pageSize.toString());

  // Add start row parameter
  baseUrl.searchParams.append('start', (page * pageSize).toString());

  return fetch(baseUrl.toString(), requestInit).then((response) => {
    return response.json();
  });
};

const searchOptions = async (searchTerm = ''): Promise<Array<IOption>> => {
  return searchRecords(searchTerm).then((result) => {
    return result.records.map((record) => {
      return {
        value: record.recordid,
        label: `${record.fields.prenoms} (${record.fields.nombre} in ${record.fields.annee})`,
      };
    });
  });
};

const resolveRecord = async (value = ''): Promise<IRecord> => {
  const baseUrl = new URL(`https://opendata.paris.fr/api/datasets/1.0/${datasetId}/records/${value}`);

  return fetch(baseUrl.toString(), requestInit).then((response) => {
    return response.json();
  });
};

const resolveValue = async (searchTerm = ''): Promise<IOption> => {
  return resolveRecord(searchTerm).then((result) => {
    return {
      value: result.recordid,
      label: `${result.fields.prenoms} (${result.fields.nombre} in ${result.fields.annee})`,
    };
  });
};

export default {
  title: 'Organism/Filter',
  component: Filter,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<(args: IFilterProps<IDemoType>) => ReactElement> = (args: IFilterProps<IDemoType>) => {
  return <Filter<IDemoType> {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  advancedSearchItems: [
    {
      filterType: FilterTypeEnum.COLUMN,
      fields: [
        {
          filterType: FilterTypeEnum.TITLE,
          label: 'Section #1',
        },
        {
          dataIndex: 'number',
          filterType: FilterTypeEnum.NUMBER,
          label: 'Number',
          placeholder: 'Search number',
        },
        {
          dataIndex: 'checkbox',
          filterType: FilterTypeEnum.CHECKBOX,
          label: 'Checkbox',
        },
        {
          dataIndex: 'select',
          filterType: FilterTypeEnum.SELECT,
          isClearable: true,
          label: 'Select',
          options: [
            { value: 'SELECT1', label: 'Option #1' },
            { value: 'SELECT2', label: 'Option #2' },
          ],
          placeholder: 'Select an option',
        },
        {
          dataIndex: 'dynamicsearch',
          filterType: FilterTypeEnum.DYNAMICSEARCH,
          isClearable: true,
          label: 'Dynamic search',
          noOptionsMessage: 'No dynamic search options',
          placeholder: 'Search an option',
          resolveValue: resolveValue,
          searchOptions: searchOptions,
        },
      ],
    },
    {
      filterType: FilterTypeEnum.COLUMN,
      fields: [
        {
          filterType: FilterTypeEnum.TITLE,
          label: 'Section #2',
        },
        {
          dataIndex: 'text',
          filterType: FilterTypeEnum.TEXT,
          label: 'Text',
          placeholder: 'Search text',
        },
        {
          dataIndex: 'dateFrom',
          filterType: FilterTypeEnum.DATE,
          isClearable: true,
          label: 'From',
        },
        {
          dataIndex: 'dateTo',
          filterType: FilterTypeEnum.DATE,
          isClearable: true,
          label: 'To',
        },
        {
          dataIndex: 'multiselect',
          filterType: FilterTypeEnum.MULTISELECT,
          isClearable: true,
          label: 'Multiselect',
          numberOfItemLabel: '{} item selected',
          numberOfItemsLabel: '{} items selected',
          options: [
            { value: 'SELECT1', label: 'Option #1' },
            { value: 'SELECT2', label: 'Option #2' },
          ],
          placeholder: 'Select options',
        },
      ],
    },
  ],
  searchBarItems: [
    {
      dataIndex: 'text',
      filterType: FilterTypeEnum.TEXT,
      placeholder: 'Search text',
    },
    {
      dataIndex: 'checkbox',
      filterType: FilterTypeEnum.CHECKBOX,
    },
    {
      dataIndex: 'dateFrom',
      filterType: FilterTypeEnum.DATE,
      isClearable: true,
      label: 'From',
    },
    {
      dataIndex: 'dateTo',
      filterType: FilterTypeEnum.DATE,
      isClearable: true,
      label: 'To',
    },
    {
      dataIndex: 'multiselect',
      filterType: FilterTypeEnum.MULTISELECT,
      // It is recommended to set the fieldSize of select, multiselect, dynamic search and dynamic search creatable when inline.
      // If not set, the width of the select will adjust to its content.
      fieldSize: 2,
      isClearable: true,
      numberOfItemLabel: '{} item selected',
      numberOfItemsLabel: '{} items selected',
      options: [
        { value: 'SELECT1', label: 'Option #1' },
        { value: 'SELECT2', label: 'Option #2' },
      ],
      placeholder: 'Select options',
    },
  ],
  initialValues: {
    checkbox: [
      {
        value: 'CHECKBOX1',
        label: 'Checkbox #1',
      },
      {
        value: 'CHECKBOX2',
        label: 'Checkbox #2',
      },
    ],
  },
  localization: {
    advancedSearch: 'Advanced search',
    advancedSearchTitle: 'Advanced search',
    search: 'Search',
    reset: 'Reset',
  },
};

export const SearchBar = Template.bind({});
SearchBar.args = {
  searchBarItems: [
    {
      dataIndex: 'text',
      filterType: FilterTypeEnum.TEXT,
      placeholder: 'Search text',
    },
    {
      dataIndex: 'checkbox',
      filterType: FilterTypeEnum.CHECKBOX,
    },
    {
      dataIndex: 'dateFrom',
      filterType: FilterTypeEnum.DATE,
      isClearable: true,
      label: 'From',
    },
    {
      dataIndex: 'dateTo',
      filterType: FilterTypeEnum.DATE,
      isClearable: true,
      label: 'To',
    },
    {
      dataIndex: 'multiselect',
      filterType: FilterTypeEnum.MULTISELECT,
      // It is recommended to set the fieldSize of select, multiselect, dynamic search and dynamic search creatable when inline.
      // If not set, the width of the select will adjust to its content.
      fieldSize: 2,
      isClearable: true,
      numberOfItemLabel: '{} item selected',
      numberOfItemsLabel: '{} items selected',
      options: [
        { value: 'SELECT1', label: 'Option #1' },
        { value: 'SELECT2', label: 'Option #2' },
      ],
      placeholder: 'Select options',
    },
  ],
  initialValues: {
    checkbox: [
      {
        value: 'CHECKBOX1',
        label: 'Checkbox #1',
      },
      {
        value: 'CHECKBOX2',
        label: 'Checkbox #2',
      },
    ],
  },
  localization: {
    advancedSearch: 'Advanced search',
    advancedSearchTitle: 'Advanced search',
    search: 'Search',
    reset: 'Reset',
  },
};

export const AdvancedSearch = Template.bind({});
AdvancedSearch.args = {
  advancedSearchItems: [
    {
      filterType: FilterTypeEnum.COLUMN,
      fields: [
        {
          filterType: FilterTypeEnum.TITLE,
          label: 'Section #1',
        },
        {
          dataIndex: 'number',
          filterType: FilterTypeEnum.NUMBER,
          label: 'Number',
          placeholder: 'Search number',
        },
        {
          dataIndex: 'checkbox',
          filterType: FilterTypeEnum.CHECKBOX,
          label: 'Checkbox',
        },
        {
          filterType: FilterTypeEnum.TITLE,
          label: 'Section #1 - 2',
        },
        {
          dataIndex: 'select',
          filterType: FilterTypeEnum.SELECT,
          isClearable: true,
          label: 'Select',
          options: [
            { value: 'SELECT1', label: 'Option #1' },
            { value: 'SELECT2', label: 'Option #2' },
          ],
          placeholder: 'Select an option',
        },
        {
          dataIndex: 'dynamicsearch',
          filterType: FilterTypeEnum.DYNAMICSEARCH,
          isClearable: true,
          label: 'Dynamic search',
          noOptionsMessage: 'No dynamic search options',
          placeholder: 'Search an option',
          resolveValue: resolveValue,
          searchOptions: searchOptions,
        },
      ],
    },
    {
      filterType: FilterTypeEnum.COLUMN,
      fields: [
        {
          filterType: FilterTypeEnum.TITLE,
          label: 'Section #2',
        },
        {
          dataIndex: 'text',
          filterType: FilterTypeEnum.TEXT,
          label: 'Text',
          placeholder: 'Search text',
        },
        {
          dataIndex: 'dateFrom',
          filterType: FilterTypeEnum.DATE,
          isClearable: true,
          label: 'From',
        },
        {
          dataIndex: 'dateTo',
          filterType: FilterTypeEnum.DATE,
          isClearable: true,
          label: 'To',
        },
        {
          dataIndex: 'multiselect',
          filterType: FilterTypeEnum.MULTISELECT,
          isClearable: true,
          label: 'Multiselect',
          numberOfItemLabel: '{} item selected',
          numberOfItemsLabel: '{} items selected',
          options: [
            { value: 'SELECT1', label: 'Option #1' },
            { value: 'SELECT2', label: 'Option #2' },
          ],
          placeholder: 'Select options',
        },
      ],
    },
  ],
  searchBarItems: [
    {
      dataIndex: 'text',
      fieldSize: 2,
      filterType: FilterTypeEnum.TEXT,
      placeholder: 'Search text',
    },
    {
      dataIndex: 'multiselect',
      filterType: FilterTypeEnum.MULTISELECT,
      // It is recommended to set the fieldSize of select, multiselect, dynamic search and dynamic search creatable when inline.
      // If not set, the width of the select will adjust to its content.
      fieldSize: 2,
      isClearable: true,
      numberOfItemLabel: '{} item selected',
      numberOfItemsLabel: '{} items selected',
      options: [
        { value: 'SELECT1', label: 'Option #1' },
        { value: 'SELECT2', label: 'Option #2' },
      ],
      placeholder: 'Select options',
    },
  ],
  initialValues: {
    checkbox: [
      {
        value: 'CHECKBOX1',
        label: 'Checkbox #1',
      },
      {
        value: 'CHECKBOX2',
        label: 'Checkbox #2',
      },
    ],
  },
  localization: {
    advancedSearch: 'Advanced search',
    advancedSearchTitle: 'Advanced search',
    search: 'Search',
    reset: 'Reset',
  },
};

interface IRecord {
  datasetid: string;
  recordid: string;
  fields: {
    sexe: string;
    nombre: number;
    annee: string;
    nombre_total_cumule: number;
    prenoms: string;
  };
  record_timestamp: string;
}

interface IPaginatedResult<T> {
  nhits: number;
  paramaters: {
    dataset: string;
    q: string;
    rows: number;
    start: number;
    format: string;
    timezone: string;
  };
  records: Array<T>;
}
