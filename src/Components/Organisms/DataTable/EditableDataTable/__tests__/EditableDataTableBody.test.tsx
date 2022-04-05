import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ColumnType, IColumnType } from '../../Common/types';
import EditableDataTableBody from '../EditableDataTableBody';

interface ITestType {
  id: string;
  name: string;
  status: string;
  price: number;
  parts: number;
  startDate: Date;
}

const columns: IColumnType<ITestType>[] = [
  {
    title: 'Code',
    dataIndex: 'id',
    sorter: true,
    type: ColumnType.CODE,
  },
  {
    title: 'Text',
    dataIndex: 'name',
    type: ColumnType.TEXT,
    ellipsis: true,
    sorter: true,
    editable: true,
  },
  {
    title: 'Badge',
    dataIndex: 'status',
    sorter: true,
    type: ColumnType.BADGE,
    editable: true,
    options: [{ label: 'Status', value: 'status' }],
  },
  {
    title: 'Amount',
    dataIndex: 'price',
    sorter: true,
    type: ColumnType.AMOUNT,
    currency: '€',
    editable: true,
  },
  {
    title: 'Percentage',
    dataIndex: 'parts',
    sorter: true,
    type: ColumnType.PERCENTAGE,
    editable: true,
  },
  {
    title: 'Date',
    dataIndex: 'startDate',
    sorter: true,
    type: ColumnType.DATE,
    editable: true,
  },
];

const initialData = [
  {
    id: 'id',
    name: 'name',
    status: 'status',
    price: -100000,
    parts: -10,
    startDate: new Date(2021, 2, 24),
  },
];

describe('EditableDataTableBody Component', () => {
  it('EditableDataTableBody renders and handles row click', async () => {
    const onEditMock = jest.fn();
    const onRowClickMock = jest.fn();
    const handleUpdateDataChangeMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
      onRowClick: onRowClickMock,
    };

    const { container } = render(
      <table>
        <EditableDataTableBody<ITestType>
          columns={columns}
          data={initialData}
          dataTestId={'DATA-TEST-ID'}
          extra={extra}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    const codeCell = await screen.findAllByTestId('DATA-TEST-ID-Code-0');
    expect(codeCell.length).toBeGreaterThan(0);

    act(() => {
      if (codeCell.length > 0) {
        userEvent.click(codeCell[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onRowClickMock).toHaveBeenCalledTimes(1);
    expect(onRowClickMock).toHaveBeenCalledWith(initialData[0], 0);
  });

  it('EditableDataTableBody renders and handles row selection', async () => {
    const onEditMock = jest.fn();
    const onRowSelectMock = jest.fn();
    const handleUpdateDataChangeMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
      onRowSelect: onRowSelectMock,
    };

    const { container } = render(
      <table>
        <EditableDataTableBody<ITestType>
          columns={columns}
          data={initialData}
          extra={extra}
          handleUpdateDataChange={handleUpdateDataChangeMock}
        />
      </table>,
    );

    const checkboxCell = await screen.findAllByTestId('select-row-0');
    expect(checkboxCell.length).toBeGreaterThan(0);

    act(() => {
      if (checkboxCell.length > 0) {
        userEvent.click(checkboxCell[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onRowSelectMock).toHaveBeenCalledTimes(1);
    expect(onRowSelectMock).toHaveBeenCalledWith([initialData[0]], initialData[0], 0);
  });
});
