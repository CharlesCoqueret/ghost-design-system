import React from 'react';
import { TextField } from '..';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TextField Component', () => {
  it('TextField renders', () => {
    const { container } = render(<TextField fieldSize={2} name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextField renders with error', () => {
    const { container } = render(<TextField inputValue='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextField renders in readonly', () => {
    const { container } = render(<TextField readOnly fieldSize={6} inputValue='INPUT-VALUE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextField renders in readonly highlighted', () => {
    const { container } = render(<TextField readOnly highlighted name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextField renders handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <TextField dataTestId='DATA-TEST-ID' inputValue='' onChange={onChangeMock} name='NAME' />,
    );
    expect(container).toMatchSnapshot();

    const inputNode = await screen.findByTestId('DATA-TEST-ID');
    userEvent.type(inputNode, 'N');

    expect(onChangeMock).toBeCalledWith('N');
  });
});
