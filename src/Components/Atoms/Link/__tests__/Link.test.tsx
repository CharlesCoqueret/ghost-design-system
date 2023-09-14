import React from 'react';
import { render } from '@testing-library/react';

import Link from '../Link';

describe('Link Component', () => {
  it('Link renders internal link', () => {
    const { container } = render(<Link to='/link'>TEXT</Link>);
    expect(container).toMatchSnapshot();
  });

  it('Link renders external link with tooltip', () => {
    const { container } = render(
      <Link to='http://www.link.com' tooltip='TOOLTIP' externalLink>
        TEXT
      </Link>,
    );
    expect(container).toMatchSnapshot();
  });
});
