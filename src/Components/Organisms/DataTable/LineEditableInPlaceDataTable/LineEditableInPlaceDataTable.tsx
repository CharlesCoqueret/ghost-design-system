import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, ColorButtonEnum } from '../../../Molecules/Button';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraLineEditableInPlaceDataTableProps, SortDirectionEnum } from '../Common/types';
import LineEditableInPlaceDataTableBody from './LineEditableInPlaceDataTableBody';

export interface ILineEditableInPlaceDataTableProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraLineEditableInPlaceDataTableProps<T>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
}

const LineEditableInPlaceDataTable = <T,>(props: ILineEditableInPlaceDataTableProps<T>): ReactElement => {
  const { data, columns, extra, loading, onSortChange } = props;

  const [currentData, setCurrentData] = useState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();
  const [editedRowIndex, setEditedRowIndex] = useState<number | undefined>(extra?.editedRowIndex);
  const [snapshotEditedRow, setSnapshotEditedRow] = useState<T>();

  const currentColumns: Array<IColumnType<T>> =
    !extra?.onRowSubmit && !extra?.onRowDelete && !extra?.onRowDownload
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
                  // Hide button when another row is in edit mode
                  if (editedRowIndex !== undefined) return true;
                  // Hide the button if the changes cannot be submitted
                  if (!extra?.onRowSubmit) return true;
                  // Hide the button if it is marked as not editable
                  if (extra.isEditable === undefined || extra.isEditable(row, rowIndex)) {
                    return false;
                  }
                  return true;
                },
                icon: ['fal', 'edit'],
                label: extra?.localization?.editButton ?? 'Edit',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowEdit) {
                    extra.onRowEdit(row, rowIndex);
                  }
                  setSnapshotEditedRow({ ...row });
                  setEditedRowIndex(rowIndex);
                },
              },
              {
                hidden: (row, rowIndex) => {
                  // Hide the button if deletion is not supported
                  if (!extra?.onRowDelete) return true;
                  // Hide the button if item not deletable
                  if (extra.isDeletable === undefined || extra.isDeletable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
                  }
                  return true;
                },
                icon: ['fal', 'trash-alt'],
                label: extra?.localization?.deleteButton ?? 'Delete',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowDelete) {
                    extra.onRowDelete(row, rowIndex);
                  }
                  if (editedRowIndex && editedRowIndex > rowIndex) {
                    setEditedRowIndex(editedRowIndex - 1);
                  }
                  setCurrentData((prev) => [...prev.filter((_item, index) => index !== rowIndex)]);
                },
                popover: {
                  message: extra?.localization?.deletePopoverMessage ?? 'Delete?',
                  cancel: extra?.localization?.deletePopoverCancel ?? 'Cancel',
                  confirm: extra?.localization?.deletePopoverConfirm ?? 'Confirm',
                },
              },
              {
                hidden: (_row, rowIndex) => {
                  return editedRowIndex !== rowIndex;
                },
                icon: ['fal', 'check'],
                label: extra?.localization?.submitButton ?? 'Submit',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowSubmit) {
                    extra.onRowSubmit(row, rowIndex);
                  }
                  setEditedRowIndex(undefined);
                  setSnapshotEditedRow(undefined);
                  setCurrentData((prev) => {
                    prev[rowIndex] = row;
                    return [...prev];
                  });
                },
              },
              {
                hidden: (_row, rowIndex) => {
                  return editedRowIndex !== rowIndex;
                },
                icon: ['fal', 'times'],
                label: extra?.localization?.cancelButton ?? 'Cancel',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowCancelEdit) {
                    extra.onRowCancelEdit(row, rowIndex);
                  }
                  setCurrentData((prev) => {
                    prev[rowIndex] = snapshotEditedRow as T;
                    return [...prev];
                  });
                  setEditedRowIndex(undefined);
                  setSnapshotEditedRow(undefined);
                },
              },
              {
                hidden: (row, rowIndex) => {
                  if (!extra?.onRowDownload) return true;
                  if (extra.isDownloadable === undefined || extra.isDownloadable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
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
  };

  const addNewLine = () => {
    if (extra?.onNewLine === undefined) {
      throw new Error('Missing onNewLine function');
    }
    const newLine = extra.onNewLine() || ({} as T);
    setSnapshotEditedRow(newLine);
    setCurrentData((prev) => {
      prev.push(newLine);
      return [...prev];
    });
    setEditedRowIndex(currentData.length);
  };

  return (
    <>
      <table className='cui-table'>
        <StaticDataTableHeader<T>
          columns={currentColumns}
          onSortChange={handleSortChange}
          sortField={sortField}
          sortDirection={sortDirection}
          extra={{ ...extra, editedRowIndex }}
        />
        <LineEditableInPlaceDataTableBody<T>
          columns={currentColumns}
          data={currentData}
          extra={{ ...extra, editedRowIndex }}
          handleUpdateDataChange={handleUpdateDataChange}
          loading={loading}
        />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>
      {extra?.canAddNewLine && extra?.canAddNewLine() && (
        <Button
          className='cui-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label={extra?.localization?.addRow ?? 'Add row'}
          onClick={addNewLine}
          disabled={editedRowIndex !== undefined}
        />
      )}
    </>
  );
};

export default LineEditableInPlaceDataTable;
