import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

describe('LineEditableInPlaceDataTableCell richtext case', () => {
  it('renders with richtext', () => {
    let onChangeCallback: (newValue: string) => void = () => {
      return;
    };
    jest.mock('../../../../Molecules/RichTextField', () => ({
      __esModule: true,
      RichTextField: (props: { onChange: typeof onChangeCallback }): ReactElement => {
        onChangeCallback = props.onChange;
        return <div>{JSON.stringify(props)}</div>;
      },
    }));

    const LineEditableInPlaceDataTableCell = require('../LineEditableInPlaceDataTableCell').default;
    const { ColumnType } = require('../../Common');

    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ richtext: string }>
              column={{
                dataIndex: 'richtext',
                editable: true,
                title: 'Richtext',
                type: ColumnType.RICHTEXT,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ richtext: 'richtext' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    if (onChangeCallback) {
      onChangeCallback('test');
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'richtext', 'test');
  });
});
