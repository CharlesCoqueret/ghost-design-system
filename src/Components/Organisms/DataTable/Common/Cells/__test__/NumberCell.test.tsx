import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberCell from '../NumberCell';
import { ColumnType } from '../../types';

describe('NumberCell component', () => {
  it('NumberCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{ dataIndex: 'data', title: 'NumberCell', type: ColumnType.NUMBER }}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('NumberCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{ dataIndex: 'data', title: 'NumberCell', type: ColumnType.NUMBER }}
              extra={{ editedRowIndex: 6 }}
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('NumberCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{
                dataIndex: 'data',
                ellipsis: true,
                title: 'NumberCell',
                type: ColumnType.NUMBER,
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

  it('NumberCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{ dataIndex: 'data', hidden: true, title: 'NumberCell', type: ColumnType.NUMBER }}
              row={{ data: 12.34 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('NumberCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{ dataIndex: 'data', title: 'NumberCell', type: ColumnType.NUMBER }}
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

  it('NumberCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <NumberCell
              column={{ dataIndex: 'data', title: 'NumberCell', type: ColumnType.NUMBER }}
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

    const NUMBER = await screen.findByDisplayValue('12.34');

    userEvent.clear(NUMBER);

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
