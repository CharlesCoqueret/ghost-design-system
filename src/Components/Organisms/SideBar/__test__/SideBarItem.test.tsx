import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SideBar from '../SideBar';
import SideBarItem from '../SideBarItem';

describe('SideBarItem Component', () => {
  it('renders properly', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} height='600px' width='400px'>
        <SideBarItem label='LABEL' to='/link'>
          <SideBarItem label='HIDDEN' to='/link' hidden />
          <SideBarItem label='EXTERNAL' to='/link' externalLink />
          <SideBarItem label='DISABLED' to='/link' disabled />
          <SideBarItem label='NORMAL' to='/link' />
        </SideBarItem>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders unfixed', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} height='600px' width='400px' unfixed>
        <SideBarItem label='LABEL' to='/link'>
          <SideBarItem label='HIDDEN' to='/link' hidden />
          <SideBarItem label='EXTERNAL' to='/link' externalLink />
          <SideBarItem label='DISABLED' to='/link' disabled />
          <SideBarItem label='NORMAL' to='/link' />
        </SideBarItem>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with only one subitem visible', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem label='LABEL' to='/link'>
          <SideBarItem label='HIDDEN' to='/link' hidden />
          <SideBarItem label='LINK' to='/link' />
        </SideBarItem>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles click on entry in main menu and handles click on submenu', async () => {
    console.info = jest.fn();

    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem label='LABEL' to='/link' dataTestId='PARENT-TEST-ID'>
          <SideBarItem label='LINK1' dataTestId='CHILD-TEST-ID' to='/link/link1' />
          <SideBarItem label='LINK2' to='/link/link2' />
        </SideBarItem>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();

    const parentEntry = await screen.findByTestId('PARENT-TEST-ID');

    userEvent.click(parentEntry);

    expect(container).toMatchSnapshot();

    expect(console.info).toBeCalledTimes(2);
    expect(console.info).toBeCalledWith('url pushed:', '/link');
    expect(console.info).toBeCalledWith('url pushed:', '/link/link1');

    const childEntry = await screen.findByTestId('CHILD-TEST-ID');

    userEvent.click(childEntry);

    expect(container).toMatchSnapshot();
  });

  it('renders with url as Location', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem label='LABEL' to='/link'>
          <SideBarItem
            label='LINK'
            to={{
              pathname: 'PATHNAME',
              search: 'SEARCH',
              hash: 'HASHVALUE',
              state: [],
              key: 'KEY',
            }}
          />
          <SideBarItem label='Link2' to='/link2' />
        </SideBarItem>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should generate an error when not in a SideBar component', () => {
    console.error = jest.fn();

    const { unmount, container } = render(
      <SideBarItem label='LABEL' to='/link'>
        <SideBarItem label='HIDDEN' to='/link' hidden />
        <SideBarItem label='LINK' to='/link' />
      </SideBarItem>,
    );

    expect(container).toMatchSnapshot();

    unmount();

    expect(console.error).toBeCalledWith('SideBar component should wrap that component');

    expect(container).toMatchSnapshot();
  });
});
