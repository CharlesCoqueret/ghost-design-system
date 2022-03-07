import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { IColumnType, IExtraEditableDataTableProps, SortDirectionEnum } from '../StaticDataTable/types';
import EditableDataTableBody from './EditableDataTableBody';

export interface IEditableDataTableProps<T> {
  data: Array<T>;
  columns: Array<IColumnType<T>>;
  extra: IExtraEditableDataTableProps<T>;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  // TODO Add no data message
  // TODO Add loading state
}

const EditableDataTable = <T,>(props: IEditableDataTableProps<T>): ReactElement => {
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
    extra.onEdit({ ...currentData[rowIndex], dataIndex: newData }, rowIndex, dataIndex);
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
      <EditableDataTableBody<T>
        columns={columns}
        data={currentData}
        extra={extra}
        handUpdateDataChange={handUpdateDataChange}
      />
      <StaticDataTableFooter<T> columns={columns} data={currentData} extra={extra} />
    </table>
  );
};

export default EditableDataTable;
