import React from 'react';
import { render } from '@testing-library/react';

import Icon from '../Icon';

describe('Icon component', () => {
  it('Icon renders', () => {
    const { container } = render(<Icon icon={['fal', 'gear']} className={'CLASSNAME'} />);
    expect(container).toMatchSnapshot();
  });
});
