import React from 'react';
import { render } from '@testing-library/react';

import Form from '../Form';

describe('Form Component', () => {
  it('renders properly', () => {
    const { container } = render(
      <Form className='CLASSNAME'>
        <div>CHILD-1</div>
      </Form>,
    );

    expect(container).toMatchSnapshot();
  });
});
