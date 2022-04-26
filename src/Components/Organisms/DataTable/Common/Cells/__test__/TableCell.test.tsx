import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

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

import TableCell from '../TableCell';
import { ColumnType } from '../../types';

describe('TableCell component', () => {
  it('TableCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell<{ table: Array<{ number: number }> }>
              column={{
                columns: [{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }],
                dataIndex: 'table',
                extra: {
                  validationSchema: yup.object({
                    amount: yup.number().optional(),
                  }),
                },
                title: 'TableCell',
                type: ColumnType.TABLE,
              }}
              row={{ table: [{ number: 1 }, { number: 2 }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('TableCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell<{ table: Array<{ number: number }> }>
              column={{
                columns: [{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }],
                dataIndex: 'table',
                ellipsis: true,
                extra: {
                  validationSchema: yup.object({
                    amount: yup.number().optional(),
                  }),
                },
                title: 'TableCell',
                type: ColumnType.TABLE,
              }}
              forcedValue={[{ number: 3 }]}
              row={{ table: [{ number: 1 }, { number: 2 }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('TableCell renders when hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell<{ table: Array<{ number: number }> }>
              column={{
                columns: [{ dataIndex: 'number', title: 'Number', type: ColumnType.NUMBER }],
                dataIndex: 'table',
                extra: {
                  validationSchema: yup.object({
                    amount: yup.number().optional(),
                  }),
                },
                hidden: true,
                title: 'TableCell',
                type: ColumnType.TABLE,
              }}
              row={{ table: [{ number: 1 }, { number: 2 }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
