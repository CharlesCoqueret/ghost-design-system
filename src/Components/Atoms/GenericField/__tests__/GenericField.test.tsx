import React from 'react';
import { GenericField } from '..';
import { render } from '@testing-library/react';

describe('GenericField Component', () => {
  it('GenericField renders', () => {
    const { container } = render(<GenericField />);

    const node = container.querySelector('div.field-group');
    expect(node?.className).toEqual('field-group');
    expect(node?.innerHTML).toBeFalsy();
    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).toBeNull();
  });

  it('GenericField renders with children', () => {
    const { container } = render(
      <GenericField>
        <div className='CHILD-TEST' />
      </GenericField>,
    );

    const node = container.querySelector('div.field-group');
    expect(node?.className).toEqual('field-group');
    const children = container.querySelector('div.CHILD-TEST');
    expect(children?.className).toEqual('CHILD-TEST');
    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).toBeNull();
  });

  it('GenericField renders inline with error message, not displaying the error', () => {
    const { container } = render(<GenericField inline errorMessage='ERROR-MESSAGE' maxLength={10} />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode).toBeNull();
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
  });

  it('GenericField renders with error message', () => {
    const { container } = render(<GenericField errorMessage='ERROR-MESSAGE' />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).not.toBeNull();
    const node = container.querySelector('div.field-error-message');
    expect(node?.className).toEqual('field-error-message');
    expect(node?.innerHTML).toEqual('ERROR-MESSAGE');
  });

  it('GenericField renders with error message in read only, not displaying the error', () => {
    const { container } = render(<GenericField readOnly errorMessage='ERROR-MESSAGE' maxLength={10} />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).not.toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode?.innerHTML).toBe('');
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
  });

  it('GenericField renders with error message in read only, not displaying the error, only displaying the helper text', () => {
    const { container } = render(
      <GenericField readOnly helperText='HELPER-TEXT' errorMessage='ERROR-MESSAGE' maxLength={10} />,
    );

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).not.toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode).not.toBeNull();
    expect(helperNode?.innerHTML).toEqual('HELPER-TEXT');
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
  });

  it('GenericField renders with error message and helper text, displaying only error', () => {
    const { container } = render(<GenericField helperText='HELPER-TEXT' errorMessage='ERROR-MESSAGE' maxLength={10} />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).not.toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode?.className).toEqual('field-error-message');
    expect(errorNode?.innerHTML).toEqual('ERROR-MESSAGE');
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode).toBeNull();
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
  });

  it('GenericField renders with helper text and counter', () => {
    const { container } = render(<GenericField helperText='HELPER-TEXT' inputLength={5} maxLength={10} />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).not.toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode?.innerHTML).toEqual('HELPER-TEXT');
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode?.innerHTML).toEqual('5 / 10');
  });

  it('GenericField renders with highlight in readonly', () => {
    const { container } = render(<GenericField readOnly highlighted />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode).toBeNull();
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
    const node = container.querySelector('div.field-group');
    expect(node?.className).toEqual('field-group');
  });

  it('GenericField renders with highlight not in readonly', () => {
    const { container } = render(<GenericField highlighted />);

    const messageNode = container.querySelector('div.field-message');
    expect(messageNode).toBeNull();
    const errorNode = container.querySelector('div.field-error-message');
    expect(errorNode).toBeNull();
    const helperNode = container.querySelector('div.field-helper-text');
    expect(helperNode).toBeNull();
    const counterNode = container.querySelector('div.field-counter');
    expect(counterNode).toBeNull();
    const node = container.querySelector('div.field-group');
    expect(node?.className).toEqual('field-group');
  });
});
