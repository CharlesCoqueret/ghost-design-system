import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import Button, { ColorButtonEnum } from '../../../Molecules/Button/Button';
import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraEditableDataTableProps, SortDirectionEnum } from '../Common/types';
import EditableDataTableBody from './EditableDataTableBody';

export interface IEditableDataTableProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra: IExtraEditableDataTableProps<T>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
}

const EditableDataTable = <T,>(props: IEditableDataTableProps<T>): ReactElement => {
  const { data, columns, extra, loading, onSortChange } = props;

  const [currentData, setCurrentData] = useState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();

  const currentColumns: Array<IColumnType<T>> =
    !extra?.onRowDelete && !extra?.onRowDownload
      ? columns
      : [
          ...columns.filter((column) => column.type !== ColumnType.BUTTON),
          {
            title: extra?.localization?.actionColumn ?? 'Actions',
            type: ColumnType.BUTTON,
            moreActionsMessage: extra?.localization?.moreActionsMessage ?? 'More actions',
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
                label: extra?.localization?.deleteButton ?? 'Delete',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowDelete) {
                    extra.onRowDelete(row, rowIndex);
                  }
                  setCurrentData((prev) => [...prev.filter((_item, index) => index !== rowIndex)]);
                },
                popover: {
                  message: extra?.localization?.deletePopoverMessage ?? 'Delete?',
                  cancel: extra?.localization?.deletePopoverCancel ?? 'Cancel',
                  confirm: extra?.localization?.deletePopoverConfirm ?? 'Confirm',
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
                label: extra?.localization?.downloadButton ?? 'Download',
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

  const handleUpdateDataChange = (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => {
    setCurrentData((prev) => {
      prev[rowIndex][dataIndex] = newData;
      return [...prev];
    });
    extra.onEdit({ ...currentData[rowIndex], [dataIndex]: newData }, dataIndex, rowIndex);
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
      <table className='gds-table'>
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
          handleUpdateDataChange={handleUpdateDataChange}
          loading={loading}
        />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>
      {extra?.canAddNewLine && extra?.canAddNewLine() && (
        <Button
          className='gds-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label={extra?.localization?.addRow ?? 'Add Line'}
          onClick={addNewLine}
        />
      )}
    </>
  );
};

export default EditableDataTable;
