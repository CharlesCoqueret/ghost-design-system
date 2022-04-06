import React from 'react';
import { render } from '@testing-library/react';

import CustomCell from '../CustomCell';
import { ColumnType } from '../../types';

describe('CustomCell component', () => {
  it('CustomCell renders', async () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest.fn().mockImplementation(() => {
      return 'customRenderEdit';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(1);
    expect(customRenderMock).toBeCalledWith({ data: 'DATA' }, 'data', 0);
    expect(customRenderEditMock).toBeCalledTimes(0);
  });

  it('CustomCell renders with forced value', async () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest.fn().mockImplementation(() => {
      return 'customRenderEdit';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              row={{ data: 'DATA' }}
              forcedValue='FORCEDVALUE'
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(0);
    expect(customRenderEditMock).toBeCalledTimes(0);
  });

  it('CustomCell renders when hidden', async () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest.fn().mockImplementation(() => {
      return 'customRenderEdit';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                hidden: true,
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(1);
    expect(customRenderEditMock).toBeCalledTimes(0);
  });

  it('CustomCell renders in edit mode and handles change', async () => {
    let customOnChangeCallback: (newValue: string) => void = () => {
      return;
    };
    const onChangeMock = jest.fn();
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest
      .fn()
      .mockImplementation(
        (_row: { data: string }, _dataIndex: string, onChange: (newValue: string) => void, _rowIndex: number) => {
          customOnChangeCallback = onChange;
          return 'customRenderEdit';
        },
      );

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              editing={true}
              onChange={onChangeMock}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(0);
    expect(customRenderEditMock).toBeCalledTimes(1);
    expect(customRenderEditMock).toBeCalledWith({ data: 'DATA' }, 'data', expect.any(Function), 0);

    expect(customOnChangeCallback).toBeDefined();

    customOnChangeCallback('NEWVALUE');

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('NEWVALUE');
  });

  it('CustomCell renders in edit mode via extra', async () => {
    const onChangeMock = jest.fn();
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest.fn().mockImplementation(() => {
      return 'customRenderEdit';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              extra={{ editedRowIndex: 0 }}
              onChange={onChangeMock}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(0);
    expect(customRenderEditMock).toBeCalledTimes(1);
    expect(customRenderEditMock).toBeCalledWith({ data: 'DATA' }, 'data', expect.any(Function), 0);
  });

  it('CustomCell renders without forced value and without row', async () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });
    const customRenderEditMock = jest.fn().mockImplementation(() => {
      return 'customRenderEdit';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'data',
                title: 'CustomCell',
                type: ColumnType.CUSTOM,
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(customRenderMock).toBeCalledTimes(0);
    expect(customRenderEditMock).toBeCalledTimes(0);
  });
});
