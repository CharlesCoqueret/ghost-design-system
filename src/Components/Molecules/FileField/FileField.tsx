import React, { ReactElement, Ref, useState } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { FileInput, IFile, FileStatusEnum } from '../../Atoms/FileInput';
import { IFileInputProps } from '../../Atoms/FileInput/FileInput';

export interface IFileFieldProps extends Omit<IFileInputProps, 'className' | 'isInError'> {
  /** Additional information (options, default: undefined) */
  additionalInfo?: string | ReactElement;
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Class for the field surrounding the input (optional, default: undefined) */
  fieldClassName?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
}

/**
 * File field component
 *
 * File input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const FileField = (props: IFileFieldProps): ReactElement => {
  const {
    acceptTypes,
    additionalInfo,
    containerRef,
    dataTestId,
    disabled,
    errorMessage,
    fieldClassName,
    fieldSize,
    helperText,
    highlighted,
    inline,
    inputClassName,
    input,
    label,
    labelSize,
    localization,
    mandatory,
    maxFiles,
    maxFileSize,
    maxFolderDepth,
    onChange,
    onDelete,
    onDownload,
    onFailure,
    onSuccess,
    readOnly,
    requestHeaders,
    requestMethod,
    requestUrl,
    requestWithCredentials,
    showFileSize,
    showProgressBar,
    style,
    uploadMessage,
  } = props;

  const [inputLength, setInputLength] = useState(
    input?.filter((file) => {
      if (!file.status) return false;
      return [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(file.status);
    }).length,
  );

  const localOnChange = (files: Array<IFile>): void => {
    if (onChange) {
      onChange(files);
    }
    setInputLength(
      files.filter((file) => {
        if (!file.status) return false;
        return [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(file.status);
      }).length,
    );
  };

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      fieldSize={fieldSize}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      inputLength={inputLength}
      invertInputDescription
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      maxLength={maxFiles}
      readOnly={readOnly}>
      {additionalInfo}
      <FileInput
        acceptTypes={acceptTypes}
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        input={input}
        isInError={errorMessage !== undefined}
        localization={localization}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        maxFolderDepth={maxFolderDepth}
        onChange={localOnChange}
        onDelete={onDelete}
        onDownload={onDownload}
        onFailure={onFailure}
        onSuccess={onSuccess}
        readOnly={readOnly}
        requestHeaders={requestHeaders}
        requestMethod={requestMethod}
        requestUrl={requestUrl}
        requestWithCredentials={requestWithCredentials}
        showFileSize={showFileSize}
        showProgressBar={showProgressBar}
        style={style}
        uploadMessage={uploadMessage}
      />
    </GenericField>
  );
};

FileField.defaultProps = {
  acceptTypes: '*/*',
  additionalInfo: undefined,
  disabled: false,
  errorMessage: undefined,
  fieldClassName: undefined,
  fieldSize: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputClassName: undefined,
  input: undefined,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  maxFiles: undefined,
  maxFileSize: undefined,
  maxFolderDepth: 2,
  onDownload: undefined,
  readOnly: false,
  requestHeaders: undefined,
  requestMethod: 'POST',
  requestWithCredentials: undefined,
  showFileSize: true,
  showProgressBar: true,
  style: undefined,
  uploadMessage: 'Click or drag file to upload',
};

export default FileField;
