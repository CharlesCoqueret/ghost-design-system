import React from 'react';
import { render } from '@testing-library/react';

import Separator from '../Separator';

describe('Separator Component', () => {
  it('renders properly', () => {
    const { container } = render(<Separator />);

    expect(container).toMatchSnapshot();
  });
});
