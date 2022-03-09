import { CSSProperties, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { DateFormatEnum, IOption } from '../../Atoms';

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
  /** For test purpose only */
  dataTestId?: string;
}

interface IColumn {
  ellipsis?: boolean;
  sorter?: boolean;
  title: string | ReactElement;
  /** Column width (as a CSSProperty) (optional, default: undefined) */
  width?: CSSProperties['width'];
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
  customRenderEdit: (row: T, dataIndex: keyof T, onChangeCallback: (newValue: T[keyof T]) => void) => ReactElement;
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
  /** Method used to enable and compute the total for each column (optional, default: undefined) */
  computeTotal?: (data: Array<T>, dataIndex: keyof T) => string | number | undefined;
  /** Global currency, which can be override by the amount column setting (optional, default: undefined) */
  currency?: string;
  /** Global date format, which can be override by the date column setting (optional, default: undefined) */
  dateFormat?: DateFormatEnum;
  /** Method used to enable the click on row, and handle the click on a specific row (optional, default: undefined) */
  onRowClick?: (row: T) => void;
  /** Method used to enable the selection of rows, and handle the selection of a specific row (optional, default: undefined) */
  onRowSelect?: (selectedRows: Array<T>, clickedRow: T) => void;
  /** Method used to disable the selection of a specific row, by default not called and considered as selectable (optional, default: undefined) */
  isSelectable?: (row: T) => boolean;
}

export interface IExtraLineEditableDataTableProps<T> extends IExtraStaticDataTableProps<T> {
  /** Notification of initiation of changes on a specific row (optional, default: undefined) */
  onRowEdit?: (editRow: T, editedRowIndex: number) => void;
  /** Notification of changes cancellation on a specific row (optional, default: undefined) */
  onRowCancelEdit?: (editRow: T, editedRowIndex: number) => void;
  /** Notification of changes on a specific row (optional, default: undefined) */
  onRowSubmit?: (editedRow: T, submittedRowIndex: number) => void;
  /** Method used to disable the edition of a specific row, by default not called and considered as editable (optional, default: undefined) */
  isEditable?: (row: T, rowIndex: number) => boolean;
  /** Method used to enable the deletion of a specific row (optional, default: undefined) */
  onRowDelete?: (deletedRow: T, deletedRowIndex: number) => void;
  /** Method used to disable the deletion of a specific row, by default not called and considered as deletable (optional, default: undefined) */
  isDeletable?: (row: T, rowIndex: number) => boolean;
  /** Initial index of edited row */
  editedRowIndex?: number;
  /** Method used to enable the download of a specific row (optional, default: undefined) */
  onRowDownload?: (downloadRow: T, downloadRowIndex: number) => void;
  /** Method used to disable the download of a specific row, by default not called and considered as deletable (optional, default: undefined) */
  isDownloadable?: (row: T, rowIndex: number) => boolean;
  /** Method used to enable the button to add a new line (optional, default: undefined) */
  canAddNewLine?: () => boolean;
  /** Method used to when the new line button is clicked to get initial values (optional, default: undefined) */
  onNewLine?: () => T;
}

export interface IExtraEditableDataTableProps<T> extends IExtraStaticDataTableProps<T> {
  /** Notification of changes on a specific row (optional, default: undefined) */
  onEdit: (editRow: T, dataIndex: keyof T, editedRowIndex: number) => void;
  /** Method used to disable the edition of a specific row, by default not called and considered as editable (optional, default: undefined) */
  isEditable?: (row: T, rowIndex: number) => boolean;
  /** Method used to enable the deletion of a specific row (optional, default: undefined) */
  onRowDelete?: (deletedRow: T, deletedRowIndex: number) => void;
  /** Method used to disable the deletion of a specific row, by default not called and considered as deletable (optional, default: undefined) */
  isDeletable?: (row: T, rowIndex: number) => boolean;
  /** Method used to enable the download of a specific row (optional, default: undefined) */
  onRowDownload?: (downloadRow: T, downloadRowIndex: number) => void;
  /** Method used to disable the download of a specific row, by default not called and considered as deletable (optional, default: undefined) */
  isDownloadable?: (row: T, rowIndex: number) => boolean;
  /** Method used to enable the button to add a new line (optional, default: undefined) */
  canAddNewLine?: () => boolean;
  /** Method used to when the new line button is clicked to get initial values (optional, default: undefined) */
  onNewLine?: () => T;
}
