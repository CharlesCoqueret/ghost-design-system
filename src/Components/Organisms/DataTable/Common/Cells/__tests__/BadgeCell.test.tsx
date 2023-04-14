import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BadgeCell from '../BadgeCell';
import { ColumnType } from '../../types';

describe('BadgeCell component', () => {
  it('BadgeCell renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <BadgeCell
              column={{
                dataIndex: 'data',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
              }}
              row={{ data: 'option1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('BadgeCell renders row editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <BadgeCell
              column={{
                dataIndex: 'data',
                editable: true,
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
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

  it('BadgeCell renders cell editing with no row input', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <BadgeCell
              column={{
                dataIndex: 'data',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
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

  it('BadgeCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <BadgeCell
              column={{
                dataIndex: 'data',
                hidden: true,
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
              }}
              row={{ data: 'option1' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('BadgeCell renders with forced value', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <BadgeCell
              column={{
                dataIndex: 'data',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
              }}
              forcedValue={'option2'}
              row={{ data: 'option1' }}
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
            <BadgeCell
              column={{
                dataIndex: 'data',
                eraseValueWhenNotInOptions: true,
                options: () => {
                  return [
                    { value: 'option1', label: 'label 1' },
                    { value: 'option2', label: 'label 2' },
                  ];
                },
                title: 'badgecell',
                type: ColumnType.BADGE,
              }}
              onChange={onChangeMock}
              row={{ data: 'option3' }}
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
            <BadgeCell
              column={{
                dataIndex: 'data',
                options: [
                  { value: 'option1', label: 'label 1' },
                  { value: 'option2', label: 'label 2' },
                ],
                title: 'badgecell',
                type: ColumnType.BADGE,
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
    expect(onChangeMock).toBeCalledWith('option2');
  });
});
