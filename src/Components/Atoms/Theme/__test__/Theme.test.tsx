import React from 'react';
import { render } from '@testing-library/react';

import ThemeProvider, { defaultTheme, RGB } from '../ThemeProvider';

describe('ThemeProvider Component', () => {
  it('renders with default theme', () => {
    const { container } = render(
      <ThemeProvider>
        <div>CHILDREN</div>
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
    const documentStyle = document.documentElement.style;
    expect(documentStyle.getPropertyValue('--theme-provider-primary')).toEqual(defaultTheme.primary);
  });

  it('renders with specific theme', () => {
    const theme = { ...defaultTheme, primary: '84, 84, 84' as RGB };
    const { container } = render(
      <>
        <ThemeProvider theme={theme} />
        <div>CHILDREN</div>
      </>,
    );
    expect(container).toMatchSnapshot();
    const documentStyle = document.documentElement.style;
    expect(documentStyle.getPropertyValue('--theme-provider-primary')).toEqual('84, 84, 84');
  });
});
