import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { YearPickerInput } from '..';

describe('YearPickerInput Component', () => {
  it('YearPickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <YearPickerInput onChange={onChangeMock} input={1984} placeholder='TESTPLACEHOLDER' />,
    );

    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByDisplayValue('1984');

    await userEvent.clear(inputNode);
    await userEvent.type(inputNode, '1984{enter}');

    // Using dynamic date instead of static value to ensure local time is taken into consideration.
    const expectedDate = new Date('1984');

    expect(onChangeMock).toBeCalledTimes(4);
    expect(onChangeMock).toHaveBeenLastCalledWith(expectedDate.getFullYear());

    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders and changes with empty value', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <YearPickerInput onChange={onChangeMock} input={2022} placeholder='TESTPLACEHOLDER' />,
    );

    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByDisplayValue('2022');

    await userEvent.clear(inputNode);

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toHaveBeenLastCalledWith(undefined);
    expect(container).toMatchSnapshot();

    await userEvent.type(inputNode, '2022{enter}');
    expect(onChangeMock).toBeCalledTimes(4);
    expect(onChangeMock).toHaveBeenLastCalledWith(2022);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders in readOnly, highlighted without portal', () => {
    const { container } = render(<YearPickerInput readOnly highlighted usePortal={false} input={2022} />);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerInput renders in Error', () => {
    const { container } = render(<YearPickerInput isInError input={2022} />);
    expect(container).toMatchSnapshot();
  });
});
