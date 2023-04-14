import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

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
