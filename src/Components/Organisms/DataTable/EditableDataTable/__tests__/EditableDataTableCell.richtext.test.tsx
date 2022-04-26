import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

describe('EditableDataTableCell richtext case', () => {
  it('EditableDataTableCell renders with richtext', () => {
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

    const EditableDataTableCell = require('../EditableDataTableCell').default;
    const { ColumnType } = require('../../Common');

    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ richtext: string }>
              column={{
                dataIndex: 'richtext',
                editable: true,
                title: 'Richtext',
                type: ColumnType.RICHTEXT,
              }}
              editable
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
