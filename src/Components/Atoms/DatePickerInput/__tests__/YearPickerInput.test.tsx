import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { YearPickerInput } from '..';

describe('YearPickerInput Component', () => {
  it('YearPickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <YearPickerInput onChange={onChangeMock} inputValue={1984} placeholder='TESTPLACEHOLDER' />,
    );

    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.click(inputNode);
    (inputNode as HTMLInputElement).select();
    userEvent.type(inputNode, '1984{enter}');

    // Using dynamic date instead of static value to ensure local time is taken into consideration.
    const expectedDate = new Date('1984');

    expect(onChangeMock).toBeCalledTimes(3);
    expect(onChangeMock).toHaveBeenLastCalledWith(expectedDate.getFullYear());

    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders and changes without onChange prop', async () => {
    const { container } = render(<YearPickerInput placeholder='TESTPLACEHOLDER' />);

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    expect(container).toMatchSnapshot();

    userEvent.click(inputNode);
    userEvent.type(inputNode, '2022{enter}');

    expect(inputNode).not.toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders and changes with empty value', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <YearPickerInput onChange={onChangeMock} inputValue={2022} placeholder='TESTPLACEHOLDER' />,
    );

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.click(inputNode);
    (inputNode as HTMLInputElement).selectionStart = 4;
    (inputNode as HTMLInputElement).selectionEnd = 4;
    userEvent.type(inputNode, '{backspace}'.repeat(4) + '{enter}');

    expect(container).toMatchSnapshot();

    expect(onChangeMock).toBeCalledTimes(3);
    expect(onChangeMock).toHaveBeenLastCalledWith(undefined);
  });

  it('YearPickerInput renders in readOnly, highlighted without portal', () => {
    const { container } = render(<YearPickerInput readOnly highlighted usePortal={false} inputValue={2022} />);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders in Error', () => {
    const { container } = render(<YearPickerInput isInError inputValue={2022} />);
    expect(container).toMatchSnapshot();
  });
});
