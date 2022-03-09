import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraLineEditableDataTableProps, SortDirectionEnum } from '../StaticDataTable/types';
import LineEditableDataTableBody from './LineEditableDataTableBody';

export interface ILineEditableDataTableProps<T> {
  data: Array<T>;
  columns: Array<IColumnType<T>>;
  extra?: IExtraLineEditableDataTableProps<T>;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
  // TODO Add no data message
  // TODO Add loading state
}

const LineEditableDataTable = <T,>(props: ILineEditableDataTableProps<T>): ReactElement => {
  const { data, columns, extra, onSortChange } = props;

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
            title: 'Actions', // TODO manage translation
            type: ColumnType.BUTTON,
            moreActionsMessage: 'More actions', // TODO manage translation
            buttons: [
              {
                hidden: (row, rowIndex) => {
                  if (!extra?.onRowSubmit) return true;
                  if (extra.isEditable === undefined || extra.isEditable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
                  }
                  return true;
                },
                icon: ['fal', 'edit'],
                label: 'Edit', // TODO manage translation
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
                  if (!extra?.onRowDelete) return true;
                  if (extra.isDeletable === undefined || extra.isDeletable(row, rowIndex)) {
                    return editedRowIndex === rowIndex;
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
              },
              {
                hidden: (_row, rowIndex) => {
                  return editedRowIndex !== rowIndex;
                },
                icon: ['fal', 'check'],
                label: 'Submit', // TODO manage translation
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
                label: 'Cancel', // TODO manage translation
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
                label: 'Download', // TODO manage translation
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
        columns={currentColumns}
        onSortChange={handleSortChange}
        sortField={sortField}
        sortDirection={sortDirection}
        extra={{ ...extra, editedRowIndex }}
      />
      <LineEditableDataTableBody<T>
        columns={currentColumns}
        data={currentData}
        extra={{ ...extra, editedRowIndex }}
        handUpdateDataChange={handUpdateDataChange}
      />
      <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
    </table>
  );
};

export default LineEditableDataTable;
