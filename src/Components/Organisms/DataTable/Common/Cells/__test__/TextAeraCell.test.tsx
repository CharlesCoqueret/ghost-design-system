import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextAreaCell from '../TextAreaCell';
import { ColumnType } from '../../types';

describe('TextAreaCell component', () => {
  it('TextAreaCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

  it('TextAreaCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                editable: true,
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

  it('TextAreaCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

  it('TextAreaCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

  it('TextAreaCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

  it('TextAreaCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TextAreaCell
              column={{
                dataIndex: 'data',
                title: 'TextAreaCell',
                type: ColumnType.TEXTAREA,
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

    const TEXTAREA = await screen.findByTestId('DATA-TEST-ID');
    userEvent.type(TEXTAREA, '{backspace}');

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('tex');
  });
});
