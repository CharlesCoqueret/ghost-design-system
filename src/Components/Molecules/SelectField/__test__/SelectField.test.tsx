import React from 'react';
import { render } from '@testing-library/react';

import { SelectField } from '..';

describe('SelectField Component', () => {
  it('SelectField renders', () => {
    const { container } = render(<SelectField name='name' options={[{ label: 'Label', value: 'VALUE' }]} />);
    expect(container).toMatchSnapshot();
  });

  it('SelectField renders with values in readonly', () => {
    const { container } = render(
      <SelectField inputValue='VALUE' name='name' options={[{ label: 'Label', value: 'VALUE' }]} readOnly />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectField renders with values in disabled highligted', () => {
    const { container } = render(
      <SelectField
        inputValue='VALUE'
        name='name'
        options={[{ label: 'Label', value: 'VALUE' }]}
        disabled
        highlighted
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SelectField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <SelectField
        inputValue='VALUE'
        name='name'
        options={[{ label: 'Label', value: 'VALUE' }]}
        inline
        fieldSize={6}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
