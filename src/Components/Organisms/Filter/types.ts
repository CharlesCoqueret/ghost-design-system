import { ThousandsGroupStyle } from '../../Atoms/AmountInput';
import { DateFormat, WeekDayEnum } from '../../Atoms/DatePickerInput';
import { IOption } from '../../Atoms/SelectInput';

export enum FilterTypeEnum {
  CHECKBOX = 'checkbox',
  DATE = 'date',
  DYNAMICSEARCH = 'dynamicsearch',
  MULTISELECT = 'multiselect',
  NUMBER = 'number',
  COLUMN = 'column',
  SELECT = 'select',
  TEXT = 'text',
  TITLE = 'title',
}

export type IFilterLayoutAndFieldsProps<T> = IFilerColProps<T> | IFilerTitleProps | IFilterFieldsProps<T>;

export type IFilterFieldsProps<T> =
  | IFilterCheckboxProps<T>
  | IFilterDateProps<T>
  | IFilterDynamicSearchProps<T>
  | IFilterMultiSelectProps<T>
  | IFilterNumberProps<T>
  | IFilterSelectProps<T>
  | IFilterTextProps<T>;

export interface IFilterBaseProps<T> {
  dataIndex: keyof T;
  dataTestId?: string;
  fieldClassName?: string;
  fieldSize?: number;
  helperText?: string;
  inputClassName?: string;
  label?: string;
}

export interface IFilterCheckboxProps<T> extends IFilterBaseProps<T> {
  filterType: FilterTypeEnum.CHECKBOX;
}

export interface IFilterDateProps<T> extends IFilterBaseProps<T> {
  calendarStartDay?: WeekDayEnum;
  dateFormat?: DateFormat;
  filterType: FilterTypeEnum.DATE;
  isClearable?: boolean;
  locale?: string;
  name?: string;
  placeholder?: string;
}

export interface IFilterDynamicSearchProps<T> extends IFilterBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  filterType: FilterTypeEnum.DYNAMICSEARCH;
  isClearable?: boolean;
  name?: string;
  noOptionsMessage: (obj: { inputValue: string }) => string;
  placeholder?: string;
  resolveValue: (value: string | number) => Promise<IOption | undefined>;
  searchOptions: (searchTerm: string) => Promise<Array<IOption> | undefined>;
}

export interface IFilterMultiSelectProps<T> extends IFilterBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  filterType: FilterTypeEnum.MULTISELECT;
  isClearable?: boolean;
  name?: string;
  numberOfItemLabel: string;
  numberOfItemsLabel: string;
  options: Array<IOption>;
  placeholder?: string;
}

export interface IFilterNumberProps<T> extends IFilterBaseProps<T> {
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  filterType: FilterTypeEnum.NUMBER;
  maxValue?: number;
  minValue?: number;
  name?: string;
  placeholder?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  thousandSeparator?: string;
  thousandsGroupStyle?: ThousandsGroupStyle;
}

export interface IFilerColProps<T> {
  filterType: FilterTypeEnum.COLUMN;
  fields: Array<IFilterLayoutAndFieldsProps<T>>;
}

export interface IFilterSelectProps<T> extends IFilterBaseProps<T> {
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  filterType: FilterTypeEnum.SELECT;
  isClearable?: boolean;
  name?: string;
  options: Array<IOption>;
  placeholder?: string;
}

export interface IFilterTextProps<T> extends IFilterBaseProps<T> {
  filterType: FilterTypeEnum.TEXT;
  maxLength?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
}

export interface IFilerTitleProps {
  filterType: FilterTypeEnum.TITLE;
  label: string;
}
