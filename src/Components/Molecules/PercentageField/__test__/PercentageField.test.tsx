import React from 'react';
import { render } from '@testing-library/react';

import { PercentageField } from '..';

describe('PercentageField Component', () => {
  it('PercentageField renders', () => {
    const { container } = render(<PercentageField name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values in readonly', () => {
    const { container } = render(<PercentageField inputValue={12.34} name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values in disabled highligted', () => {
    const { container } = render(<PercentageField inputValue={12345.67} name='name' disabled highlighted />);
    expect(container).toMatchSnapshot();
  });

  it('PercentageField renders with values with fieldSize and inline', () => {
    const { container } = render(<PercentageField inputValue={1.23} name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });
});
