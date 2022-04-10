import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IOption } from './types';
import { Link } from '../Link';
import DynamicSearchCreatableInput, { IDynamicSearchCreatableInputProps } from './DynamicSearchCreatableInput';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
      label: `${result.fields.prenoms} (${result.fields.nombre} in ${result.fields.annee})`,
    };
  });
};

export default {
  title: 'Atom/DynamicSearchCreatableInput',
  component: DynamicSearchCreatableInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof DynamicSearchCreatableInput>;

const Template: ComponentStory<typeof DynamicSearchCreatableInput> = ({
  inputValue,
  ...args
}: IDynamicSearchCreatableInputProps) => {
  const [localValue, setLocalValue] = useState<string | number | undefined>(inputValue);

  return (
    <>
      <DynamicSearchCreatableInput
        {...args}
        inputValue={localValue}
        onChange={(newValue) => {
          if (args.onChange) {
            args.onChange(newValue);
          }
          setLocalValue(newValue);
        }}
      />
      <div style={{ height: '10vh' }} />
      <DynamicSearchCreatableInput {...args} readOnly inputValue={localValue} onChange={setLocalValue} />
      Source:
      <Link
        link='https://opendata.paris.fr/explore/dataset/liste_des_prenoms/information/?disjunctive.annee&disjunctive.prenoms'
        text='List of declared first names - Open data Paris'
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
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
