import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from '../Tooltip';
import { MenuDirectionEnum } from '../tooltipUtils';

describe('Tooltip Component', () => {
  it('Tooltip renders', () => {
    const { container } = render(<Tooltip tooltip='TOOLTIP'>CHILDREN</Tooltip>);
    expect(container).toMatchSnapshot();
  });

  it('Tooltip renders with non default props', () => {
    const { container } = render(
      <Tooltip
        arrow={false}
        className={'CLASSNAME'}
        delay={100}
        direction={MenuDirectionEnum.RIGHT}
        extraMargin={100}
        maxWidth={20}
        style={{ height: '50px' }}
        tooltip='TOOLTIP'>
        CHILDREN
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Tooltip renders shows and closes', async () => {
    const { container } = render(<Tooltip tooltip='TOOLTIP'>CHILDREN</Tooltip>);
    expect(container).toMatchSnapshot();

    const tooltip = await screen.findByText('CHILDREN');

    act(() => {
      userEvent.hover(tooltip);
    });

    expect(container).toMatchSnapshot();

    act(() => {
      userEvent.click(tooltip);
    });

    expect(container).toMatchSnapshot();
  });
});
