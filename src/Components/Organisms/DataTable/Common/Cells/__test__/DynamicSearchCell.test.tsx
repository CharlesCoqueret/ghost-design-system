import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DynamicSearchCell from '../DynamicSearchCell';
import { ColumnType } from '../../types';

describe('DynamicSearchCell component', () => {
  it('DynamicSearchCell renders', () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(0);
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCell renders with forced value', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value2', label: 'Label 2' });
    });
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              dataTestId='DATA-TEST-ID'
              forcedValue='value2'
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();
    expect(resolveValueMock).toBeCalledTimes(1);
    expect(resolveValueMock).toBeCalledWith('value2');
    expect(searchOptionsMock).toBeCalledTimes(0);
  });

  it('DynamicSearchCell renders when hidden', () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                hidden: true,
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DynamicSearchCell renders in edit mode and handles change', async () => {
    const onChangeMock = jest.fn();

    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value1', label: 'Label 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve([
        { value: 'value1', label: 'Label 1' },
        { value: 'value2', label: 'Label 2' },
      ]);
    });
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                isClearable: true,
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              dataTestId='DATA-TEST-ID'
              editing
              onChange={onChangeMock}
              row={{ data: 'value1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');
    userEvent.type(select, '{backspace}');

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('DynamicSearchCell handles display of no message', async () => {
    const onChangeMock = jest.fn();

    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value1', label: 'Label 1' });
    });
    const searchOptionsMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    const noOptionsMessageMock = jest.fn().mockImplementation((obj: { inputValue: string }) => {
      return `No result for ${obj.inputValue}`;
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                isClearable: true,
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              dataTestId='DATA-TEST-ID'
              editing
              onChange={onChangeMock}
              row={{ data: 'value1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(await screen.findByTestId('DATA-TEST-ID-spinner')).toBeTruthy();

    expect(screen.queryByTestId('DATA-TEST-ID-spinner')).toBeFalsy();

    expect(container).toMatchSnapshot();

    const select = await screen.findByRole('combobox');
    userEvent.type(select, '{backspace}');

    expect(container).toMatchSnapshot();
    expect(noOptionsMessageMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('DynamicSearchCell renders in edit mode via extra', () => {
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();
    const noOptionsMessageMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DynamicSearchCell
              column={{
                dataIndex: 'data',
                hidden: true,
                noOptionsMessage: noOptionsMessageMock,
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'DynamicSearchCell',
                type: ColumnType.DYNAMICSEARCH,
              }}
              extra={{ editedRowIndex: 0 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
