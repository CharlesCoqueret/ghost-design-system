import React from 'react';
import { render } from '@testing-library/react';

import { SwitchField } from '..';

describe('SwitchField Component', () => {
  it('SwitchField renders', () => {
    const { container } = render(<SwitchField inputValue={[{ label: 'Label', value: 'VALUE' }]} />);
    expect(container).toMatchSnapshot();
  });

  it('SwitchField renders with values in readonly', () => {
    const { container } = render(<SwitchField inputValue={[{ label: 'Label', value: 'VALUE' }]} readOnly />);
    expect(container).toMatchSnapshot();
  });

  it('SwitchField renders with values in disabled highligted', () => {
    const { container } = render(
      <SwitchField inputValue={[{ label: 'Label', value: 'VALUE' }]} disabled highlighted />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SwitchField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <SwitchField inputValue={[{ label: 'Label', value: 'VALUE' }]} inline fieldSize={6} />,
    );
    expect(container).toMatchSnapshot();
  });
});
