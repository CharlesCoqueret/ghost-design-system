import React, { ChangeEvent, CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';
import compact from 'lodash/compact';

import { FileStatusEnum, IFile } from './types';
import { getFilesWebkitDataTransferItems, initializeIFile, injectDoneStatus, injectUid } from './fileUtils';
import FileGallery from './FileGallery';

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
  inputValue?: Array<IFile>;
  /** Field is in error state (optional, default: false) */
  isInError?: boolean;
  /** Maximum number of files, if undefined: unlimited (optional, default: undefined) */
  maxFiles?: number;
  /** Maximum file size allowed in bytes, if undefined: unlimited (optional, default: undefined) */
  maxFileSize?: number;
  /** Maximum folder depth scanned when dropping a folder (optional, default: 2) */
  maxFolderDepth?: number;
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
  /** Show file size in the gallery (optional, default: true) */
  showFileSize?: boolean;
  /** Show progress bar in file gallery (optional, default: true) */
  showProgressBar?: boolean;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
  /** Message present inside the drop zome (optional, default: 'Click or drag file to upload' ) */
  uploadMessage?: string | ReactElement;
}

const preventDefaults = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const highlight = (event: DragEvent) => {
  (event.target as HTMLElement).classList.add('highlight');
};

const unhighlight = (event: DragEvent) => {
  (event.target as HTMLElement).classList.remove('highlight');
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
    inputValue,
    isInError,
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

  const [localItems, setLocalItems] = useState<Array<IFile>>(inputValue?.map(injectUid).map(injectDoneStatus) || []);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const dropArea = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const initialLocalItemsDefinition = useRef(true);

  /**
   * Adds file to the local list:
   *    - checks if size requirement is met (cf maxFileSize)
   *    - checks if maxFiles requirement is met (cf maxFiles)
   *    - checks if file type requirement is met (cf accepTypes)
   * @param file new file
   * @returns IFile with status, and eventually error if one of the requirement is not met
   */
  const addFileLocalItems = useCallback(
    (file: File): IFile => {
      const quotaExceeded =
        maxFiles !== undefined &&
        localItems.filter(
          (item) => item.status && [FileStatusEnum.DONE, FileStatusEnum.UPLOADING].includes(item.status),
        ).length >= maxFiles;
      const newFile = initializeIFile(file, quotaExceeded, acceptTypes, maxFileSize);

      setLocalItems((prev) => {
        return [...prev, newFile];
      });

      return newFile;
    },
    [acceptTypes, localItems, maxFileSize, maxFiles],
  );

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
        fileToUpdate && { ...fileToUpdate, status: FileStatusEnum.ERROR, error: error },
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
        fileToUpdate && {
          ...fileToUpdate,
          status: FileStatusEnum.DONE,
          error: undefined,
          serverResponse: serverResponse,
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
    setLocalItems((prev) => [...prev.filter((f) => f.uid !== file.uid), { ...file, status: FileStatusEnum.DELETING }]);
    return onDelete(file)
      .then(() => {
        setLocalItems((prev) => prev.filter((f) => f.uid !== file.uid));
      })
      .catch(() => {
        setLocalItems((prev) => [...prev.filter((f) => f.uid !== file.uid), { ...file, status: FileStatusEnum.DONE }]);
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
  const uploadFile = useCallback(
    (file: File): void => {
      const newFile = addFileLocalItems(file);

      if (newFile.status !== FileStatusEnum.UPLOADING) return;

      const xhr = new XMLHttpRequest();
      if (requestWithCredentials !== undefined) {
        xhr.withCredentials = requestWithCredentials;
      }

      xhr.open(requestMethod, requestUrl, true);

      if (requestHeaders) {
        for (const headerKey in requestHeaders) {
          xhr.setRequestHeader(headerKey, requestHeaders[headerKey]);
        }
      }

      xhr.upload.addEventListener('progress', (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
        updateFileProgress(newFile, (event.loaded * 100.0) / event.total);
      });

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          updateFileUploaded(newFile, xhr.response);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          updateFileError(newFile, xhr.statusText);
        }
      });

      xhr.addEventListener('timeout', () => {
        updateFileError(newFile, 'Timeout');
      });

      updateFileProgress(file, 0);

      const formData = new FormData();
      formData.append('file', file);

      xhr.send(formData);
    },
    [addFileLocalItems, requestHeaders, requestMethod, requestUrl, requestWithCredentials],
  );

  /**
   * Handles change event for the input
   * @param event change event which might tirgger uploadFile
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      const localFiles = Array.from(event.target.files);
      localFiles.forEach(uploadFile);
    }
  };

  /**
   * Handles drop event for the drop zone
   * @param event drag event which might tirgger uploadFile
   */
  const handleDrop = useCallback(
    (event: DragEvent) => {
      const items = event.dataTransfer?.items;
      if (items) {
        getFilesWebkitDataTransferItems(items, maxFolderDepth).then((files) => {
          files.forEach(uploadFile);
        });
      }
    },
    [maxFolderDepth, uploadFile],
  );

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
  }, [localItems, onChange]);

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
  }, [handleDrop]);

  return (
    <div className={classnames('field', 'gds-file-input-container', className)} style={style}>
      <div
        key='droparea'
        ref={dropArea}
        className={classnames('droparea', { disabled: disabled, readonly: readOnly, error: isInError })}>
        <label className='label'>
          {uploadMessage}
          <input
            accept={acceptTypes}
            className='input'
            data-testid={dataTestId}
            disabled={disabled}
            multiple={maxFiles ? localItems.length < maxFiles : true}
            onChange={handleOnChange}
            readOnly={readOnly}
            ref={input}
            type='file'
            value={[]}
          />
        </label>
      </div>
      <div key='gallery' className='gallery'>
        {sortBy(localItems, 'uid').map((item) => {
          return (
            <FileGallery
              dataTestId={dataTestId}
              disabled={disabled}
              file={item}
              key={`${item.uid}`}
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
  readOnly: false,
  requestHeaders: undefined,
  requestMethod: 'POST',
  requestWithCredentials: undefined,
  showFileSize: true,
  showProgressBar: true,
  style: undefined,
  uploadMessage: 'Click or drag file to upload',
};

export default FileInput;
