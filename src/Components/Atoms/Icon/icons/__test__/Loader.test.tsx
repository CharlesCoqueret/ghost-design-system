import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../Loader';

describe('Loader component', () => {
  it('Loader renders', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <Loader className='CLASSNAME' size='2x' data-testid='DATA-TEST-ID' />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
