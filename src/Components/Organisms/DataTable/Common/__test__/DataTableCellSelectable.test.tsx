import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataTableCellSelectable from '../DataTableCellSelectable';

describe('DataTableCellSelectable component', () => {
  it('DataTableCellSelectable renders not selected', () => {
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

  it('DataTableCellSelectable renders not selectable', () => {
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

    const { container, rerender } = render(
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

    userEvent.click(checkbox);

    expect(handleSelectClickMock).toBeCalledTimes(1);
    expect(handleSelectClickMock).toBeCalledWith(expect.anything(), false);

    rerender(
      <table>
        <tbody>
          <tr>
            <DataTableCellSelectable dataTestId={'DATA-TEST-ID'} handleSelectClick={handleSelectClickMock} selectable />
          </tr>
        </tbody>
      </table>,
    );

    userEvent.keyboard('{Enter}');

    expect(handleSelectClickMock).toBeCalledTimes(2);
    expect(handleSelectClickMock).toBeCalledWith(expect.anything(), true);

    userEvent.keyboard('a');
    expect(handleSelectClickMock).toBeCalledTimes(2);
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

    userEvent.click(checkbox);

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('Missing handleSelectClick');
  });
});
