import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from '../Tooltip';
import { MenuDirectionEnum } from '../tooltipUtils';
import { act } from 'react-test-renderer';

describe('Tooltip Component', () => {
  it('Tooltip renders', async () => {
    const container = render(<Tooltip tooltip='TOOLTIP'>CHILDREN</Tooltip>);
    expect(container).toMatchSnapshot();
  });

  it('Tooltip renders with non default props', async () => {
    const container = render(
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
    const container = render(<Tooltip tooltip='TOOLTIP'>CHILDREN</Tooltip>);
    expect(container).toMatchSnapshot();

    const tooltip = await container.findByText('CHILDREN');

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
