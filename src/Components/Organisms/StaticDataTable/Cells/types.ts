import { IColumnType, IExtraLineEditableDataTableProps, IExtraStaticDataTableProps } from '../types';

export interface ICellProps<T, U extends IColumnType<T>> {
  column: U;
  editing?: boolean;
  extra?: IExtraStaticDataTableProps<T> | IExtraLineEditableDataTableProps<T>;
  forcedValue?: T[keyof T] | number | string | Date | null;
  onChange?: (newValue: T[keyof T]) => void;
  row?: T;
  rowIndex: number;
}
