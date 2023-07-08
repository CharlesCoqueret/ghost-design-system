import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileGallery from '../FileGallery';
import { FileStatusEnum } from '../types';

describe('FileGallery Component', () => {
  it('renders and handles download and delete of done files', async () => {
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

    await userEvent.click(downloadButton);

    expect(updateFileDownloadMock).toBeCalledTimes(1);
    expect(updateFileDownloadMock).toBeCalledWith(file);

    const deleteButton = await screen.findByTestId('TEST-ID-delete');

    await userEvent.click(deleteButton);

    const confirmButton = screen.getByTestId('TEST-ID-confirm');

    await userEvent.click(confirmButton);

    expect(updateFileDeleteMock).toBeCalledTimes(1);
    expect(updateFileDeleteMock).toBeCalledWith(file);
  });

  it('renders and handles delete of error files', async () => {
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

    await userEvent.click(deleteButton);

    expect(updateFileDeleteMock).toBeCalledTimes(1);
    expect(updateFileDeleteMock).toBeCalledWith(file);
  });

  it('renders and handles delete of uploading files', () => {
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

  it('renders readonly of uploading file', () => {
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

  it('renders disabled deleting file', () => {
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

  it('handles download without datatestid', async () => {
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
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(updateFileDownloadMock).toBeCalledTimes(1);
  });

  it('handles delete without datatestid', async () => {
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
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(container).toMatchSnapshot();
    expect(updateFileDeleteMock).toBeCalledTimes(1);
  });

  it('handles uploading state without datatestid', () => {
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
