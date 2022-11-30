import React, { ReactElement } from 'react';
import classnames from 'classnames';

import {
  ColumnType,
  IColumnType,
  IExtraEditableDataTableProps,
  IExtraLineEditableInPlaceDataTableProps,
  IExtraStaticDataTableProps,
  SortDirectionEnum,
} from '../Common/types';
import { MenuDirectionEnum, Tooltip } from '../../../Atoms/Tooltip';
import { Icon } from '../../../Atoms/Icon';
import { Typography } from '../../../Atoms/Typography';

interface IStaticDataTableHeaderProps<T> {
  columns: Array<IColumnType<T>>;
  extra?: IExtraStaticDataTableProps<T> | IExtraLineEditableInPlaceDataTableProps<T> | IExtraEditableDataTableProps<T>;
  onSortChange: (newSortField: keyof T, newSortDirection?: SortDirectionEnum) => void;
  sortField?: keyof T;
  sortDirection?: SortDirectionEnum;
  stickyHeader?: boolean;
}

const nextSortDirection = (current?: SortDirectionEnum): SortDirectionEnum | undefined => {
  if (!current) return SortDirectionEnum.DESC;
  if (current === SortDirectionEnum.DESC) return SortDirectionEnum.ASC;
  return undefined;
};

const StaticDataTableHeader = <T,>(props: IStaticDataTableHeaderProps<T>): ReactElement => {
  const { columns, extra, onSortChange, sortField, sortDirection, stickyHeader } = props;

  const updateSort = (dataIndex: keyof T) => {
    onSortChange(dataIndex, nextSortDirection(dataIndex === sortField ? sortDirection : undefined));
  };

  const iconName = (dataIndex: keyof T): 'sort' | 'sort-up' | 'sort-down' => {
    if (dataIndex !== sortField || !sortDirection) return 'sort';
    if (sortDirection === SortDirectionEnum.ASC) return 'sort-up';
    return 'sort-down';
  };

  const isSelectable = extra?.onRowSelect;
  const isExtended = extra?.onRowSelect || extra?.computeTotal;
  const isEditingRow = extra && 'editedRowIndex' in extra && extra.editedRowIndex !== undefined;

  return (
    <thead>
      <tr>
        {isExtended &&
          (isSelectable ? (
            <th key='header-selectable' className={classnames('table--header--selectable', { sticky: stickyHeader })}>
              {/* <input type='checkbox' />  // TODO implement the select all, select partial to deselect */}
            </th>
          ) : (
            <th
              key='header-extended'
              className={classnames('table--header--selectable', { sticky: stickyHeader })}></th>
          ))}
        {columns.map((column, index) => {
          return (
            <th
              key={`header-${index}`}
              style={{ display: column.hidden ? 'none' : undefined, width: column.width }}
              className={classnames({ sticky: stickyHeader })}>
              <Tooltip
                tooltip={
                  column.sorter && !isEditingRow ? extra?.localization?.sortMessage ?? 'Click to sort' : undefined
                }
                direction={MenuDirectionEnum.TOP}>
                <div
                  className={classnames('table--header-value', { 'table--header-value--sortable': column.sorter })}
                  data-testid={column.dataTestId ? `${column.dataTestId}-sort` : undefined}
                  onClick={
                    column.sorter && column.type !== ColumnType.BUTTON
                      ? () => {
                          updateSort(column.dataIndex);
                        }
                      : undefined
                  }
                  onKeyUp={
                    column.sorter && column.type !== ColumnType.BUTTON
                      ? (event) => {
                          if (event.type === 'keyup' && event.key !== 'Enter') {
                            return;
                          }
                          updateSort(column.dataIndex);
                        }
                      : undefined
                  }
                  tabIndex={column.sorter && column.type !== ColumnType.BUTTON ? 0 : -1}>
                  <Typography.Text
                    className={classnames('table--header-value--title', {
                      center: [ColumnType.CODE, ColumnType.DATE, ColumnType.BUTTON].includes(column.type),
                      left: [ColumnType.TEXT, ColumnType.BADGE, ColumnType.CUSTOM, ColumnType.DYNAMICSEARCH].includes(
                        column.type,
                      ),
                      right: [ColumnType.NUMBER, ColumnType.AMOUNT, ColumnType.PERCENTAGE].includes(column.type),
                    })}
                    ellipsis>
                    {column.title}
                  </Typography.Text>
                  {column.sorter && !isEditingRow && column.type !== ColumnType.BUTTON && (
                    <span className='table--header-value--sorter'>
                      <Icon icon={['fas', iconName(column.dataIndex)]} />
                    </span>
                  )}
                </div>
              </Tooltip>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default StaticDataTableHeader;
