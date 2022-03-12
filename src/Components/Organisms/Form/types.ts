import { ReactElement } from 'react';

import { ThousandsGroupStyle } from '../../Atoms/AmountInput';
import { IToggleEntry } from '../../Atoms/CheckBoxInput';
import { DateFormat, WeekDayEnum } from '../../Atoms/DatePickerInput/types';
import { IOption } from '../../Atoms/SelectInput/types';

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
  DATE = 'date',
  MULTISELECT = 'multiselect',
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
  SECTION = 'section', // TODO section
  SELECT = 'select',
  SWITCH = 'switch',
  TABLE = 'table', // TODO table
  TEXT = 'text',
  TEXTAREA = 'textared',
  YEAR = 'year',
}

export type IFieldProps<T> =
  | IFieldAmountProps<T>
  | IFieldCheckboxProps<T>
  | IFieldDateProps<T>
  | IFieldMultiSelectProps<T>
  | IFieldNumberProps<T>
  | IFieldPercentageProps<T>
  | IFieldSelectProps<T>
  | IFieldSwitchProps<T>
  | IFieldTextAreaProps<T>
  | IFieldTextProps<T>
  | IFieldYearProps<T>;

export interface IFieldBaseProps<T> {
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
  readonly?: boolean;
}

export interface IFieldAmountProps<T> extends IFieldBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fieldType: FieldTypeEnum.AMOUNT;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFieldCheckboxProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.CHECKBOX;
  onChange?: (values: Array<IToggleEntry>) => void;
}

export interface IFieldDateProps<T> extends IFieldBaseProps<T> {
  calendarStartDay?: WeekDayEnum;
  dateFormat?: DateFormat;
  fieldType: FieldTypeEnum.DATE;
  isClearable?: boolean;
  locale?: string;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
}

export interface IFieldMultiSelectProps<T> extends IFieldBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    controlBackgroundColorDisabled: string; // colors.chalk,
    controlColorDisabled: string; // colors.pebble,
    fontColor: string; // 'rgb(0, 0, 0)',
    multiValueBorderColorDisabled: string; // colors.silver,
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  isClearable?: boolean;
  fieldType: FieldTypeEnum.MULTISELECT;
  onChange?: (newValue: Readonly<Array<IOption>> | null | undefined) => void;
  options: Array<IOption>;
  placeholder?: string;
}

export interface IFieldNumberProps<T> extends IFieldBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fieldType: FieldTypeEnum.NUMBER;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number | undefined) => void;
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
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFieldSelectProps<T> extends IFieldBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    controlBackgroundColorDisabled: string; // colors.chalk,
    controlColorDisabled: string; // colors.pebble,
    fontColor: string; // 'rgb(0, 0, 0)',
    multiValueBorderColorDisabled: string; // colors.silver,
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  isClearable?: boolean;
  fieldType: FieldTypeEnum.SELECT;
  onChange?: (newValue: IOption | null | undefined) => void;
  options: Array<IOption>;
  placeholder?: string;
}

export interface IFieldSwitchProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.SWITCH;
  onChange?: (values: Array<IToggleEntry>) => void;
}

export interface IFieldTextAreaProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.TEXTAREA;
  maxLength?: number;
  minLength?: number;
  onChange?: (newValue: string) => void;
  placeholder?: string;
}

export interface IFieldTextProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.TEXT;
  maxLength?: number;
  minLength?: number;
  onChange?: (newValue: string) => void;
  placeholder?: string;
}

export interface IFieldYearProps<T> extends IFieldBaseProps<T> {
  fieldType: FieldTypeEnum.YEAR;
  isClearable?: boolean;
  locale?: string;
  onChange?: (year: number | undefined) => void;
  placeholder?: string;
}
