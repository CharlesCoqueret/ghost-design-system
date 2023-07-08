import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SwitchCell from '../SwitchCell';
import { ColumnType } from '../../types';

describe('SwitchCell component', () => {
  it('SwitchCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SwitchCell
              column={{
                dataIndex: 'data',
                title: 'SwitchCell',
                type: ColumnType.SWITCH,
              }}
              row={{
                data: [
                  {
                    value: 'value1',
                    checked: true,
                    label: 'Label 1',
                  },
                  {
                    value: 'value2',
                    checked: false,
                    label: 'Label 2',
                  },

                  {
                    value: 'value3',
                    label: 'Label 3',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SwitchCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SwitchCell
              column={{
                dataIndex: 'data',
                title: 'SwitchCell',
                type: ColumnType.SWITCH,
              }}
              forcedValue={[
                {
                  value: 'value4',
                  checked: true,
                  label: 'Label 4',
                },
              ]}
              row={{
                data: [
                  {
                    value: 'value1',
                    checked: true,
                    label: 'Label 1',
                  },
                  {
                    value: 'value2',
                    checked: false,
                    label: 'Label 2',
                  },

                  {
                    value: 'value3',
                    label: 'Label 3',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SwitchCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SwitchCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'SwitchCell',
                type: ColumnType.SWITCH,
              }}
              row={{
                data: [
                  {
                    value: 'value1',
                    checked: true,
                    label: 'Label 1',
                  },
                  {
                    value: 'value2',
                    checked: false,
                    label: 'Label 2',
                  },

                  {
                    value: 'value3',
                    label: 'Label 3',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SwitchCell renders in edit mode and handles change', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SwitchCell
              column={{
                dataIndex: 'data',
                title: 'SwitchCell',
                type: ColumnType.SWITCH,
              }}
              dataTestId='DATA-TEST-ID'
              editing
              onChange={onChangeMock}
              row={{
                data: [
                  {
                    value: 'value1',
                    checked: true,
                    label: 'Label 1',
                  },
                  {
                    value: 'value2',
                    checked: false,
                    label: 'Label 2',
                  },

                  {
                    value: 'value3',
                    label: 'Label 3',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const switchBox = await screen.findByTestId('DATA-TEST-ID-2');

    await userEvent.click(switchBox);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith([
      {
        value: 'value1',
        checked: true,
        label: 'Label 1',
      },
      {
        value: 'value2',
        checked: false,
        label: 'Label 2',
      },

      {
        value: 'value3',
        checked: true,
        label: 'Label 3',
      },
    ]);
  });

  it('SwitchCell renders in edit mode via extra', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SwitchCell
              column={{
                dataIndex: 'data',
                editable: true,
                title: 'SwitchCell',
                type: ColumnType.SWITCH,
              }}
              extra={{ editedRowIndex: 0 }}
              row={{
                data: [
                  {
                    value: 'value1',
                    checked: true,
                    label: 'Label 1',
                  },
                  {
                    value: 'value2',
                    checked: false,
                    label: 'Label 2',
                  },

                  {
                    value: 'value3',
                    label: 'Label 3',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
