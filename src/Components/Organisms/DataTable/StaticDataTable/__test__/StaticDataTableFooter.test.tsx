import React from 'react';
import { render } from '@testing-library/react';
import { ColumnType } from '../../Common/types';

// Mocking suneditor which is problematic with Jest
jest.mock('suneditor', () => {});
jest.mock('suneditor/src/plugins/', () => {});
jest.mock('suneditor/src/plugins/submenu/align', () => {});
jest.mock('suneditor/src/plugins/command/blockquote', () => {});
jest.mock('suneditor/src/plugins/submenu/fontColor', () => {});
jest.mock('suneditor/src/plugins/submenu/fontSize', () => {});
jest.mock('suneditor/src/plugins/submenu/formatBlock', () => {});
jest.mock('suneditor/src/plugins/submenu/hiliteColor', () => {});
jest.mock('suneditor/src/plugins/submenu/horizontalRule', () => {});
jest.mock('suneditor/src/plugins/dialog/image', () => {});
jest.mock('suneditor/src/plugins/dialog/link', () => {});
jest.mock('suneditor/src/plugins/submenu/lineHeight', () => {});
jest.mock('suneditor/src/plugins/submenu/list', () => {});
jest.mock('suneditor/src/plugins/submenu/paragraphStyle', () => {});
jest.mock('suneditor/src/plugins/submenu/table', () => {});
jest.mock('suneditor-react', () => {});
jest.mock('suneditor-react/dist', () => {});
jest.mock('suneditor-react/dist/types/lang', () => {});

import StaticDataTableFooter from '../StaticDataTableFooter';

describe('StaticDataTableFooter component', () => {
  it('StaticDataTableFooter renders with computeTotal', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
          extra={{ computeTotal: computeTotalMock }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
  });

  it('StaticDataTableFooter renders with computeTotal and custom localization', () => {
    const computeTotalMock = jest.fn();

    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
          extra={{ computeTotal: computeTotalMock, localization: { total: 'Total' } }}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
    expect(computeTotalMock).toBeCalledTimes(1);
  });

  it('StaticDataTableFooterCell renders with computeTotal', () => {
    const { container } = render(
      <table>
        <tbody></tbody>
        <StaticDataTableFooter<{ number: number }>
          columns={[
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ]}
          data={[{ number: 1 }, { number: 2 }]}
        />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
