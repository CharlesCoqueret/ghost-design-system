import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../Loader';

describe('Loader component', () => {
  it('Loader renders', () => {
    const { container } = render(<Loader className='CLASSNAME' size='2x' data-testid='DATA-TEST-ID' />);

    expect(container).toMatchSnapshot();
  });
});
