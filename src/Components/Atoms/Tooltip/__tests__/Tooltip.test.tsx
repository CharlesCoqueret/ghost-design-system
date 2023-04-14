import React from 'react';
import { render } from '@testing-library/react';

import Tooltip from '../Tooltip';
import { MenuDirectionEnum } from '../types';

describe('Tooltip Component', () => {
  it('Tooltip renders', () => {
    const { container } = render(
      <Tooltip tooltip='TOOLTIP'>
        <>CHILDREN</>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Tooltip renders with empty tooltip', () => {
    const { container } = render(
      <Tooltip arrow={false} delay={100} direction={MenuDirectionEnum.RIGHT}>
        <>CHILDREN</>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Tooltip renders disabled', () => {
    const { container } = render(
      <Tooltip tooltip='TOOLTIP' disabled>
        <>CHILDREN</>
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });
});
