import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';

import Button, { ColorButtonEnum } from '../../Molecules/Button/Button';
import { Icon } from '../Icon';
import { MenuDirectionEnum, Tooltip } from '../Tooltip';
import { FileStatusEnum, IFile } from './types';
import { formatBytes } from './fileUtils';

import styles from './FileGallery.module.scss';

export interface IFileGallery {
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** File to be displayed */
  file: IFile;
  /** Reference to the progress map (optional, default: undefined) */
  progress?: Record<string, number>;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Show file size (optional, default: false) */
  showFileSize?: boolean;
  /** Show progress bar (optional, default: false) */
  showProgressBar?: boolean;
  /** Delete handler */
  updateFileDelete: (file: IFile) => Promise<void>;
  /** Download handler */
  updateFileDownload: (file: IFile) => Promise<void>;
  /** Localization of tooltip, and deletion action */
  localization?: {
    // Delete tooltip (optional, default: 'Delete')
    delete?: string;
    // Delete popover title (optional, default: 'Delete?')
    popoverConfirm?: string;
    // Delete popover cancel button (optional, default: 'Cancel')
    popoverCancel?: string;
    // Delete popover confirm button (optional, default: 'Confirm')
    popoverTitle?: string;
  };
}

const FileGallery = (props: IFileGallery): ReactElement => {
  const {
    dataTestId,
    disabled,
    file,
    localization,
    progress,
    readOnly,
    showFileSize,
    showProgressBar,
    updateFileDelete,
    updateFileDownload,
  } = props;

  const [downloading, setDownloading] = useState(false);

  const downloadable =
    file.status && ![FileStatusEnum.DELETING, FileStatusEnum.ERROR].includes(file.status) && !downloading;

  return (
    <Tooltip tooltip={file.error} direction={MenuDirectionEnum.TOP}>
      <div className={classnames(styles.container, { [styles.error]: file.status === FileStatusEnum.ERROR })}>
        <div className={styles.left}>
          <div className={styles.paperclipIcon}>
            <Icon
              icon={file.status === FileStatusEnum.ERROR ? ['fal', 'exclamation-triangle'] : ['fal', 'paperclip']}
            />
          </div>
          <div
            data-testid={dataTestId ? `${dataTestId}-download` : undefined}
            className={classnames(styles.name, {
              [styles.downloadable]: downloadable,
            })}
            onClick={
              downloadable
                ? () => {
                    setDownloading(true);
                    updateFileDownload(file)
                      .catch()
                      .finally(() => {
                        setDownloading(false);
                      });
                  }
                : undefined
            }
            onKeyUp={
              downloadable
                ? (event: React.KeyboardEvent<HTMLElement>) => {
                    if (event.type === 'keyup' && event.key === 'Enter') {
                      setDownloading(true);
                      updateFileDownload(file)
                        .catch()
                        .finally(() => {
                          setDownloading(false);
                        });
                      return;
                    }
                  }
                : undefined
            }
            tabIndex={downloadable ? 0 : -1}>
            {file.name}
            {showFileSize && ` (${formatBytes(file.size)})`}
          </div>
          {downloading && (
            <Icon
              className={styles.spinnerIcon}
              data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}
              icon={['fal', 'spinner']}
            />
          )}
        </div>
        <div className={styles.right}>
          {showProgressBar == true &&
            file.uid !== undefined &&
            progress !== undefined &&
            progress[file.uid] !== undefined && (
              <progress className={styles.progress} max={100} value={progress[file.uid]} />
            )}

          {readOnly || disabled ? (
            <></>
          ) : file.status && [FileStatusEnum.UPLOADING, FileStatusEnum.DELETING].includes(file.status) ? (
            <Icon
              className={styles.spinnerIcon}
              data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}
              icon={['fal', 'spinner']}
            />
          ) : (
            <Button
              className={styles.deleteIcon}
              icon={['fal', 'trash-alt']}
              color={ColorButtonEnum.REVERSED}
              dataTestId={dataTestId ? `${dataTestId}-delete` : undefined}
              onClick={
                // If the file is in error, we can delete without confirmation
                file.status === FileStatusEnum.ERROR
                  ? () => {
                      updateFileDelete(file);
                    }
                  : undefined
              }
              popover={
                // If the file is in error, we can delete without confirmation
                file.status === FileStatusEnum.ERROR
                  ? undefined
                  : {
                      title: localization?.popoverTitle ?? 'Delete?',
                      buttons: [
                        {
                          color: ColorButtonEnum.SECONDARY,
                          dataTestId: dataTestId ? `${dataTestId}-cancel` : undefined,
                          label: localization?.popoverCancel ?? 'Cancel',
                        },
                        {
                          color: ColorButtonEnum.PRIMARY,
                          dataTestId: dataTestId ? `${dataTestId}-confirm` : undefined,
                          label: localization?.popoverConfirm ?? 'Confirm',
                          onClick: () => {
                            updateFileDelete(file);
                          },
                        },
                      ],
                    }
              }
              tooltip={localization?.delete ?? 'Delete'}
            />
          )}
        </div>
      </div>
    </Tooltip>
  );
};

FileGallery.defaultProps = {
  dataTestId: undefined,
  disabled: false,
  progress: undefined,
  readOnly: false,
  showFileSize: false,
  showProgressBar: false,
};

export default FileGallery;
