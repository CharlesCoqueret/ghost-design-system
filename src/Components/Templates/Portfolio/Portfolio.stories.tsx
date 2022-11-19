/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Portfolio from './Portfolio';
import { ColumnType, FilterTypeEnum, SortDirectionEnum } from '../../Organisms';

interface IRecord {
  datasetid: string;
  recordId: string;
  fields: {
    sexe: 'M' | 'F';
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
  sexe?: 'M' | 'F';
  from?: Date;
  to?: Date;
}

interface IPortfolioType {
  prenoms: string;
  sex: 'M' | 'F';
  annee: number;
  nombre: number;
}

export default {
  title: 'Template/Portfolio',
  component: Portfolio,
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof Portfolio>;

const Template: ComponentStory<typeof Portfolio<IFilterType, IPortfolioType, IResultType, number>> = () => {
  const pageSize = 10;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio<IFilterType, IPortfolioType, IResultType, number>
        convertData={(response: IResultType) => {
          return response.records.map((record) => {
            return {
              prenoms: record.fields.prenoms,
              sex: record.fields.sexe,
              annee: Number.isFinite(Number(record.fields.annee)) ? Number(record.fields.annee) : -1,
              nombre: record.fields.nombre,
            };
          });
        }}
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
              isClearable: true,
              options: [
                { value: 'M', label: 'Men' },
                { value: 'F', label: 'Women' },
              ],
            },
            { filterType: FilterTypeEnum.DATE, dataIndex: 'from' },
            { filterType: FilterTypeEnum.DATE, dataIndex: 'to' },
          ],
        }}
        handleError={alert}
        table={{
          columns: [
            {
              title: 'Firstname',
              dataIndex: 'prenoms',
              editable: false,
              type: ColumnType.TEXT,
              sorter: true,
            },
            { title: 'Sex', dataIndex: 'sex', type: ColumnType.CODE },
            { title: 'Year', dataIndex: 'annee', type: ColumnType.YEAR, sorter: true },
            { title: 'Number', dataIndex: 'nombre', type: ColumnType.NUMBER, sorter: true },
          ],
        }}
        getData={(
          filter: Partial<IFilterType> | undefined,
          sort: keyof IPortfolioType | undefined,
          direction: SortDirectionEnum | undefined,
          pageParam: number | undefined,
          signal: AbortSignal | undefined,
        ): Promise<IResultType> => {
          console.log('getData', pageParam);
          const start = pageParam ?? 0;

          const datasetId = 'liste_des_prenoms';
          const baseUrl = new URL('https://opendata.paris.fr/api/records/1.0/search/');
          baseUrl.searchParams.append('dataset', datasetId);
          if (filter?.query && filter.query.trim().length > 0) {
            baseUrl.searchParams.append('q', filter.query.trim());
          }
          if (filter?.sexe) {
            baseUrl.searchParams.append('refine.sexe', filter.sexe);
          }
          baseUrl.searchParams.append('facet', 'sexe');
          baseUrl.searchParams.append('facet', 'prenoms');
          baseUrl.searchParams.append('facet', 'annee');
          baseUrl.searchParams.append('rows', pageSize.toString());
          baseUrl.searchParams.append('start', start.toString());
          if (filter?.from && filter?.to) {
            baseUrl.searchParams.append(
              'q',
              `annee:[${filter?.from.getFullYear()}-01-01 TO ${filter?.to.getFullYear()}-01-01]`,
            );
          } else if (filter?.from) {
            baseUrl.searchParams.append('q', `annee>=${filter?.from.getFullYear()}-01-01`);
          } else if (filter?.to) {
            baseUrl.searchParams.append('q', `annee<=${filter?.to.getFullYear()}-01-01`);
          }
          if (sort && direction) {
            baseUrl.searchParams.append('sort', `${direction === SortDirectionEnum.ASC ? '' : '-'}${sort}`);
          }
          const requestInit: RequestInit = {
            method: 'GET',
            signal: signal,
          };
          return fetch(baseUrl.toString(), requestInit).then(async (response) => {
            return await response.json();
          });
        }}
        getNextPageParam={(result: IResultType): number | undefined => {
          let res: number | undefined;
          if ((result.parameters.start ?? 0) + (result.parameters.rows ?? 0) < result.nhits) {
            res = (result.parameters.start ?? 0) + (result.parameters.rows ?? 0);
          } else {
            res = undefined;
          }
          console.log('fetch called:', res);
          return res;
        }}
      />
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
