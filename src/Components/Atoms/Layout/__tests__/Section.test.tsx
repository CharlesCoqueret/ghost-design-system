import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Section from '../Section';

describe('Section Component', () => {
  it('Section renders', async () => {
    const container = render(
      <Section collapsable={true} openInitially={true} title='TITLE' dataTestId='DATA-TEST-ID'>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Section>,
    );

    expect(container).toMatchSnapshot();

    const item = container.getByTestId('DATA-TEST-ID');

    userEvent.click(item);

    expect(container).toMatchSnapshot();

    userEvent.click(item);

    expect(container).toMatchSnapshot();
  });
});
