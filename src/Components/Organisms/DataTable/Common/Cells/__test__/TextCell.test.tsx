import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextCell from '../TextCell';
import { ColumnType } from '../../types';

describe('TextCell component', () => {
  it('TextCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                title: 'TextCell',
                type: ColumnType.TEXT,
              }}
              row={{ data: 'text 1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('TextCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                editable: true,
                title: 'TextCell',
                type: ColumnType.TEXT,
              }}
              extra={{ editedRowIndex: 6 }}
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('TextCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                title: 'TextCell',
                type: ColumnType.TEXT,
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

  it('TextCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'TextCell',
                type: ColumnType.TEXT,
              }}
              row={{ data: 'text 1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('TextCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                title: 'TextCell',
                type: ColumnType.TEXT,
              }}
              forcedValue={'text 2'}
              row={{ data: 'text 1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('TextCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextCell
              column={{
                dataIndex: 'data',
                title: 'TextCell',
                type: ColumnType.TEXT,
              }}
              editing
              dataTestId='DATA-TEST-ID'
              onChange={onChangeMock}
              row={{ data: 'text' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    const TEXT = await screen.findByTestId('DATA-TEST-ID');
    userEvent.type(TEXT, '{backspace}');

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('tex');
  });
});
