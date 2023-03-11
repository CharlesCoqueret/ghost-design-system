import React from 'react';
import { render } from '@testing-library/react';

import Row from '../Row';

describe('Row Component', () => {
  it('renders properly', () => {
    const { container } = render(
      <Row className='CLASSNAME' style={{ height: '30%' }}>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Row>,
    );

    expect(container).toMatchSnapshot();
  });
});
