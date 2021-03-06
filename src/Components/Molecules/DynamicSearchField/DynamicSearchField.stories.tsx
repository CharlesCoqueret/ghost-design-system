import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DynamicSearchField, { IDynamicSearchFieldProps } from './DynamicSearchField';
import { IOption } from '../../Atoms';

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
    baseUrl.searchParams.append('q', searchTerm);
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
      label: `${result.fields.prenoms} (${result.fields.nombre_total_cumule})`,
    };
  });
};

export default {
  title: 'Molecule/DynamicSearchField',
  component: DynamicSearchField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof DynamicSearchField>;

const Template: ComponentStory<typeof DynamicSearchField> = ({ inputValue, ...args }: IDynamicSearchFieldProps) => {
  const [localValue, setLocalValue] = useState<string | number | undefined>(inputValue);

  return <DynamicSearchField {...args} inputValue={localValue} onChange={setLocalValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Dynamic Search',
  disabled: false,
  fieldSize: undefined,
  highlighted: false,
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  name: 'name',
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  readOnly: false,
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Dynamic Search field in read only with label size = 4 and field size = 6',
  fieldSize: 6,
  labelSize: 4,
  name: 'name',
  readOnly: true,
  disabled: false,
  highlighted: false,
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

export const Error = Template.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Dynamic Search field in error with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  errorMessage: 'This text is on error',
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

export const Helper = Template.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Dynamic Search field with helper and counter',
  mandatory: true,
  name: 'name',
  errorMessage: 'This text is on error',
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  label: 'Dynamic Search field highlighted',
  name: 'name',
  readOnly: true,
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Dynamic Search field disabled',
  name: 'name',
  inputValue: '3d9265a6ddc5ed3e2550778bb3b53229b02954a9',
  isClearable: true,
  isInError: false,
  noOptionsMessage: (obj) => {
    if (!obj.inputValue) return `Please type a few characters to search`;
    return `No option found for ${obj.inputValue}`;
  },
  placeholder: 'Dynamic Search placeholder',
  resolveValue: resolveValue,
  searchOptions: searchOptions,
};

interface IRecord {
  datasetid: string;
  recordid: string;
  fields: {
    sexe: string;
    nombre: number;
    annee: number;
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
