import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

describe('StaticDataTableCell richtext case', () => {
  it('StaticDataTableCell renders with richtext', () => {
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

    const StaticDataTableCell = require('../StaticDataTableCell').default;
    const { ColumnType } = require('../../Common');

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ richtext: string }>
              column={{
                dataIndex: 'richtext',
                title: 'Richtext',
                type: ColumnType.RICHTEXT,
              }}
              row={{ richtext: 'richtext' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
