import React from 'react';
import { render } from '@testing-library/react';

import Pulsar from '../Pulsar';

afterEach(() => {
  jest.useRealTimers();
});

describe('Pulsar Component', () => {
  it('Pulsar renders', () => {
    const { container } = render(<Pulsar />);

    expect(container).toMatchSnapshot();
  });
});
