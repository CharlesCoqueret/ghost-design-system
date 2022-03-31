import { FileStatusEnum, IFile } from './types';

/**
 * Generates a uid (low cost).
 */
export const uid = (): string => {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(4)
  );
};

/**
 * Initializes an IFile from a file,
 *    - checks if size requirement is met (cf maxFileSize)
 *    - checks if file type requirement is met (cf accepTypes)
 * @param file new file
 * @param quotaExceeded quota exceeded
 * @param acceptTypes accept types
 * @param maxFileSize size limit
 * @returns Initialized IFile
 */
export const initializeIFile = (
  file: File,
  quotaExceeded: boolean,
  acceptTypes: string | undefined,
  maxFileSize: number | undefined,
): IFile => {
  const rejectedType = acceptTypes ? !isValidType(file, acceptTypes) : false;
  const sizeExceeded = maxFileSize ? file.size > maxFileSize : false;

  const status = quotaExceeded || rejectedType || sizeExceeded ? FileStatusEnum.ERROR : FileStatusEnum.UPLOADING;
  const error = quotaExceeded
    ? 'Quota exceeded: Maximum number of files reached'
    : rejectedType
    ? `Invalid type: ${file.type !== '' ? file.type : file.name.split('.').pop()}, expected ${acceptTypes}`
    : sizeExceeded && maxFileSize
    ? `Size exceeded: ${formatBytes(file.size)}, expected under ${formatBytes(maxFileSize)}`
    : undefined;

  return {
    uid: uid(),
    name: file.name,
    size: file.size,
    type: file.type,
    status: status,
    error: error,
  };
};

/**
 * Inject UID if the provided file does not have a UID
 * @param file provided file
 * @returns file with UID
 */
export const injectUid = (file: IFile): IFile => {
  if (file.uid) return file;
  return { ...file, uid: uid() };
};

/**
 * Check if the file has a status (if not, it is set to DONE)
 * @param file provided file
 * @returns file with status.
 */
export const injectDoneStatus = (file: IFile): IFile => {
  if (!file.status) {
    file = Object.assign(file, { status: FileStatusEnum.DONE });
  }
  return file;
};

/**
 * Formats a number to bytes in a short human readable verstion
 * @param bytes number of bytes
 * @param decimals number of decimals
 * @returns Short verstion, e.g. 1234 is converted to 1.21 kB
 */
export const formatBytes = (bytes: number | string, decimals = 2) => {
  if (!Number.isFinite(Number(bytes))) return 'undefined';
  const localBytes = Number(bytes);
  if (localBytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(localBytes) / Math.log(k));

  return parseFloat((localBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Checks if the provided file matches with accepted type
 * @param file provided file
 * @param acceptedType accepted type (e.g: *\/*, image/*, application/pdf, ...)
 * @returns true of the file has a valid type, false otherwise
 */
export const isValidType = (file: File, acceptedType?: string): boolean => {
  if (!acceptedType || acceptedType.includes('*/*')) {
    return true;
  }
  const acceptedTypes = acceptedType.split(',');

  const mimeType = file.type;
  const baseMimeType = mimeType.replace(/\/.*$/, '');

  for (let validType of acceptedTypes) {
    validType = validType.trim();
    if (validType.charAt(0) === '.') {
      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      if (baseMimeType === validType.replace(/\/.*$/, '')) {
        return true;
      }
    } else {
      if (mimeType === validType) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Breads first search in directory that might have been dropped in a dropzone
 * @param dataTransferItems List of items dropped on a drop zone
 * @param maxDepth Maximum folder depth that will be scanned (recommended 2 for performance reason)
 * @returns Promise of a Promise to array of files identified in the dropped items
 */
export const getFilesWebkitDataTransferItems = async (
  dataTransferItems: DataTransferItemList,
  maxDepth?: number,
): Promise<Array<File>> => {
  const traverseFileTreePromise = (item: FileSystemEntry, depth: number): Promise<void> => {
    if (maxDepth && depth >= maxDepth) return Promise.resolve();

    return new Promise((resolve) => {
      if (item.isFile) {
        (item as FileSystemFileEntry).file((file) => {
          files.push(file);
          resolve();
        });
      } else if (item.isDirectory) {
        const dirReader = (item as FileSystemDirectoryEntry).createReader();
        dirReader.readEntries((entries) => {
          const entriesPromises: Array<Promise<void>> = [];
          for (const entry of entries) entriesPromises.push(traverseFileTreePromise(entry, depth + 1));
          resolve(Promise.all(entriesPromises) as unknown as void);
        });
      }
    });
  };

  const files: Array<File> = [];
  return new Promise((resolve) => {
    const entriesPromises: Array<Promise<void>> = [];
    for (const item of Array.from(dataTransferItems)) {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entriesPromises.push(traverseFileTreePromise(entry, 0));
      }
    }
    Promise.all(entriesPromises).then(() => {
      resolve(files);
    });
  });
};
