import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AmountCell from '../AmountCell';
import { ColumnType } from '../../types';

describe('AmountCell component', () => {
  it('AmountCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{ suffix: 'COLUMNCURRENCY', dataIndex: 'data', title: 'amountcell', type: ColumnType.AMOUNT }}
              row={{ data: 1234 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('AmountCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{ dataIndex: 'data', editable: true, title: 'amountcell', type: ColumnType.AMOUNT }}
              extra={{ editedRowIndex: 6 }}
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('AmountCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{
                dataIndex: 'data',
                ellipsis: true,
                title: 'amountcell',
                type: ColumnType.AMOUNT,
              }}
              editing
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('AmountCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{ dataIndex: 'data', hidden: true, title: 'amountcell', type: ColumnType.AMOUNT }}
              row={{ data: 1234 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('AmountCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{ dataIndex: 'data', title: 'amountcell', type: ColumnType.AMOUNT }}
              extra={{ suffix: 'EXTRACURRENCY' }}
              forcedValue={-4321}
              row={{ data: 1234 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('AmountCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <AmountCell
              column={{ dataIndex: 'data', title: 'amountcell', type: ColumnType.AMOUNT }}
              editing
              onChange={onChangeMock}
              row={{ data: 1234 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    const amount = await screen.findByDisplayValue('1,234');

    await userEvent.clear(amount);

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
