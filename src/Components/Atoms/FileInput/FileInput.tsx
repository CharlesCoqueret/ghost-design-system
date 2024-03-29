import React, { ChangeEvent, CSSProperties, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import compact from 'lodash/compact';

import { FileStatusEnum, IFile } from './types';
import { getFilesWebkitDataTransferItems, initializeIFile, injectDoneStatus, injectUid } from './fileUtils';
import FileGallery from './FileGallery';

import styles from './FileInput.module.scss';

export interface IFileInputProps {
  /** Accepted types (optional, default: '\*\/\*') */
  acceptTypes?: string;
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Initial values for the field (optional, default: []) */
  input?: Array<IFile>;
  /** Field is in error state (optional, default: false) */
  isInError?: boolean;
  /** Maximum number of files, if undefined: unlimited (optional, default: undefined) */
  maxFiles?: number;
  /** Maximum file size allowed in bytes, if undefined: unlimited (optional, default: undefined) */
  maxFileSize?: number;
  /** Maximum folder depth scanned when dropping a folder (optional, default: 2) */
  maxFolderDepth?: number;
  /** Name of input (optional, default: undefined) */
  name?: string;
  /** handler of changes, notifying any files changes (including new files, states changes, deleted files...)
   * To retrieve the up to date files, simply filter the files on the status FileStatusEnum.DONE */
  onChange?: (files: Array<IFile>) => void;
  /** Handler of the download request
   * The promise should reject if the deletion fails. */
  onDelete?: (file: IFile) => Promise<void>;
  /** Handler of download request
   * The client should let the user know if the download fails.
   * Promise resolution or rejection will only prevent multiple downloads of the same file. */
  onDownload?: (file: IFile) => Promise<void>;
  /** Handler of the upload failing, use this method to update the error message if needed (optional, default: undefined) */
  onFailure?: (file: IFile, statusText: string) => IFile;
  /** Handler of the upload succeeding, use this method to update the id if needed (optional, default: undefined) */
  onSuccess?: (file: IFile, serverResponse: unknown) => IFile;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Extra header (optional, default: undefined) */
  requestHeaders?: Record<string, string>;
  /** HTTP method used for the upload (optional, default: 'POST' ) */
  requestMethod?: 'POST' | 'PUT';
  /** Url of the request */
  requestUrl?: string;
  /** Enable withCredentials on the request (optional, default: undefined) */
  requestWithCredentials?: boolean;
  /** Show file size in the gallery (optional, default: true) */
  showFileSize?: boolean;
  /** Show progress bar in file gallery (optional, default: true) */
  showProgressBar?: boolean;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
  /** Message present inside the drop zome (optional, default: 'Click or drag file to upload' ) */
  uploadMessage?: string | ReactElement;
  /** Localization of related to deletion and errors */
  localization?: {
    // Delete tooltip (optional, default: 'Delete')
    delete?: string;
    // Delete popover title (optional, default: 'Confirm')
    popoverConfirm?: string;
    // Delete popover cancel button (optional, default: 'Cancel')
    popoverCancel?: string;
    // Delete popover confirm button (optional, default: 'Delete?')
    popoverTitle?: string;
    // Invalid type error (optional, default: 'Invalid type: {type}, expected {expectedType}',
    // with {type} which will be automatically replaced by the current type,
    // and {expectedtype} which will be automatically replaced by the expected type)
    invalidType?: string;
    // Quota exceeded error (optional, default: 'Quota exceeded: Maximum number of files reached')
    quotaExceeded?: string;
    // Size exceeded error (optional, default: 'Size exceeded: {size}, expected {maxSize}'
    // with {size} which will be automatically replaced by the actual size of the file,
    // and {maxSize} which will be automatically replaced by the expected size)
    sizeExceeded?: string;
  };
}

const preventDefaults = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * File input component managing the upload
 */
const FileInput = (props: IFileInputProps): ReactElement => {
  const {
    acceptTypes,
    className,
    dataTestId,
    disabled,
    input,
    isInError,
    localization,
    maxFiles,
    maxFileSize,
    maxFolderDepth,
    name,
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

  const [localItems, setLocalItems] = useState<Array<IFile>>(input?.map(injectUid).map(injectDoneStatus) || []);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const dropArea = useRef<HTMLDivElement>(null);
  const initialLocalItemsDefinition = useRef(true);

  const highlight = () => {
    dropArea.current?.classList.add(styles.highlight);
  };

  const unhighlight = () => {
    dropArea.current?.classList.remove(styles.highlight);
  };

  /**
   * Updates the progress for the file
   * @param file file for which percentage needs to be updated
   * @param percent percant value
   */
  const updateFileProgress = (file: IFile, percent: number): void => {
    setProgress((prev) => {
      if (!file.uid) return prev;
      return { ...prev, [file.uid]: percent };
    });
  };

  /**
   * Sets the error status for the provided file and sets its error message.
   * Deletes the progress of the corresponding file.
   * @param file file to be updated
   * @param error error message
   */
  const updateFileError = (file: IFile, error: string): void => {
    setLocalItems((prev) => {
      const fileToUpdate = prev.find((f) => f.uid === file.uid);

      return compact([
        ...prev.filter((f) => f.uid !== file.uid),
        onFailure
          ? { ...onFailure(file, error), status: FileStatusEnum.ERROR }
          : fileToUpdate && { ...fileToUpdate, status: FileStatusEnum.ERROR, error: error },
      ]);
    });

    setProgress((prev) => {
      if (file.uid) {
        delete prev[file.uid];
      }
      return { ...prev };
    });
  };

  /**
   * Sets the done status for the provided file and sets the server response.
   * Deletes the progress of the corresponding file.
   * @param file file to be updated
   * @param serverResponse server response (in the string format)
   */
  const updateFileUploaded = (file: IFile, serverResponse: unknown): void => {
    setLocalItems((prev) => {
      const fileToUpdate = prev.find((f) => f.uid === file.uid);

      return compact([
        ...prev.filter((f) => f.uid !== file.uid),
        onSuccess
          ? { ...onSuccess(file, serverResponse), status: FileStatusEnum.DONE, error: undefined }
          : fileToUpdate && {
              ...fileToUpdate,
              status: FileStatusEnum.DONE,
              error: undefined,
            },
      ]);
    });

    setProgress((prev) => {
      if (file.uid) {
        delete prev[file.uid];
      }
      return { ...prev };
    });
  };

  /**
   * Triggers the provided download handler
   * @param file file to download
   * @returns Promise
   */
  const updateFileDownload = async (file: IFile): Promise<void> => {
    if (onDownload) {
      return onDownload(file);
    }
    return Promise.resolve();
  };

  /**
   * Sets the deleting status for the provided file and triggers the provided onDelete handler.
   * If the onDelete handler rejects, the file is restored to the done status.
   * @param file file to delete
   * @returns Promise
   */
  const updateFileDelete = async (file: IFile): Promise<void> => {
    if (!onDelete) {
      setLocalItems((prev) => prev.filter((f) => f.uid !== file.uid));

      return;
    }

    setLocalItems((prev) => [...prev.filter((f) => f.uid !== file.uid), { ...file, status: FileStatusEnum.DELETING }]);
    await onDelete(file)
      .then(() => {
        setLocalItems((prev) => prev.filter((f) => f.uid !== file.uid));
      })
      .catch(() => {
        setLocalItems((prev) => [...prev.filter((f) => f.uid !== file.uid), { ...file, status: FileStatusEnum.DONE }]);
      });
  };

  /**
   * Manages the upload of the provided Files:
   *    - checks if size requirement is met (cf maxFileSize)
   *    - checks if maxFiles requirement is met (cf maxFiles)
   *    - checks if file type requirement is met (cf accepTypes)
   *    - Adds file reference locally
   *    - Call single file upload
   * @param files files to upload
   */
  const uploadFiles = (files: Array<File>): void => {
    let fileCount = localItems.filter(
      (item) => item.status && [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(item.status),
    ).length;

    files.map((file) => {
      const quotaExceeded = maxFiles ? fileCount >= maxFiles : false;
      fileCount += 1;

      const newFile = initializeIFile(file, quotaExceeded, acceptTypes, maxFileSize, {
        invalidType: localization?.invalidType,
        quotaExceeded: localization?.quotaExceeded,
        sizeExceeded: localization?.sizeExceeded,
      });

      setLocalItems((prev) => {
        return [...prev, newFile];
      });

      uploadFile(newFile, file);
    });
  };

  /**
   * Manages the upload of the provided File:
   *    - Adds file reference locally
   *    - Sets up the xhr request if the file is meeting requirements
   *    - Sets up progress, readystatechange and timeout handlers
   *    - Sends the request
   * Sets the progress of the corresponding file to 0.
   * @param file file to upload
   */
  const uploadFile = (file: IFile, fileContent: File): void => {
    if (requestUrl === undefined) {
      console.error('missing requestUrl to File Input field');
      return;
    }

    if (file.status !== FileStatusEnum.UPLOADING) return;

    const xhr = new XMLHttpRequest();
    if (requestWithCredentials !== undefined) {
      xhr.withCredentials = requestWithCredentials;
    }

    xhr.open(requestMethod || 'POST', requestUrl, true);

    if (requestHeaders) {
      for (const headerKey in requestHeaders) {
        xhr.setRequestHeader(headerKey, requestHeaders[headerKey]);
      }
    }

    xhr.upload.addEventListener('progress', (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
      updateFileProgress(file, (event.loaded * 100.0) / event.total);
    });

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        updateFileUploaded(file, xhr.response);
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        updateFileError(file, xhr.statusText || 'Error');
      }
    });

    xhr.addEventListener('timeout', () => {
      updateFileError(file, 'Timeout');
    });

    updateFileProgress(file, 0);

    const formData = new FormData();
    formData.append('file', fileContent);

    xhr.send(formData);
  };

  /**
   * Handles change event for the input
   * @param event change event which might tirgger uploadFile
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      const localFiles = Array.from(event.target.files);
      uploadFiles(localFiles);
    }
  };

  /**
   * Handles drop event for the drop zone
   * @param event drag event which might tirgger uploadFile
   */
  const handleDrop = (event: DragEvent) => {
    const items = event.dataTransfer?.items;
    if (items) {
      getFilesWebkitDataTransferItems(items, maxFolderDepth).then((files) => {
        uploadFiles(files);
      });
    }
  };

  /**
   * Notify any files changes (including new files, states changes, deleted files, ...), except for
   * the initial definition of the local state.
   */
  useEffect(() => {
    if (initialLocalItemsDefinition.current === false && onChange) {
      onChange(localItems);
    } else {
      initialLocalItemsDefinition.current = false;
    }
  }, [localItems]);

  /**
   * Sets up event listeners:
   *    - on the body to avoid page changes on drag
   *    - on the droparea to support highlight and drop
   * Manages cleanup on unmount.
   */
  useEffect(() => {
    const currentDropArea = dropArea.current;
    if (!currentDropArea) return;

    // Prevent default drag behaviors
    document.body.addEventListener('dragenter', preventDefaults, false);
    document.body.addEventListener('dragover', preventDefaults, false);
    document.body.addEventListener('dragleave', preventDefaults, false);
    document.body.addEventListener('drop', preventDefaults, false);
    currentDropArea.addEventListener('dragenter', preventDefaults, false);
    currentDropArea.addEventListener('dragover', preventDefaults, false);
    currentDropArea.addEventListener('dragleave', preventDefaults, false);
    currentDropArea.addEventListener('drop', preventDefaults, false);
    // Highlight drop area when item is dragged over it
    currentDropArea.addEventListener('dragenter', highlight, false);
    currentDropArea.addEventListener('dragover', highlight, false);
    currentDropArea.addEventListener('drop', unhighlight, false);
    currentDropArea.addEventListener('dragleave', unhighlight, false);
    // Handle dropped files
    currentDropArea.addEventListener('drop', handleDrop, false);

    // Cleanup
    return () => {
      document.body.removeEventListener('dragenter', preventDefaults);
      document.body.removeEventListener('dragover', preventDefaults);
      document.body.removeEventListener('dragleave', preventDefaults);
      document.body.removeEventListener('drop', preventDefaults);
      currentDropArea.removeEventListener('dragenter', preventDefaults);
      currentDropArea.removeEventListener('dragover', preventDefaults);
      currentDropArea.removeEventListener('dragleave', preventDefaults);
      currentDropArea.removeEventListener('drop', preventDefaults);
      currentDropArea.removeEventListener('dragenter', highlight);
      currentDropArea.removeEventListener('dragover', highlight);
      currentDropArea.removeEventListener('drop', unhighlight);
      currentDropArea.removeEventListener('dragleave', unhighlight);
      currentDropArea.removeEventListener('drop', handleDrop);
    };
  }, [localItems]);

  return (
    <div className={classnames(styles.container, className)} style={style}>
      <div
        key='droparea'
        ref={dropArea}
        className={classnames(styles.droparea, {
          [styles.disabled]: disabled,
          [styles.readonly]: readOnly,
          [styles.maxFileReached]:
            maxFiles !== undefined &&
            localItems.filter((file) => {
              return file.status && [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(file.status);
            }).length >= maxFiles,
          [styles.error]: isInError,
        })}>
        <label className={styles.label}>
          {uploadMessage}
          <input
            accept={acceptTypes}
            data-testid={dataTestId}
            disabled={disabled}
            multiple={maxFiles ? localItems.length < maxFiles : true}
            name={name}
            onChange={handleOnChange}
            readOnly={readOnly}
            tabIndex={-1}
            type='file'
            value={[]}
          />
        </label>
      </div>
      <div key='gallery' className={styles.gallery}>
        {readOnly && localItems.length === 0 && '-'}
        {localItems.map((item) => {
          return (
            <FileGallery
              dataTestId={dataTestId}
              disabled={disabled}
              file={item}
              key={`${item.uid}`}
              localization={{
                delete: localization?.delete,
                popoverCancel: localization?.popoverCancel,
                popoverConfirm: localization?.popoverConfirm,
                popoverTitle: localization?.popoverTitle,
              }}
              progress={progress}
              readOnly={readOnly}
              showFileSize={showFileSize}
              showProgressBar={showProgressBar}
              updateFileDelete={updateFileDelete}
              updateFileDownload={updateFileDownload}
            />
          );
        })}
      </div>
    </div>
  );
};

FileInput.defaultProps = {
  acceptType: '*/*',
  className: undefined,
  disabled: false,
  isInError: false,
  maxFiles: undefined,
  maxFileSize: undefined,
  maxFolderDepth: 2,
  name: undefined,
  readOnly: false,
  requestHeaders: undefined,
  requestWithCredentials: undefined,
  showFileSize: true,
  showProgressBar: true,
  style: undefined,
  uploadMessage: 'Click or drag file to upload',
};

export default FileInput;
