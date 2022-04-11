import React from 'react';
import { render } from '@testing-library/react';

import SideBarSection from '../SideBarSection';
import SideBar from '../SideBar';

describe('SideBarSection Component', () => {
  it('SideBarSection renders', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarSection
          section={{
            title: 'LABEL',
            divider: true,
            items: [
              {
                label: 'LINK1',
                to: '/link1',
              },
              {
                label: 'LINK2',
                to: '/link2',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBarSection renders hidden section', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarSection
          section={{
            title: 'LABEL',
            divider: true,
            hidden: true,
            items: [
              {
                label: 'LINK1',
                to: '/link1',
              },
            ],
          }}
        />
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });
});
