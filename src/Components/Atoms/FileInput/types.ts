export enum FileStatusEnum {
  /** File is being deleted, and should not be considered as available */
  DELETING = 'deleting',
  /** File is available */
  DONE = 'done',
  /** File is in error, and should not be considered as available */
  ERROR = 'error',
  /** File is being uploaded, and should not be considered as available */
  UPLOADING = 'uploading',
}

export interface IFile {
  /** id (optional) */
  id?: string;
  /** Unique id for the library (will be automatically generated, not to be used) */
  uid?: string;
  /** Name of the file */
  name: string;
  /** Size of the file in bytes */
  size: number;
  /** Mime type of the file */
  type: string;
  /** Status of the file (optional, if not provided, will be automatically set to FileStatusEnum.DONE) */
  status?: FileStatusEnum;
  /** Progress of the upload, meaningful while status is FileStatusEnum.UPLOADING */
  progress?: number;
  /** Error message of the upload, meaningful while status is FileStatusEnum.ERROR */
  error?: string;
}
