import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableDataTableBody from '../EditableDataTableBody';
import { ColumnType } from '../../Common/types';

describe('EditableDataTableCell component', () => {
  it('EditableDataTableCell renders', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onEditMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onEdit: onEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onEdit: onEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
          loading={<>Loading</>}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{
            onEdit: onEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTableCell handles row selection', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onEditMock = jest.fn();
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onEdit: onEditMock,
            onRowSelect: onRowSelectMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.keyboard('{Enter}');
    }

    expect(onRowSelectMock).toBeCalledTimes(1);
    expect(onRowSelectMock).toBeCalledWith([{ number: 1 }], { number: 1 }, 0);
  });

  it('EditableDataTableCell handles row click', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onEditMock = jest.fn();
    const onRowClickMock = jest.fn();

    const { container } = render(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onEdit: onEditMock,
            onRowClick: onRowClickMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.keyboard('{Enter}');
    }

    expect(onRowClickMock).toBeCalledTimes(1);
    expect(onRowClickMock).toBeCalledWith({ number: 1 }, 0);
  });

  it('EditableDataTableCell handles iseditable function', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onEditMock = jest.fn();
    const onRowClickMock = jest.fn();

    const { container } = render(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onEdit: onEditMock,
            onRowClick: onRowClickMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTableCell handles iseditable function', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onEditMock = jest.fn();
    const onRowSelectMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onEdit: onEditMock,
            onRowSelect: onRowSelectMock,
            localization: { noData: 'Nothing' },
          }}
          data={[]}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <EditableDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onEdit: onEditMock,
            onRowSelect: onRowSelectMock,
          }}
          data={[{ number: 1 }]}
          handleUpdateDataChange={handleUpdateDataChangeMock}
          loading={<>Loading</>}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
