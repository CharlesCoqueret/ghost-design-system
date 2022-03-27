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
  /** Unique id (optional, if not provided, will be automatically generated) */
  uid?: string;
  /** Name of the file */
  name: string;
  /** Size of the file in bytes */
  size: number;
  /** Mime type of the file */
  type: string;
  /** Status of the file (optional, if not provided, will be automatically set to FileStatusEnum.DONE) */
  status?: FileStatusEnum;
  /** Progress of the upload, meaningfull while status is FileStatusEnum.UPLOADING */
  progress?: number;
  /** Error message of the upload, meaningfull while status is FileStatusEnum.ERROR */
  error?: string;
  /** Result provided by the upload call
   * (usually as a string, which might need to be parsed, for example using JSON.parse) */
  serverResponse?: unknown;
}
