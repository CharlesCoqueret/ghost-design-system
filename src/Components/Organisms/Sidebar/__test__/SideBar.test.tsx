import React from 'react';
import { render } from '@testing-library/react';

import SideBar from '../SideBar';

describe('SideBar Component', () => {
  it('SideBar renders', () => {
    const { container } = render(
      <SideBar
        backToMenu={'Back to menu'}
        style={{ height: '600px' }}
        sections={[
          {
            title: 'LABEL',
            items: [
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
          },
        ]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('SideBar renders without sections', () => {
    const { container } = render(<SideBar backToMenu={'Back to menu'} style={{ height: '600px' }} />);

    expect(container).toMatchSnapshot();
  });
});
