import { ReactElement } from 'react';
import lang from 'suneditor-react/dist/types/lang';

import { DateFormat, WeekDayEnum } from '../../Atoms/DatePickerInput';
import { IFile } from '../../Atoms/FileInput';
import { IOption } from '../../Atoms/SelectInput';
import { ThousandsGroupStyle } from '../../Atoms/AmountInput';
import { IColumnType } from '../DataTable/Common';
import { IExtraLineEditableDataTableProps, SortDirectionEnum } from '../DataTable/Common/types';

export interface IFormSubmitReturnedType<T> {
  data: T;
  valid: boolean;
}

export interface IUseFormReturnedType<T> {
  formElement: ReactElement;
  getData: () => T;
  isModified: () => boolean;
  reset: () => void;
  submit: () => IFormSubmitReturnedType<T>;
}

export enum FieldTypeEnum {
  AMOUNT = 'amount',
  CHECKBOX = 'checkbox',
  CUSTOM = 'custom',
  DATE = 'date',
  DESCRIPTION = 'description',
  DYNAMICSEARCH = 'dynamicsearch',
  FILE = 'file',
  MULTISELECT = 'multiselect',
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
  RICHTEXT = 'richtext',
  SECTION = 'section',
  SELECT = 'select',
  SWITCH = 'switch',
  TABLE = 'table',
  TEXT = 'text',
  TEXTAREA = 'textarea',
  YEAR = 'year',
}

export type IFieldAndLayoutProps<T> = IFieldProps<T> | ILayoutProps<T>;

export type ILayoutProps<T> = IFieldSectionProps<T> | IFieldDescriptionProps<T>;

export type IFieldProps<T> =
  | IFieldAmountProps<T>
  | IFieldCheckboxProps<T>
  | IFieldCustomProps<T>
  | IFieldDateProps<T>
  | IFieldDynamicSearchProps<T>
  | IFieldFileProps<T>
  | IFieldMultiSelectProps<T>
  | IFieldNumberProps<T>
  | IFieldPercentageProps<T>
  | IFieldSelectProps<T>
  | IFieldSwitchProps<T>
  | IFieldRichtextProps<T>
  // TODO investigate type resolution
  // Using any to avoid circular type definition for now, until there is a way to get the type of an item of T[keyof T]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | IFieldTableProps<T, any>
  | IFieldTextAreaProps<T>
  | IFieldTextProps<T>
  | IFieldYearProps<T>;

export interface IVisibilityProps<T> {
  /** When set to true or when called, returning true, it hides the field or description or section (and children fields) (optional, default: false) */
  hidden?: boolean | ((data: T) => boolean);
}

export interface IFieldBaseProps<T> extends Partial<IVisibilityProps<T>> {
  dataIndex: keyof T;
  disabled?: boolean;
  errorMessage?: string;
  fieldClassName?: string;
  helperText?: string;
  highlighted?: boolean;
  inputClassName?: string;
  label: string;
  mandatory?: boolean;
  name?: string;
  readOnly?: boolean;
}

export interface IFieldAmountProps<T> extends IFieldBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fieldType: FieldTypeEnum.AMOUNT;
  maxValue?: number;
  minValue?: number;
  placeholder?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFieldCheckboxProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.CHECKBOX;
}

export interface IFieldCustomProps<T, U = unknown> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.CUSTOM;
  isEqual?: (previousValue: T[keyof T], currentValue: T[keyof T]) => boolean;
  data?: U;
  customField: (props: U & { onChange: (value: T[keyof T]) => void }) => ReactElement;
}

export interface IFieldDateProps<T> extends IFieldBaseProps<T> {
  calendarStartDay?: WeekDayEnum;
  dateFormat?: DateFormat;
  fieldType: FieldTypeEnum.DATE;
  isClearable?: boolean;
  locale?: string;
  placeholder?: string;
}

export interface IFieldDescriptionProps<T> extends Partial<IVisibilityProps<T>> {
  description: ReactElement;
  fieldType: FieldTypeEnum.DESCRIPTION;
}

export interface IFieldFileProps<T> extends IFieldBaseProps<T> {
  acceptTypes?: string;
  additionalInfo?: string | ReactElement;
  fieldType: FieldTypeEnum.FILE;
  maxFiles?: number;
  maxFileSize?: number;
  maxFolderDepth?: number;
  onDelete: (file: IFile) => Promise<void>;
  onDownload?: (file: IFile) => Promise<void>;
  requestHeaders?: Record<string, string>;
  requestMethod: 'POST' | 'PUT';
  requestUrl: string;
  requestWithCredentials?: boolean;
  showFileSize?: boolean;
  showProgressBar?: boolean;
  uploadMessage?: string | ReactElement;
}

export interface IFieldDynamicSearchProps<T> extends IFieldBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  fieldType: FieldTypeEnum.DYNAMICSEARCH;
  isClearable?: boolean;
  noOptionsMessage: (obj: { inputValue: string }) => string;
  placeholder?: string;
  resolveValue: (value: string | number) => Promise<IOption | undefined>;
  searchOptions: (searchTerm: string) => Promise<Array<IOption> | undefined>;
}

export interface IFieldMultiSelectProps<T> extends IFieldBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  isClearable?: boolean;
  fieldType: FieldTypeEnum.MULTISELECT;
  options: Array<IOption> | ((data: T) => Array<IOption>);
  numberOfItemLabel: string;
  numberOfItemsLabel: string;
  placeholder?: string;
}

export interface IFieldNumberProps<T> extends IFieldBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fieldType: FieldTypeEnum.NUMBER;
  maxValue?: number;
  minValue?: number;
  placeholder?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFieldPercentageProps<T> extends IFieldBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fieldType: FieldTypeEnum.PERCENTAGE;
  maxValue?: number;
  minValue?: number;
  placeholder?: string;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFieldSectionProps<T> extends Partial<IVisibilityProps<T>> {
  collapsable?: boolean;
  fieldType: FieldTypeEnum.SECTION;
  openInitially?: boolean;
  fields: Array<IFieldProps<T>>;
  label: string;
}

export interface IFieldSelectProps<T> extends IFieldBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  isClearable?: boolean;
  fieldType: FieldTypeEnum.SELECT;
  options: Array<IOption> | ((data: T) => Array<IOption>);
  placeholder?: string;
}

export interface IFieldSwitchProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.SWITCH;
}

export interface IFieldRichtextProps<T> extends IFieldBaseProps<T> {
  enableImage?: boolean;
  enableLink?: boolean;
  fieldType: FieldTypeEnum.RICHTEXT;
  locale?: lang;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export interface IFieldTableProps<T, U> extends IFieldBaseProps<T> {
  columns: Array<IColumnType<U>>;
  fieldType: FieldTypeEnum.TABLE;
  extra: IExtraLineEditableDataTableProps<U>;
  loading?: ReactElement;
  onSortChange?: (sortField?: keyof U, sortDirection?: SortDirectionEnum) => void;
}

export interface IFieldTextProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.TEXT;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export interface IFieldTextAreaProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.TEXTAREA;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export interface IFieldYearProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.YEAR;
  placeholder?: string;
}
