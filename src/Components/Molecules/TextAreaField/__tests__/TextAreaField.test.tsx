import React from 'react';
import { TextAreaField } from '..';
import { render, fireEvent } from '@testing-library/react';

describe('TextAreaField Component', () => {
  it('TextAreaField renders', () => {
    const { container } = render(<TextAreaField fieldSize={2} name='NAME' />);

    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders with error', () => {
    const { container } = render(<TextAreaField inputValue='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders in readonly', () => {
    const { container } = render(<TextAreaField readOnly fieldSize={6} inputValue='INPUT-VALUE' name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders in readonly highlighted', () => {
    const { container } = render(<TextAreaField readOnly highlighted name='NAME' />);
    expect(container).toMatchSnapshot();
  });

  it('TextAreaField renders handles changes', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<TextAreaField onChange={onChangeMock} name='NAME' />);

    expect(container).toMatchSnapshot();

    const inputNode = container.querySelector('textarea.input-textarea-field');
    if (inputNode)
      fireEvent.change(inputNode, {
        target: {
          value: 'NEW INPUT\n'.repeat(10),
        },
      });
    expect(onChangeMock).toBeCalledWith('NEW INPUT\n'.repeat(10));
    expect(container).toMatchSnapshot();
  });
});
