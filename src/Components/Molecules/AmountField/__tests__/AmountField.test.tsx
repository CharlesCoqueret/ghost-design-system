import React from 'react';
import { render } from '@testing-library/react';

import { AmountField } from '..';

describe('AmountField Component', () => {
  it('AmountField renders', () => {
    const { container } = render(<AmountField name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('AmountField renders with values in readonly', () => {
    const { container } = render(<AmountField input={12.34} name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('AmountField renders with values in disabled highligted', () => {
    const { container } = render(<AmountField input={12345.57} name='name' disabled highlighted />);
    expect(container).toMatchSnapshot();
  });

  it('AmountField renders with values with fieldSize and inline', () => {
    const { container } = render(<AmountField input={1.23} name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });
});
