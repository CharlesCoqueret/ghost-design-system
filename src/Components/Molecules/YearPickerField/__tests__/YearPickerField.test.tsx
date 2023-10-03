import React from 'react';
import { render } from '@testing-library/react';

import { YearPickerField } from '..';

describe('YearPickerField Component', () => {
  it('YearPickerField renders', () => {
    const { container } = render(<YearPickerField name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerField renders with values in readonly', () => {
    const { container } = render(<YearPickerField input={12.34} name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerField renders with values in disabled highligted', () => {
    const { container } = render(<YearPickerField input={12345.57} name='name' disabled highlighted />);
    expect(container).toMatchSnapshot();
  });

  it('YearPickerField renders with values with fieldSize and inline', () => {
    const { container } = render(<YearPickerField input={1.23} name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });
});
