import React from 'react';
import { render } from '@testing-library/react';

import Link from '../Link';

describe('Link Component', () => {
  it('Link renders internal link', () => {
    const { container } = render(<Link text='TEXT' to='/link' />);
    expect(container).toMatchSnapshot();
  });

  it('Link renders external link with tooltip', () => {
    const { container } = render(<Link text='TEXT' to='http://www.link.com' tooltip='TOOLTIP' externalLink />);
    expect(container).toMatchSnapshot();
  });
});
