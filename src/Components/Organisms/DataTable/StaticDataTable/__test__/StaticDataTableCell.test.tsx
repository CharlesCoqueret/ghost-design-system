import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { ColumnType } from '../../Common/types';
import StaticDataTableCell from '../StaticDataTableCell';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';

describe('StaticDataTableCell component', () => {
  it('StaticDataTableCell renders with amount and data test id', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              dataTestId='DATA-TEST-ID'
              row={{ amount: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with amount', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              row={{ amount: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
  it('StaticDataTableCell renders with badge', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ badge: string }>
              column={{
                dataIndex: 'badge',
                title: 'Badge',
                type: ColumnType.BADGE,
                options: [{ value: 'badge', label: 'Badge' }],
              }}
              row={{ badge: 'badge' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with button', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ number: number }>
              column={{
                title: 'Button',
                type: ColumnType.BUTTON,
                moreActionsMessage: 'More actions',
                buttons: [{ label: 'label', icon: ['fal', 'cog'] }],
              }}
              row={{ number: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with checkbox', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ checkbox: Array<IToggleEntry> }>
              column={{
                dataIndex: 'checkbox',
                title: 'Checkbox',
                type: ColumnType.CHECKBOX,
              }}
              row={{ checkbox: [{ value: 'value', label: 'label', checked: true }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with code', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ code: string }>
              column={{
                dataIndex: 'code',
                title: 'Code',
                type: ColumnType.CODE,
              }}
              row={{ code: 'code' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with custom', () => {
    const customRenderMock = jest.fn();
    const customRenderEditMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ custom: string }>
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'custom',
                title: 'Custom',
                type: ColumnType.CUSTOM,
              }}
              row={{ custom: 'custom' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with date', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ date: Date }>
              column={{
                dataIndex: 'date',
                title: 'Date',
                type: ColumnType.DATE,
              }}
              row={{ date: new Date('Fri Apr 22 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with dynamicsearch', async () => {
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value', label: 'label' });
    });
    const searchOptionsMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ dynamicsearch: string }>
              column={{
                dataIndex: 'dynamicsearch',
                noOptionsMessage: () => 'no options',
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'Dynamic search',
                type: ColumnType.DYNAMICSEARCH,
              }}
              dataTestId='DATA-TEST-ID'
              row={{ dynamicsearch: 'value' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    await waitFor(async () => {
      await screen.findByText('label');
    });

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with number', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ number: number }>
              column={{
                dataIndex: 'number',
                title: 'Number',
                type: ColumnType.NUMBER,
              }}
              row={{ number: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with percentage', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ percentage: number }>
              column={{
                dataIndex: 'percentage',
                title: 'Percentage',
                type: ColumnType.PERCENTAGE,
              }}
              row={{ percentage: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with text', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ text: string }>
              column={{
                dataIndex: 'text',
                title: 'Text',
                type: ColumnType.TEXT,
              }}
              row={{ text: 'text' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with textarea', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ textarea: string }>
              column={{
                dataIndex: 'textarea',
                title: 'Textarea',
                type: ColumnType.TEXTAREA,
              }}
              row={{ textarea: 'textarea' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('StaticDataTableCell renders with year', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <StaticDataTableCell<{ year: number }>
              column={{
                dataIndex: 'year',
                title: 'Year',
                type: ColumnType.YEAR,
              }}
              row={{ year: 2022 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
