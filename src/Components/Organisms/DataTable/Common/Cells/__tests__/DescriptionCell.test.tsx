import React from 'react';
import { render } from '@testing-library/react';

import DescriptionCell from '../DescriptionCell';
import { ColumnType } from '../../types';

describe('DescriptionCell component', () => {
  it('DescriptionCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DescriptionCell
              column={{
                dataIndex: 'description',
                description: () => <>DESCRIPTION</>,
                title: 'DescriptionCell',
                type: ColumnType.DESCRIPTION,
              }}
              row={{ description: undefined }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DescriptionCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DescriptionCell
              column={{
                dataIndex: 'description',
                description: <>DESCRIPTION</>,
                hidden: true,
                title: 'DescriptionCell',
                type: ColumnType.DESCRIPTION,
              }}
              row={{ description: undefined }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
