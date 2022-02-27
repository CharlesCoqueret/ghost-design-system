import React from 'react';
import { TextField } from '..';
import { render, fireEvent } from '@testing-library/react';

describe('TextField Component', () => {
  it('TextField renders', () => {
    const { container } = render(<TextField fieldSize={2} name='NAME' />);

    const node = container.querySelector('div.field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('input.field');
    expect(inputNode?.className).toEqual('field input-text-field field-input-size-2');
    expect(inputNode).toHaveProperty('name', 'NAME');
    expect(inputNode).toHaveProperty('id', 'NAME');
    expect(inputNode).toHaveProperty('type', 'text');
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode).toBeNull();
  });

  it('TextField renders with error', () => {
    const { container } = render(<TextField inputValue='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);

    const node = container.querySelector('div.field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('input.field');
    expect(inputNode?.className).toEqual('field input-text-field input-error');
    expect(inputNode).toHaveProperty('value', 'INPUT-VALUE');
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode).toBeNull();
  });

  it('TextField renders in readonly', () => {
    const { container } = render(<TextField readOnly fieldSize={6} inputValue='INPUT-VALUE' name='NAME' />);

    const node = container.querySelector('div.field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('input.field');
    expect(inputNode).toBeNull();
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode?.className).toEqual('field input-text-field-read-only field-input-size-6');
    expect(readOnlyNode?.innerHTML).toEqual('INPUT-VALUE');
  });

  it('TextField renders in readonly highlighted', () => {
    const { container } = render(<TextField readOnly highlighted name='NAME' />);

    const node = container.querySelector('div.field-group');
    expect(node).not.toBeNull();
    const inputNode = container.querySelector('input.field');
    expect(inputNode).toBeNull();
    const readOnlyNode = container.querySelector('div.field');
    expect(readOnlyNode?.className).toEqual('field input-text-field-read-only field-highlighted');
  });

  it('TextField renders handles changes', () => {
    const onChangeMock = jest.fn();

    const { container } = render(<TextField onChange={onChangeMock} name='NAME' />);

    const inputNode = container.querySelector('input.field');
    expect(inputNode).not.toBeNull();
    if (inputNode) fireEvent.change(inputNode, { target: { value: 'NEW INPUT' } });
    expect(onChangeMock).toBeCalledWith('NEW INPUT');
  });
});
