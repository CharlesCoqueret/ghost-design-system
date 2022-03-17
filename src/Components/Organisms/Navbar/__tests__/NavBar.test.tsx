import React from 'react';
import { render } from '@testing-library/react';

import NavBar from '../Navbar';

describe('NavBar Component', () => {
  it('NavBar renders', async () => {
    const onSearchMock = jest.fn();

    const container = render(
      <NavBar
        brand={{ logoSource: 'logoSource', redirection: 'redirection', alt: 'alt' }}
        navButtons={[{ label: 'button' }]}
        navIcons={[{ label: 'button', icon: ['fal', 'icons'] }]}
        searchBar={{ onSearch: onSearchMock, placeholder: 'placeholder' }}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onSearchMock).not.toBeCalled();
  });
});
