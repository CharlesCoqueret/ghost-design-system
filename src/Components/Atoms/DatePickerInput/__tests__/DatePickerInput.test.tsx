import React from 'react';
import { DatePickerInput } from '..';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePickerInput Component', () => {
  it('DatePickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    render(<DatePickerInput onChange={onChangeMock} placeholder='TESTPLACEHOLDER' />);

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.type(inputNode, '3/2/22{enter}');

    // Using dynamic date instead of static value to ensure local time is taken into consideration.
    const expectedDate = new Date('Wed Mar 02 2022');

    expect(onChangeMock).toHaveBeenLastCalledWith(expectedDate);
  });

  it('DatePickerInput renders and changes without onChange prop', async () => {
    const { container } = render(<DatePickerInput placeholder='TESTPLACEHOLDER' />);
    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');
    userEvent.type(inputNode, '3/2/22{enter}');

    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders highlighted in readonly', () => {
    const { container } = render(<DatePickerInput highlighted readOnly dateFormat={''} />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders with placeholder', () => {
    const { container } = render(<DatePickerInput placeholder='TESTPLACEHOLDER' />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders without Portal', () => {
    const { container } = render(<DatePickerInput usePortal={false} />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders highlighted in disabled', () => {
    const { container } = render(<DatePickerInput highlighted disabled />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders in error in readonly', () => {
    const { container } = render(<DatePickerInput readOnly isInError />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders in error', () => {
    const { container } = render(<DatePickerInput isInError />);
    expect(container).toMatchSnapshot();
  });
});
