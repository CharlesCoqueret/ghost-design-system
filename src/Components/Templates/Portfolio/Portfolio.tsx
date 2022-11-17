import React, { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { AxiosInstance } from 'axios';

import Filter, { IFilterProps } from '../../Organisms/Filter/Filter';
import { StaticDataTable } from '../../Organisms/DataTable/StaticDataTable';
import Loader from '../../Atoms/Icon/icons/Loader';
import usePortfolioRequest from './use-portfolio-hook';
import { SortDirectionEnum } from '../../Organisms/DataTable/Common/types';
import { IStaticDataTableProps } from '../../Organisms/DataTable/StaticDataTable/StaticDataTable';

export interface IPortfolioProps<FilterType, PortfolioType, RequestBodyType, RequestParamType, ResultType> {
  axiosInstance: AxiosInstance;
  baseUrl: string;
  verb: 'POST' | 'GET';
  filter?: Pick<
    IFilterProps<FilterType>,
    'advancedSearchItems' | 'disableTabOutside' | 'initialValues' | 'localization' | 'searchBarItems'
  >;
  handleError: (error: unknown) => void;
  hasMore: (currentSize: number, result: ResultType) => boolean;
  requestBodyMapper: (
    filterValues: Partial<FilterType> | undefined,
    sort?: keyof PortfolioType,
    direction?: SortDirectionEnum,
  ) => RequestBodyType;
  requestParamMapper: (
    filterValues: Partial<FilterType> | undefined,
    sort?: keyof PortfolioType,
    direction?: SortDirectionEnum,
  ) => RequestParamType;
  resultMapper: (result: ResultType) => Promise<Array<PortfolioType>>;
  table: Pick<IStaticDataTableProps<PortfolioType>, 'columns' | 'extra'>;
}

const Portfolio = <FilterType, PortfolioType, RequestBodyType, RequestParamType, ResultType>(
  props: IPortfolioProps<FilterType, PortfolioType, RequestBodyType, RequestParamType, ResultType>,
) => {
  const {
    axiosInstance,
    baseUrl,
    filter,
    handleError,
    hasMore,
    requestBodyMapper,
    requestParamMapper,
    resultMapper,
    table,
    verb,
  } = props;

  const [filterValues, setFilterValues] = useState<Partial<FilterType> | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sort, setSort] = useState<keyof PortfolioType>();
  const [direction, setDirection] = useState<SortDirectionEnum>();
  const node = useRef<HTMLDivElement>(null);

  const { isLoading, entities, hasMoreEntities } = usePortfolioRequest<
    FilterType,
    PortfolioType,
    RequestBodyType,
    RequestParamType,
    ResultType
  >(
    axiosInstance,
    baseUrl,
    direction,
    filterValues,
    handleError,
    hasMore,
    requestBodyMapper,
    requestParamMapper,
    resultMapper,
    sort,
    verb,
  );

  const onFilterChange = (filterValue: Partial<FilterType> | undefined) => {
    setFilterValues(filterValue);
  };

  const onSortChange = (sortField?: keyof PortfolioType | undefined, sortDirection?: SortDirectionEnum | undefined) => {
    setSort(sortField);
    setDirection(sortDirection);
  };

  return (
    <div className='.gds-portfolio-container'>
      {filter ? <Filter {...filter} onChange={onFilterChange} /> : <></>}

      <div ref={node} className='table-container'>
        <InfiniteScroll
          pageStart={currentPage}
          loadMore={setCurrentPage}
          hasMore={!isLoading && hasMoreEntities}
          useWindow={false}
          getScrollParent={() => node.current}>
          <StaticDataTable<PortfolioType>
            {...table}
            data={entities}
            onSortChange={onSortChange}
            loading={isLoading ? <Loader /> : undefined}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Portfolio;
