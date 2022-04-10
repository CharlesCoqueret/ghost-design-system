import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataTableCellSelectable from '../DataTableCellSelectable';

describe('DataTableCellSelectable component', () => {
  it('DataTableCellSelectable renders not selected', async () => {
    const handleSelectClickMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DataTableCellSelectable handleSelectClick={handleSelectClickMock} selected={false} selectable />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DataTableCellSelectable renders not selectable', async () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DataTableCellSelectable selected={false} selectable={false} />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('DataTableCellSelectable renders selected and handles click', async () => {
    const handleSelectClickMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DataTableCellSelectable
              dataTestId={'DATA-TEST-ID'}
              handleSelectClick={handleSelectClickMock}
              selected
              selectable
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const checkbox = await screen.findByTestId('DATA-TEST-ID');

    act(() => {
      userEvent.click(checkbox);
    });

    expect(handleSelectClickMock).toBeCalledTimes(1);
    expect(handleSelectClickMock).toBeCalledWith(expect.anything(), false);
  });

  it('DataTableCellSelectable renders without click handler', async () => {
    console.error = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <DataTableCellSelectable dataTestId={'DATA-TEST-ID'} selected selectable />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const checkbox = await screen.findByTestId('DATA-TEST-ID');

    act(() => {
      userEvent.click(checkbox);
    });

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Missing handleSelectClick');
  });
});
