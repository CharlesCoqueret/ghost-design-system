import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePickerInput from '../DatePickerInput';

describe('DatePickerInput Component', () => {
  it('DatePickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(<DatePickerInput isClearable onChange={onChangeMock} placeholder='TESTPLACEHOLDER' />);

    expect(container).toMatchSnapshot();

    const inputNode = screen.getByPlaceholderText('TESTPLACEHOLDER');

    await userEvent.type(inputNode, '3/2/22{enter}');

    expect(container).toMatchSnapshot();

    // Using dynamic date instead of static value to ensure local time is taken into consideration.
    const expectedDate = new Date('Wed Mar 02 2022');
    expect(onChangeMock).toHaveBeenLastCalledWith(expectedDate);
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
