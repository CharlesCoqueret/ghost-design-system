import React, { ReactElement } from 'react';
import { IExtraLineEditableInPlaceDataTableProps } from '../types';

const FakeExtraLineEditableInPlaceDataTable = <T,>(props: IExtraLineEditableInPlaceDataTableProps<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};

export default FakeExtraLineEditableInPlaceDataTable;
