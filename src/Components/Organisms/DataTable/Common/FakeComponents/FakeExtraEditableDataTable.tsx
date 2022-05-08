import React, { ReactElement } from 'react';
import { IExtraEditableDataTableProps } from '../types';

const FakeExtraEditableDataTable = <T,>(props: IExtraEditableDataTableProps<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};

export default FakeExtraEditableDataTable;
