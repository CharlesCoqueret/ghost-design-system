import React, { useEffect, useState } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import Loader from '../../Atoms/Icon/icons/Loader';
import Filter, { IFilterProps } from '../../Organisms/Filter/Filter';
import { SortDirectionEnum } from '../../Organisms/DataTable/Common/types';
import { StaticDataTable } from '../../Organisms/DataTable/StaticDataTable';
import { IStaticDataTableProps } from '../../Organisms/DataTable/StaticDataTable/StaticDataTable';

interface IPortfolioProps<FilterType, PortfolioType, ResponseType, PaginationType = number> {
  /**
   * Convert data synchronously.
   *
   * Note:
   * - If extra data are required to populate the portfolio, please use the getData handler to enrich it.
   */
  convertData: (response: ResponseType) => Array<PortfolioType>;
  /**
   * Description of the filter
   */
  filter?: Pick<
    IFilterProps<FilterType>,
    'advancedSearchItems' | 'disableTabOutside' | 'initialValues' | 'localization' | 'searchBarItems'
  >;
  /**
   * Handle API call.
   *
   * Note:
   * - signal is used for cancelling the request
   *    (see https://react-query-v3.tanstack.com/guides/query-cancellation )
   * - pageParam is used for pagination management.
   *    undefined for the first page or whenever there is a filter, sort or direction change
   */
  getData: (
    filter: Partial<FilterType> | undefined,
    sort: keyof PortfolioType | undefined,
    direction: SortDirectionEnum | undefined,
    pageParam: PaginationType | undefined,
    signal: AbortSignal | undefined,
  ) => Promise<ResponseType>;
  // Provide u
  getNextPageParam: (result: ResponseType, allResults: Array<ResponseType>) => PaginationType | undefined;
  handleError: (error: unknown) => void;
  /* Provide pagination information passed to the getData request */
  table: Pick<IStaticDataTableProps<PortfolioType>, 'columns' | 'extra'>;
}

const Portfolio = <FilterType, PortfolioType, ResponseType, PaginationType>(
  props: IPortfolioProps<FilterType, PortfolioType, ResponseType, PaginationType>,
) => {
  const { filter, convertData, getData, getNextPageParam, handleError, table } = props;

  const { ref, inView } = useInView();

  const [filterValues, setFilterValues] = useState<Partial<FilterType> | undefined>();
  const [sort, setSort] = useState<keyof PortfolioType>();
  const [direction, setDirection] = useState<SortDirectionEnum>();

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ['portfolio', filterValues, sort, direction],
    async (context: QueryFunctionContext) => {
      const { signal, pageParam } = context;
      return getData(filterValues, sort, direction, pageParam, signal);
    },
    {
      getNextPageParam: getNextPageParam,
    },
  );

  const onSortChange = (sortField?: keyof PortfolioType | undefined, sortDirection?: SortDirectionEnum | undefined) => {
    setSort(sortField);
    setDirection(sortDirection);
  };

  const onFilterChange = (value: Partial<FilterType> | undefined): void => {
    setFilterValues(value);
  };

  useEffect(() => {
    console.log('inView', inView);
    if (inView) {
      fetchNextPage();
    }
  }, [inView, data]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return (
    <div className='gds-portfolio-container'>
      {filter ? <Filter {...filter} onChange={onFilterChange} /> : <></>}

      <div className='table-container'>
        <StaticDataTable<PortfolioType>
          {...table}
          data={data?.pages.map(convertData).flat()}
          onSortChange={onSortChange}
          loading={isFetching ? <Loader size='3x' /> : undefined}
        />
        <div ref={ref} style={{ height: '10px' }} />
      </div>
    </div>
  );
};

Portfolio.defaultProps = {
  filter: undefined,
};

export default Portfolio;
