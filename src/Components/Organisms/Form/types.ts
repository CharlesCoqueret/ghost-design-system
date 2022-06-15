import { ReactElement } from 'react';

import { IOption } from '../../Atoms/SelectInput';
import { IAmountFieldProps } from '../../Molecules/AmountField/AmountField';
import { IDatePickerFieldProps } from '../../Molecules/DatePickerField/DatePickerField';
import { IFileFieldProps } from '../../Molecules/FileField/FileField';
import { IDynamicSearchFieldProps } from '../../Molecules/DynamicSearchField/DynamicSearchField';
import { IMultiSelectFieldProps } from '../../Molecules/MultiSelectField/MultiSelectField';
import { IPercentageFieldProps } from '../../Molecules/PercentageField/PercentageField';
import { IRichTextFieldProps } from '../../Molecules/RichTextField/RichTextField';
import { ISelectFieldProps } from '../../Molecules/SelectField/SelectField';
import { ILineEditableDataTableProps } from '../DataTable/LineEditableDataTable/LineEditableDataTable';
import { ITextFieldProps } from '../../Molecules/TextField/TextField';
import { ITextAreaFieldProps } from '../../Molecules/TextAreaField/TextAreaField';
import { IYearPickerFieldProps } from '../../Molecules/YearPickerField/YearPickerField';

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
  | IFieldRichtextProps<T>
  | IFieldSelectProps<T>
  | IFieldSwitchProps<T>
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

export interface IFieldAmountProps<T>
  extends IFieldBaseProps<T>,
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
  fieldType: FieldTypeEnum.AMOUNT;
}

export interface IFieldCheckboxProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.CHECKBOX;
}

export interface IFieldCustomProps<T, U = unknown> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.CUSTOM;
  isEqual?: (previousValue: T[keyof T], currentValue: T[keyof T]) => boolean;
  data?: U;
  customField: <
    U extends {
      highlighted?: boolean;
      onChange?: (value: T[keyof T]) => void;
      readOnly?: boolean;
      inputValue?: T[keyof T];
    },
  >(
    props: U,
  ) => ReactElement;
}

export interface IFieldDateProps<T>
  extends IFieldBaseProps<T>,
    Pick<IDatePickerFieldProps, 'calendarStartDay' | 'dateFormat' | 'isClearable' | 'locale' | 'placeholder'> {
  fieldType: FieldTypeEnum.DATE;
}

export interface IFieldDescriptionProps<T> extends Partial<IVisibilityProps<T>> {
  dataIndex?: keyof T;
  description: ReactElement | (<U extends { value: T[keyof T] }>(props: U) => ReactElement);
  fieldType: FieldTypeEnum.DESCRIPTION;
}

export interface IFieldFileProps<T>
  extends IFieldBaseProps<T>,
    Pick<
      IFileFieldProps,
      | 'acceptTypes'
      | 'additionalInfo'
      | 'maxFiles'
      | 'maxFileSize'
      | 'maxFolderDepth'
      | 'onDelete'
      | 'onDownload'
      | 'requestHeaders'
      | 'requestMethod'
      | 'requestUrl'
      | 'requestWithCredentials'
      | 'showFileSize'
      | 'showProgressBar'
      | 'uploadMessage'
      | 'localization'
    > {
  fieldType: FieldTypeEnum.FILE;
}

export interface IFieldDynamicSearchProps<T>
  extends IFieldBaseProps<T>,
    Pick<
      IDynamicSearchFieldProps,
      'colors' | 'isClearable' | 'noOptionsMessage' | 'placeholder' | 'resolveValue' | 'searchOptions'
    > {
  fieldType: FieldTypeEnum.DYNAMICSEARCH;
}

export interface IFieldMultiSelectProps<T>
  extends IFieldBaseProps<T>,
    Pick<
      IMultiSelectFieldProps,
      'colors' | 'isClearable' | 'numberOfItemLabel' | 'numberOfItemsLabel' | 'placeholder'
    > {
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  fieldType: FieldTypeEnum.MULTISELECT;
  options: Array<IOption> | ((data: T) => Array<IOption>);
}

export interface IFieldNumberProps<T>
  extends IFieldBaseProps<T>,
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
  fieldType: FieldTypeEnum.NUMBER;
}

export interface IFieldPercentageProps<T>
  extends IFieldBaseProps<T>,
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
  fieldType: FieldTypeEnum.PERCENTAGE;
}

export interface IFieldRichtextProps<T>
  extends IFieldBaseProps<T>,
    Pick<IRichTextFieldProps, 'convertImagesToBase64' | 'enableImage' | 'enableLink' | 'locale' | 'maxLength'> {
  fieldType: FieldTypeEnum.RICHTEXT;
}

export interface IFieldSectionProps<T> extends Partial<IVisibilityProps<T>> {
  collapsable?: boolean;
  fieldType: FieldTypeEnum.SECTION;
  openInitially?: boolean;
  fields: Array<IFieldProps<T>>;
  label: string;
}

export interface IFieldSelectProps<T>
  extends IFieldBaseProps<T>,
    Pick<ISelectFieldProps, 'colors' | 'isClearable' | 'placeholder'> {
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  fieldType: FieldTypeEnum.SELECT;
  options: Array<IOption> | ((data: T) => Array<IOption>);
}

export interface IFieldSwitchProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.SWITCH;
}

export interface IFieldTableProps<T, U>
  extends IFieldBaseProps<T>,
    Pick<ILineEditableDataTableProps<U>, 'columns' | 'extra' | 'loading' | 'onSortChange'> {
  fieldType: FieldTypeEnum.TABLE;
}

export interface IFieldTextProps<T>
  extends IFieldBaseProps<T>,
    Pick<ITextFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  fieldType: FieldTypeEnum.TEXT;
}

export interface IFieldTextAreaProps<T>
  extends IFieldBaseProps<T>,
    Pick<ITextAreaFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  fieldType: FieldTypeEnum.TEXTAREA;
}

export interface IFieldYearProps<T> extends IFieldBaseProps<T>, Pick<IYearPickerFieldProps, 'placeholder'> {
  fieldType: FieldTypeEnum.YEAR;
}
