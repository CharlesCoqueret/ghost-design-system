import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { IColumnType, IExtraLineEditableDataTableProps, SortDirectionEnum, TableType } from '../StaticDataTable/types';
import LineEditableDataTableBody from './LineEditableDataTableBody';

export interface ILineEditableDataTableProps<T> {
  data: Array<T>;
  columns: Array<IColumnType<T>>;
  extra?: IExtraLineEditableDataTableProps<T>;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  // TODO Add no data message
  // TODO Add loading state
}

const LineEditableDataTable = <T extends TableType<T>>(props: ILineEditableDataTableProps<T>): ReactElement => {
  const { data, columns, extra, onSortChange } = props;

  const [currentData, setCurrentData] = useState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();

  // Updating local copy of data whenever the provided data changes.
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleSortChange = useCallback((newSortField: keyof T, newSortDirection?: SortDirectionEnum) => {
    if (sortField !== newSortField || newSortDirection !== newSortDirection) {
      setSortField(newSortField);
      setSortDirection(newSortDirection);

      if (onSortChange) {
        onSortChange(newSortField, newSortDirection);
      }
    }
  }, []);

  const handUpdateDataChange = (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => {
    setCurrentData((prev) => {
      prev[rowIndex][dataIndex] = newData;
      return [...prev];
    });
  };

  return (
    <table className='cui-table'>
      <StaticDataTableHeader<T>
        columns={columns}
        onSortChange={handleSortChange}
        sortField={sortField}
        sortDirection={sortDirection}
        extra={extra}
      />
      <LineEditableDataTableBody<T>
        columns={columns}
        data={currentData}
        extra={extra}
        handUpdateDataChange={handUpdateDataChange}
      />
      <StaticDataTableFooter<T> columns={columns} data={currentData} extra={extra} />
    </table>
  );
};

export default LineEditableDataTable;
