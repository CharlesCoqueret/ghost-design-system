import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateCell from '../DateCell';
import { ColumnType } from '../../types';

describe('DateCell component', () => {
  it('DateCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DateCell
              column={{
                dataIndex: 'data',
                title: 'DateCell',
                type: ColumnType.DATE,
              }}
              row={{ data: new Date('Sun Apr 03 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DateCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DateCell
              column={{
                dataIndex: 'data',
                title: 'DateCell',
                type: ColumnType.DATE,
              }}
              forcedValue={new Date('Mon Apr 04 2022')}
              row={{ data: new Date('Sun Apr 03 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DateCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DateCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'DateCell',
                type: ColumnType.DATE,
              }}
              row={{ data: new Date('Sun Apr 03 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DateCell renders in edit mode and handles change', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DateCell
              column={{
                dataIndex: 'data',
                title: 'DateCell',
                type: ColumnType.DATE,
                dateFormat: 'MMM dd, yyyy',
              }}
              editing
              onChange={onChangeMock}
              row={{ data: new Date('Sun Apr 03 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const dateInput = await screen.findByPlaceholderText('MMM DD, YYYY');

    userEvent.clear(dateInput);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);

    userEvent.type(dateInput, '01/01/2000{enter}');

    expect(onChangeMock).toBeCalledTimes(9);
    expect(onChangeMock).toBeCalledWith(new Date('01/01/2000'));
  });

  it('DateCell renders in edit mode via extra', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DateCell
              column={{
                dataIndex: 'data',
                editable: true,
                title: 'DateCell',
                type: ColumnType.DATE,
              }}
              extra={{ editedRowIndex: 0 }}
              row={{ data: new Date('Sun Apr 03 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
