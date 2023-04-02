import React from 'react';
import { render } from '@testing-library/react';

import Highlighter from '../Highlighter';

describe('Highlighter Component', () => {
  it('renders properly', () => {
    const { container } = render(
      <Highlighter>
        <div />
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with highlight and side by side', () => {
    const Element = jest.fn().mockImplementation((props: unknown) => {
      return <>{JSON.stringify(props)}</>;
    });

    const { container } = render(
      <Highlighter enableOldData enableSideBySide oldData='OLDDATA' shouldHighlight>
        <Element />
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with highlight and side by side with invalid Element', () => {
    const { container } = render(
      <Highlighter enableOldData enableSideBySide oldData='OLDDATA' shouldHighlight>
        {''}
      </Highlighter>,
    );

    expect(container).toMatchSnapshot();
  });
});
