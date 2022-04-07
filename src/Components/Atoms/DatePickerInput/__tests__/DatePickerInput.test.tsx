import React from 'react';
import { DatePickerInput } from '..';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePickerInput Component', () => {
  it('DatePickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    render(<DatePickerInput onChange={onChangeMock} name='NAME' placeholder='TESTPLACEHOLDER' />);

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.click(inputNode);
    userEvent.type(inputNode, '3/2/22{enter}');

    // Using dynamic date instead of static value to ensure local time is taken into consideration.
    const expectedDate = new Date('Wed Mar 02 2022');

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenLastCalledWith(expectedDate, expect.anything());
    });
  });

  it('DatePickerInput renders and changes without onChange prop', async () => {
    render(<DatePickerInput name='NAME' placeholder='TESTPLACEHOLDER' />);

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.click(inputNode);
    userEvent.type(inputNode, '3/2/22{enter}');

    await waitFor(() => {
      expect(inputNode).not.toBeNull();
    });
  });

  it('DatePickerInput renders highlighted in readonly', async () => {
    const { container } = render(<DatePickerInput name='NAME' highlighted readOnly dateFormat={''} />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders with placeholder', async () => {
    const { container } = render(<DatePickerInput name='NAME' placeholder='TESTPLACEHOLDER' />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders without Portal', async () => {
    const { container } = render(<DatePickerInput usePortal={false} name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders highlighted in disabled', async () => {
    const { container } = render(<DatePickerInput name='NAME' highlighted disabled />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders in error in readonly', async () => {
    const { container } = render(<DatePickerInput name='NAME' readOnly isInError />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerInput renders in error', async () => {
    const { container } = render(<DatePickerInput name='NAME' isInError />);
    expect(container).toMatchSnapshot();
  });
});
