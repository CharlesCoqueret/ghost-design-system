import React from 'react';
import { render } from '@testing-library/react';

import CodeCell from '../CodeCell';
import { ColumnType } from '../../types';

describe('CodeCell component', () => {
  it('CodeCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CodeCell
              column={{
                dataIndex: 'data',
                title: 'CodeCell',
                type: ColumnType.CODE,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('CodeCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CodeCell
              column={{
                dataIndex: 'data',
                ellipsis: true,
                title: 'CodeCell',
                type: ColumnType.CODE,
              }}
              forcedValue='FORCEDVALUE'
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('CodeCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <CodeCell
              column={{
                dataIndex: 'data',
                hidden: true,
                title: 'CodeCell',
                type: ColumnType.CODE,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
