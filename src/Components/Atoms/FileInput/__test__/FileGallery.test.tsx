import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileGallery from '../FileGallery';
import { FileStatusEnum } from '../types';

describe('FileGallery Component', () => {
  it('FileGallery renders and handles download and delete of done files', async () => {
    const updateFileDeleteMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });
    const updateFileDownloadMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.DONE,
    };

    const container = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();

    const downloadButton = await container.findByTestId('TEST-ID-download');

    userEvent.click(downloadButton);

    expect(updateFileDownloadMock).toBeCalledTimes(1);
    expect(updateFileDownloadMock).toBeCalledWith(file);

    const deleteButton = await container.findByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    expect(updateFileDeleteMock).toBeCalledTimes(1);
    expect(updateFileDeleteMock).toBeCalledWith(file);
  });

  it('FileGallery renders and handles delete of error files', async () => {
    const updateFileDeleteMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });
    const updateFileDownloadMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.ERROR,
      error: 'ERROR',
    };

    const container = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        showFileSize
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();

    const deleteButton = await container.findByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    expect(updateFileDeleteMock).toBeCalledTimes(1);
    expect(updateFileDeleteMock).toBeCalledWith(file);
  });

  it('FileGallery renders and handles delete of uploading files', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.UPLOADING,
    };

    const container = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        progress={{ '1': 50 }}
        showProgressBar
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileGallery renders readonly of uploading file', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.UPLOADING,
    };

    const container = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        progress={{ '1': 50 }}
        showProgressBar
        readOnly
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileGallery renders disabled deleting file', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.DELETING,
    };

    const container = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        disabled
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileGallery renders without datatestid', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      uid: '1',
      name: 'NAME',
      size: 1234,
      type: 'TYPE',
      status: FileStatusEnum.DONE,
    };

    const container = render(
      <FileGallery file={file} updateFileDelete={updateFileDeleteMock} updateFileDownload={updateFileDownloadMock} />,
    );
    expect(container).toMatchSnapshot();
  });
});
