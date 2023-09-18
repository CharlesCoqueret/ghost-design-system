import React from 'react';
import { render } from '@testing-library/react';

import HighlighterLegacy from '../HighlighterLegacy';

describe('HighlighterLegacy Component', () => {
  it('HighlighterLegacy renders', () => {
    const { container } = render(
      <HighlighterLegacy>
        <div />
      </HighlighterLegacy>,
    );

    expect(container).toMatchSnapshot();
  });

  it('HighlighterLegacy renders with highlight', () => {
    const Element = jest.fn().mockImplementation((props: unknown) => {
      return <>{JSON.stringify(props)}</>;
    });

    const { container } = render(
      <HighlighterLegacy enableOldData enableSideBySide oldData='OLDDATA' shouldHighlight>
        <Element />
      </HighlighterLegacy>,
    );

    expect(container).toMatchSnapshot();
  });

  it('HighlighterLegacy renders with highlight and inValidElement', () => {
    const { container } = render(
      <HighlighterLegacy enableOldData enableSideBySide oldData='OLDDATA' shouldHighlight>
        {''}
      </HighlighterLegacy>,
    );

    expect(container).toMatchSnapshot();
  });
});
