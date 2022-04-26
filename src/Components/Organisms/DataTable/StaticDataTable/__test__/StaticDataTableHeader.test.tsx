import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StaticDataTableHeader from '../StaticDataTableHeader';
import { ColumnType, SortDirectionEnum } from '../../Common/types';

describe('StaticDataTableHeader component', () => {
  it('StaticDataTableHeader renders without sort', () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableHeader handles sort change ', () => {
    const onSortChangeMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              dataTestId: 'DATA-TEST-ID',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    const sortButton = screen.getByTestId('DATA-TEST-ID-sort');

    userEvent.click(sortButton);

    expect(onSortChangeMock).toBeCalledTimes(1);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.DESC);

    rerender(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              dataTestId: 'DATA-TEST-ID',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
          sortField='number'
          sortDirection={SortDirectionEnum.DESC}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.click(sortButton);

    expect(onSortChangeMock).toBeCalledTimes(2);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.ASC);

    rerender(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              dataTestId: 'DATA-TEST-ID',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
          sortField='number'
          sortDirection={SortDirectionEnum.ASC}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.keyboard('{Enter}');

    expect(onSortChangeMock).toBeCalledTimes(3);
    expect(onSortChangeMock).toBeCalledWith('number', undefined);

    rerender(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              dataTestId: 'DATA-TEST-ID',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
          sortField='number'
        />
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.keyboard('a');

    expect(onSortChangeMock).toBeCalledTimes(3);
  });

  it('StaticDataTableHeader disables sort when row is edited', () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          extra={{ editedRowIndex: 0 }}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableHeader with custom sort message', () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          extra={{
            localization: {
              sortMessage: 'New sort message',
            },
          }}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
  it('StaticDataTableHeader with row selection', async () => {
    const onSortChangeMock = jest.fn();
    const onRowSelectMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              sorter: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          extra={{ onRowSelect: onRowSelectMock }}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableHeader with Total', async () => {
    const onSortChangeMock = jest.fn();
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          extra={{ computeTotal: computeTotalMock }}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableHeader with hidden column', async () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <table>
        <StaticDataTableHeader<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              hidden: true,
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          onSortChange={onSortChangeMock}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
