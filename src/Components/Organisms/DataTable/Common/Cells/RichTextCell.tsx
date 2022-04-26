import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnRichText } from '../types';
import { RichTextField } from '../../../../Molecules/RichTextField';

const RichTextCell = <T,>(props: ICellProps<T, IColumnRichText<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <RichTextField
        convertImagesToBase64={column.convertImagesToBase64}
        dataTestId={dataTestId}
        enableImage={column.enableImage}
        enableLink={column.enableLink}
        inputClassName={classnames('gds-typography', { ellipsis: column.ellipsis })}
        inputValue={displayValue}
        locale={column.locale}
        maxLength={column.maxLength}
        name={String(column.dataIndex)}
        onChange={(newValue: string) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default RichTextCell;
