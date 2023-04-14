import React from 'react';
import { render } from '@testing-library/react';

import { Badge } from '..';
import { BadgeColorsEnum } from '../Badge';
import { MenuDirectionEnum } from '../../Tooltip';

describe('Badge Component', () => {
  it('Badge renders notification', () => {
    const { container } = render(
      <Badge
        type='notification'
        className='CLASSNAME'
        color={BadgeColorsEnum.DANGER}
        tooltip='TOOLTIP'
        tooltipDirection={MenuDirectionEnum.BOTTOM}>
        BADGE
      </Badge>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Badge renders notification', () => {
    const { container } = render(
      <Badge
        type='notification'
        className='CLASSNAME'
        color={BadgeColorsEnum.DANGER}
        tooltip='TOOLTIP'
        tooltipDirection={MenuDirectionEnum.BOTTOM}>
        <div />
      </Badge>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Badge without children', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
});
