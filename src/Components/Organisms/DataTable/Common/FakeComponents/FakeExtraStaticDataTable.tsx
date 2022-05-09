import React, { ReactElement } from 'react';
import { IExtraStaticDataTableProps } from '../types';

const FakeExtraStaticDataTable = <T,>(props: IExtraStaticDataTableProps<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};

export default FakeExtraStaticDataTable;
