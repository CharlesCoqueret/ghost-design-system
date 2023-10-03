import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';

import LineEditableDataTable from '../LineEditableDataTable';
import { ColumnType, SortDirectionEnum } from '../../Common';

describe('LineEditableDataTable component', () => {
  it('renders', () => {
    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles edit and submit', async () => {
    const onRowEditMock = jest.fn();
    const onRowSubmitMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        extra={{
          isEditable: () => true,
          onRowEdit: onRowEditMock,
          onRowSubmit: onRowSubmitMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onRowEditMock).toBeCalledTimes(1);
    expect(onRowEditMock).toBeCalledWith({ number: 1 }, 0);

    const input = screen.getByPlaceholderText('NUMBER');
    await userEvent.clear(input);
    await userEvent.type(input, '2');
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onRowSubmitMock).toBeCalledTimes(1);
    expect(onRowSubmitMock).toBeCalledWith({ number: 2 }, 0);
  });

  it('handles non editable content', () => {
    const onRowEditMock = jest.fn();
    const onRowSubmitMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: false, placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        extra={{
          isEditable: () => false,
          localization: {
            actionColumn: 'actionColumn',
            editButton: 'editButton',
            modalTitle: 'modalTitle',
            moreActionsMessage: 'moreActionsMessage',
          },
          onRowEdit: onRowEditMock,
          onRowSubmit: onRowSubmitMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles delete', async () => {
    const onRowDeleteMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        extra={{
          isDeletable: () => true,
          onRowDelete: onRowDeleteMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onRowDeleteMock).toBeCalledTimes(1);
    expect(onRowDeleteMock).toBeCalledWith({ number: 1 }, 0);
  });
  it('handles delete with previous defined editedrowindex', () => {
    const onRowDeleteMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }, { number: 2 }]}
        extra={{
          editedRowIndex: 1,
          isDeletable: () => true,
          onRowDelete: onRowDeleteMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles non deletable', () => {
    const onRowDeleteMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[{ number: 1 }]}
        extra={{
          isDeletable: () => false,
          localization: {
            deleteButton: 'deleteButton',
            deletePopoverMessage: 'deletePopoverMessage',
            deletePopoverCancel: 'deletePopoverCancel',
            deletePopoverConfirm: 'deletePopoverConfirm',
          },
          onRowDelete: onRowDeleteMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles download', async () => {
    const onRowDownloadMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          isDownloadable: () => true,
          onRowDownload: onRowDownloadMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onRowDownloadMock).toBeCalledTimes(1);
    expect(onRowDownloadMock).toBeCalledWith({ number: 1 }, 0);
  });

  it('handles non downloadable', () => {
    const onRowDownloadMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', placeholder: 'NUMBER', title: 'Number', type: ColumnType.NUMBER }]}
        data={[{ number: 1 }]}
        extra={{
          isDownloadable: () => false,
          localization: {
            downloadButton: 'downloadButton',
          },
          onRowDownload: onRowDownloadMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with no data', () => {
    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[]}
        extra={{
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders while loading', () => {
    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
        data={[]}
        extra={{
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
        loading={<>Loading</>}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles sort', async () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[{ dataIndex: 'number', sorter: true, title: 'Number', type: ColumnType.NUMBER }]}
        data={[]}
        extra={{
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
        loading={<>Loading</>}
        onSortChange={onSortChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(1);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.DESC);

    await userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(2);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.ASC);

    await userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(3);
    expect(onSortChangeMock).toBeCalledWith();
  });

  it('handles add new line with onNewLine', async () => {
    const onNewLineMock = jest.fn().mockImplementation(() => {
      return { number: 0 };
    });
    const onRowCancelEditMock = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[]}
        extra={{
          canAddNewLine: () => true,
          localization: {
            addRow: 'addRow',
            modalTitle: () => 'modalTitle',
          },
          onNewLine: onNewLineMock,
          onRowCancelEdit: onRowCancelEditMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onNewLineMock).toBeCalledTimes(1);
    expect(onNewLineMock).toBeCalledWith();

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onRowCancelEditMock).toBeCalledTimes(1);
  });

  it('handles add new line without onNewLine', async () => {
    const onRowCancelEditMock = jest.fn();
    console.error = jest.fn();

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[]}
        extra={{
          canAddNewLine: () => true,
          onRowCancelEdit: onRowCancelEditMock,
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Missing onNewLine function');
  });

  it('with custom modal button', async () => {
    const onClickMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });
    const onNewLineMock = jest.fn().mockImplementation(() => {
      return { number: 0 };
    });

    const { container } = render(
      <LineEditableDataTable<{ number: number }>
        columns={[
          { dataIndex: 'number', editable: true, placeholder: 'PLACEHOLDER', title: 'Number', type: ColumnType.NUMBER },
        ]}
        data={[]}
        extra={{
          canAddNewLine: () => true,
          localization: {
            modalTitle: 'modalTitle',
          },
          onNewLine: onNewLineMock,
          rowEditExtraActions: () => [
            {
              onClick: onClickMock,
              label: 'LABEL',
            },
          ],
          validationSchema: yup.object({
            number: yup.number().required(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onNewLineMock).toBeCalledTimes(1);
    expect(onNewLineMock).toBeCalledWith();

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onClickMock).toBeCalledTimes(1);
  });
});
