import {
  IColumnType,
  IExtraEditableDataTableProps,
  IExtraLineEditableInPlaceDataTableProps,
  IExtraStaticDataTableProps,
} from '../types';

export interface ICellProps<T, U extends IColumnType<T>> {
  column: U;
  dataTestId?: string;
  editing?: boolean;
  extra?: IExtraStaticDataTableProps<T> | IExtraLineEditableInPlaceDataTableProps<T> | IExtraEditableDataTableProps<T>;
  forcedValue?: T[keyof T] | number | string | Date | null;
  onChange?: (newValue: T[keyof T]) => void;
  row?: T;
  rowIndex: number;
}
