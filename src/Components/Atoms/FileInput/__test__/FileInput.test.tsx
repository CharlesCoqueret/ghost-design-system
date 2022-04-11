import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileInput from '../FileInput';
import { FileStatusEnum } from '../types';

describe('FileInput Component', () => {
  it('FileInput renders', () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        inputValue={[{ uid: '1', name: 'NAME', size: 1234, type: 'image/png' }]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileInput renders without input value', () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container, rerender } = render(
      <FileInput
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    rerender(
      <FileInput
        inputValue={[{ uid: '1', name: 'NAME', size: 1234, type: 'image/png' }]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('FileInput handle add file successfully through input', () => {
    let timeoutCallback: (() => void) | undefined = undefined;
    let progressCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;
    let readystatechangeCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;

    const xhrMockObj = {
      addEventListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'readystatechange') {
          readystatechangeCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
        }
        if (event === 'timeout') {
          timeoutCallback = callback as () => void;
        }
      }),
      open: jest.fn(),
      readyState: 4,
      response: 'RESPONSE',
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      status: 200,
      upload: {
        addEventListener: jest.fn().mockImplementation((event, callback) => {
          if (event === 'progress') {
            progressCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
          }
        }),
      },
    };

    Object.assign(window, { XMLHttpRequest: jest.fn().mockImplementation(() => xhrMockObj) });

    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        showProgressBar
        requestHeaders={{ headerKey: 'headerValue' }}
        requestMethod='POST'
        requestUrl='http://test.com'
        requestWithCredentials
      />,
    );
    expect(container).toMatchSnapshot();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const input = screen.getByTestId('TEST-ID');
    userEvent.upload(input, file);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.UPLOADING,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
    expect(timeoutCallback).not.toBeUndefined();
    expect(progressCallback).not.toBeUndefined();
    expect(readystatechangeCallback).not.toBeUndefined();

    //simulate progress
    act(() => {
      if (progressCallback) {
        (progressCallback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void)({
          loaded: 50,
          total: 100,
        } as unknown as ProgressEvent<XMLHttpRequestEventTarget>);
      }
    });

    expect(container).toMatchSnapshot();

    //simulate sucessful end
    act(() => {
      if (readystatechangeCallback) {
        (readystatechangeCallback as () => void)();
      }
    });

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'hello.png',
        serverResponse: 'RESPONSE',
        size: 5,
        status: FileStatusEnum.DONE,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
  });

  it('FileInput handle unsuccessfull add file when quota reached', () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[{ uid: '1', name: 'AME', size: 1234, type: 'image/png' }]}
        maxFiles={1}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const input = screen.getByTestId('TEST-ID');
    userEvent.upload(input, file);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'AME',
        size: 1234,
        status: FileStatusEnum.DONE,
        type: 'image/png',
        uid: '1',
      },
      {
        error: 'Quota exceeded: Maximum number of files reached',
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.ERROR,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);

    expect(container).toMatchSnapshot();
  });

  it('FileInput handle add file unsucessfully through input', async () => {
    let timeoutCallback: (() => void) | undefined = undefined;
    let progressCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;
    let readystatechangeCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;

    const xhrMockObj = {
      addEventListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'readystatechange') {
          readystatechangeCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
        }
        if (event === 'timeout') {
          timeoutCallback = callback as () => void;
        }
      }),
      open: jest.fn(),
      readyState: 4,
      response: 'RESPONSE',
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      status: 500,
      statusText: 'Internal Error',
      upload: {
        addEventListener: jest.fn().mockImplementation((event, callback) => {
          if (event === 'progress') {
            progressCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
          }
        }),
      },
    };

    Object.assign(window, { XMLHttpRequest: jest.fn().mockImplementation(() => xhrMockObj) });

    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const input = screen.getByTestId('TEST-ID');
    userEvent.upload(input, file);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.UPLOADING,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
    expect(timeoutCallback).not.toBeUndefined();
    expect(progressCallback).not.toBeUndefined();
    expect(readystatechangeCallback).not.toBeUndefined();

    //simulate unsucessful end
    act(() => {
      if (readystatechangeCallback) {
        (readystatechangeCallback as () => void)();
      }
    });

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith([
      {
        error: 'Internal Error',
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.ERROR,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
  });

  it('FileInput handle add file with timeout through input', () => {
    let timeoutCallback: (() => void) | undefined = undefined;
    let progressCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;
    let readystatechangeCallback: ((event: ProgressEvent<XMLHttpRequestEventTarget>) => void) | undefined = undefined;

    const xhrMockObj = {
      addEventListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'readystatechange') {
          readystatechangeCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
        }
        if (event === 'timeout') {
          timeoutCallback = callback as () => void;
        }
      }),
      open: jest.fn(),
      readyState: 4,
      response: 'RESPONSE',
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      status: 500,
      statusText: 'Internal Error',
      upload: {
        addEventListener: jest.fn().mockImplementation((event, callback) => {
          if (event === 'progress') {
            progressCallback = callback as (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
          }
        }),
      },
    };

    Object.assign(window, { XMLHttpRequest: jest.fn().mockImplementation(() => xhrMockObj) });

    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const input = screen.getByTestId('TEST-ID');
    userEvent.upload(input, file);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.UPLOADING,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
    expect(timeoutCallback).not.toBeUndefined();
    expect(progressCallback).not.toBeUndefined();
    expect(readystatechangeCallback).not.toBeUndefined();

    //simulate unsucessful end
    act(() => {
      if (timeoutCallback) {
        (timeoutCallback as () => void)();
      }
    });

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith([
      {
        error: 'Timeout',
        name: 'hello.png',
        size: 5,
        status: FileStatusEnum.ERROR,
        type: 'image/png',
        uid: expect.anything(),
      },
    ]);
  });

  it('FileInput handle drag event for highlight', () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const input = screen.getByTestId('TEST-ID');

    act(() => {
      fireEvent.dragEnter(input, {});
    });

    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.dragLeave(input, {});
    });

    expect(container).toMatchSnapshot();
  });

  it('FileInput handle drop of file', async () => {
    const xhrMockObj = {
      addEventListener: jest.fn(),
      open: jest.fn(),
      readyState: 4,
      response: 'RESPONSE',
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      status: 200,
      upload: {
        addEventListener: jest.fn(),
      },
    };

    Object.assign(window, { XMLHttpRequest: jest.fn().mockImplementation(() => xhrMockObj) });

    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        showFileSize={false}
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const input = screen.getByTestId('TEST-ID');

    fireEvent.drop(input, {
      dataTransfer: {
        items: {
          length: 1,
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
        },
      },
    });

    await screen.findAllByText('file1.pdf');

    expect(container).toMatchSnapshot();

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        error: undefined,
        name: 'file1.pdf',
        status: FileStatusEnum.UPLOADING,
        type: 'application/pdf',
        size: 1234,
        uid: expect.anything(),
      },
    ]);
  });

  it('FileInput handle drop without dataTransfer', () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onDownloadMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[]}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        showFileSize={false}
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const input = screen.getByTestId('TEST-ID');

    fireEvent.drop(input, {});

    expect(container).toMatchSnapshot();

    expect(onChangeMock).toBeCalledTimes(0);
  });

  it('FileInput handles download and delete of a file', async () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });
    const onDownloadMock = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[{ uid: '1', name: 'AME', size: 1234, type: 'image/png' }]}
        maxFiles={1}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );

    expect(container).toMatchSnapshot();

    const downloadButton = await screen.findByTestId('TEST-ID-download');
    userEvent.click(downloadButton);

    expect(await screen.findByTestId('TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(onDownloadMock).toBeCalledTimes(1);
    expect(onDownloadMock).toBeCalledWith({ uid: '1', name: 'AME', size: 1234, type: 'image/png', status: 'done' });

    const deleteButton = await screen.findByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    expect(await screen.findByTestId('TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(onDeleteMock).toBeCalledTimes(1);
    expect(onDeleteMock).toBeCalledWith({ uid: '1', name: 'AME', size: 1234, type: 'image/png', status: 'done' });
  });

  it('FileInput handles delete rejections of a file', async () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn().mockImplementation(() => {
      return Promise.reject();
    });
    const onDownloadMock = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[{ uid: '1', name: 'AME', size: 1234, type: 'image/png' }]}
        maxFiles={1}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        onDownload={onDownloadMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );
    expect(container).toMatchSnapshot();

    const deleteButton = screen.getByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    expect(await screen.findByTestId('TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('TEST-ID-spinner')).toBeFalsy();

    expect(onDeleteMock).toBeCalledTimes(1);
    expect(onDeleteMock).toBeCalledWith({ uid: '1', name: 'AME', size: 1234, type: 'image/png', status: 'done' });

    expect(container).toMatchSnapshot();
  });

  it('FileInput handles download without download callback', async () => {
    const onChangeMock = jest.fn();
    const onDeleteMock = jest.fn();

    const { container } = render(
      <FileInput
        dataTestId='TEST-ID'
        inputValue={[{ uid: '1', name: 'AME', size: 1234, type: 'image/png' }]}
        maxFiles={1}
        onChange={onChangeMock}
        onDelete={onDeleteMock}
        requestMethod='POST'
        requestUrl='http://test.com'
      />,
    );

    expect(container).toMatchSnapshot();

    const downloadButton = await screen.findByTestId('TEST-ID-download');
    userEvent.click(downloadButton);

    expect(await screen.findByTestId('TEST-ID-spinner')).toBeTruthy();
    expect(screen.queryByTestId('TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });
});
