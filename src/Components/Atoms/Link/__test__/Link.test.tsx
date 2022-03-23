import React from 'react';
import { render } from '@testing-library/react';

import Link from '../Link';

describe('Link Component', () => {
  it('Link renders internal link', async () => {
    const container = render(<Link text='TEXT' link='/link' />);
    expect(container).toMatchSnapshot();
  });

  it('Link renders external link with tooltip', async () => {
    const container = render(<Link text='TEXT' link='http://www.link.com' tooltip='TOOLTIP' />);
    expect(container).toMatchSnapshot();
  });
});
