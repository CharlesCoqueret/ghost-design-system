import React from 'react';
import { DatePickerInput } from '..';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePickerInput Component properly calls onChange', () => {
  it('DatePickerInput renders handles changes', async () => {
    const onChangeMock = jest.fn();

    render(<DatePickerInput onChange={onChangeMock} name='NAME' placeholder='TESTPLACEHOLDER' />);

    const inputNode = await screen.findByPlaceholderText('TESTPLACEHOLDER');

    userEvent.click(inputNode);
    userEvent.type(inputNode, '3/2/22{enter}');

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenLastCalledWith(
        new Date('Wed Mar 02 2022 00:00:00 GMT+0100 (CET)'),
        expect.anything(),
      );
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
    render(<DatePickerInput name='NAME' highlighted readOnly dateFormat={''} />);

    const inputNode = await screen.findByPlaceholderText('-');

    expect(inputNode.className).toBe('input-date-picker-input-read-only field-highlighted');
  });

  it('DatePickerInput renders highlighted in disabled', async () => {
    render(<DatePickerInput name='NAME' highlighted disabled />);

    const inputNode = await screen.findByPlaceholderText('MMM DD, YYYY');

    expect(inputNode.className).toBe('input-date-picker-input field-highlighted');
    expect(inputNode).toHaveProperty('disabled', true);
  });

  it('DatePickerInput renders in error in readonly', async () => {
    render(<DatePickerInput name='NAME' readOnly isInError />);

    const inputNode = await screen.findByPlaceholderText('-');
    expect(inputNode.className).toBe('input-date-picker-input-read-only');
  });

  it('DatePickerInput renders in error', async () => {
    render(<DatePickerInput name='NAME' isInError />);

    const inputNode = await screen.findByPlaceholderText('MMM DD, YYYY');

    expect(inputNode.className).toBe('input-date-picker-input input-error');
  });
});
