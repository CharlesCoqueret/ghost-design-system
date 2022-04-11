import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxCell from '../CheckboxCell';
import { ColumnType } from '../../types';

describe('CheckboxCell component', () => {
  it('CheckboxCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CheckboxCell
              column={{
                dataIndex: 'data',
                title: 'CheckboxCell',
                type: ColumnType.CHECKBOX,
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

  it('CheckboxCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CheckboxCell
              column={{
                dataIndex: 'data',
                title: 'CheckboxCell',
                type: ColumnType.CHECKBOX,
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

  it('CheckboxCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CheckboxCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'CheckboxCell',
                type: ColumnType.CHECKBOX,
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

  it('CheckboxCell renders in edit mode and handles change', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CheckboxCell
              column={{
                dataIndex: 'data',
                title: 'CheckboxCell',
                type: ColumnType.CHECKBOX,
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

    const checkbox = await screen.findByTestId('DATA-TEST-ID-2');

    act(() => {
      userEvent.click(checkbox);
    });

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

  it('CheckboxCell renders in edit mode via extra', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CheckboxCell
              column={{
                dataIndex: 'data',
                title: 'CheckboxCell',
                type: ColumnType.CHECKBOX,
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
