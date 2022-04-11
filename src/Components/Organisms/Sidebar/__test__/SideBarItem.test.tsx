import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SideBarItem } from '../SideBarSection';
import SideBar from '../SideBar';

describe('SideBarItem Component', () => {
  it('SideBarItem renders', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem
          item={{
            label: 'LABEL',
            to: '/link',
            subItems: [
              {
                label: 'HIDDEN',
                to: '/link',
                hidden: true,
              },
              {
                label: 'EXTERNAL',
                to: '/link',
                externalLink: true,
              },
              {
                label: 'DISABLED',
                to: '/link',
                disabled: true,
              },
              {
                label: 'NORMAL',
                to: '/link',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBarItem renders with only one subitem visible', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem
          item={{
            label: 'LABEL',
            to: '/link',
            subItems: [
              {
                label: 'HIDDEN',
                to: '/link',
                hidden: true,
              },
              {
                label: 'LINK',
                to: '/link',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBarItem handles click on entry in main menu and handles click on submenu', async () => {
    console.info = jest.fn();

    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem
          item={{
            label: 'LABEL',
            to: '/link',
            dataTestId: 'PARENT-TEST-ID',
            subItems: [
              {
                label: 'LINK1',
                dataTestId: 'CHILD-TEST-ID',
                to: '/link/link1',
              },
              {
                label: 'LINK2',
                to: '/link/link2',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();

    const parentEntry = await screen.findByTestId('PARENT-TEST-ID');

    userEvent.click(parentEntry);
    expect(container).toMatchSnapshot();

    const childEntry = await screen.findByTestId('CHILD-TEST-ID');
    userEvent.click(childEntry);
    expect(container).toMatchSnapshot();
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('url pushed:', '/link/link1');
  });

  it('SideBarItem renders with url as Location', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarItem
          item={{
            label: 'LABEL',
            to: '/link',
            subItems: [
              {
                label: 'LINK',
                to: {
                  pathname: 'PATHNAME',
                  search: 'SEARCH',
                  hash: 'HASHVALUE',
                  state: [],
                  key: 'KEY',
                },
              },
              {
                label: 'Link2',
                to: '/link2',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBarItem should generate an error when not in a SideBar component', () => {
    console.error = jest.fn();

    const { unmount, container } = render(
      <SideBarItem
        item={{
          label: 'LABEL',
          to: '/link',
          subItems: [
            {
              label: 'HIDDEN',
              to: '/link',
              hidden: true,
            },
            {
              label: 'LINK',
              to: '/link',
            },
          ],
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    unmount();

    expect(console.error).toBeCalledWith('Sidebar component should wrap that component');

    expect(container).toMatchSnapshot();
  });
});
