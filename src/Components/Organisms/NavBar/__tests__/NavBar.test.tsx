import React from 'react';
import { render } from '@testing-library/react';

import NavBar from '../NavBar';
import NavBarMenu from '../NavBarMenu';
import NavBarUtilities from '../NavBarUtilities';
import NavItem from '../NavItem';

describe('NavBar Component', () => {
  it('renders with menu, and utilities', () => {
    const { container } = render(
      <NavBar logoSource='logoSource' redirection='redirection' alt='alt'>
        <NavBarMenu>
          <NavItem label='button' />
        </NavBarMenu>
        <NavBarUtilities>
          <NavItem label='button' icon={['fal', 'icons']} />
        </NavBarUtilities>
      </NavBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders without menu nor utilities', () => {
    const { container } = render(<NavBar logoSource='logoSource' />);

    expect(container).toMatchSnapshot();
  });
});
