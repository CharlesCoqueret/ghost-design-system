import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Button, { ColorButtonEnum } from '../../Molecules/Button/Button';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraEditableDataTableProps, SortDirectionEnum } from '../StaticDataTable/types';
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

  const currentColumns: Array<IColumnType<T>> =
    !extra?.onRowDelete && !extra?.onRowDownload
      ? columns
      : [
          ...columns.filter((column) => column.type !== ColumnType.BUTTON),
          {
            title: 'Actions', // TODO manage translation
            type: ColumnType.BUTTON,
            moreActionsMessage: 'More actions', // TODO manage translation
            buttons: [
              {
                hidden: (row, rowIndex) => {
                  if (!extra?.onRowDelete) return true;
                  if (extra.isDeletable === undefined || extra.isDeletable(row, rowIndex)) {
                    return false;
                  }
                  return true;
                },
                icon: ['fal', 'trash-alt'],
                label: 'Delete', // TODO manage translation
                onClick: (row, rowIndex) => {
                  if (extra?.onRowDelete) {
                    extra.onRowDelete(row, rowIndex);
                  }
                  setCurrentData((prev) => [...prev.filter((_item, index) => index !== rowIndex)]);
                },
                dataTestId: 'delete',
              },
              {
                hidden: (row, rowIndex) => {
                  if (!extra?.onRowDownload) return true;
                  if (extra.isDownloadable === undefined || extra.isDownloadable(row, rowIndex)) {
                    return false;
                  }
                  return true;
                },
                icon: ['fal', 'arrow-to-bottom'],
                label: 'Download', // TODO manage translation
                onClick: (row, rowIndex) => {
                  if (extra?.onRowDownload) {
                    extra.onRowDownload(row, rowIndex);
                  }
                },
                dataTestId: 'download',
              },
            ],
          },
        ];

  // Updating local copy of data whenever the provided data changes.
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleSortChange = useCallback((newSortField: keyof T, newSortDirection?: SortDirectionEnum) => {
    if (sortField !== newSortField || newSortDirection !== newSortDirection) {
      setSortField(newSortField);
      setSortDirection(newSortDirection);

      if (onSortChange) {
        if (newSortField && newSortDirection) onSortChange(newSortField, newSortDirection);
        else onSortChange();
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

  const addNewLine = () => {
    if (extra?.onNewLine === undefined) {
      console.warn('Missing onNewLine function');
      return;
    }
    const newLine = extra.onNewLine();
    setCurrentData((prev) => {
      prev.push(newLine);
      return [...prev];
    });
  };

  return (
    <>
      <table className='cui-table'>
        <StaticDataTableHeader<T>
          columns={currentColumns}
          onSortChange={handleSortChange}
          sortField={sortField}
          sortDirection={sortDirection}
          extra={extra}
        />
        <EditableDataTableBody<T>
          columns={currentColumns}
          data={currentData}
          extra={extra}
          handUpdateDataChange={handUpdateDataChange}
        />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>
      {extra?.canAddNewLine && extra?.canAddNewLine() && (
        <Button
          className='cui-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label='Add Line' // TODO manage translation
          onClick={addNewLine}
        />
      )}
    </>
  );
};

export default EditableDataTable;
