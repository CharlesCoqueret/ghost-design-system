import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IOption } from './types';
import DynamicSearchInput, { IDynamicSearchInputProps } from './DynamicSearchInput';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface Record {
  datasetid: string;
  recordid: string;
  fields: {
    sexe: string;
    nombre: number;
    nombre_total_cumule: number;
    prenoms: string;
  };
  record_timestamp: string;
}

interface PaginatedResult<T> {
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

const requestInit: RequestInit = {
  method: 'GET',
};

const datasetId = 'liste_des_prenoms';

const searchRecords = async (
  searchTerm: string = '',
  inPage?: number,
  inPageSize?: number,
): Promise<PaginatedResult<Record>> => {
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

const searchOptions = (searchTerm: string = ''): Promise<Array<IOption>> => {
  return searchRecords(searchTerm).then((result) => {
    return result.records.map((record) => {
      return {
        value: record.recordid,
        label: `${record.fields.prenoms} (${record.fields.nombre} in ${record.fields.annee})`,
      };
    });
  });
};

const resolveRecord = async (value: string = ''): Promise<Record> => {
  const baseUrl = new URL(`https://opendata.paris.fr/api/datasets/1.0/${datasetId}/records/${value}`);

  return fetch(baseUrl.toString(), requestInit).then((response) => {
    return response.json();
  });
};

const resolveValue = (searchTerm: string = ''): Promise<IOption> => {
  return resolveRecord(searchTerm).then((result) => {
    return {
      value: result.recordid,
      label: `${result.fields.prenoms} (${result.fields.nombre_total_cumule})`,
    };
  });
};

export default {
  title: 'Atom/DynamicSearchInput',
  component: DynamicSearchInput,
} as ComponentMeta<typeof DynamicSearchInput>;

const Template: ComponentStory<typeof DynamicSearchInput> = ({ inputValue, ...args }: IDynamicSearchInputProps) => {
  const [localValue, setLocalValue] = useState<string | undefined>(inputValue);

  return (
    <>
      <DynamicSearchInput {...args} inputValue={localValue} onChange={setLocalValue} />
      <div style={{ height: '10vh' }} />
      <DynamicSearchInput {...args} readOnly inputValue={localValue} onChange={setLocalValue} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
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
  handleCreate: async (inputValue: string) => {
    await delay(5000);
    return { value: inputValue, label: inputValue.toUpperCase() };
  },
};
