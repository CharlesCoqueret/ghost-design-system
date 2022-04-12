import React from 'react';
import { render } from '@testing-library/react';

import Col from '../Col';

describe('Col Component', () => {
  it('Col renders', () => {
    const { container } = render(
      <Col className='CLASSNAME' height='300px' style={{ width: '30%' }}>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Col>,
    );

    expect(container).toMatchSnapshot();
  });
});
