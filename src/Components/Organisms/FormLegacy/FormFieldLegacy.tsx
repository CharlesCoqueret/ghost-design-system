import React, { memo, ReactElement } from 'react';
import isSameDay from 'date-fns/isSameDay';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import * as yup from 'yup';

import { IToggleEntry } from '../../Atoms/CheckBoxInput';
import { FileStatusEnum, IFile } from '../../Atoms/FileInput';
import { AmountField } from '../../Molecules/AmountField';
import { CheckboxField } from '../../Molecules/CheckboxField';
import { DatePickerField } from '../../Molecules/DatePickerField';
import { DynamicSearchField } from '../../Molecules/DynamicSearchField';
import { FileField } from '../../Molecules/FileField';
import { MultiSelectField } from '../../Molecules/MultiSelectField';
import { PercentageField } from '../../Molecules/PercentageField';
import { SelectField } from '../../Molecules/SelectField';
import { SwitchField } from '../../Molecules/SwitchField';
import { RichTextField } from '../../Molecules/RichTextField';
import { TextAreaField } from '../../Molecules/TextAreaField';
import { TextField } from '../../Molecules/TextField';
import { YearPickerField } from '../../Molecules/YearPickerField';
import { EditableDataTable } from '../DataTable/EditableDataTable';
import { LineEditableDataTable } from '../DataTable/LineEditableDataTable';
import HighlighterLegacy from './HighlighterLegacy';
import { FieldLegacyTypeEnum, IFieldLegacyProps } from './types';
import { useRunAfterUpdate } from '../../../hooks';

export interface IFormFieldLegacyProps<T> {
  data: T;
  enableOldData?: boolean;
  enableSideBySide?: boolean;
  field: IFieldLegacyProps<T>;
  handleChange: (dataIndex: keyof T, newValue: T[keyof T]) => void;
  previousData?: T;
  requiredFromValidation?: boolean;
  validationError?: Partial<Record<keyof T, string>>;
  usePortal?: boolean;
}

const FormFieldLegacy = <T,>(props: IFormFieldLegacyProps<T>): ReactElement => {
  const {
    data,
    enableOldData,
    enableSideBySide,
    field,
    handleChange,
    previousData,
    requiredFromValidation,
    usePortal,
    validationError,
  } = props;

  const errorMessage = validationError && validationError[field.dataIndex as keyof T];

  const localUsePortal = usePortal === undefined ? true : usePortal;

  const runAfterUpdate = useRunAfterUpdate();

  switch (field.fieldType) {
    case FieldLegacyTypeEnum.AMOUNT: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <AmountField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | number | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.CHECKBOX: {
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
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={highlightedOldData}
          shouldHighlight={shouldHighlight}>
          <CheckboxField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            onChange={(newValue: Array<IToggleEntry> | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as Array<IToggleEntry>)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.CUSTOM: {
      const shouldHighlight =
        previousData && field.isEqual && !field.isEqual(previousData[field.dataIndex], data[field.dataIndex]);
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <field.customField
            {...field}
            input={data[field.dataIndex]}
            onChange={(newValue: T[keyof T]) => {
              handleChange(field.dataIndex, newValue);
            }}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.DATE: {
      const shouldHighlight =
        previousData &&
        !isSameDay(previousData[field.dataIndex] as unknown as Date, data[field.dataIndex] as unknown as Date);
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <DatePickerField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: Date | null) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as Date | null | undefined)) ?? undefined}
            errorMessage={errorMessage}
            usePortal={localUsePortal}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.DYNAMICSEARCH: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <DynamicSearchField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string | number | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | number | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.FILE: {
      const shouldHighlight =
        previousData &&
        ((previousData[field.dataIndex] as unknown as Array<IFile>).length !==
          (data[field.dataIndex] as unknown as Array<IFile>).length ||
          (previousData[field.dataIndex] as unknown as Array<IFile>).every((file) => {
            return (data[field.dataIndex] as unknown as Array<IFile>).includes(file);
          }));
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <FileField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            onChange={(newValue: Array<IFile>) => {
              handleChange(
                field.dataIndex,
                newValue.filter((file) => file.status && file.status === FileStatusEnum.DONE) as unknown as T[keyof T],
              );
              return Promise.resolve();
            }}
            onDelete={field.onDelete}
            onDownload={field.onDownload}
            onFailure={field.onFailure}
            onSuccess={field.onSuccess}
            input={(data && (data[field.dataIndex] as unknown as Array<IFile>)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.MULTISELECT: {
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
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && (previousData[field.dataIndex] as unknown as Array<string> | undefined)}
          shouldHighlight={shouldHighlight}>
          <MultiSelectField
            {...rest}
            options={localOptions}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: Array<string | number> | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as Array<string> | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.NUMBER: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <AmountField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={data[field.dataIndex] as unknown as string | number | undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.PERCENTAGE: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <PercentageField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | number | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.RICHTEXT: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <RichTextField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.SELECT: {
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
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <SelectField
            {...rest}
            options={localOptions}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string | number | null | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.SWITCH: {
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
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={highlightedOldData}
          shouldHighlight={shouldHighlight}>
          <SwitchField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            onChange={(newValue: IToggleEntry[]) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as IToggleEntry[])) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.LINE_EDITABLE_TABLE: {
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={false}>
          <LineEditableDataTable
            {...field}
            extra={{
              ...field.extra,
              onRowSubmit: (editedRow, submittedRowIndex: number) => {
                (data[field.dataIndex] as unknown as Array<unknown>)[submittedRowIndex] = editedRow;
                handleChange(field.dataIndex, data[field.dataIndex]);
              },
              onRowDelete: (_deletedRow, deletedRowIndex: number) => {
                (data[field.dataIndex] as unknown as Array<unknown>).splice(deletedRowIndex, 1);
                handleChange(field.dataIndex, data[field.dataIndex]);
              },
            }}
            data={data && (data[field.dataIndex] as unknown as Array<yup.AnyObject>)}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.EDITABLE_TABLE: {
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={false}>
          <EditableDataTable
            {...field}
            extra={{
              ...field.extra,
              onEdit: (editedRow, _dataIndex, submittedRowIndex: number) => {
                (data[field.dataIndex] as unknown as Array<unknown>)[submittedRowIndex] = editedRow;
                handleChange(field.dataIndex, data[field.dataIndex]);
              },
              onRowDelete: (_deletedRow, deletedRowIndex: number) => {
                (data[field.dataIndex] as unknown as Array<unknown>).splice(deletedRowIndex, 1);
                handleChange(field.dataIndex, data[field.dataIndex] as unknown as T[keyof T]);
              },
              onRowAdded: () => {
                handleChange(field.dataIndex, data[field.dataIndex] as unknown as T[keyof T]);
              },
            }}
            data={data && (data[field.dataIndex] as unknown as Array<yup.AnyObject>)}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.TEXT: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <TextField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.TEXTAREA: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <TextAreaField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: string) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as string | undefined)) ?? undefined}
            errorMessage={errorMessage}
          />
        </HighlighterLegacy>
      );
    }
    case FieldLegacyTypeEnum.YEAR: {
      const shouldHighlight = previousData && previousData[field.dataIndex] !== data[field.dataIndex];
      return (
        <HighlighterLegacy
          enableOldData={enableOldData}
          enableSideBySide={enableSideBySide}
          oldData={previousData && previousData[field.dataIndex]}
          shouldHighlight={shouldHighlight}>
          <YearPickerField
            {...field}
            mandatory={field.mandatory == undefined ? requiredFromValidation : field.mandatory}
            name={field.dataIndex.toString()}
            onChange={(newValue: number | undefined) => {
              handleChange(field.dataIndex, newValue as unknown as T[keyof T]);
            }}
            input={(data && (data[field.dataIndex] as unknown as number | undefined)) ?? undefined}
            errorMessage={errorMessage}
            usePortal={localUsePortal}
          />
        </HighlighterLegacy>
      );
    }
  }
};

export default memo(FormFieldLegacy) as typeof FormFieldLegacy;
