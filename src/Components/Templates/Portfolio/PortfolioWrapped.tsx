import React, { useEffect, useState } from 'react';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import classnames from 'classnames';

import Loader from '../../Atoms/Icon/icons/Loader';
import Filter, { IFilterProps } from '../../Organisms/Filter/Filter';
import { SortDirectionEnum } from '../../Organisms/DataTable/Common/types';
import { StaticDataTable } from '../../Organisms/DataTable/StaticDataTable';
import { IStaticDataTableProps } from '../../Organisms/DataTable/StaticDataTable/StaticDataTable';

import styles from './PortfolioWrapped.module.scss';

export interface IPortfolioProps<FilterType, PortfolioType, ResponseType, PaginationType> {
  /**
   * Converts data synchronously.
   *
   * Note:
   * - If extra data are required to populate the portfolio, please use the getData handler to enrich it.
   */
  convertData: (response: ResponseType) => Array<PortfolioType>;
  /**
   * Description of the filter
   * When set to undefined, filter will not be rendered.
   */
  filter?: Omit<IFilterProps<FilterType>, 'onChange'>;
  /** Custom filter className (optional, default: undefined) */
  filterClassName?: string;
  /**
   * Handles the request for additional data (filtered, sorted, paginated).
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
  /* Provide pagination information passed to the getData request */
  getNextPageParam: (result: ResponseType, allResults: Array<ResponseType>) => PaginationType | undefined;
  /* Handles error */
  handleError: (error: unknown) => void;
  /**
   * Description of the static data table
   */
  table: Omit<IStaticDataTableProps<PortfolioType>, 'data' | 'loading' | 'onSortChange'>;
  /** Custom table className (optional, default: undefined) */
  tableClassName?: string;
}

const PortfolioWrapped = <FilterType, PortfolioType, ResponseType, PaginationType>(
  props: IPortfolioProps<FilterType, PortfolioType, ResponseType, PaginationType>,
) => {
  const { filter, filterClassName, convertData, getData, getNextPageParam, handleError, table, tableClassName } = props;

  const { ref, inView } = useInView();

  const [filterValues, setFilterValues] = useState<Partial<FilterType> | undefined>();
  const [sort, setSort] = useState<keyof PortfolioType>();
  const [direction, setDirection] = useState<SortDirectionEnum>();

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ['portfolio', filterValues, sort, direction],
    async (context: QueryFunctionContext<QueryKey, PaginationType>) => {
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
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, data]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return (
    <>
      {filter && (
        <div className={classnames(styles.filter, filterClassName)}>
          <Filter {...filter} onChange={onFilterChange} />
        </div>
      )}

      <div className={classnames(styles.table, tableClassName)}>
        <StaticDataTable<PortfolioType>
          {...table}
          data={data?.pages.map(convertData).flat()}
          onSortChange={onSortChange}
          loading={isFetching ? <Loader size='3x' /> : undefined}
        />
        <div ref={ref} className={styles.ref} />
      </div>
    </>
  );
};

PortfolioWrapped.defaultProps = {
  filter: undefined,
  filterClassName: undefined,
  tableClassName: undefined,
};

export default PortfolioWrapped;
