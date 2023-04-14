import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

describe('RichTextCell component', () => {
  it('RichTextCell renders', () => {
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: unknown): ReactElement => {
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

  it('RichTextCell renders row editing with no row input', () => {
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: unknown): ReactElement => {
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                editable: true,
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

  it('RichTextCell renders cell editing with no row input', () => {
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: unknown): ReactElement => {
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

  it('RichTextCell renders hidden', () => {
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: unknown): ReactElement => {
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

  it('RichTextCell renders with forced value', () => {
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: unknown): ReactElement => {
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

  it('RichTextCell handles changes', () => {
    jest.resetModules();
    let onChangeCallback: (newValue: string) => void = () => {
      return;
    };
    jest.mock('../../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: { onChange: typeof onChangeCallback }): ReactElement => {
        onChangeCallback = props.onChange;
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const RichTextCell = require('../RichTextCell').default;
    const { ColumnType } = require('../../../Common');

    const onChangeMock = jest.fn().mockImplementation(() => {
      return;
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <RichTextCell
              column={{
                dataIndex: 'data',
                title: 'RichTextCell',
                type: ColumnType.RICHTEXT,
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

    if (onChangeCallback) {
      onChangeCallback('new text');
    }

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('new text');
  });
});
