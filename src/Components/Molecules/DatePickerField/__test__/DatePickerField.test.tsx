import React from 'react';
import { render } from '@testing-library/react';

import { DatePickerField } from '..';

describe('DatePickerField Component', () => {
  it('DatePickerField renders', () => {
    const { container } = render(<DatePickerField name='name' />);
    expect(container).toMatchSnapshot();
  });

  it('DatePickerField renders with values in readonly', () => {
    const { container } = render(
      <DatePickerField inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')} name='name' readOnly />,
    );
    expect(container).toMatchSnapshot();
  });

  it('DatePickerField renders with values in disabled highligted', () => {
    const { container } = render(
      <DatePickerField
        inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')}
        name='name'
        disabled
        highlighted
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('DatePickerField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <DatePickerField
        inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')}
        name='name'
        inline
        fieldSize={6}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
