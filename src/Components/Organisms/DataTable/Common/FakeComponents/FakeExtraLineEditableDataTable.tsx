import React, { ReactElement } from 'react';
import { IExtraLineEditableDataTableProps } from './types';

const FakeExtraLineEditableDataTable = <T,>(props: IExtraLineEditableDataTableProps<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};

export default FakeExtraLineEditableDataTable;
