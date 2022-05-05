import React from 'react';
import { render } from '@testing-library/react';

import SideBar from '../SideBar';
import SideBarItem from '../SideBarItem';
import SideBarSection from '../SideBarSection';

describe('SideBarSection Component', () => {
  it('SideBarSection renders', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarSection label='LABEL' divider>
          <SideBarItem label='LINK1' to='/link1' />
          <SideBarItem label='LINK2' to='/link2' />
        </SideBarSection>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBarSection renders hidden section', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarSection label='LABEL' divider hidden>
          <SideBarItem label='LINK1' to='/link1' />
        </SideBarSection>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });
});
