import React from 'react';
import { render } from '@testing-library/react';

import ModalBody from '../ModalBody';

describe('ModalBody Component', () => {
  it('ModalBody renders', () => {
    const { container } = render(
      <ModalBody>
        <div id='CHILD1' />
      </ModalBody>,
    );

    expect(container).toMatchSnapshot();
  });
});
