import React from 'react';
import { render } from '@testing-library/react';

import Alert, { AlertType } from '../Alert';

describe('Alert Component', () => {
  it('renders as information with children', () => {
    const { container } = render(
      <Alert>
        <div id='CHILD' />
      </Alert>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders as warning with children ', () => {
    const { container } = render(
      <Alert type={AlertType.WARNING}>
        <div id='CHILD' />
      </Alert>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders as error with children ', () => {
    const { container } = render(
      <Alert type={AlertType.ERROR}>
        <div id='CHILD' />
      </Alert>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders nothing without children', () => {
    const { container } = render(<Alert />);

    expect(container).toMatchSnapshot();
  });
});
