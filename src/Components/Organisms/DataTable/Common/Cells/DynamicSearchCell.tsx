import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnDynamicSearch } from '../types';
import { DynamicSearchField } from '../../../../Molecules/DynamicSearchField';

const DynamicSearchCell = <T,>(props: ICellProps<T, IColumnDynamicSearch<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex]) || undefined) as string | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <DynamicSearchField
        colors={column.selectColors}
        dataTestId={dataTestId}
        ellipsis={column.ellipsis}
        inputValue={displayValue}
        isClearable={column.isClearable}
        name={column.title.toString()}
        noOptionsMessage={(obj: { inputValue: string }) => {
          return column.noOptionsMessage(obj);
        }}
        onChange={(newValue: string | number | null | undefined) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        searchOptions={column.searchOptions}
        resolveValue={column.resolveValue}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default DynamicSearchCell;
