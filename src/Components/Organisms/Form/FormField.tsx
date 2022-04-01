import React, { ReactElement } from 'react';
import isSameDay from 'date-fns/isSameDay';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import intersection from 'lodash/intersection';

import { IToggleEntry } from '../../Atoms';
import {
  AmountField,
  CheckboxField,
  DatePickerField,
  DynamicSearchField,
  MultiSelectField,
  PercentageField,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
  YearPickerField,
} from '../../Molecules';
import Highlighter from './Highlighter';
import { FieldTypeEnum, IFieldProps } from './types';
import { FieldError } from './yupResolver';
import { useRunAfterUpdate } from '../../../hooks';

export interface IFormFieldProps<T> {
  data: T;
  field: IFieldProps<T>;
  handleChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  previousData?: T;
  requiredFromValidation?: boolean;
  validationError?: Record<keyof T, FieldError>;
  usePortal?: boolean;
}

const FormField = <T,>(props: IFormFieldProps<T>): ReactElement => {
  const { data, field, handleChange, previousData, requiredFromValidation, usePortal, validationError } = props;

  const errorMessage = validationError && validationError[field.dataIndex as keyof T]?.message;

  const runAfterUpdate = useRunAfterUpdate();

  switch (field.fieldType) {
    case FieldTypeEnum.AMOUNT: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <AmountField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | number | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.CHECKBOX: {
      let shouldHighlight = false;
      const highlightedOldData =
        previousData &&
        (previousData[field.dataIndex] as unknown as Array<IToggleEntry>).map((oldEntry) => {
          const newEquivalent = (data[field.dataIndex] as unknown as Array<IToggleEntry>).find((newEntry) => {
            return oldEntry.value === newEntry.value;
          });
          if (newEquivalent?.checked === oldEntry.checked) return oldEntry;
          else {
            shouldHighlight = true;
            return { ...oldEntry, highlighted: true };
          }
        });
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={highlightedOldData}
          shouldHighlight={shouldHighlight}>
          <CheckboxField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            // name={field.dataIndex.toString()}
            onChange={(newValue: Array<IToggleEntry> | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as Array<IToggleEntry> | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.DATE: {
      const shouldHighlight =
        previousData &&
        !isSameDay(previousData[field.dataIndex] as unknown as Date, data[field.dataIndex] as unknown as Date);
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <DatePickerField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: Date | null) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as Date | null | undefined)) || undefined}
            errorMessage={errorMessage}
            usePortal={usePortal}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.DYNAMICSEARCH: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <DynamicSearchField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string | number | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | number | undefined)) || undefined}
            errorMessage={errorMessage}
            usePortal={usePortal}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.MULTISELECT: {
      const { options, ...rest } = field;
      const localOptions = typeof options === 'function' ? options(data) : options;
      if (field.eraseValueWhenNotInOptions && data && data[field.dataIndex]) {
        const commonValues = intersection(
          map(localOptions, 'value'),
          data[field.dataIndex] as unknown as Array<string>,
        );
        if (!isEqual(commonValues, data[field.dataIndex])) {
          runAfterUpdate(() => {
            handleChange(field.dataIndex, commonValues as unknown as T[keyof T]);
          });
        }
      }
      const shouldHighlight =
        previousData &&
        !isEqual(
          sortBy(previousData[field.dataIndex] as unknown as Array<string> | undefined),
          sortBy(data[field.dataIndex] as unknown as Array<string> | undefined),
        );
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && (previousData[field.dataIndex] as unknown as Array<string> | undefined)}
          shouldHighlight={shouldHighlight}>
          <MultiSelectField
            {...rest}
            options={localOptions}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: Array<string | number> | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as Array<string> | undefined)) || undefined}
            errorMessage={errorMessage}
            usePortal={usePortal}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.NUMBER: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <AmountField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={data[field.dataIndex] as unknown as string | number | undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.PERCENTAGE: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <PercentageField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | number | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.SELECT: {
      const { options, ...rest } = field;
      const localOptions = typeof options === 'function' ? options(data) : options;
      if (field.eraseValueWhenNotInOptions && data && data[field.dataIndex]) {
        if (!map(localOptions, 'value').includes(data[field.dataIndex] as unknown as string)) {
          runAfterUpdate(() => {
            handleChange(field.dataIndex, undefined as unknown as T[keyof T]);
          });
        }
      }
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <SelectField
            {...rest}
            options={localOptions}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string | number | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | undefined)) || undefined}
            errorMessage={errorMessage}
            usePortal={usePortal}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.SWITCH: {
      let shouldHighlight = false;
      const highlightedOldData =
        previousData &&
        (previousData[field.dataIndex] as unknown as Array<IToggleEntry>).map((oldEntry) => {
          const newEquivalent = (data[field.dataIndex] as unknown as Array<IToggleEntry>).find((newEntry) => {
            return oldEntry.value === newEntry.value;
          });
          if (newEquivalent?.checked === oldEntry.checked) return oldEntry;
          else {
            shouldHighlight = true;
            return { ...oldEntry, highlighted: true };
          }
        });
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={highlightedOldData}
          shouldHighlight={shouldHighlight}>
          <SwitchField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            // name={field.dataIndex.toString()}
            onChange={(newValue: IToggleEntry[]) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as IToggleEntry[] | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.TEXT: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <TextField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.TEXTAREA: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <TextAreaField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as string | undefined)) || undefined}
            errorMessage={errorMessage}
          />
        </Highlighter>
      );
    }
    case FieldTypeEnum.YEAR: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <Highlighter
          highlight={previousData !== undefined}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <YearPickerField
            {...field}
            mandatory={requiredFromValidation || field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            inputValue={(data && (data[field.dataIndex] as unknown as number | undefined)) || undefined}
            errorMessage={errorMessage}
            usePortal={usePortal}
          />
        </Highlighter>
      );
    }

    default: {
      throw new Error('Missing FieldTypeEnum');
    }
  }

  throw new Error('Should have returned by then');
};

FormField.defaultProps = {
  previousData: undefined,
  requiredFromValidation: undefined,
  validationError: undefined,
  usePortal: true,
};

export default FormField;
