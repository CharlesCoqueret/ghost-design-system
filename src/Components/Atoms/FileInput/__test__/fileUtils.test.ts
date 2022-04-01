import {
  formatBytes,
  getFilesWebkitDataTransferItems,
  initializeIFile,
  injectDoneStatus,
  injectUid,
  isValidType,
  uid,
} from '../fileUtils';
import { FileStatusEnum } from '../types';

describe('fileUtils', () => {
  it('uid to return valid string', async () => {
    const uuid = uid();

    expect(uuid).not.toBeUndefined();
    expect(typeof uuid).toEqual('string');
  });

  it('initializeIFile to run initialize properly', async () => {
    // Main use case without errors
    expect(
      initializeIFile(
        {
          name: 'NAME',
          size: 1234,
          type: 'TYPE',
        } as File,
        false,
        '*/*',
        2000,
      ),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.UPLOADING,
      error: undefined,
    });

    // Quota error
    expect(
      initializeIFile(
        {
          name: 'NAME',
          size: 1234,
          type: 'TYPE',
        } as File,
        true,
        '*/*',
        2000,
      ),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.ERROR,
      error: 'Quota exceeded: Maximum number of files reached',
    });

    // Invalid type
    expect(
      initializeIFile(
        {
          name: 'NAME',
          size: 1234,
          type: 'TYPE',
        } as File,
        false,
        'image/jpeg',
        2000,
      ),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.ERROR,
      error: 'Invalid type: TYPE, expected image/jpeg',
    });

    // Invalid type with empty type
    expect(
      initializeIFile(
        {
          name: 'NAME',
          size: 1234,
          type: '',
        } as File,
        false,
        'image/jpeg',
        2000,
      ),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: '',
      status: FileStatusEnum.ERROR,
      error: 'Invalid type: NAME, expected image/jpeg',
    });

    // Exceeded size
    expect(
      initializeIFile(
        {
          name: 'NAME',
          size: 1234,
          type: 'TYPE',
        } as File,
        false,
        '*/*',
        1024,
      ),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.ERROR,
      error: 'Size exceeded: 1.21 kB, expected under 1 kB',
    });
  });

  it('injectUid', async () => {
    // Maintain existing uid
    expect(
      injectUid({
        uid: '1',
        name: 'NAME',
        size: 1234,
        type: 'TYPE',
      }),
    ).toEqual({
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
    });

    // Inject new uid
    expect(
      injectUid({
        name: 'NAME',
        size: 1234,
        type: 'TYPE',
      }),
    ).toEqual({
      uid: expect.anything(),
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
    });
  });

  it('injectDoneStatus', async () => {
    // Maintain existing status
    expect(
      injectDoneStatus({
        uid: '1',
        name: 'NAME',
        size: 1234,
        type: 'TYPE',
        status: FileStatusEnum.DELETING,
      }),
    ).toEqual({
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.DELETING,
    });

    // Inject done status
    expect(
      injectDoneStatus({
        uid: '1',
        name: 'NAME',
        size: 1234,
        type: 'TYPE',
      }),
    ).toEqual({
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.DONE,
    });
  });

  it('formatBytes', async () => {
    expect(formatBytes(123456789, 2)).toEqual('117.74 MB');
    expect(formatBytes('test')).toEqual('undefined');
    expect(formatBytes('0')).toEqual('0 Bytes');
    expect(formatBytes('1234', 4)).toEqual('1.2051 kB');
    expect(formatBytes('1234', -4)).toEqual('1 kB');
  });

  it('isValidType', async () => {
    // Accepts any
    expect(isValidType({ name: '', type: '' } as File)).toBeTruthy();
    expect(isValidType({ name: '', type: '' } as File, '*/*')).toBeTruthy();

    // Accepts audio or aac
    expect(isValidType({ name: 'audio.aac', type: 'audio/aac' } as File, 'audio/*')).toBeTruthy();
    expect(isValidType({ name: 'audio.aac', type: 'audio/aac' } as File, 'audio/aac')).toBeTruthy();
    expect(isValidType({ name: 'audio.aac', type: 'audio/aac' } as File, 'audio/mp3,audio/aac')).toBeTruthy();
    expect(isValidType({ name: 'audio.aac', type: 'audio/aac' } as File, '.aac')).toBeTruthy();
    expect(isValidType({ name: 'audio.test.aac', type: 'audio/aac' } as File, '.mp3,.aac')).toBeTruthy();

    // Accepts pdf
    expect(isValidType({ name: 'file.pdf', type: 'application/pdf' } as File, 'application/pdf')).toBeTruthy();
    expect(isValidType({ name: 'file.pdf', type: 'application/pdf' } as File, 'application/*')).toBeTruthy();
    expect(isValidType({ name: 'file.pdf', type: 'application/pdf' } as File, '.pdf')).toBeTruthy();
    expect(isValidType({ name: 'file.pdf', type: 'application/pdf' } as File, '.doc,.docx,.pdf')).toBeTruthy();
    expect(
      isValidType(
        {
          name: 'file.pdf.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        } as File,
        '.pdf',
      ),
    ).toBeFalsy();
  });

  it('getFilesWebkitDataTransferItems', async () => {
    const dataTransferItems1 = {
      length: 2,
      0: {
        webkitGetAsEntry: () => {
          return {
            isFile: true,
            file: (callback: (v: any) => void) => {
              callback({ name: 'file1.pdf', type: 'application/pdf', size: 1234 });
            },
          };
        },
      },
      1: {
        webkitGetAsEntry: () => {
          return {
            isFile: false,
            isDirectory: true,
            createReader: () => {
              return {
                readEntries: (callback: (v: any) => void) => {
                  callback([
                    {
                      isFile: true,
                      file: (callback2: (v: any) => void) => {
                        callback2({ name: 'file2.jspn', type: 'application/json', size: 4321 });
                      },
                    },
                  ]);
                },
              };
            },
          };
        },
      },
    } as unknown as DataTransferItemList;

    expect(await getFilesWebkitDataTransferItems(dataTransferItems1, 4)).toEqual([
      { name: 'file1.pdf', type: 'application/pdf', size: 1234 },
      { name: 'file2.jspn', type: 'application/json', size: 4321 },
    ]);

    const dataTransferItems2 = {
      length: 2,
      0: {
        webkitGetAsEntry: () => {
          return {
            isFile: true,
            file: (callback: (v: any) => void) => {
              callback({ name: 'file1.pdf', type: 'application/pdf', size: 1234 });
            },
          };
        },
      },
      1: {
        webkitGetAsEntry: () => {
          return {
            isFile: false,
            isDirectory: true,
            createReader: () => {
              return {
                readEntries: (callback: (v: any) => void) => {
                  callback([
                    {
                      isFile: true,
                      file: (callback2: (v: any) => void) => {
                        callback2({ name: 'file2.jspn', type: 'application/json', size: 4321 });
                      },
                    },
                  ]);
                },
              };
            },
          };
        },
      },
    } as unknown as DataTransferItemList;

    expect(await getFilesWebkitDataTransferItems(dataTransferItems2, 1)).toEqual([
      { name: 'file1.pdf', type: 'application/pdf', size: 1234 },
    ]);
  });
});
