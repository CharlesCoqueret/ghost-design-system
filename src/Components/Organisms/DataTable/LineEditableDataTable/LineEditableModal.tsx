import React, { ReactElement } from 'react';
import compact from 'lodash/compact';
import cloneDeep from 'lodash/cloneDeep';

import { Modal, ModalBody, ModalFooter } from '../../../Atoms/Modal';
import { Button, ColorButtonEnum } from '../../../Molecules/Button';
import { FieldTypeEnum, IFieldAndLayoutProps } from '../../Form/types';
import useForm from '../../Form/useForm';
import { ColumnType, IColumnType, IExtraLineEditableDataTableProps } from '../Common/types';

export interface ILineEditableModalProps<T> {
  title: string;
  showChanges?: boolean;
  row: T;
  rowIndex: number;
  onCancel: (rowWithCancelledChanges: T) => void;
  onClose: () => void;
  onSubmit: (updatedRow: T) => void;
  columns: Array<IColumnType<T>>;
  extra?: IExtraLineEditableDataTableProps<T>;
}

const columnToFieldMapper = <T,>(columns: Array<IColumnType<T>>): Array<IFieldAndLayoutProps<T>> => {
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
            fieldType: FieldTypeEnum.AMOUNT,
            label: column.title,
            maxValue: column.maxValue,
            minValue: column.minValue,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            suffix: column.currency,
            thousandSeparator: column.thousandSeparator,
            thousandsGroupStyle: column.thousandsGroupStyle,
          };
        }
        case ColumnType.BADGE: {
          return {
            colors: column.selectColors,
            dataIndex: column.dataIndex,
            fieldType: FieldTypeEnum.SELECT,
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
        // TODO add checkbox mapping
        case ColumnType.CODE: {
          return {
            dataIndex: column.dataIndex,
            fieldType: FieldTypeEnum.TEXT,
            label: column.title,
            readOnly: true,
          };
        }
        // TODO add custom mapping
        case ColumnType.DATE: {
          return {
            calendarStartDay: column.calendarStartDay,
            dataIndex: column.dataIndex,
            dateFormat: column.dateFormat,
            fieldType: FieldTypeEnum.DATE,
            isClearable: column.isClearable,
            label: column.title,
            locale: column.locale,
            readOnly: !column.editable,
            usePortal: column.usePortal,
          };
        }
        // TODO add description mapping
        case ColumnType.DYNAMICSEARCH: {
          return {
            colors: column.selectColors,
            dataIndex: column.dataIndex,
            fieldType: FieldTypeEnum.DYNAMICSEARCH,
            isClearable: column.isClearable,
            label: column.title,
            noOptionsMessage: column.noOptionsMessage,
            placeholder: column.placeholder,
            resolveValue: column.resolveValue,
            searchOptions: column.searchOptions,
            usePortal: column.usePortal,
          };
        }
        // TODO add file mapping
        case ColumnType.NUMBER: {
          return {
            allowNegative: column.allowNegative,
            dataIndex: column.dataIndex,
            decimalScale: column.decimalScale,
            decimalSeparator: column.decimalSeparator,
            fieldType: FieldTypeEnum.NUMBER,
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
            fieldType: FieldTypeEnum.PERCENTAGE,
            label: column.title,
            maxValue: column.maxValue,
            minValue: column.minValue,
            placeholder: column.placeholder,
            readOnly: !column.editable,
            thousandSeparator: column.thousandSeparator,
            thousandsGroupStyle: column.thousandsGroupStyle,
          };
        }
        // TODO add richtext mapping
        case ColumnType.TEXT: {
          return {
            maxLength: column.maxLength,
            minLendth: column.minLength,
            fieldType: FieldTypeEnum.TEXT,
            label: column.title,
            dataIndex: column.dataIndex,
            readOnly: !column.editable,
          };
        }
        case ColumnType.TEXTAREA: {
          return {
            maxLength: column.maxLength,
            minLendth: column.minLength,
            fieldType: FieldTypeEnum.TEXTAREA,
            label: column.title,
            dataIndex: column.dataIndex,
            readOnly: !column.editable,
          };
        }
        // TODO add year mapping
        default: {
          throw new Error('Missing ColumnType');
        }
      }
      throw new Error('Should have returned by then');
    }),
  );
};

const LineEditableModal = <T,>(props: ILineEditableModalProps<T>): ReactElement => {
  const { columns, extra, onCancel, onClose, onSubmit, showChanges, row, rowIndex, title } = props;

  const { formElement, getData, submit } = useForm<T>({
    initialData: row,
    previousData: showChanges ? cloneDeep(row) : undefined,
    fields: columnToFieldMapper(columns),
    validationSchema: extra?.validationSchema,
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
                  button
                    .onClick(row, rowIndex)
                    .then(() => {
                      onClose();
                    })
                    .catch();
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
