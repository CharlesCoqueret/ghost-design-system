import React from 'react';
import { TextAreaField } from '..';
import { render, fireEvent } from '@testing-library/react';

describe('TextAreaField Component', () => {
  it('TextAreaField renders', () => {
    const { container } = render(<TextAreaField fieldSize={2} name='NAME' />);

    const node = container.querySelector('div.gds-field-group');
    expect(node).not.toBeNull();
    const parentNode = container.querySelector('div.gds-input-textarea-parent');
    expect(parentNode?.className).toEqual('gds-input-textarea-parent field-input-size-2');
    const inputNode = container.querySelector('textarea.input-textarea-field');
    expect(inputNode).toHaveProperty('name', 'NAME');
    expect(inputNode).toHaveProperty('id', 'NAME');
    expect(inputNode).toHaveProperty('type', 'textarea');
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode).toBeNull();
  });

  it('TextAreaField renders with error', () => {
    const { container } = render(<TextAreaField inputValue='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);

    const node = container.querySelector('div.gds-field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('textarea.input-textarea-field');
    expect(inputNode?.className).toEqual('input-textarea-field input-error');
    expect(inputNode).toHaveProperty('value', 'INPUT-VALUE');
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode).toBeNull();
  });

  it('TextAreaField renders in readonly', () => {
    const { container } = render(<TextAreaField readOnly fieldSize={6} inputValue='INPUT-VALUE' name='NAME' />);

    const node = container.querySelector('div.gds-field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('textarea.input-textarea-field');
    expect(inputNode).toBeNull();
    const parentNode = container.querySelector('div.gds-input-textarea-parent');
    expect(parentNode?.className).toEqual('gds-input-textarea-parent field-input-size-6');
    const readOnlyNode = container.querySelector('textarea.input-textarea-field-read-only');
    expect(readOnlyNode?.className).toEqual('input-textarea-field-read-only');
    expect(readOnlyNode?.innerHTML).toEqual('INPUT-VALUE');
  });

  it('TextAreaField renders in readonly highlighted', () => {
    const { container } = render(<TextAreaField readOnly highlighted name='NAME' />);

    const node = container.querySelector('div.gds-field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('textarea.input-textarea-field');
    expect(inputNode).toBeNull();
    const readOnlyNode = container.querySelector('textarea.input-textarea-field-read-only');
    expect(readOnlyNode?.className).toEqual('input-textarea-field-read-only field-highlighted');
  });

  it('TextAreaField renders handles changes', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<TextAreaField onChange={onChangeMock} name='NAME' />);

    const parentNode = container.querySelector('div.gds-input-textarea-parent');
    expect(parentNode).toHaveProperty('style.minHeight', '');

    const inputNode = container.querySelector('textarea.input-textarea-field');
    expect(inputNode).not.toBeNull();
    expect(inputNode).toHaveProperty('style.height', '0px');

    if (inputNode)
      fireEvent.change(inputNode, {
        target: {
          value: 'NEW INPUT\n'.repeat(10),
        },
      });
    expect(onChangeMock).toBeCalledWith('NEW INPUT\n'.repeat(10));
    expect(parentNode).not.toHaveProperty('style.minHeight', 'auto');
    expect(inputNode).not.toHaveProperty('style.height', 'auto');
  });
});
