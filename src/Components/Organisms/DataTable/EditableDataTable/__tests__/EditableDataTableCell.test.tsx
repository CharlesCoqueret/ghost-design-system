import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ColumnType } from '../../Common/types';
import EditableDataTableCell from '../EditableDataTableCell';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';

describe('EditableDataTableCell component', () => {
  it('EditableDataTableCell renders with amount and data test id', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                editable: true,
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ amount: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.type(document.activeElement, '2');
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'amount', 12);
  });

  it('EditableDataTableCell renders with badge', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ badge: string }>
              column={{
                dataIndex: 'badge',
                editable: true,
                isClearable: true,
                title: 'Badge',
                type: ColumnType.BADGE,
                options: [
                  { value: 'badge', label: 'Badge' },
                  { value: 'NEWVALUE', label: 'New value' },
                ],
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ badge: 'badge' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const input = screen.getByRole('combobox');
    userEvent.clear(input);

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'badge', undefined);

    userEvent.type(input, 'New value{Enter}');

    expect(handleUpdateDataChangeMock).toBeCalledTimes(2);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'badge', 'NEWVALUE');
  });

  it('EditableDataTableCell renders with button', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ number: number }>
              column={{
                title: 'Button',
                type: ColumnType.BUTTON,
                moreActionsMessage: 'More actions',
                buttons: [{ label: 'label', icon: ['fal', 'cog'] }],
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ number: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTableCell renders with checkbox', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ checkbox: Array<IToggleEntry> }>
              column={{
                dataIndex: 'checkbox',
                editable: true,
                title: 'Checkbox',
                type: ColumnType.CHECKBOX,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ checkbox: [{ value: 'value', label: 'Label', checked: true }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByLabelText('Label'));

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'checkbox', [
      { value: 'value', label: 'Label', checked: false },
    ]);
  });

  it('EditableDataTableCell renders with code', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ code: string }>
              column={{
                dataIndex: 'code',
                title: 'Code',
                type: ColumnType.CODE,
              }}
              editable={true}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ code: 'code' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('EditableDataTableCell renders with custom', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const customRenderMock = jest.fn();
    const customRenderEditMock = jest
      .fn()
      .mockImplementation(
        (row: { custom: string }, _dataIndex: string, onChange: (value: string) => void, _rowIndex: number) => {
          return (
            <input
              type='text'
              value={row.custom}
              data-testid='DATA-TEST-ID'
              onChange={(e) => onChange(e.target.value)}
            />
          );
        },
      );

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ custom: string }>
              column={{
                customRender: customRenderMock,
                customRenderEdit: customRenderEditMock,
                dataIndex: 'custom',
                editable: true,
                title: 'Custom',
                type: ColumnType.CUSTOM,
              }}
              editable={true}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ custom: 'custom' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'custom', '');
  });

  it('EditableDataTableCell renders with date', async () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ date: Date }>
              column={{
                dataIndex: 'date',
                editable: true,
                isClearable: true,
                title: 'Date',
                type: ColumnType.DATE,
              }}
              editable={true}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ date: new Date('Fri Apr 22 2022') }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    // Give time to the datePicker to handle its popup
    await waitFor(async () => {
      await Promise.resolve();
    });

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'date', null);
  });

  it('EditableDataTableCell renders with dynamicsearch', async () => {
    const handleUpdateDataChangeMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value', label: 'label' });
    });
    const searchOptionsMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ dynamicsearch: string }>
              column={{
                dataIndex: 'dynamicsearch',
                editable: true,
                isClearable: true,
                noOptionsMessage: () => 'no options',
                resolveValue: resolveValueMock,
                searchOptions: searchOptionsMock,
                title: 'Dynamic search',
                type: ColumnType.DYNAMICSEARCH,
              }}
              dataTestId='DATA-TEST-ID'
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
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

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    // Give time to the datePicker to handle its popup
    await waitFor(async () => {
      await Promise.resolve();
    });

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'dynamicsearch', undefined);
  });

  it('EditableDataTableCell renders with number', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ number: number }>
              column={{
                dataIndex: 'number',
                editable: true,
                title: 'Number',
                type: ColumnType.NUMBER,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ number: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'number', undefined);
  });

  it('EditableDataTableCell renders with percentage', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ percentage: number }>
              column={{
                dataIndex: 'percentage',
                editable: true,
                title: 'Percentage',
                type: ColumnType.PERCENTAGE,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ percentage: 1 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'percentage', undefined);
  });

  it('EditableDataTableCell renders with text', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ text: string }>
              column={{
                dataIndex: 'text',
                editable: true,
                title: 'Text',
                type: ColumnType.TEXT,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ text: 'text' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'text', '');
  });

  it('EditableDataTableCell renders with text', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ textarea: string }>
              column={{
                dataIndex: 'textarea',
                editable: true,
                title: 'Textarea',
                type: ColumnType.TEXTAREA,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ textarea: 'textarea' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'textarea', '');
  });

  it('EditableDataTableCell renders with year', async () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <EditableDataTableCell<{ year: number }>
              column={{
                dataIndex: 'year',
                editable: true,
                title: 'Year',
                type: ColumnType.YEAR,
              }}
              editable
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ year: 2022 }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    // Give time to the yearPicker to handle its popup
    await waitFor(async () => {
      await Promise.resolve();
    });

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'year', undefined);
  });
});
