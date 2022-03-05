import { IColumnType, IExtraStaticDataTableProps } from '../types';

export interface ICellProps<T, U extends IColumnType<T>> {
  column: U;
  row?: T;
  extra?: IExtraStaticDataTableProps<T>;
  forcedValue?: number | string | undefined;
}
