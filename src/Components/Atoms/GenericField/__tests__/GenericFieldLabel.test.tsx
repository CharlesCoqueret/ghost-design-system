import React from 'react';
import { GenericFieldLabel } from '..';
import { render } from '@testing-library/react';

describe('GenericFieldLabel Component', () => {
  it('GenericFieldLabel renders', () => {
    const { container } = render(<GenericFieldLabel />);

    const node = container.querySelector('label.field-label');
    expect(node).toBeNull();
  });

  it('GenericFieldLabel with label renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' />);

    const node = container.querySelector('label.field-label');
    expect(node?.className).toEqual('field-label');
    expect(node?.innerHTML).toEqual('LABEL TEST');
    const node2 = container.querySelector('span.field-label-mandatory');
    expect(node2).toBeNull();
  });

  it('GenericFieldLabel with label mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' mandatory />);

    const node = container.querySelector('label.field-label');
    expect(node?.className).toEqual('field-label');
    expect(node?.innerHTML).toContain('LABEL TEST');
    const node2 = container.querySelector('span.field-label-mandatory');
    expect(node2?.className).toEqual('field-label-mandatory');
    expect(node2?.innerHTML).toEqual('*');
  });

  it('GenericFieldLabel with label read only mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' mandatory readOnly />);

    const node = container.querySelector('label.field-label');
    expect(node?.className).toEqual('field-label');
    expect(node?.innerHTML).toContain('LABEL TEST');
    const node2 = container.querySelector('span.field-label-mandatory');
    expect(node2).toBeNull();
  });

  it('GenericFieldLabel with label of size 2 inline mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' size={2} mandatory />);

    const node = container.querySelector('label.field-label');
    expect(node?.className).toEqual('field-label-size-2 field-label');
    expect(node?.innerHTML).toContain('LABEL TEST');
    const node2 = container.querySelector('span.field-label-mandatory');
    expect(node2?.className).toEqual('field-label-mandatory');
    expect(node2?.innerHTML).toEqual('*');
  });
});
