import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PercentageCell from '../PercentageCell';
import { ColumnType } from '../../types';

describe('PercentageCell component', () => {
  it('PercentageCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{ dataIndex: 'data', title: 'PercentageCell', type: ColumnType.PERCENTAGE }}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('PercentageCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{ dataIndex: 'data', editable: true, title: 'PercentageCell', type: ColumnType.PERCENTAGE }}
              extra={{ editedRowIndex: 6 }}
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('PercentageCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{
                dataIndex: 'data',
                ellipsis: true,
                title: 'PercentageCell',
                type: ColumnType.PERCENTAGE,
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

  it('PercentageCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{ dataIndex: 'data', hidden: true, title: 'PercentageCell', type: ColumnType.PERCENTAGE }}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('PercentageCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{ dataIndex: 'data', title: 'PercentageCell', type: ColumnType.PERCENTAGE }}
              forcedValue={-43.21}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('PercentageCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <PercentageCell
              column={{ dataIndex: 'data', title: 'PercentageCell', type: ColumnType.PERCENTAGE }}
              editing
              onChange={onChangeMock}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    const PERCENTAGE = await screen.findByDisplayValue('1,234 %');

    userEvent.clear(PERCENTAGE);

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
