import React, { ReactElement, useCallback, useState } from 'react';

import StaticDataTableBody from './StaticDataTableBody';
import StaticDataTableFooter from './StaticDataTableFooter';
import StaticDataTableHeader from './StaticDataTableHeader';
import { IColumnType, IExtraStaticDataTableProps, SortDirectionEnum, TableType } from './types';

export interface IPaginatedTableProps<T> {
  getPage?: (pageNumber: number, sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export interface IStaticDataTableProps<T> extends IPaginatedTableProps<T> {
  data: Array<T>;
  columns: Array<IColumnType<T>>;
  extra?: IExtraStaticDataTableProps<T>;
}

const StaticDataTable = <T extends TableType<T>>(props: IStaticDataTableProps<T>): ReactElement => {
  const { data, columns, extra, getPage } = props;

  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();
  const [, /*currentPage*/ setCurrentPage] = useState<number>(0);

  const onSortChange = useCallback((newSortField: keyof T, newSortDirection?: SortDirectionEnum) => {
    if (sortField !== newSortField || newSortDirection !== newSortDirection) {
      setSortField(newSortField);
      setSortDirection(newSortDirection);
      setCurrentPage(0);

      if (getPage) {
        getPage(0, newSortField, newSortDirection);
      }
    }
  }, []);

  return (
    <table className='cui-table'>
      <StaticDataTableHeader<T>
        columns={columns}
        onSortChange={onSortChange}
        sortField={sortField}
        sortDirection={sortDirection}
        extra={extra}
      />
      <StaticDataTableBody<T> columns={columns} data={data} extra={extra} />
      <StaticDataTableFooter<T> columns={columns} data={data} extra={extra} />
    </table>
  );
};

export default StaticDataTable;
