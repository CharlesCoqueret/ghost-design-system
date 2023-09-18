import React from 'react';
import { render } from '@testing-library/react';

import Portal from '../Portal';

afterEach(() => {
  jest.useRealTimers();
});

describe('Portal Component', () => {
  it('Portal renders', () => {
    const container = render(
      <Portal rootId='root-id'>
        <div />
      </Portal>,
    );

    expect(container.container).toMatchSnapshot();

    container.rerender(<Portal rootId='root-id' />);

    expect(container.container).toMatchSnapshot();

    container.unmount();

    expect(container.container).toMatchSnapshot();
  });

  it('Portal renders without rootId', () => {
    const container = render(
      <Portal>
        <div />
      </Portal>,
    );

    expect(container.container).toMatchSnapshot();

    container.rerender(<Portal />);

    expect(container.container).toMatchSnapshot();

    container.unmount();

    expect(container.container).toMatchSnapshot();
  });
});
