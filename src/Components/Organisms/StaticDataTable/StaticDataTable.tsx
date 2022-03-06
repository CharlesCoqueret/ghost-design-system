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
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  // TODO Add no data message
  // TODO Add loading state
}

const StaticDataTable = <T extends TableType<T>>(props: IStaticDataTableProps<T>): ReactElement => {
  const { data, columns, extra, onSortChange } = props;

  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();

  const handleSortChange = useCallback((newSortField: keyof T, newSortDirection?: SortDirectionEnum) => {
    if (sortField !== newSortField || newSortDirection !== newSortDirection) {
      setSortField(newSortField);
      setSortDirection(newSortDirection);

      if (onSortChange) {
        onSortChange(newSortField, newSortDirection);
      }
    }
  }, []);

  return (
    <table className='cui-table'>
      <StaticDataTableHeader<T>
        columns={columns}
        onSortChange={handleSortChange}
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
