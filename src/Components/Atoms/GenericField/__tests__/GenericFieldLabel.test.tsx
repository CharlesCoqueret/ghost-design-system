import React from 'react';
import { GenericFieldLabel } from '..';
import { render } from '@testing-library/react';

describe('GenericFieldLabel Component', () => {
  it('GenericFieldLabel renders', () => {
    const { container } = render(<GenericFieldLabel />);
    expect(container).toMatchSnapshot();
  });

  it('GenericFieldLabel with label renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' />);
    expect(container).toMatchSnapshot();
  });

  it('GenericFieldLabel with label mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' mandatory />);
    expect(container).toMatchSnapshot();
  });

  it('GenericFieldLabel with label read only mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' mandatory readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('GenericFieldLabel with label of size 2 inline mandatory renders', () => {
    const { container } = render(<GenericFieldLabel label='LABEL TEST' size={2} mandatory />);
    expect(container).toMatchSnapshot();
  });
});
