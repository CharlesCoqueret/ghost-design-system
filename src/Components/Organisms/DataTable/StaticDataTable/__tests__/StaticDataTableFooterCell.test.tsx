import React from 'react';
import { render } from '@testing-library/react';
import { ColumnType } from '../../Common/types';

import StaticDataTableFooterCell from '../StaticDataTableFooterCell';

describe('StaticDataTableFooterCell component', () => {
  it('StaticDataTableFooterCell renders with amount', () => {
    const computeTotalMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              data={[{ amount: 1 }, { amount: 2 }]}
              extra={{ computeTotal: computeTotalMock }}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
    expect(computeTotalMock).toBeCalledWith([{ amount: 1 }, { amount: 2 }], 'amount');

    rerender(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              data={[{ amount: 1 }, { amount: 2 }]}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableFooterCell renders with number', () => {
    const computeTotalMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ number: number }>
              column={{
                dataIndex: 'number',
                title: 'Number',
                type: ColumnType.NUMBER,
              }}
              data={[{ number: 1 }, { number: 2 }]}
              extra={{ computeTotal: computeTotalMock }}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
    expect(computeTotalMock).toBeCalledWith([{ number: 1 }, { number: 2 }], 'number');

    rerender(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ number: number }>
              column={{
                dataIndex: 'number',
                title: 'Number',
                type: ColumnType.NUMBER,
              }}
              data={[{ number: 1 }, { number: 2 }]}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableFooterCell renders with percentage', () => {
    const computeTotalMock = jest.fn();

    const { container, rerender } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ percentage: number }>
              column={{
                dataIndex: 'percentage',
                title: 'Percentage',
                type: ColumnType.PERCENTAGE,
              }}
              data={[{ percentage: 1 }, { percentage: 2 }]}
              extra={{ computeTotal: computeTotalMock }}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
    expect(computeTotalMock).toBeCalledWith([{ percentage: 1 }, { percentage: 2 }], 'percentage');

    rerender(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ percentage: number }>
              column={{
                dataIndex: 'percentage',
                title: 'Percentage',
                type: ColumnType.PERCENTAGE,
              }}
              data={[{ percentage: 1 }, { percentage: 2 }]}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableFooterCell renders with badge, button, checkbox, code, custom, date, dynamicsearch, text, textarea, year', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableFooterCell<{ badge: string }>
              column={{
                dataIndex: 'badge',
                title: 'Badge',
                type: ColumnType.BADGE,
                options: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                ],
              }}
              data={[{ badge: '1' }, { badge: '2' }]}
              extra={{ computeTotal: computeTotalMock }}
              rowIndex={3}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(0);
  });
});
