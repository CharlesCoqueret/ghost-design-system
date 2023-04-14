import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StaticDataTableBody from '../StaticDataTableBody';
import { ColumnType } from '../../Common/types';

describe('StaticDataTableBody component', () => {
  it('StaticDataTableBody renders with number with compute total', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[{ number: 1 }]}
          extra={{ computeTotal: computeTotalMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number and no data', () => {
    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{ localization: { noData: 'No data' } }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number and no data with hidden column', () => {
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', hidden: true, title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{ localization: { noData: 'No data' }, onRowSelect: onRowSelectMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number and no data with no custom message', () => {
    const onRowSelectMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{ localization: { sortMessage: 'Sort' }, onRowSelect: onRowSelectMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          extra={{ onRowSelect: onRowSelectMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number loading ', () => {
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          loading={<div>loading</div>}
          extra={{ localization: { noData: 'No data' }, onRowSelect: onRowSelectMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number loading with hidden column', () => {
    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', hidden: true, title: 'Number', type: ColumnType.NUMBER }]}
          data={[]}
          loading={<div>loading</div>}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number selectable and handles selection', () => {
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          dataTestId='DATA-TEST-ID'
          data={[{ number: 1 }]}
          extra={{ onRowSelect: onRowSelectMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    const selectRow = screen.getByTestId('DATA-TEST-ID-select-row-0');
    userEvent.click(selectRow);

    expect(container).toMatchSnapshot();

    expect(onRowSelectMock).toBeCalledTimes(1);
    expect(onRowSelectMock).toBeCalledWith([{ number: 1 }], { number: 1 }, 0);

    userEvent.click(selectRow);

    expect(container).toMatchSnapshot();

    expect(onRowSelectMock).toBeCalledTimes(2);
    expect(onRowSelectMock).toBeCalledWith([], { number: 1 }, 0);
  });

  it('StaticDataTableBody renders with number selectable row', () => {
    const onRowSelectMock = jest.fn();
    const isSelectableMock = jest.fn().mockImplementation(() => {
      return true;
    });

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          dataTestId='DATA-TEST-ID'
          data={[{ number: 1 }]}
          extra={{ onRowSelect: onRowSelectMock, isSelectable: isSelectableMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableBody renders with number handles row click and row enter', () => {
    const onRowClickMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableBody<{ number: number }>
          columns={[{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }]}
          dataTestId='DATA-TEST-ID'
          data={[{ number: 1 }]}
          extra={{ onRowClick: onRowClickMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    const row = screen.getByTestId('DATA-TEST-ID-row-0');
    userEvent.click(row);

    expect(container).toMatchSnapshot();

    expect(onRowClickMock).toBeCalledTimes(1);
    expect(onRowClickMock).toBeCalledWith({ number: 1 }, 0);

    userEvent.keyboard('{Enter}');
    expect(container).toMatchSnapshot();

    expect(onRowClickMock).toBeCalledTimes(2);
    expect(onRowClickMock).toBeCalledWith({ number: 1 }, 0);

    userEvent.keyboard('a');
    expect(onRowClickMock).toBeCalledTimes(2);
  });
});
