import React from 'react';
import { render } from '@testing-library/react';

import Highlighter from '../Highlighter';

describe('Highlighter Component', () => {
  it('Highlighter renders', () => {
    const { container } = render(
      <Highlighter>
        <div />
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Highlighter renders with highlight', () => {
    const Element = jest.fn().mockImplementation((props: unknown) => {
      return <>{JSON.stringify(props)}</>;
    });

    const { container } = render(
      <Highlighter enableSideBySide oldData='OLDDATA' highlight shouldHighlight>
        <Element />
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Highlighter renders with highlight and inValidElement', () => {
    const { container } = render(
      <Highlighter enableSideBySide oldData='OLDDATA' highlight shouldHighlight>
        {''}
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });
});
