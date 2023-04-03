import { ReactElement } from 'react';
import * as yup from 'yup';

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
import { IEditableDataTableProps } from '../DataTable/EditableDataTable/EditableDataTable';
import { ITextFieldProps } from '../../Molecules/TextField/TextField';
import { ITextAreaFieldProps } from '../../Molecules/TextAreaField/TextAreaField';
import { IYearPickerFieldProps } from '../../Molecules/YearPickerField/YearPickerField';
import { IFormProps } from './FormLegacy';

export interface IFormLegacySubmitReturnedType<T> {
  data: T;
  valid: boolean;
}

export interface IUseFormLegacyReturnedType<T extends yup.AnyObject> {
  formElement: ReactElement;
  formProps: IFormProps<T>;
  getData: () => T;
  isModified: () => boolean;
  rehydrate: (data: T) => void;
  reset: () => void;
  submit: () => IFormLegacySubmitReturnedType<T>;
}

export enum FieldLegacyTypeEnum {
  /** Amount field */
  AMOUNT = 'amount',
  /** Checkbox field */
  CHECKBOX = 'checkbox',
  /**
   * Custom field
   * @deprecated will be removed in version 2.1, please use useForm for custom fields
   */
  CUSTOM = 'custom',
  /** Date field */
  DATE = 'date',
  /** Description field */
  DESCRIPTION = 'description',
  /** Dynamic search field */
  DYNAMICSEARCH = 'dynamicsearch',
  /** File field */
  FILE = 'file',
  /** Multi select field */
  MULTISELECT = 'multiselect',
  /** Number field */
  NUMBER = 'number',
  /** Percentage field */
  PERCENTAGE = 'percentage',
  /** Rich text field */
  RICHTEXT = 'richtext',
  /** Section field */
  SECTION = 'section',
  /** Select field */
  SELECT = 'select',
  /** Switch field */
  SWITCH = 'switch',
  /**
   * Line editable table
   * @deprecated will be removed in version 2.1, please use useForm for line editable table
   */
  LINE_EDITABLE_TABLE = 'lineeditabletable',
  /**
   * Editable table
   * @deprecated will be removed in version 2.1, please use useForm for line editable table
   */
  EDITABLE_TABLE = 'editabletable',
  /** Text field */
  TEXT = 'text',
  /** Text area field */
  TEXTAREA = 'textarea',
  /** Year field */
  YEAR = 'year',
}

export type IFieldAndLayoutLegacyProps<T> = IFieldLegacyProps<T> | ILayoutLegacyProps<T>;

export type ILayoutLegacyProps<T> = IFieldSectionLegacyProps<T> | IFieldDescriptionLegacyProps<T>;

export type IFieldLegacyProps<T> =
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
  | IFieldLineEditableTableProps<T, any>
  // TODO investigate type resolution
  // Using any to avoid circular type definition for now, until there is a way to get the type of an item of T[keyof T]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | IFieldEditableTableProps<T, any>
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
  fieldType: FieldLegacyTypeEnum.AMOUNT;
}

export interface IFieldCheckboxProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldLegacyTypeEnum.CHECKBOX;
}

export interface IFieldCustomProps<T, U = unknown> extends IFieldBaseProps<T> {
  fieldType: FieldLegacyTypeEnum.CUSTOM;
  isEqual?: (previousValue: T[keyof T], currentValue: T[keyof T]) => boolean;
  data?: U;
  customField: <
    U extends {
      highlighted?: boolean;
      onChange?: (value: T[keyof T]) => void;
      readOnly?: boolean;
      input?: T[keyof T];
    },
  >(
    props: U,
  ) => ReactElement;
}

export interface IFieldDateProps<T>
  extends IFieldBaseProps<T>,
    Pick<IDatePickerFieldProps, 'calendarStartDay' | 'dateFormat' | 'isClearable' | 'locale' | 'placeholder'> {
  fieldType: FieldLegacyTypeEnum.DATE;
}

export interface IFieldDescriptionLegacyProps<T> extends Partial<IVisibilityProps<T>> {
  dataIndex?: keyof T;
  description: ReactElement | (<U extends { value: T[keyof T] }>(props: U) => ReactElement);
  fieldType: FieldLegacyTypeEnum.DESCRIPTION;
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
  fieldType: FieldLegacyTypeEnum.FILE;
}

export interface IFieldDynamicSearchProps<T>
  extends IFieldBaseProps<T>,
    Pick<
      IDynamicSearchFieldProps,
      'isClearable' | 'noOptionsMessage' | 'placeholder' | 'resolveValue' | 'searchOptions'
    > {
  fieldType: FieldLegacyTypeEnum.DYNAMICSEARCH;
}

export interface IFieldMultiSelectProps<T>
  extends IFieldBaseProps<T>,
    Pick<IMultiSelectFieldProps, 'isClearable' | 'numberOfItemLabel' | 'numberOfItemsLabel' | 'placeholder'> {
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  fieldType: FieldLegacyTypeEnum.MULTISELECT;
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
  fieldType: FieldLegacyTypeEnum.NUMBER;
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
  fieldType: FieldLegacyTypeEnum.PERCENTAGE;
}

export interface IFieldRichtextProps<T>
  extends IFieldBaseProps<T>,
    Pick<IRichTextFieldProps, 'convertImagesToBase64' | 'enableImage' | 'enableLink' | 'locale' | 'maxLength'> {
  fieldType: FieldLegacyTypeEnum.RICHTEXT;
}

export interface IFieldSectionLegacyProps<T> extends Partial<IVisibilityProps<T>> {
  collapsible?: boolean;
  fieldType: FieldLegacyTypeEnum.SECTION;
  fields: Array<IFieldLegacyProps<T>>;
  label: string;
  level?: 1 | 2 | 3;
  openInitially?: boolean;
  separator?: boolean;
}

export interface IFieldSelectProps<T>
  extends IFieldBaseProps<T>,
    Pick<ISelectFieldProps, 'isClearable' | 'placeholder'> {
  // When the value is not present in the options, should the value be erased (optional, default: false)
  eraseValueWhenNotInOptions?: boolean;
  fieldType: FieldLegacyTypeEnum.SELECT;
  options: Array<IOption> | ((data: T) => Array<IOption>);
}

export interface IFieldSwitchProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldLegacyTypeEnum.SWITCH;
}

export interface IFieldEditableTableProps<T, U extends yup.AnyObject>
  extends IFieldBaseProps<T>,
    Pick<IEditableDataTableProps<U>, 'columns' | 'extra' | 'loading' | 'onSortChange'> {
  fieldType: FieldLegacyTypeEnum.EDITABLE_TABLE;
}
export interface IFieldLineEditableTableProps<T, U extends yup.AnyObject>
  extends IFieldBaseProps<T>,
    Pick<ILineEditableDataTableProps<U>, 'columns' | 'extra' | 'loading' | 'onSortChange'> {
  fieldType: FieldLegacyTypeEnum.LINE_EDITABLE_TABLE;
}

export interface IFieldTextProps<T>
  extends IFieldBaseProps<T>,
    Pick<ITextFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  fieldType: FieldLegacyTypeEnum.TEXT;
}

export interface IFieldTextAreaProps<T>
  extends IFieldBaseProps<T>,
    Pick<ITextAreaFieldProps, 'maxLength' | 'minLength' | 'placeholder'> {
  fieldType: FieldLegacyTypeEnum.TEXTAREA;
}

export interface IFieldYearProps<T> extends IFieldBaseProps<T>, Pick<IYearPickerFieldProps, 'placeholder'> {
  fieldType: FieldLegacyTypeEnum.YEAR;
}
