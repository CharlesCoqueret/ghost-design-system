import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Section from '../Section';

describe('Section Component', () => {
  it('renders with separator', () => {
    const { container } = render(
      <Section collapsible={true} openInitially={true} title='TITLE' dataTestId='DATA-TEST-ID'>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Section>,
    );

    expect(container).toMatchSnapshot();

    const item = screen.getByTestId('DATA-TEST-ID');

    userEvent.click(item);

    expect(container).toMatchSnapshot();

    userEvent.click(item);

    expect(container).toMatchSnapshot();
  });

  it('renders collapsible closed by default without separator', () => {
    const { container } = render(
      <Section collapsible={true} openInitially={false} title='TITLE' dataTestId='DATA-TEST-ID'>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Section>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders not collapsible', () => {
    const { container } = render(
      <Section collapsible={false} openInitially={true} title='TITLE' dataTestId='DATA-TEST-ID'>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Section>,
    );

    expect(container).toMatchSnapshot();

    const item = screen.getByTestId('DATA-TEST-ID');

    userEvent.click(item);

    expect(container).toMatchSnapshot();
  });

  it('renders not collapsible with open initially ignored', () => {
    const { container } = render(
      <Section collapsible={false} openInitially={false} title='TITLE' dataTestId='DATA-TEST-ID'>
        <div id='CHILD1' />
        <div id='CHILD2' />
      </Section>,
    );

    expect(container).toMatchSnapshot();
  });
});
