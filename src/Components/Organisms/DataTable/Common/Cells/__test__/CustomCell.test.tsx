import React from 'react';
import { render } from '@testing-library/react';

import CustomCell from '../CustomCell';
import { ColumnType } from '../../types';

describe('CustomCell component', () => {
  it('CustomCell renders', () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
    expect(customRenderMock).toBeCalledWith({ onChange: undefined, readOnly: true, inputValue: 'DATA' });
  });

  it('CustomCell renders with forced value', () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
  });

  it('CustomCell renders when hidden', () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
    expect(customRenderMock).toBeCalledWith({ inputValue: 'DATA', onChange: undefined, readOnly: true });
  });

  it('CustomCell renders in edit mode and handles change', () => {
    let customOnChangeCallback: (newValue: string) => void = () => {
      return;
    };
    const onChangeMock = jest.fn();
    const customRenderMock = jest.fn().mockImplementation((props: { onChange: (newValue: string) => void }) => {
      customOnChangeCallback = props.onChange;
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
    expect(customRenderMock).toBeCalledTimes(1);
    expect(customRenderMock).toBeCalledWith({ onChange: expect.any(Function), readOnly: false, inputValue: 'DATA' });

    expect(customOnChangeCallback).toBeDefined();

    customOnChangeCallback('NEWVALUE');

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('NEWVALUE');
  });

  it('CustomCell renders in edit mode via extra', () => {
    const onChangeMock = jest.fn();
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
    expect(customRenderMock).toBeCalledTimes(1);
    expect(customRenderMock).toBeCalledWith({ onChange: expect.any(Function), readOnly: false, inputValue: 'DATA' });
  });

  it('CustomCell renders without forced value and without row', () => {
    const customRenderMock = jest.fn().mockImplementation(() => {
      return 'customRender';
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CustomCell
              column={{
                customRender: customRenderMock,
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
    expect(customRenderMock).toBeCalledTimes(1);
    expect(customRenderMock).toBeCalledWith({ onChange: undefined, readOnly: true, inputValue: undefined });
  });
});
