/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import axios from 'axios';
import compact from 'lodash/compact';

import Portfolio from './Portfolio';
import { ColumnType, FilterTypeEnum, SortDirectionEnum } from '../../Organisms';

interface IRecord {
  datasetid: string;
  recordId: string;
  fields: {
    sexe: 'H' | 'F';
    nombre: number;
    annee: string;
    nombre_total_cumule: number;
    prenoms: string;
  };
  record_timestamp: Date;
}

interface IRequestParamType {
  dataset: 'liste_des_prenoms';
  start?: number;
  rows?: number;
  sort?: string | Array<string>;
  q?: string | Array<string> | undefined;
  format?: string;
  timezone?: string;
}

interface IResultType {
  nhits: number;
  parameters: IRequestParamType;
  records: Array<IRecord>;
}

interface IFilterType {
  query?: string | undefined;
  sexe?: 'H' | 'F';
  from?: number;
  to?: number;
}

interface IPortfolioType {
  firstName: string;
  sex: 'H' | 'F';
  year: number;
  number: number;
}

export default {
  title: 'Template/Portfolio/Example',
  component: Portfolio,
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Portfolio>;

const Template: ComponentStory<
  typeof Portfolio<IFilterType, IPortfolioType, {}, IRequestParamType, IResultType>
> = () => {
  return (
    <Portfolio<IFilterType, IPortfolioType, {}, IRequestParamType, IResultType>
      axiosInstance={axios.create()}
      baseUrl={'https://opendata.paris.fr/api/records/1.0/search/'}
      verb='GET'
      filter={{
        localization: {
          advancedSearch: 'Advanced search',
          advancedSearchTitle: 'Advanced search',
          search: 'Search',
          reset: 'Reset',
        },
        searchBarItems: [
          {
            filterType: FilterTypeEnum.TEXT,
            dataIndex: 'query',
          },
          {
            filterType: FilterTypeEnum.SELECT,
            dataIndex: 'sexe',
            options: [
              { value: 'H', label: 'Men' },
              { value: 'F', label: 'Women' },
            ],
          },
          { filterType: FilterTypeEnum.DATE, dataIndex: 'from' },
          { filterType: FilterTypeEnum.DATE, dataIndex: 'to' },
        ],
      }}
      handleError={alert}
      hasMore={(currentSize, result) => {
        return currentSize < result.nhits;
      }}
      requestBodyMapper={() => {
        return {};
      }}
      requestParamMapper={(
        filterValue: Partial<IFilterType> | undefined,
        sort?: keyof IPortfolioType | undefined,
        direction?: SortDirectionEnum | undefined,
      ): IRequestParamType => {
        const query = [filterValue?.query];
        if (filterValue?.from && filterValue?.to) {
          query.push(`annee:[${filterValue?.from}+TO+${filterValue?.to}]`);
        } else if (filterValue?.from) {
          query.push(`annee:>=${filterValue?.from}`);
        } else if (filterValue?.to) {
          query.push(`annee:<=${filterValue?.to}`);
        }
        return {
          dataset: 'liste_des_prenoms',
          q: compact(query).length === 0 ? undefined : compact(query),
          sort: direction && sort ? `${direction === SortDirectionEnum.ASC ? '' : '-'}${sort}` : undefined,
        };
      }}
      resultMapper={(result: IResultType): Promise<Array<IPortfolioType>> => {
        return Promise.resolve(
          result.records.map((record) => {
            return {
              firstName: record.fields.prenoms,
              sex: record.fields.sexe,
              year: Number.isFinite(record.fields.annee) ? Number(record.fields.annee) : -1,
              number: record.fields.nombre,
            };
          }),
        );
      }}
      table={{
        columns: [
          {
            title: 'Firstname',
            dataIndex: 'firstName',
            editable: false,
            type: ColumnType.TEXT,
          },
          { title: 'Sex', dataIndex: 'sex', type: ColumnType.CODE },
          { title: 'Year', dataIndex: 'year', type: ColumnType.YEAR },
          { title: 'Number', dataIndex: 'number', type: ColumnType.NUMBER },
        ],
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
