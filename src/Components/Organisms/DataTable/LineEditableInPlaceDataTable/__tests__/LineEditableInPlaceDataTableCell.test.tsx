import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';

import { ColumnType } from '../../Common/types';
import LineEditableInPlaceDataTableCell from '../LineEditableInPlaceDataTableCell';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';
import { FileStatusEnum, IFile } from '../../../../Atoms/FileInput';

describe('LineEditableInPlaceDataTableCell component', () => {
  it('LineEditableInPlaceDataTableCell renders with amount and data test id', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ amount: number }>
              column={{
                dataIndex: 'amount',
                editable: true,
                title: 'Amount',
                type: ColumnType.AMOUNT,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with badge', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ badge: string }>
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
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with button', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ number: number }>
              column={{
                title: 'Button',
                type: ColumnType.BUTTON,
                moreActionsMessage: 'More actions',
                buttons: [{ label: 'label', icon: ['fal', 'gear'] }],
              }}
              extra={{
                editedRowIndex: 0,
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

  it('LineEditableInPlaceDataTableCell renders with checkbox', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ checkbox: Array<IToggleEntry> }>
              column={{
                dataIndex: 'checkbox',
                editable: true,
                title: 'Checkbox',
                type: ColumnType.CHECKBOX,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with code', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ code: string }>
              column={{
                dataIndex: 'code',
                title: 'Code',
                type: ColumnType.CODE,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with custom', () => {
    const handleUpdateDataChangeMock = jest.fn();
    const customRenderMock = jest
      .fn()
      .mockImplementation((props: { input: string; onChange: (value: string) => void }) => {
        return (
          <input
            type='text'
            value={props.input}
            data-testid='DATA-TEST-ID'
            onChange={(e) => props.onChange(e.target.value)}
          />
        );
      });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ custom: string }>
              column={{
                customRender: customRenderMock,
                dataIndex: 'custom',
                editable: true,
                title: 'Custom',
                type: ColumnType.CUSTOM,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with date', async () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ date: Date }>
              column={{
                dataIndex: 'date',
                editable: true,
                isClearable: true,
                title: 'Date',
                type: ColumnType.DATE,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'date', undefined);
  });

  it('LineEditableInPlaceDataTableCell renders with description', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ description: string }>
              column={{
                dataIndex: 'description',
                description: () => <>Description</>,
                title: 'Description',
                type: ColumnType.DESCRIPTION,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ description: 'description' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTableCell renders with dynamicsearch', async () => {
    const handleUpdateDataChangeMock = jest.fn();
    const resolveValueMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({ value: 'value', label: 'label' });
    });
    const searchOptionsMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ dynamicsearch: string }>
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
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with file', async () => {
    const handleUpdateDataChangeMock = jest.fn();
    const onDeleteMock = jest.fn().mockImplementation(() => {
      return Promise.resolve();
    });

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ file: Array<IFile> }>
              column={{
                dataIndex: 'file',
                editable: true,
                onDelete: onDeleteMock,
                requestMethod: 'POST',
                requestUrl: 'http://url.com',
                title: 'File',
                type: ColumnType.FILE,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{
                file: [
                  {
                    uid: '1',
                    name: 'filename.png',
                    size: 1234,
                    type: 'image/png',
                    status: FileStatusEnum.ERROR,
                    error: 'Error message',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(onDeleteMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'file', [
      {
        uid: '1',
        name: 'filename.png',
        size: 1234,
        type: 'image/png',
        status: FileStatusEnum.DELETING,
        error: 'Error message',
      },
    ]);

    // Give promise time to resolve
    await waitFor(async () => await Promise.resolve());

    expect(handleUpdateDataChangeMock).toBeCalledTimes(2);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'file', []);
  });

  it('LineEditableInPlaceDataTableCell renders with multiselect', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ multiselect: Array<string> }>
              column={{
                dataIndex: 'multiselect',
                editable: true,
                isClearable: true,
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'value1', label: 'Label 1' },
                  { value: 'value2', label: 'Label 2' },
                ],
                title: 'Multiselect',
                type: ColumnType.MULTISELECT,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{
                multiselect: ['value1'],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const select = screen.getByRole('combobox');
    userEvent.clear(select);

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'multiselect', []);
  });

  it('LineEditableInPlaceDataTableCell renders with number', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ number: number }>
              column={{
                dataIndex: 'number',
                editable: true,
                title: 'Number',
                type: ColumnType.NUMBER,
              }}
              extra={{
                editedRowIndex: 0,
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

    userEvent.tab();
    if (document.activeElement) {
      userEvent.clear(document.activeElement);
    }

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'number', undefined);
  });

  it('LineEditableInPlaceDataTableCell renders with percentage', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ percentage: number }>
              column={{
                dataIndex: 'percentage',
                editable: true,
                title: 'Percentage',
                type: ColumnType.PERCENTAGE,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with section', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ section: string }>
              column={{
                dataIndex: 'section',
                fields: [],
                label: 'Section',
                title: 'Section',
                type: ColumnType.SECTION,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ section: 'section' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTableCell renders with switch', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ switch: Array<IToggleEntry> }>
              column={{
                dataIndex: 'switch',
                editable: true,
                title: 'Switch',
                type: ColumnType.SWITCH,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ switch: [{ value: 'value', label: 'Label', checked: true }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByLabelText('Label'));

    expect(handleUpdateDataChangeMock).toBeCalledTimes(1);
    expect(handleUpdateDataChangeMock).toBeCalledWith(0, 'switch', [
      { value: 'value', label: 'Label', checked: false },
    ]);
  });

  it('LineEditableInPlaceDataTableCell renders with table', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ table: Array<{ number: number }> }>
              column={{
                columns: [
                  {
                    type: ColumnType.NUMBER,
                    title: 'Number',
                    dataIndex: 'number',
                  },
                ],
                dataIndex: 'table',
                extra: {
                  validationSchema: yup.object({
                    amount: yup.number().optional(),
                  }),
                },
                title: 'Table',
                type: ColumnType.TABLE,
              }}
              extra={{
                editedRowIndex: 0,
              }}
              handleUpdateDataChange={handleUpdateDataChangeMock}
              row={{ table: [{ number: 1 }, { number: 2 }] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('LineEditableInPlaceDataTableCell renders with text', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ text: string }>
              column={{
                dataIndex: 'text',
                editable: true,
                title: 'Text',
                type: ColumnType.TEXT,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with textarea', () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ textarea: string }>
              column={{
                dataIndex: 'textarea',
                editable: true,
                title: 'Textarea',
                type: ColumnType.TEXTAREA,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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

  it('LineEditableInPlaceDataTableCell renders with year', async () => {
    const handleUpdateDataChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <LineEditableInPlaceDataTableCell<{ year: number }>
              column={{
                dataIndex: 'year',
                editable: true,
                title: 'Year',
                type: ColumnType.YEAR,
              }}
              extra={{
                editedRowIndex: 0,
              }}
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
