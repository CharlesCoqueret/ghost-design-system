import { IColumnType, IExtraLineEditableDataTableProps, IExtraStaticDataTableProps } from '../types';

export interface ICellProps<T, U extends IColumnType<T>> {
  column: U;
  row?: T;
  rowIndex: number;
  extra?: IExtraStaticDataTableProps<T> | IExtraLineEditableDataTableProps<T>;
  forcedValue?: T[keyof T] | number | string | Date | null;
  onChange?: (newValue?: T[keyof T]) => void;
}
