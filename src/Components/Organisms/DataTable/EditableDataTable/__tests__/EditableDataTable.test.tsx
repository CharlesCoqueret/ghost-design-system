import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableDataTable from '../EditableDataTable';
import { ColumnType, SortDirectionEnum } from '../../Common/types';

describe('EditableDataTable component', () => {
  it('EditableDataTable renders', () => {
    const onEditMock = jest.fn();
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{ onEdit: onEditMock }}
        onSortChange={onSortChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTable handles sort', () => {
    const onEditMock = jest.fn();
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', sorter: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{ onEdit: onEditMock }}
        onSortChange={onSortChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(1);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.DESC);

    userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(2);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.ASC);

    userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(3);
    expect(onSortChangeMock).toBeCalledWith();
  });

  it('EditableDataTable handles change, onRowDelete and onRowDownload', () => {
    const isDeletableMock = jest.fn().mockImplementation(() => true);
    const isDownloadableMock = jest.fn().mockImplementation(() => true);
    const onEditMock = jest.fn();
    const onRowDeleteMock = jest.fn();
    const onRowDownloadMock = jest.fn();

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', editable: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        dataTestId='DATA-TEST-ID'
        extra={{
          isDeletable: isDeletableMock,
          isDownloadable: isDownloadableMock,
          onEdit: onEditMock,
          onRowDelete: onRowDeleteMock,
          onRowDownload: onRowDownloadMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(onEditMock).toBeCalledTimes(1);
    expect(onEditMock).toBeCalledWith({ number: undefined }, 'number', 0);

    // Download
    const downloadButton = screen.getByTestId('DATA-TEST-ID-download');
    userEvent.click(downloadButton);

    expect(onRowDownloadMock).toBeCalledTimes(1);
    expect(onRowDownloadMock).toBeCalledWith({ number: undefined }, 0);

    // Delete and confirm in popover
    const deleteButton = screen.getByTestId('DATA-TEST-ID-delete');
    userEvent.click(deleteButton);

    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowDeleteMock).toBeCalledTimes(1);
    expect(onRowDeleteMock).toBeCalledWith({ number: undefined }, 0);
  });

  it('EditableDataTable handles onRowDelete and onRowDownload with custom localization', () => {
    const isDeletableMock = jest.fn().mockImplementation(() => false);
    const isDownloadableMock = jest.fn().mockImplementation(() => false);
    const onEditMock = jest.fn();
    const onRowDeleteMock = jest.fn();
    const onRowDownloadMock = jest.fn();
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', editable: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          canAddNewLine: canAddNewLineMock,
          isDeletable: isDeletableMock,
          isDownloadable: isDownloadableMock,
          localization: {
            actionColumn: 'actionColumn',
            addRow: 'addRow',
            deleteButton: 'deleteButton',
            deletePopoverCancel: 'deletePopoverCancel',
            deletePopoverConfirm: 'deletePopoverConfirm',
            deletePopoverMessage: 'deletePopoverMessage',
            downloadButton: 'downloadButton',
            moreActionsMessage: 'moreActionsMessage',
          },
          onEdit: onEditMock,
          onRowDelete: onRowDeleteMock,
          onRowDownload: onRowDownloadMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTable handles canAddNewLine with onNewLine', () => {
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);
    const onEditMock = jest.fn();
    const onNewLineMock = jest.fn();

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          canAddNewLine: canAddNewLineMock,
          onEdit: onEditMock,
          onNewLine: onNewLineMock,
        }}
      />,
    );

    expect(canAddNewLineMock).toBeCalledTimes(1);

    expect(container).toMatchSnapshot();

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onNewLineMock).toBeCalledTimes(1);
  });

  it('EditableDataTable handles canAddNewLine without onNewLine', () => {
    console.error = jest.fn();
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);
    const onEditMock = jest.fn();

    const { container } = render(
      <EditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          canAddNewLine: canAddNewLineMock,
          onEdit: onEditMock,
        }}
      />,
    );

    expect(canAddNewLineMock).toBeCalledTimes(1);

    expect(container).toMatchSnapshot();

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Missing onNewLine function');
  });
});
