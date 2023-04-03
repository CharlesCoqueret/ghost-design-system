import React, { ReactElement, useCallback, useState } from 'react';
import * as yup from 'yup';

import { Button, ColorButtonEnum } from '../../../Molecules/Button';
import usePropState from '../../../../hooks/use-prop-state';

import StaticDataTableBody from '../StaticDataTable/StaticDataTableBody';
import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraLineEditableDataTableProps, SortDirectionEnum } from '../Common/types';
import LineEditableModal from './LineEditableModal';

import '../DataTable.module.scss';

export interface ILineEditableDataTableProps<T extends yup.AnyObject> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra: IExtraLineEditableDataTableProps<T>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  /** Sticky header (optional, default:false) */
  stickyHeader?: boolean;
}

const LineEditableDataTable = <T extends yup.AnyObject>(props: ILineEditableDataTableProps<T>): ReactElement => {
  const { data, columns, extra, loading, onSortChange, stickyHeader } = props;

  const [currentData, setCurrentData] = usePropState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();
  const [editedRowIndex, setEditedRowIndex] = useState<number | undefined>(extra.editedRowIndex);
  const [isNewLine, setIsNewLine] = useState(false);

  const currentColumns: Array<IColumnType<T>> =
    !extra.onRowSubmit && !extra.onRowDelete && !extra.onRowDownload
      ? columns
      : [
          ...columns.filter((column) => column.type !== ColumnType.BUTTON),
          {
            title: extra.localization?.actionColumn ?? 'Actions',
            type: ColumnType.BUTTON,
            width: extra.actionColumnWidth,
            moreActionsMessage: extra.localization?.moreActionsMessage ?? 'More actions',
            buttons: [
              {
                hidden: (row, rowIndex) => {
                  // Hide button when another row is in edit mode
                  if (editedRowIndex !== undefined) return true;
                  // Hide the button if the changes cannot be submitted
                  if (!extra.onRowSubmit) return true;
                  // Hide the button if it is marked as not editable
                  if (extra.isEditable === undefined || extra.isEditable(row, rowIndex)) {
                    return false;
                  }
                  return true;
                },
                icon: ['fal', 'pen'],
                label: extra.localization?.editButton ?? 'Edit',
                onClick: (row, rowIndex) => {
                  if (extra.onRowEdit) {
                    extra.onRowEdit(row, rowIndex);
                  }
                  setEditedRowIndex(rowIndex);
                },
              },
              {
                hidden: (row, rowIndex) => {
                  // Hide the button if deletion is not supported
                  if (!extra.onRowDelete) return true;
                  // Hide the button if item not deletable
                  if (extra.isDeletable === undefined || extra.isDeletable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
                  }
                  return true;
                },
                icon: ['fal', 'trash-alt'],
                label: extra.localization?.deleteButton ?? 'Delete',
                onClick: (row, rowIndex) => {
                  if (extra.onRowDelete) {
                    extra.onRowDelete(row, rowIndex);
                  }
                  setCurrentData((prev) => [...prev.filter((_item, index) => index !== rowIndex)]);
                },
                popover: {
                  message: extra.localization?.deletePopoverMessage ?? 'Delete?',
                  cancel: extra.localization?.deletePopoverCancel ?? 'Cancel',
                  confirm: extra.localization?.deletePopoverConfirm ?? 'Confirm',
                },
              },
              {
                hidden: (row, rowIndex) => {
                  if (!extra.onRowDownload) return true;
                  if (extra.isDownloadable === undefined || extra.isDownloadable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
                  }
                  return true;
                },
                icon: ['fal', 'arrow-down-to-line'],
                label: extra.localization?.downloadButton ?? 'Download',
                onClick: (row, rowIndex) => {
                  if (extra.onRowDownload) {
                    extra.onRowDownload(row, rowIndex);
                  }
                },
              },
            ],
          },
        ];

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

  const addNewLine = () => {
    if (extra.onNewLine === undefined) {
      console.error('Missing onNewLine function');
    }
    const newLine = extra.onNewLine ? extra.onNewLine() : ({} as T);
    const newLineIndex = currentData.length;
    setCurrentData((prev) => {
      prev.push(newLine);
      return [...prev];
    });
    setIsNewLine(true);
    setEditedRowIndex(newLineIndex);
  };

  return (
    <div>
      <table className='gds-table'>
        <StaticDataTableHeader<T>
          columns={currentColumns}
          onSortChange={handleSortChange}
          sortField={sortField}
          sortDirection={sortDirection}
          extra={{ ...extra, editedRowIndex }}
          stickyHeader={stickyHeader}
        />
        <StaticDataTableBody<T> columns={currentColumns} data={currentData} extra={extra} loading={loading} />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>

      {extra.canAddNewLine && extra.canAddNewLine() && (
        <Button
          className='gds-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label={extra.localization?.addRow ?? 'Add row'}
          onClick={addNewLine}
          disabled={editedRowIndex !== undefined}
        />
      )}
      {editedRowIndex !== undefined && (
        <LineEditableModal<T>
          title={
            extra.localization?.modalTitle === undefined
              ? 'Edit row'
              : typeof extra.localization.modalTitle === 'function'
              ? extra.localization.modalTitle(currentData[editedRowIndex], editedRowIndex)
              : extra.localization.modalTitle
          }
          showChanges={extra.showChanges || false}
          onSubmit={(newRow) => {
            if (extra.onRowSubmit) {
              extra.onRowSubmit(newRow, editedRowIndex);
            }
            setCurrentData((prev) => {
              prev[editedRowIndex] = newRow;
              return [...prev];
            });
            setEditedRowIndex(undefined);
            setIsNewLine(false);
          }}
          row={currentData[editedRowIndex]}
          rowIndex={editedRowIndex}
          onCancel={(cancelledRow) => {
            if (extra.onRowCancelEdit) {
              extra.onRowCancelEdit(cancelledRow, editedRowIndex);
            }
            if (isNewLine) {
              setCurrentData((prev) => {
                return [...prev.slice(0, prev.length - 1)];
              });
            }
            setEditedRowIndex(undefined);
            setIsNewLine(false);
            return;
          }}
          onClose={() => {
            setEditedRowIndex(undefined);
            setIsNewLine(false);
            return;
          }}
          columns={columns}
          extra={extra}
        />
      )}
    </div>
  );
};

LineEditableDataTable.defaultProps = {
  columns: [],
  data: [],
  stickyHeader: false,
};

export default LineEditableDataTable;
