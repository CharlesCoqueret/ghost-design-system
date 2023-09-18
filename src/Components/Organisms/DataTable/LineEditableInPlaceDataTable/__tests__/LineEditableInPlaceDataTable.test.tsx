import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LineEditableInPlaceDataTable from '../LineEditableInPlaceDataTable';
import { ColumnType, SortDirectionEnum } from '../../Common/types';

describe('LineEditableInPlaceDataTable component', () => {
  it('LineEditableInPlaceDataTable renders', () => {
    const onRowEditMock = jest.fn();
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{ onRowEdit: onRowEditMock }}
        onSortChange={onSortChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTable handles sort', () => {
    const onRowEditMock = jest.fn();
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', sorter: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{ onRowEdit: onRowEditMock }}
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

  it('LineEditableInPlaceDataTable handles edit and cancel', () => {
    const isEditableMock = jest.fn().mockImplementation(() => true);
    const onRowEditMock = jest.fn();
    const onRowSubmitMock = jest.fn();
    const onRowCancelEditMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        dataTestId='DATA-TEST-ID'
        extra={{
          isEditable: isEditableMock,
          onRowEdit: onRowEditMock,
          onRowSubmit: onRowSubmitMock,
          onRowCancelEdit: onRowCancelEditMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    // Edit
    const editButton = screen.getByTestId('DATA-TEST-ID-edit');
    userEvent.click(editButton);

    expect(container).toMatchSnapshot();
    expect(onRowEditMock).toBeCalledTimes(1);
    expect(onRowEditMock).toBeCalledWith({ number: 1 }, 0);

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    userEvent.clear(input);

    expect(container).toMatchSnapshot();

    const cancelButton = screen.getByTestId('DATA-TEST-ID-cancel');
    userEvent.click(cancelButton);

    expect(container).toMatchSnapshot();
    expect(onRowCancelEditMock).toBeCalledTimes(1);
    expect(onRowCancelEditMock).toBeCalledWith({ number: undefined }, 0);
  });

  it('LineEditableInPlaceDataTable handles non editable content', () => {
    const isEditableMock = jest.fn().mockImplementation(() => false);
    const onRowEditMock = jest.fn();
    const onRowSubmitMock = jest.fn();
    const onRowCancelEditMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        dataTestId='DATA-TEST-ID'
        extra={{
          isEditable: isEditableMock,
          onRowEdit: onRowEditMock,
          onRowSubmit: onRowSubmitMock,
          onRowCancelEdit: onRowCancelEditMock,
          localization: {
            editButton: 'editButton',
            submitButton: 'submitButton',
            cancelButton: 'cancelButton',
          },
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTable handles edit and submit', () => {
    const isEditableMock = jest.fn().mockImplementation(() => true);
    const onRowEditMock = jest.fn();
    const onRowSubmitMock = jest.fn();
    const onRowCancelEditMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        dataTestId='DATA-TEST-ID'
        extra={{
          isEditable: isEditableMock,
          onRowEdit: onRowEditMock,
          onRowSubmit: onRowSubmitMock,
          onRowCancelEdit: onRowCancelEditMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot(); // 1

    // Edit
    const editButton = screen.getByTestId('DATA-TEST-ID-edit');
    userEvent.click(editButton);

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    userEvent.clear(input);

    expect(container).toMatchSnapshot(); // 2

    const submitButton = screen.getByTestId('DATA-TEST-ID-submit');
    userEvent.click(submitButton);

    expect(container).toMatchSnapshot();
    expect(onRowSubmitMock).toBeCalledTimes(1);
    expect(onRowSubmitMock).toBeCalledWith({ number: undefined }, 0);
  });

  it('LineEditableInPlaceDataTable handles onRowDelete and onRowDownload', () => {
    const isDeletableMock = jest.fn().mockImplementation(() => true);
    const isDownloadableMock = jest.fn().mockImplementation(() => true);
    const onRowEditMock = jest.fn();
    const onRowDeleteMock = jest.fn();
    const onRowDownloadMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', editable: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }, { number: 2 }]}
        dataTestId='DATA-TEST-ID'
        extra={{
          editedRowIndex: 1,
          isDeletable: isDeletableMock,
          isDownloadable: isDownloadableMock,
          onRowEdit: onRowEditMock,
          onRowDelete: onRowDeleteMock,
          onRowDownload: onRowDownloadMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    // Download
    const downloadButton = screen.getByTestId('DATA-TEST-ID-download');
    userEvent.click(downloadButton);

    expect(onRowDownloadMock).toBeCalledTimes(1);
    expect(onRowDownloadMock).toBeCalledWith({ number: 1 }, 0);

    // Delete and confirm in popover
    const deleteButton = screen.getByTestId('DATA-TEST-ID-delete');
    userEvent.click(deleteButton);

    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowDeleteMock).toBeCalledTimes(1);
    expect(onRowDeleteMock).toBeCalledWith({ number: 1 }, 0);
  });

  it('LineEditableInPlaceDataTable handles onRowDelete and onRowDownload with custom localization', () => {
    const isDeletableMock = jest.fn().mockImplementation(() => false);
    const isDownloadableMock = jest.fn().mockImplementation(() => false);
    const onRowEditMock = jest.fn();
    const onRowDeleteMock = jest.fn();
    const onRowDownloadMock = jest.fn();
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
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
          onRowEdit: onRowEditMock,
          onRowDelete: onRowDeleteMock,
          onRowDownload: onRowDownloadMock,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTable handles canAddNewLine with onNewLine', () => {
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);
    const onRowEditMock = jest.fn();
    const onNewLineMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          canAddNewLine: canAddNewLineMock,
          onRowEdit: onRowEditMock,
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

  it('LineEditableInPlaceDataTable handles canAddNewLine without onNewLine', () => {
    console.error = jest.fn();
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);
    const onRowEditMock = jest.fn();

    const { container } = render(
      <LineEditableInPlaceDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          canAddNewLine: canAddNewLineMock,
          onRowEdit: onRowEditMock,
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
