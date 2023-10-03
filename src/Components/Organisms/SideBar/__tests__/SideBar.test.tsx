import React from 'react';
import { render } from '@testing-library/react';

import SideBar from '../SideBar';
import SideBarItem from '../SideBarItem';
import SideBarSection from '../SideBarSection';

describe('SideBar Component', () => {
  it('SideBar renders', () => {
    const { container } = render(
      <SideBar backToMenu={'Back to menu'} style={{ height: '600px' }}>
        <SideBarSection label='LABEL'>
          <SideBarItem label='HIDDEN' to='/link' hidden />
          <SideBarItem label='EXTERNAL' to='/link' externalLink />
          <SideBarItem label='DISABLED' to='/link' disabled />
          <SideBarItem label='NORMAL' to='/link' />
        </SideBarSection>
      </SideBar>,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBar renders without sections', () => {
    const { container } = render(<SideBar backToMenu={'Back to menu'} style={{ height: '600px' }} />);

    expect(container).toMatchSnapshot();
  });
});
