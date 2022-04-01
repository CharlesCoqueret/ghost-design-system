import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Button, ColorButtonEnum } from '../../../Molecules/Button';
import StaticDataTableBody from '../StaticDataTable/StaticDataTableBody';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraLineEditableDataTableProps, SortDirectionEnum } from '../Common/types';
import LineEditableModal from './LineEditableModal';

export interface ILineEditableDataTableProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraLineEditableDataTableProps<T>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
}

const LineEditableDataTable = <T,>(props: ILineEditableDataTableProps<T>): ReactElement => {
  const { data, columns, extra, loading, onSortChange } = props;

  const [currentData, setCurrentData] = useState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();
  const [editedRowIndex, setEditedRowIndex] = useState<number | undefined>(extra?.editedRowIndex);
  const [isNewLine, setIsNewLine] = useState(false);

  const currentColumns: Array<IColumnType<T>> =
    !extra?.onRowSubmit && !extra?.onRowDelete && !extra?.onRowDownload
      ? columns
      : [
          ...columns.filter((column) => column.type !== ColumnType.BUTTON),
          {
            title: extra?.localization?.actionColumn || 'Actions',
            type: ColumnType.BUTTON,
            moreActionsMessage: extra?.localization?.moreActionsMessage || 'More actions',
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
                label: extra?.localization?.editButton || 'Edit',
                onClick: (row, rowIndex) => {
                  if (extra?.onRowEdit) {
                    extra.onRowEdit(row, rowIndex);
                  }
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
                label: extra?.localization?.deleteButton || 'Delete',
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
                  message: extra?.localization?.deletePopoverMessage || 'Delete?',
                  cancel: extra?.localization?.deletePopoverCancel || 'Cancel',
                  confirm: extra?.localization?.deletePopoverConfirm || 'Confirm',
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
                label: extra?.localization?.downloadButton || 'Download',
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

  const addNewLine = () => {
    if (extra?.onNewLine === undefined) {
      throw new Error('Missing onNewLine function');
    }
    const newLine = extra.onNewLine() || ({} as T);
    const newLineIndex = currentData.length;
    setCurrentData((prev) => {
      prev.push(newLine);
      return [...prev];
    });
    setIsNewLine(true);
    setEditedRowIndex(newLineIndex);
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
        <StaticDataTableBody<T>
          columns={currentColumns}
          data={currentData}
          extra={{ ...extra, editedRowIndex }}
          loading={loading}
        />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>
      {extra?.canAddNewLine && extra?.canAddNewLine() && (
        <Button
          className='cui-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label={extra?.localization?.addRow || 'Add row'}
          onClick={addNewLine}
          disabled={editedRowIndex !== undefined}
        />
      )}
      {editedRowIndex !== undefined && (
        <LineEditableModal<T>
          title={extra?.localization?.modalTitle || 'Edit row'}
          showChanges={extra?.showChanges || false}
          onSubmit={(newRow) => {
            setCurrentData((prev) => {
              prev[editedRowIndex] = newRow;
              return [...prev];
            });
            setEditedRowIndex(undefined);
            setIsNewLine(false);
          }}
          row={currentData[editedRowIndex]}
          onCancel={() => {
            if (isNewLine) {
              setCurrentData((prev) => {
                return [...prev.slice(0, prev.length - 1)];
              });
            }
            setEditedRowIndex(undefined);
            setIsNewLine(false);
            return;
          }}
          columns={columns}
          extra={extra}
        />
      )}
    </>
  );
};

export default LineEditableDataTable;
