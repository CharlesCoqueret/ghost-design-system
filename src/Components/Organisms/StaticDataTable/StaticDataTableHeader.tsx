import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ColumnType, IColumnType, IExtraStaticDataTableProps, SortDirectionEnum } from './types';
import { MenuDirectionEnum, Tooltip } from '../..';

interface IStaticDataTableHeaderProps<T> {
  columns: Array<IColumnType<T>>;
  extra?: IExtraStaticDataTableProps<T>;
  onSortChange: (newSortField: keyof T, newSortDirection?: SortDirectionEnum) => void;
  sortField?: keyof T;
  sortDirection?: SortDirectionEnum;
}

const nextSortDirection = (current?: SortDirectionEnum): SortDirectionEnum | undefined => {
  if (!current) return SortDirectionEnum.DESC;
  if (current === SortDirectionEnum.DESC) return SortDirectionEnum.ASC;
  return undefined;
};

const StaticDataTableHeader = <T,>(props: IStaticDataTableHeaderProps<T>): ReactElement => {
  const { columns, onSortChange, sortField, sortDirection, extra } = props;

  const updateSort = (dataIndex: keyof T) => {
    onSortChange(dataIndex, nextSortDirection(dataIndex === sortField ? sortDirection : undefined));
  };

  const iconName = (dataIndex: keyof T): 'sort' | 'sort-up' | 'sort-down' => {
    if (dataIndex !== sortField || !sortDirection) return 'sort';
    if (sortDirection === SortDirectionEnum.ASC) return 'sort-up';
    return 'sort-down';
  };

  const isSelectable = extra?.getSelectedRows || extra?.onRowSelect;

  return (
    <thead>
      <tr>
        {isSelectable && (
          <th key='header-selectable' className='table--header--selectable'>
            <input type='checkbox' />
          </th>
        )}
        {columns.map((column, index) => {
          return (
            <th key={`header-${index}`}>
              <Tooltip
                tooltip={
                  column.sorter ? 'Click to sort' : undefined // TODO Manage translation and the different states of filtering
                }
                direction={MenuDirectionEnum.TOP}>
                <div
                  className={classnames('table--header-value', { 'table--header-value--sortable': column.sorter })}
                  onClick={
                    column.sorter
                      ? () => {
                          updateSort(column.dataIndex);
                        }
                      : undefined
                  }>
                  <span
                    className={classnames('table--header-value--title', {
                      center: [ColumnType.CODE, ColumnType.DATE, ColumnType.BUTTON].includes(column.type),
                      left: [ColumnType.TEXT, ColumnType.BADGE, ColumnType.CUSTOM].includes(column.type),
                      right: [ColumnType.NUMBER, ColumnType.AMOUNT, ColumnType.PERCENTAGE].includes(column.type),
                    })}>
                    {column.title}
                  </span>
                  {column.sorter && (
                    <span className='table--header-value--sorter'>
                      <FontAwesomeIcon icon={['fas', iconName(column.dataIndex)]} />
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
