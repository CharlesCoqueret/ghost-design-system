import React, { ReactElement, useCallback, useState } from 'react';

import Button, { ColorButtonEnum } from '../../../Molecules/Button/Button';
import usePropState from '../../../../hooks/use-prop-state';

import StaticDataTableFooter from '../StaticDataTable/StaticDataTableFooter';
import StaticDataTableHeader from '../StaticDataTable/StaticDataTableHeader';
import { ColumnType, IColumnType, IExtraEditableDataTableProps, SortDirectionEnum } from '../Common/types';
import EditableDataTableBody from './EditableDataTableBody';

export interface IEditableDataTableProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  dataTestId?: string;
  extra: IExtraEditableDataTableProps<T>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof T, sortDirection?: SortDirectionEnum) => void;
}

const EditableDataTable = <T,>(props: IEditableDataTableProps<T>): ReactElement => {
  const { columns, data, dataTestId, extra, loading, onSortChange } = props;

  const [currentData, setCurrentData] = usePropState<Array<T>>(data);
  const [sortField, setSortField] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>();

  const currentColumns: Array<IColumnType<T>> =
    !extra.onRowDelete && !extra.onRowDownload
      ? columns
      : [
          ...columns.filter((column) => column.type !== ColumnType.BUTTON),
          {
            title: extra.localization?.actionColumn ?? 'Actions',
            type: ColumnType.BUTTON,
            moreActionsMessage: extra.localization?.moreActionsMessage ?? 'More actions',
            buttons: [
              {
                hidden: (row, rowIndex) => {
                  if (extra.onRowDelete && (extra.isDeletable === undefined || extra.isDeletable(row, rowIndex))) {
                    return false;
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
                dataTestId: dataTestId ? `${dataTestId}-delete` : undefined,
              },
              {
                hidden: (row, rowIndex) => {
                  if (
                    extra.onRowDownload &&
                    (extra.isDownloadable === undefined || extra.isDownloadable(row, rowIndex))
                  ) {
                    return false;
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
                dataTestId: dataTestId ? `${dataTestId}-download` : undefined,
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

  const handleUpdateDataChange = (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => {
    setCurrentData((prev) => {
      prev[rowIndex][dataIndex] = newData;
      return [...prev];
    });
    extra.onEdit({ ...currentData[rowIndex], [dataIndex]: newData }, dataIndex, rowIndex);
  };

  const addNewLine = () => {
    if (extra.onNewLine === undefined) {
      console.error('Missing onNewLine function');
      return;
    }
    const newLine = extra.onNewLine();
    setCurrentData((prev) => {
      prev.push(newLine);
      return [...prev];
    });
  };

  return (
    <div>
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
          dataTestId={dataTestId}
          extra={extra}
          handleUpdateDataChange={handleUpdateDataChange}
          loading={loading}
        />
        <StaticDataTableFooter<T> columns={currentColumns} data={currentData} extra={extra} />
      </table>
      {extra.canAddNewLine && extra.canAddNewLine() && (
        <Button
          className='gds-table-new-line'
          color={ColorButtonEnum.PRIMARY}
          label={extra.localization?.addRow ?? 'Add row'}
          onClick={addNewLine}
        />
      )}
    </div>
  );
};

EditableDataTable.defaultProps = {
  columns: [],
  data: [],
};

export default EditableDataTable;
