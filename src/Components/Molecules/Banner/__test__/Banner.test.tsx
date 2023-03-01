import React from 'react';
import { render } from '@testing-library/react';

import Banner from '../Banner';

describe('Banner Component', () => {
  it('renders with children', () => {
    const { container } = render(
      <Banner>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Banner>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders nothing without children', () => {
    const { container } = render(<Banner />);

    expect(container).toMatchSnapshot();
  });
});
