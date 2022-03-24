import React from 'react';
import { render } from '@testing-library/react';

import ModalFooter from '../ModalFooter';

describe('ModalFooter Component', () => {
  it('ModalFooter renders', async () => {
    const container = render(
      <ModalFooter>
        <div id='CHILD1' />
      </ModalFooter>,
    );

    expect(container).toMatchSnapshot();
  });
});
