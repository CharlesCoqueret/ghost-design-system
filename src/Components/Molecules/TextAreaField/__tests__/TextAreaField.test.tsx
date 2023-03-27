import React from 'react';
import { TextAreaField } from '..';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TextAreaField Component', () => {
  it('TextAreaField renders', () => {
    const { container } = render(<TextAreaField fieldSize={2} name='NAME' />);

    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders with error', () => {
    const { container } = render(<TextAreaField input='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders in readonly', () => {
    const { container } = render(<TextAreaField readOnly fieldSize={6} input='INPUT-VALUE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders in readonly highlighted', () => {
    const { container } = render(<TextAreaField readOnly highlighted name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(<TextAreaField dataTestId='DATA-TEST-ID' onChange={onChangeMock} name='NAME' />);

    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByTestId('DATA-TEST-ID');

    userEvent.type(inputNode, 'N\n'.repeat(10));
    expect(onChangeMock).toBeCalledTimes(20);
  });
});
