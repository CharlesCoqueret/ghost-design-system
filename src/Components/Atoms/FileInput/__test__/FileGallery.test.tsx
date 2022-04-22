import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.DONE,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();

    const downloadButton = await screen.findByTestId('TEST-ID-download');

    userEvent.click(downloadButton);

    expect(updateFileDownloadMock).toBeCalledTimes(1);
    expect(updateFileDownloadMock).toBeCalledWith(file);

    const deleteButton = await screen.findByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    const confirmButton = screen.getByTestId('TEST-ID-confirm');

    userEvent.click(confirmButton);

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
      error: 'ERROR',
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.ERROR,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
      <FileGallery
        dataTestId='TEST-ID'
        file={file}
        showFileSize
        updateFileDelete={updateFileDeleteMock}
        updateFileDownload={updateFileDownloadMock}
      />,
    );
    expect(container).toMatchSnapshot();

    const deleteButton = await screen.findByTestId('TEST-ID-delete');

    userEvent.click(deleteButton);

    expect(updateFileDeleteMock).toBeCalledTimes(1);
    expect(updateFileDeleteMock).toBeCalledWith(file);
  });

  it('FileGallery renders and handles delete of uploading files', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.UPLOADING,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
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

  it('FileGallery renders readonly of uploading file', () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.UPLOADING,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
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

  it('FileGallery renders disabled deleting file', () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.DELETING,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
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

  it('FileGallery handles download without datatestid', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });

    const file = {
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.DONE,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
      <FileGallery file={file} updateFileDelete={updateFileDeleteMock} updateFileDownload={updateFileDownloadMock} />,
    );
    expect(container).toMatchSnapshot();

    // Select download link
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(container).toMatchSnapshot();
    expect(updateFileDownloadMock).toBeCalledTimes(1);

    // Give time to updateFileDownloadMock to resolve
    await waitFor(async () => {
      await Promise.resolve();
    });
  });

  it('FileGallery handles delete without datatestid', async () => {
    const updateFileDeleteMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });
    const updateFileDownloadMock = jest.fn();

    const file = {
      error: 'ERROR',
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.ERROR,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
      <FileGallery file={file} updateFileDelete={updateFileDeleteMock} updateFileDownload={updateFileDownloadMock} />,
    );

    expect(container).toMatchSnapshot();

    // Select first delete button
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(container).toMatchSnapshot();
    expect(updateFileDeleteMock).toBeCalledTimes(1);

    // Give time to updateFileDeleteMock to resolve
    await waitFor(async () => {
      await Promise.resolve();
    });
  });

  it('FileGallery handles uploading state without datatestid', async () => {
    const updateFileDeleteMock = jest.fn();
    const updateFileDownloadMock = jest.fn();

    const file = {
      name: 'NAME',
      size: 1234,
      status: FileStatusEnum.UPLOADING,
      type: 'TYPE',
      uid: '1',
    };

    const { container } = render(
      <FileGallery file={file} updateFileDelete={updateFileDeleteMock} updateFileDownload={updateFileDownloadMock} />,
    );

    expect(container).toMatchSnapshot();
  });
});
