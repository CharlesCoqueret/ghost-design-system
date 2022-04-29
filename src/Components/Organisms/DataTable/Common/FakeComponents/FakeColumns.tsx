import React, { ReactElement } from 'react';
import {
  IColumnAmount,
  IColumnBadge,
  IColumnButton,
  IColumnCheckbox,
  IColumnCode,
  IColumnCustom,
  IColumnDate,
  IColumnDescription,
  IColumnDynamicSearch,
  IColumnFile,
  IColumnMultiSelect,
  IColumnNumber,
  IColumnPercentage,
  IColumnRichText,
  IColumnSection,
  IColumnSwitch,
  IColumnTable,
  IColumnText,
  IColumnTextArea,
  IColumnYear,
} from '../types';

export const FakeColumnAmount = <T,>(props: IColumnAmount<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnBadge = <T,>(props: IColumnBadge<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnButton = <T,>(props: IColumnButton<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnCheckbox = <T,>(props: IColumnCheckbox<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnCode = <T,>(props: IColumnCode<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnCustom = <T,>(props: IColumnCustom<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnDescription = <T,>(props: IColumnDescription<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnDate = <T,>(props: IColumnDate<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnDynamicSearch = <T,>(props: IColumnDynamicSearch<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnFile = <T,>(props: IColumnFile<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnMultiSelect = <T,>(props: IColumnMultiSelect<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnNumber = <T,>(props: IColumnNumber<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnPercentage = <T,>(props: IColumnPercentage<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnRichText = <T,>(props: IColumnRichText<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnSection = <T,>(props: IColumnSection<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnSwitch = <T,>(props: IColumnSwitch<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnTable = <T, U>(props: IColumnTable<T, U>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnText = <T,>(props: IColumnText<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnTextArea = <T,>(props: IColumnTextArea<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
export const FakeColumnYear = <T,>(props: IColumnYear<T>): ReactElement => {
  return <>{JSON.stringify(props)}</>;
};
