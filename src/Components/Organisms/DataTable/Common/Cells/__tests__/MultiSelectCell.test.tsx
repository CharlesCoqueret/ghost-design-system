import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelectCell from '../MultiSelectCell';
import { ColumnType } from '../../types';

describe('MultiSelectCell component', () => {
  it('MultiSelectCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              row={{ data: ['option1'] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                editable: true,
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: () => [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              extra={{ editedRowIndex: 6 }}
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              editing
              rowIndex={6}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                hidden: true,
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              row={{ data: ['option1'] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              forcedValue={['option2']}
              row={{ data: ['option1'] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('BadgeCell renders with erase value when not in options', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                eraseValueWhenNotInOptions: true,
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              onChange={onChangeMock}
              row={{ data: ['option3'] }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('BadgeCell handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <MultiSelectCell
              column={{
                dataIndex: 'data',
                numberOfItemLabel: 'numberOfItemLabel',
                numberOfItemsLabel: 'numberOfItemsLabel',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'multiselectcell',
                type: ColumnType.MULTISELECT,
              }}
              editing
              onChange={onChangeMock}
              row={{ data: 'option1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    const badge = await screen.findByRole('combobox');
    userEvent.type(badge, 'label 2{enter}');

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(['option1', 'option2']);
  });
});
