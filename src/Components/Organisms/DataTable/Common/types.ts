import { CSSProperties, ReactElement } from 'react';
import * as yup from 'yup';

import { IconProp } from '../../../Atoms/Icon';
import { DateFormat } from '../../../Atoms/DatePickerInput';
import { ButtonColorEnum } from '../../../Molecules/Button';
import { IAmountFieldProps } from '../../../Molecules/AmountField/AmountField';
import { ISelectFieldProps } from '../../../Molecules/SelectField/SelectField';
import { IBadgeProps } from '../../../Atoms/Badge/Badge';
import { IDatePickerFieldProps } from '../../../Molecules/DatePickerField/DatePickerField';
import { IDynamicSearchFieldProps } from '../../../Molecules/DynamicSearchField/DynamicSearchField';
import { IFileFieldProps } from '../../../Molecules/FileField/FileField';
import { IMultiSelectFieldProps } from '../../../Molecules/MultiSelectField/MultiSelectField';
import { IPercentageFieldProps } from '../../../Molecules/PercentageField/PercentageField';
import { IRichTextFieldProps } from '../../../Molecules/RichTextField/RichTextField';
import { ILineEditableDataTableProps } from '../LineEditableDataTable/LineEditableDataTable';
import { ITextFieldProps } from '../../../Molecules/TextField/TextField';
import { ITextAreaFieldProps } from '../../../Molecules/TextAreaField/TextAreaField';
import { IYearPickerFieldProps } from '../../../Molecules/YearPickerField/YearPickerField';
import { IOption } from '../../../Atoms/SelectInput';
import { IFieldSectionLegacyProps } from '../../FormLegacy/types';

export enum ColumnType {
  /** Amount column */
  AMOUNT = 'amount',
  /** Badge column */
  BADGE = 'badge',
  /** Button column */
  BUTTON = 'button',
  /** Checkbox column */
  CHECKBOX = 'checkbox',
  /** Code column */
  CODE = 'code',
  /**
   * Custom column
   * @deprecated will be removed in version 2.1
   */
  CUSTOM = 'custom',
  /** Date column */
  DATE = 'date',
  /** Description column */
  DESCRIPTION = 'description',
  /** Dynamic search column */
  DYNAMICSEARCH = 'dynamicsearch',
  /** File column */
  FILE = 'file',
  /** Multiselect column */
  MULTISELECT = 'multiselect',
  /** Number column */
  NUMBER = 'number',
  /** Percentage column */
  PERCENTAGE = 'percentage',
  /** Rich text column */
  RICHTEXT = 'richtext',
  /** Section column */
  SECTION = 'section',
  /** Switch column */
  SWITCH = 'switch',
  /**
   * Table column
   * @deprecated will be removed in version 2.1
   */
  TABLE = 'table',
  /** Text column */
  TEXT = 'text',
  /** Text area column */
  TEXTAREA = 'textarea',
  /** Year column */
  YEAR = 'year',
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
  /** Icon name */
  icon: IconProp;
  /** Label use as tooltip if button of first level */
  label: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (row: T, rowIndex: number) => void;
  /** Confirmation Popover enabled (optional, default: false) */
  popover?: {
    message: string;
    confirm: string;
    cancel: string;
  };
  /** For test purpose only */
  dataTestId?: string;
}

interface IColumn {
  /** For test purpose only */
  dataTestId?: string;
  /** Enables ellipsis on the colum when it overflows (optional, default: undefined) */
  ellipsis?: boolean;
  /** Make the field when in edition (for lineeditabledatatable (optional, default: false) */
  hiddenInForm?: boolean;
  /** Makes the column invisible (optional, default: false) */
  hidden?: boolean;
  /** Enables sort on the colum (optional, default: undefined) */
  sorter?: boolean;
  /** Title of the column */
  title: string;
  /** Column width (as a CSSProperty) (optional, default: undefined) */
  width?: CSSProperties['width'];
}

export interface IColumnAmount<T>
  extends IColumn,
    Pick<
      IAmountFieldProps,
      | 'allowNegative'
      | 'decimalScale'
      | 'decimalSeparator'
      | 'maxValue'
      | 'minValue'
      | 'placeholder'
      | 'prefix'
      | 'suffix'
      | 'thousandSeparator'
      | 'thousandsGroupStyle'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.AMOUNT;
}

export interface IColumnBadge<T>
  extends IColumn,
    Pick<ISelectFieldProps, 'isClearable' | 'placeholder' | 'usePortal'>,
    Pick<IBadgeProps, 'color'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  /** Options available to be picked from */
  options: Array<IOption> | ((row: T | undefined) => Array<IOption>);
  /** Column type */
  type: ColumnType.BADGE;
}

export interface IColumnButton<T> extends IColumn {
  /** List of buttons properties to be displayed */
  buttons: Array<IButtonCellProps<T>>;
  /** Tooltip message used when the number of buttons exceeds 3 */
  moreActionsMessage: string;
  /** Column type */
  type: ColumnType.BUTTON;
}

export interface IColumnCheckbox<T> extends IColumn {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.CHECKBOX;
}

export interface IColumnCode<T> extends IColumn {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Column type */
  type: ColumnType.CODE;
}

export interface IColumnCustom<T> extends IColumn {
  /** Custom render component */
  customRender: <
    U extends {
      highlighted?: boolean;
      input?: T[keyof T];
      onChange?: (value: T[keyof T]) => void;
      readOnly?: boolean;
    },
  >(
    props: U,
  ) => ReactElement;
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.CUSTOM;
}

export interface IColumnDescription<T> extends IColumn {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Custom render description component */
  description: ReactElement | (<U extends { value: T[keyof T] }>(props: U) => ReactElement);
  /** Column type */
  type: ColumnType.DESCRIPTION;
}

export interface IColumnDate<T>
  extends IColumn,
    Pick<
      IDatePickerFieldProps,
      'calendarStartDay' | 'dateFormat' | 'fieldClassName' | 'isClearable' | 'locale' | 'usePortal'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.DATE;
}

export interface IColumnDynamicSearch<T>
  extends IColumn,
    Pick<
      IDynamicSearchFieldProps,
      'isClearable' | 'noOptionsMessage' | 'placeholder' | 'resolveValue' | 'searchOptions' | 'usePortal'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.DYNAMICSEARCH;
}

export interface IColumnFile<T>
  extends IColumn,
    Pick<
      IFileFieldProps,
      | 'acceptTypes'
      | 'additionalInfo'
      | 'maxFiles'
      | 'maxFileSize'
      | 'maxFolderDepth'
      | 'onDelete'
      | 'onDownload'
      | 'onFailure'
      | 'onSuccess'
      | 'requestHeaders'
      | 'requestMethod'
      | 'requestUrl'
      | 'requestWithCredentials'
      | 'showFileSize'
      | 'showProgressBar'
      | 'uploadMessage'
      | 'localization'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.FILE;
}

export interface IColumnMultiSelect<T>
  extends IColumn,
    Pick<
      IMultiSelectFieldProps,
      'isClearable' | 'numberOfItemLabel' | 'numberOfItemsLabel' | 'placeholder' | 'usePortal'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  /** Options available to be picked from */
  options: Array<IOption> | ((row: T | undefined) => Array<IOption>);
  /** Column type */
  type: ColumnType.MULTISELECT;
}

export interface IColumnNumber<T>
  extends IColumn,
    Pick<
      IAmountFieldProps,
      | 'allowNegative'
      | 'decimalScale'
      | 'decimalSeparator'
      | 'maxValue'
      | 'minValue'
      | 'placeholder'
      | 'prefix'
      | 'suffix'
      | 'thousandSeparator'
      | 'thousandsGroupStyle'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.NUMBER;
}

export interface IColumnPercentage<T>
  extends IColumn,
    Pick<
      IPercentageFieldProps,
      | 'allowNegative'
      | 'decimalScale'
      | 'decimalSeparator'
      | 'maxValue'
      | 'minValue'
      | 'placeholder'
      | 'thousandSeparator'
      | 'thousandsGroupStyle'
    > {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.PERCENTAGE;
}

export interface IColumnRichText<T>
  extends IColumn,
    Pick<IRichTextFieldProps, 'convertImagesToBase64' | 'enableImage' | 'enableLink' | 'locale' | 'maxLength'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.RICHTEXT;
}

export interface IColumnSection<T>
  extends IColumn,
    Pick<IFieldSectionLegacyProps<T>, 'collapsible' | 'fields' | 'label' | 'openInitially'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Column type */
  type: ColumnType.SECTION;
}

export interface IColumnSwitch<T> extends IColumn {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.SWITCH;
}

export interface IColumnTable<T, U extends yup.AnyObject>
  extends IColumn,
    Pick<ILineEditableDataTableProps<U>, 'columns' | 'extra' | 'loading' | 'onSortChange'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.TABLE;
}

export interface IColumnText<T> extends IColumn, Pick<ITextFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.TEXT;
}

export interface IColumnTextArea<T>
  extends IColumn,
    Pick<ITextAreaFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.TEXTAREA;
}

export interface IColumnYear<T> extends IColumn, Pick<IYearPickerFieldProps, 'usePortal'> {
  /** Entry of the value in T (type: keyof T) */
  dataIndex: keyof T;
  /** Enables edition for column (optional, default: false) */
  editable?: boolean;
  /** Column type */
  type: ColumnType.YEAR;
}

export type IColumnType<T> =
  | IColumnAmount<T>
  | IColumnBadge<T>
  | IColumnButton<T>
  | IColumnCheckbox<T>
  | IColumnCode<T>
  | IColumnCustom<T>
  | IColumnDate<T>
  | IColumnDescription<T>
  | IColumnDynamicSearch<T>
  | IColumnFile<T>
  | IColumnMultiSelect<T>
  | IColumnNumber<T>
  | IColumnPercentage<T>
  | IColumnRichText<T>
  | IColumnSection<T>
  | IColumnSwitch<T>
  // TODO investigate type resolution
  // Using any to avoid circular type definition for now, until there is a way to get the type of an item of T[keyof T]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | IColumnTable<T, any>
  | IColumnText<T>
  | IColumnTextArea<T>
  | IColumnYear<T>;

export type TableType<T> = Record<keyof T, string | number | Date | undefined | null>;

export interface IExtraStaticDataTableProps<T> {
  /** Method used to enable and compute the total for each column (optional, default: undefined) */
  computeTotal?: (data: Array<T>, dataIndex: keyof T) => T[keyof T] | undefined;
  /** Global suffix, which can be override by the amount column setting (optional, default: undefined) */
  suffix?: string;
  /** Global prefix, which can be override by the amount column setting (optional, default: undefined) */
  prefix?: string;
  /** Global date format, which can be override by the date column setting (optional, default: undefined) */
  dateFormat?: DateFormat;
  /** Method used to enable the click on row, and handle the click on a specific row (optional, default: undefined) */
  onRowClick?: (row: T, rowIndex: number) => void;
  /** Method used to enable the selection of rows, and handle the selection of a specific row (optional, default: undefined) */
  onRowSelect?: (selectedRows: Array<T>, clickedRow: T, rowIndex: number) => void;
  /** CSS style of the rows */
  rowStyle?: CSSProperties;
  /** Method used to disable the selection of a specific row, by default not called and considered as selectable (optional, default: undefined) */
  isSelectable?: (row: T, rowIndex: number) => boolean;
  /** localization (optional, default:
   *    moreActionsMessage: 'More actions'
   *    noData: 'No data'
   *    sortMessage: 'Click to sort'
   *    total: 'Total'
   * )
   */
  localization?: {
    moreActionsMessage?: string;
    noData?: string;
    sortMessage?: string;
    total?: string;
  };
}

export interface IExtraLineEditableDataTableProps<T extends yup.AnyObject> extends IExtraStaticDataTableProps<T> {
  /** Action column width (as a CSSProperty) (optional, default: undefined) */
  actionColumnWidth?: string;
  /** Disable tabbing outside modal (optional, default: true) */
  disableTabOutside?: boolean;
  /** Notification of initiation of changes on a specific row (optional, default: undefined) */
  onRowEdit?: (editRow: T, editedRowIndex: number) => void;
  /** Additional actions shown in the row edit modal (optional, default: undefined) */
  rowEditExtraActions?: (
    editRow: T,
    editedRowIndex: number,
  ) => Array<{
    label: string;
    // If the execution of this action fails, notify the user and reject the call.
    onClick: (editRow: T, editedRowIndex: number) => Promise<void>;
    // Color of the button (optional, default: ButtonColorEnum.SECONDARY)
    color?: ButtonColorEnum;
  }>;
  /** Show side by side in modal (optional, default: false) */
  showChanges?: boolean;
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
  /** Validation schema to be used in the modal (if this conditions are not met, the line cannot be updated) (optional, default: undefined) */
  validationSchema: yup.ObjectSchema<T>;
  /** localization (optional, default:
   *    actionColumn: 'Actions'
   *    addRow: 'Add row'
   *    cancelButton: 'Cancel'
   *    deleteButton: 'Delete'
   *    deletePopoverMessage: 'Delete?'
   *    deletePopoverConfirm: 'Confirm'
   *    deletePopoverCancel: 'Cancel'
   *    downloadButton: 'Download'
   *    editButton: 'Edit'
   *    modalTitle: 'Edit row'
   *    moreActionsMessage: 'More actions'
   *    noData: 'No data'
   *    sortMessage: 'Click to sort'
   *    submitButton: 'Submit'
   *    total: 'Total'
   * )
   */
  localization?: {
    actionColumn?: string;
    addRow?: string;
    cancelButton?: string;
    deleteButton?: string;
    deletePopoverMessage?: string;
    deletePopoverConfirm?: string;
    deletePopoverCancel?: string;
    downloadButton?: string;
    editButton?: string;
    modalTitle?: ((row: T, rowIndex: number) => string) | string;
    moreActionsMessage?: string;
    noData?: string;
    sortMessage?: string;
    submitButton?: string;
    total?: string;
  };
}

export interface IExtraLineEditableInPlaceDataTableProps<T> extends IExtraStaticDataTableProps<T> {
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
  /** localization (optional, default:
   *    actionColumn: 'Actions'
   *    addRow: 'Add row'
   *    cancelButton: 'Cancel'
   *    deleteButton: 'Delete'
   *    deletePopoverMessage: 'Delete?'
   *    deletePopoverConfirm: 'Confirm'
   *    deletePopoverCancel: 'Cancel'
   *    downloadButton: 'Download'
   *    editButton: 'Edit'
   *    moreActionsMessage: 'More actions'
   *    noData: 'No data'
   *    sortMessage: 'Click to sort'
   *    submitButton: 'Submit'
   *     total: 'Total'
   * )
   */
  localization?: {
    actionColumn?: string;
    addRow?: string;
    cancelButton?: string;
    deleteButton?: string;
    deletePopoverMessage?: string;
    deletePopoverConfirm?: string;
    deletePopoverCancel?: string;
    downloadButton?: string;
    editButton?: string;
    moreActionsMessage?: string;
    noData?: string;
    sortMessage?: string;
    submitButton?: string;
    total?: string;
  };
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
  /** Notification of a newly added row (optional, default: undefined),
   * this is defined to ensure data synchronization after state update */
  onRowAdded?: () => void;
  /** localization (optional, default:
   *    actionColumn: 'Actions'
   *    addRow: 'Add row'
   *    deleteButton: 'Delete'
   *    deletePopoverMessage: 'Delete?'
   *    deletePopoverConfirm: 'Confirm'
   *    deletePopoverCancel: 'Cancel'
   *    downloadButton: 'Download'
   *    moreActionsMessage: 'More actions'
   *    noData: 'No data'
   *    sortMessage: 'Click to sort'
   *    total: 'Total'
   * )
   */
  localization?: {
    actionColumn?: string;
    addRow?: string;
    deleteButton?: string;
    deletePopoverMessage?: string;
    deletePopoverConfirm?: string;
    deletePopoverCancel?: string;
    downloadButton?: string;
    moreActionsMessage?: string;
    noData?: string;
    sortMessage?: string;
    total?: string;
  };
}
