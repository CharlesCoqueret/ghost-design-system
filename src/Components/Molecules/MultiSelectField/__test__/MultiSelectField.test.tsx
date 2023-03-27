import React from 'react';
import { render } from '@testing-library/react';

import { MultiSelectField } from '..';

describe('MultiSelectField Component', () => {
  it('MultiSelectField renders', () => {
    const { container } = render(
      <MultiSelectField
        name='name'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[{ label: 'Label', value: 'VALUE' }]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectField renders with values in readonly', () => {
    const { container } = render(
      <MultiSelectField
        input={['VALUE']}
        name='name'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[{ label: 'Label', value: 'VALUE' }]}
        readOnly
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectField renders with values in disabled highligted', () => {
    const { container } = render(
      <MultiSelectField
        input={['VALUE']}
        name='name'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[{ label: 'Label', value: 'VALUE' }]}
        disabled
        highlighted
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('MultiSelectField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <MultiSelectField
        input={['VALUE']}
        name='name'
        numberOfItemLabel='{} item selected'
        numberOfItemsLabel='{} items selected'
        options={[{ label: 'Label', value: 'VALUE' }]}
        inline
        fieldSize={6}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
