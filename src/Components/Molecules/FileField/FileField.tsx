import React, { CSSProperties, ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { FileInput, IFile, FileStatusEnum } from '../../Atoms/FileInput';

export interface IFileFieldProps {
  /** Accepted types (optional, default: '\*\/\*') */
  acceptTypes?: string;
  /** Additional information (options, default: undefined) */
  additionalInfo?: string | ReactElement;
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
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
  /** Input number value (optional, default: undefined) */
  inputValue?: Array<IFile>;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Maximum number of files, if undefined: unlimited (optional, default: undefined) */
  maxFiles?: number;
  /** Maximum file size allowed in bytes, if undefined: unlimited (optional, default: undefined) */
  maxFileSize?: number;
  /** Maximum folder depth scanned when dropping a folder (optional, default: 2) */
  maxFolderDepth?: number;
  /** Name of text field */
  name: string;
  /** handler of changes, notifying any files changes (including new files, states changes, deleted files...)
   * To retrieve the up to date files, simply filter the files on the status FileStatusEnum.DONE */
  onChange: (files: Array<IFile>) => void;
  /** Handler of the download request
   * The promise should reject if the deletion fails. */
  onDelete: (file: IFile) => Promise<void>;
  /** Handler of download request
   * The client should let the user know if the download fails.
   * Promise resolution or rejection will only prevent multiple downloads of the same file. */
  onDownload?: (file: IFile) => Promise<void>;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Extra header (optional, default: undefined) */
  requestHeaders?: Record<string, string>;
  /** HTTP method used for the upload (optional, default: 'POST' ) */
  requestMethod: 'POST' | 'PUT';
  /** Url of the request */
  requestUrl: string;
  /** Enable withCredentials on the request (optional, default: undefined) */
  requestWithCredentials?: boolean;
  /** Show file size in the gallery (optional, default: false) */
  showFileSize?: boolean;
  /** Show progress bar in file gallery (optional, default: false) */
  showProgressBar?: boolean;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
  /** Message present inside the drop zome (optional, default: 'Click or drag file to upload' ) */
  uploadMessage?: string | ReactElement;
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
    inputValue,
    label,
    labelSize,
    mandatory,
    maxFiles,
    maxFileSize,
    maxFolderDepth,
    onChange,
    onDelete,
    onDownload,
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

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      fieldSize={fieldSize}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      inputLength={
        inputValue?.filter((file) => {
          if (!file.status) return false;
          return [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(file.status);
        }).length
      }
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
        inputValue={inputValue}
        isInError={errorMessage !== undefined}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        maxFolderDepth={maxFolderDepth}
        onChange={onChange}
        onDelete={onDelete}
        onDownload={onDownload}
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
  inputValue: undefined,
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
  showFileSize: false,
  showProgressBar: false,
  style: undefined,
  uploadMessage: 'Click or drag file to upload',
};

export default FileField;
