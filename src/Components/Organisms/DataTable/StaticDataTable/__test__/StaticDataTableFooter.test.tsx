import React from 'react';
import { render } from '@testing-library/react';
import { ColumnType } from '../../Common/types';

import StaticDataTableFooter from '../StaticDataTableFooter';

describe('StaticDataTableFooter component', () => {
  it('StaticDataTableFooter renders with computeTotal', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
          extra={{ computeTotal: computeTotalMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
  });

  it('StaticDataTableFooter renders with computeTotal and custom localization', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
          extra={{ computeTotal: computeTotalMock, localization: { total: 'Total' } }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
  });

  it('StaticDataTableFooterCell renders with computeTotal', () => {
    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
