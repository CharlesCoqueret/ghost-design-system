import React from 'react';
import { render } from '@testing-library/react';

import { RichTextField } from '..';

describe('RichTextField Component', () => {
  it('RichTextField renders', () => {
    const { container } = render(<RichTextField input='rich text' name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values in readonly', () => {
    const { container } = render(<RichTextField input='rich text' name='name' readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values in disabled highligted', () => {
    const { container } = render(<RichTextField input='rich text' name='name' disabled />);
    expect(container).toMatchSnapshot();
  });

  it('RichTextField renders with values with fieldSize and inline', () => {
    const { container } = render(<RichTextField input='rich text' name='name' inline fieldSize={6} />);
    expect(container).toMatchSnapshot();
  });
});
