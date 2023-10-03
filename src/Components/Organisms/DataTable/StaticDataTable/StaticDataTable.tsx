import React, { ReactElement, useCallback, useState } from 'react';

import StaticDataTableBody from './StaticDataTableBody';
import StaticDataTableFooter from './StaticDataTableFooter';
import StaticDataTableHeader from './StaticDataTableHeader';
import { IColumnType, IExtraStaticDataTableProps, SortDirectionEnum } from '../Common/types';

import '../DataTable.module.scss';

export interface IStaticDataTableProps<T> {
  /** Data to be displayed in the table */
  data: Array<T>;
  /** Description of the columns */
  columns: Array<IColumnType<T>>;
  /** Extra features of the table (optional, default: undefined) */
  extra?: IExtraStaticDataTableProps<T>;
  /** Loading element, usually a spinner, displayed when set (optional, default: undefined) */
  loading?: ReactElement;
  /** Callback whenever sort is clicked (optional, default: undefined) */
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  /** Sticky header (optional, default:false) */
  stickyHeader?: boolean;
}

const StaticDataTable = <T,>(props: IStaticDataTableProps<T>): ReactElement => {
  const { data, columns, extra, loading, onSortChange, stickyHeader } = props;

  const [currentData] = useState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();

  const handleSortChange = useCallback((newSortField: keyof T, newSortDirection?: SortDirectionEnum) => {
    setSortField(newSortField);
    setSortDirection(newSortDirection);

    if (onSortChange) {
      if (newSortField && newSortDirection) {
        onSortChange(newSortField, newSortDirection);
      } else {
        onSortChange();
      }
    }
  }, []);

  return (
    <table className='gds-table'>
      <StaticDataTableHeader<T>
        columns={columns}
        extra={extra}
        onSortChange={handleSortChange}
        sortDirection={sortDirection}
        sortField={sortField}
        stickyHeader={stickyHeader}
      />
      <StaticDataTableBody<T> columns={columns} data={currentData} extra={extra} loading={loading} />
      <StaticDataTableFooter<T> columns={columns} data={currentData} extra={extra} />
    </table>
  );
};

StaticDataTable.defaultProps = {
  columns: [],
  data: [],
  extra: undefined,
  loading: undefined,
  onSortChange: undefined,
  stickyHeader: false,
};

export default StaticDataTable;
