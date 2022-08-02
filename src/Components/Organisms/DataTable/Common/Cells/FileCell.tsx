import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnFile } from '../types';
import { FileField } from '../../../../Molecules/FileField';
import { IFile } from '../../../../Atoms/FileInput';

const FileCell = <T,>(props: ICellProps<T, IColumnFile<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as Array<IFile> | undefined;

  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.editable : false);

  return (
    <td
      className={classnames({ ellipsis: column.ellipsis }, 'table--cell--code')}
      style={{ display: column.hidden ? 'none' : undefined }}>
      <FileField
        acceptTypes={column.acceptTypes}
        additionalInfo={column.additionalInfo}
        dataTestId={dataTestId}
        inputClassName={classnames('gds-typography', { ellipsis: column.ellipsis })}
        inputValue={displayValue}
        localization={column.localization}
        maxFiles={column.maxFiles}
        maxFileSize={column.maxFileSize}
        maxFolderDepth={column.maxFolderDepth}
        onChange={(newValue: Array<IFile>) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        onDelete={column.onDelete}
        onDownload={column.onDownload}
        onFailure={column.onFailure}
        onSuccess={column.onSuccess}
        requestHeaders={column.requestHeaders}
        requestMethod={column.requestMethod}
        requestUrl={column.requestUrl}
        requestWithCredentials={column.requestWithCredentials}
        showFileSize={column.showFileSize}
        showProgressBar={column.showProgressBar}
        uploadMessage={column.uploadMessage}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default FileCell;
