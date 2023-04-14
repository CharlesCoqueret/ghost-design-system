import React from 'react';
import { render } from '@testing-library/react';

import SectionCell from '../SectionCell';
import { ColumnType } from '../../types';

describe('SectionCell component', () => {
  it('SectionCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SectionCell
              column={{
                dataIndex: 'section',
                fields: [],
                label: 'Section',
                title: 'SectionCell',
                type: ColumnType.SECTION,
              }}
              row={{ section: undefined }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SectionCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <SectionCell
              column={{
                dataIndex: 'section',
                fields: [],
                hidden: true,
                label: 'Section',
                title: 'SectionCell',
                type: ColumnType.SECTION,
              }}
              row={{ section: undefined }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
