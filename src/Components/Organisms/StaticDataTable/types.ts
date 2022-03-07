import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactElement } from 'react';
import { DateFormatEnum, IOption } from '../..';

export enum ColumnType {
  AMOUNT = 'amount',
  BADGE = 'badge',
  BUTTON = 'button',
  CODE = 'code',
  CUSTOM = 'custom',
  DATE = 'date',
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
  TEXT = 'text',
}

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IButtonCellProps<T> {
  /** Custom className (optional, default: undefined) */
  className?: string;
  /** Color of the button (optional, default: 'reversed') */
  color?: 'reversed';
  /** Button is hidden (optional, default: false) */
  hidden?: (row: T, rowIndex: number) => boolean;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** Label use as tooltip if button of first level (optional, default: undefined) */
  label: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (row: T, rowIndex: number) => void;
}

interface IColumn {
  ellipsis?: boolean;
  sorter?: boolean;
  title: string | ReactElement;
}

export interface IColumnAmount<T> extends IColumn {
  currency?: string;
  dataIndex: keyof T;
  type: ColumnType.AMOUNT;
  editable?: boolean;
}

export interface IColumnBadge<T> extends IColumn {
  dataIndex: keyof T;
  options: Array<IOption>;
  type: ColumnType.BADGE;
  editable?: boolean;
}

export interface IColumnButton<T> extends IColumn {
  buttons: Array<IButtonCellProps<T>>;
  moreActionsMessage: string;
  type: ColumnType.BUTTON;
}
export interface IColumnCode<T> extends IColumn {
  dataIndex: keyof T;
  type: ColumnType.CODE;
}
export interface IColumnCustom<T> extends IColumn {
  customRender: (row: T, dataIndex: keyof T) => ReactElement;
  customRenderEdit: (row: T, dataIndex: keyof T) => ReactElement; // must support props: onChange: (newValue: T[keyof T]) => void;
  dataIndex: keyof T;
  type: ColumnType.CUSTOM;
  editable?: boolean;
}
export interface IColumnDate<T> extends IColumn {
  dataIndex: keyof T;
  dateFormat?: DateFormatEnum;
  type: ColumnType.DATE;
  editable?: boolean;
}
export interface IColumnNumber<T> extends IColumn {
  dataIndex: keyof T;
  type: ColumnType.NUMBER;
  editable?: boolean;
}
export interface IColumnPercentage<T> extends IColumn {
  dataIndex: keyof T;
  type: ColumnType.PERCENTAGE;
  editable?: boolean;
}
export interface IColumnText<T> extends IColumn {
  dataIndex: keyof T;
  type: ColumnType.TEXT;
  editable?: boolean;
}

export type IColumnType<T> =
  | IColumnAmount<T>
  | IColumnBadge<T>
  | IColumnButton<T>
  | IColumnCode<T>
  | IColumnCustom<T>
  | IColumnDate<T>
  | IColumnNumber<T>
  | IColumnPercentage<T>
  | IColumnText<T>;

export type TableType<T> = Record<keyof T, string | number | Date | undefined | null>;

export interface IExtraStaticDataTableProps<T> {
  computeTotal?: (data: Array<T>, dataIndex: keyof T) => string | number | undefined;
  currency?: string;
  dateFormat?: DateFormatEnum;
  onRowClick?: (row: T) => void;
  onRowSelect?: (selectedRows: Array<T>, clickedRow: T) => void;
  isSelectable?: (row: T) => boolean;
}

export interface IExtraLineEditableDataTableProps<T> extends IExtraStaticDataTableProps<T> {
  onRowSubmit?: (editedRow: T) => void;
  editedRowIndex?: number;
}
