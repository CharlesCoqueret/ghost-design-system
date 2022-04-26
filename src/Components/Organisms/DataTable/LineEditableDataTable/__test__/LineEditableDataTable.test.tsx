import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';

// Mocking suneditor which is problematic with Jest
jest.mock('suneditor', () => {});
jest.mock('suneditor/src/plugins/', () => {});
jest.mock('suneditor/src/plugins/submenu/align', () => {});
jest.mock('suneditor/src/plugins/command/blockquote', () => {});
jest.mock('suneditor/src/plugins/submenu/fontColor', () => {});
jest.mock('suneditor/src/plugins/submenu/fontSize', () => {});
jest.mock('suneditor/src/plugins/submenu/formatBlock', () => {});
jest.mock('suneditor/src/plugins/submenu/hiliteColor', () => {});
jest.mock('suneditor/src/plugins/submenu/horizontalRule', () => {});
jest.mock('suneditor/src/plugins/dialog/image', () => {});
jest.mock('suneditor/src/plugins/dialog/link', () => {});
jest.mock('suneditor/src/plugins/submenu/lineHeight', () => {});
jest.mock('suneditor/src/plugins/submenu/list', () => {});
jest.mock('suneditor/src/plugins/submenu/paragraphStyle', () => {});
jest.mock('suneditor/src/plugins/submenu/table', () => {});
jest.mock('suneditor-react', () => {});
jest.mock('suneditor-react/dist', () => {});
jest.mock('suneditor-react/dist/types/lang', () => {});

import LineEditableDataTable from '../LineEditableDataTable';
import { ColumnType, SortDirectionEnum } from '../../Common';

describe('LineEditableDataTable component', () => {
  it('LineEditableDataTable renders', () => {
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

  it('LineEditableDataTable handles edit and submit', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowEditMock).toBeCalledTimes(1);
    expect(onRowEditMock).toBeCalledWith({ number: 1 }, 0);

    const input = screen.getByPlaceholderText('NUMBER');
    userEvent.clear(input);
    userEvent.type(input, '2');
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowSubmitMock).toBeCalledTimes(1);
    expect(onRowSubmitMock).toBeCalledWith({ number: 2 }, 0);
  });

  it('LineEditableDataTable handles non editable content', () => {
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

  it('LineEditableDataTable handles delete', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowDeleteMock).toBeCalledTimes(1);
    expect(onRowDeleteMock).toBeCalledWith({ number: 1 }, 0);
  });
  it('LineEditableDataTable handles delete with previous defined editedrowindex', () => {
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

  it('LineEditableDataTable handles non deletable', () => {
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

  it('LineEditableDataTable handles download', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowDownloadMock).toBeCalledTimes(1);
    expect(onRowDownloadMock).toBeCalledWith({ number: 1 }, 0);
  });

  it('LineEditableDataTable handles non downloadable', () => {
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

  it('LineEditableDataTable renders with no data', () => {
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

  it('LineEditableDataTable renders while loading', () => {
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

  it('LineEditableDataTable handles sort', () => {
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

  it('LineEditableDataTable handles add new line with onNewLine', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onNewLineMock).toBeCalledTimes(1);
    expect(onNewLineMock).toBeCalledWith();

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    userEvent.click(input);
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onRowCancelEditMock).toBeCalledTimes(1);
  });

  it('LineEditableDataTable handles add new line without onNewLine', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Missing onNewLine function');
  });

  it('LineEditableDataTable with custom modal button', () => {
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

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onNewLineMock).toBeCalledTimes(1);
    expect(onNewLineMock).toBeCalledWith();

    const input = screen.getByPlaceholderText('PLACEHOLDER');
    userEvent.click(input);
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onClickMock).toBeCalledTimes(1);
  });
});
