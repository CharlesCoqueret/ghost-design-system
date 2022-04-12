import React from 'react';
import { render } from '@testing-library/react';

import Row from '../Row';

describe('Row Component', () => {
  it('Row renders', () => {
    const { container } = render(
      <Row className='CLASSNAME' width='300px' style={{ height: '30%' }}>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Row>,
    );

    expect(container).toMatchSnapshot();
  });
});
