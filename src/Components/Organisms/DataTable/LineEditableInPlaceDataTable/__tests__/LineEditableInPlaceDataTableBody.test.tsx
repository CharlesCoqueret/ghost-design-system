import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LineEditableInPlaceDataTableBody from '../LineEditableInPlaceDataTableBody';
import { ColumnType } from '../../Common/types';

describe('EditableDataTableCell component', () => {
  it('EditableDataTableCell renders', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onRowEditMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onRowEdit: onRowEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onRowEdit: onRowEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
          loading={<>Loading</>}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{
            onRowEdit: onRowEditMock,
          }}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTableCell handles row selection', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onRowEditMock = jest.fn();
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onRowEdit: onRowEditMock,
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
    const onRowEditMock = jest.fn();
    const onRowClickMock = jest.fn();

    const { container } = render(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            onRowEdit: onRowEditMock,
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
    const onRowEditMock = jest.fn();
    const onRowClickMock = jest.fn();

    const { container } = render(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onRowEdit: onRowEditMock,
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
    const onRowEditMock = jest.fn();
    const onRowSelectMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onRowEdit: onRowEditMock,
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
        <LineEditableInPlaceDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          extra={{
            isEditable: () => true,
            isSelectable: () => true,
            onRowEdit: onRowEditMock,
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
