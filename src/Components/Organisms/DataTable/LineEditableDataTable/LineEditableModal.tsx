import React, { ReactElement } from 'react';
import compact from 'lodash/compact';
import cloneDeep from 'lodash/cloneDeep';
import * as yup from 'yup';

import { Modal, ModalBody, ModalFooter } from '../../../Atoms/Modal';
import { Button, ColorButtonEnum } from '../../../Molecules/Button';
import { FieldLegacyTypeEnum, IFieldAndLayoutLegacyProps } from '../../FormLegacy/types';
import useFormLegacy from '../../FormLegacy/useFormLegacy';
import { ColumnType, IColumnType, IExtraLineEditableDataTableProps } from '../Common/types';

export interface ILineEditableModalProps<T extends yup.AnyObject> {
  title: string;
  showChanges?: boolean;
  row: T;
  rowIndex: number;
  onCancel: (rowWithCancelledChanges: T) => void;
  onClose: () => void;
  onSubmit: (updatedRow: T) => void;
  columns: Array<IColumnType<T>>;
  extra: IExtraLineEditableDataTableProps<T>;
}

export const columnToFieldMapper = <T,>(columns: Array<IColumnType<T>>): Array<IFieldAndLayoutLegacyProps<T>> => {
  return compact(
    columns.map((column) => {
      // Manage the case of hidden field in form
      if (column.hiddenInForm) return undefined;

      switch (column.type) {
        case ColumnType.AMOUNT: {
          return {
            allowNegative: column.allowNegative,
            dataIndex: column.dataIndex,
            decimalScale: column.decimalScale,
            decimalSeparator: column.decimalSeparator,
            fieldType: FieldLegacyTypeEnum.AMOUNT,
            label: column.title,
            maxValue: column.maxValue,
            minValue: column.minValue,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            suffix: column.suffix,
            prefix: column.prefix,
            thousandSeparator: column.thousandSeparator,
            thousandsGroupStyle: column.thousandsGroupStyle,
          };
        }
        case ColumnType.BADGE: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.SELECT,
            isClearable: column.isClearable,
            label: column.title,
            options: column.options,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            usePortal: column.usePortal,
          };
        }
        case ColumnType.BUTTON: {
          return undefined;
        }
        case ColumnType.CHECKBOX: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.CHECKBOX,
            label: column.title,
            readOnly: !column.editable,
          };
        }
        case ColumnType.CODE: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.TEXT,
            label: column.title,
            readOnly: true,
          };
        }
        case ColumnType.CUSTOM: {
          return {
            customField: column.customRender,
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.CUSTOM,
            label: column.title,
            readOnly: !column.editable,
          };
        }
        case ColumnType.DATE: {
          return {
            calendarStartDay: column.calendarStartDay,
            dataIndex: column.dataIndex,
            dateFormat: column.dateFormat,
            fieldType: FieldLegacyTypeEnum.DATE,
            fieldClassName: column.fieldClassName,
            isClearable: column.isClearable,
            label: column.title,
            locale: column.locale,
            readOnly: !column.editable,
            usePortal: column.usePortal,
          };
        }
        case ColumnType.DESCRIPTION: {
          return {
            dataIndex: column.dataIndex,
            description: column.description,
            label: column.title,
            fieldType: FieldLegacyTypeEnum.DESCRIPTION,
          };
        }
        case ColumnType.DYNAMICSEARCH: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.DYNAMICSEARCH,
            isClearable: column.isClearable,
            label: column.title,
            noOptionsMessage: column.noOptionsMessage,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            resolveValue: column.resolveValue,
            searchOptions: column.searchOptions,
            usePortal: column.usePortal,
          };
        }
        case ColumnType.FILE: {
          return {
            acceptTypes: column.acceptTypes,
            additionalInfo: column.additionalInfo,
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.FILE,
            label: column.title,
            readOnly: !column.editable,
            maxFiles: column.maxFiles,
            maxFileSize: column.maxFileSize,
            maxFolderDepth: column.maxFolderDepth,
            onDelete: column.onDelete,
            onDownload: column.onDownload,
            onFailure: column.onFailure,
            onSuccess: column.onSuccess,
            requestHeaders: column.requestHeaders,
            requestMethod: column.requestMethod,
            requestUrl: column.requestUrl,
            requestWithCredentials: column.requestWithCredentials,
            showFileSize: column.showFileSize,
            showProgressBar: column.showProgressBar,
            uploadMessage: column.uploadMessage,
            localization: column.localization,
          };
        }
        case ColumnType.MULTISELECT: {
          return {
            dataIndex: column.dataIndex,
            eraseValueWhenNotInOptions: column.eraseValueWhenNotInOptions,
            fieldType: FieldLegacyTypeEnum.MULTISELECT,
            isClearable: column.isClearable,
            label: column.title,
            numberOfItemLabel: column.numberOfItemLabel,
            numberOfItemsLabel: column.numberOfItemsLabel,
            options: column.options,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            usePortal: column.usePortal,
          };
        }
        case ColumnType.NUMBER: {
          return {
            allowNegative: column.allowNegative,
            dataIndex: column.dataIndex,
            decimalScale: column.decimalScale,
            decimalSeparator: column.decimalSeparator,
            fieldType: FieldLegacyTypeEnum.NUMBER,
            label: column.title,
            maxValue: column.maxValue,
            minValue: column.minValue,
            placeholder: column.placeholder,
            prefix: column.prefix,
            readOnly: !column.editable,
            suffix: column.suffix,
            thousandSeparator: column.thousandSeparator,
            thousandsGroupStyle: column.thousandsGroupStyle,
          };
        }
        case ColumnType.PERCENTAGE: {
          return {
            allowNegative: column.allowNegative,
            dataIndex: column.dataIndex,
            decimalScale: column.decimalScale,
            decimalSeparator: column.decimalSeparator,
            fieldType: FieldLegacyTypeEnum.PERCENTAGE,
            label: column.title,
            maxValue: column.maxValue,
            minValue: column.minValue,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            thousandSeparator: column.thousandSeparator,
            thousandsGroupStyle: column.thousandsGroupStyle,
          };
        }
        case ColumnType.RICHTEXT: {
          return {
            convertImagesToBase64: column.convertImagesToBase64,
            dataIndex: column.dataIndex,
            enableImage: column.enableImage,
            enableLink: column.enableLink,
            locale: column.locale,
            fieldType: FieldLegacyTypeEnum.RICHTEXT,
            label: column.title,
            maxLength: column.maxLength,
            readOnly: !column.editable,
          };
        }
        case ColumnType.SECTION: {
          return {
            collapsible: column.collapsible,
            dataIndex: column.dataIndex,
            fields: column.fields,
            openInitially: column.openInitially,
            fieldType: FieldLegacyTypeEnum.SWITCH,
            label: column.title,
          };
        }
        case ColumnType.SWITCH: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.SWITCH,
            label: column.title,
            readOnly: !column.editable,
          };
        }
        case ColumnType.TABLE: {
          return {
            columns: column.columns,
            extra: column.extra,
            loading: column.loading,
            onSortChange: column.onSortChange,
            fieldType: FieldLegacyTypeEnum.LINE_EDITABLE_TABLE,
            label: column.title,
            dataIndex: column.dataIndex,
            readOnly: !column.editable,
          };
        }
        case ColumnType.TEXT: {
          return {
            maxLength: column.maxLength,
            minLendth: column.minLength,
            fieldType: FieldLegacyTypeEnum.TEXT,
            label: column.title,
            dataIndex: column.dataIndex,
            readOnly: !column.editable,
          };
        }
        case ColumnType.TEXTAREA: {
          return {
            maxLength: column.maxLength,
            minLendth: column.minLength,
            fieldType: FieldLegacyTypeEnum.TEXTAREA,
            label: column.title,
            dataIndex: column.dataIndex,
            readOnly: !column.editable,
          };
        }
        case ColumnType.YEAR: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldLegacyTypeEnum.YEAR,
            label: column.title,
            readOnly: !column.editable,
            usePortal: column.usePortal,
          };
        }
      }
    }),
  );
};

const LineEditableModal = <T extends yup.AnyObject>(props: ILineEditableModalProps<T>): ReactElement => {
  const { columns, extra, onCancel, onClose, onSubmit, showChanges, row, rowIndex, title } = props;

  const { formElement, getData, submit } = useFormLegacy<T>({
    enableOldData: showChanges,
    enableSideBySide: showChanges,
    initialData: row,
    previousData: showChanges ? cloneDeep(row) : undefined,
    fields: columnToFieldMapper(columns),
    validationSchema: extra.validationSchema,
    usePortal: false,
  });

  return (
    <Modal
      show={true}
      title={title}
      closeIcon={false}
      closeOnPressEscape={false}
      closeOnClickOutside={false}
      disableTabOutside={extra?.disableTabOutside}
      size='lg'>
      <ModalBody>{formElement}</ModalBody>
      <ModalFooter>
        {extra?.rowEditExtraActions !== undefined &&
          extra.rowEditExtraActions(row, rowIndex).map((button) => {
            return (
              <Button
                color={button.color || ColorButtonEnum.SECONDARY}
                key={button.label}
                label={button.label}
                onClick={async () => {
                  button.onClick(row, rowIndex).then(onClose).catch();
                }}
              />
            );
          })}
        <Button
          color={ColorButtonEnum.SECONDARY}
          label={extra?.localization?.cancelButton ?? 'Cancel'}
          onClick={() => {
            onCancel(getData());
          }}
        />
        <Button
          color={ColorButtonEnum.PRIMARY}
          label={extra?.localization?.submitButton ?? 'Submit'}
          onClick={() => {
            const result = submit();
            if (!result.valid) {
              return;
            }
            onSubmit(result.data);
          }}
        />
      </ModalFooter>
    </Modal>
  );
};

export default LineEditableModal;
