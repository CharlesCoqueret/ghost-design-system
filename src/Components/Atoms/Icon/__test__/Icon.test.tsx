import React from 'react';
import { render } from '@testing-library/react';

import Icon from '../Icon';

describe('Icon component', () => {
  it('Icon renders', async () => {
    const container = render(<Icon icon={['fal', 'cog']} className={'CLASSNAME'} />);
    expect(container).toMatchSnapshot();
  });
});
