import React from 'react';
import renderer from 'react-test-renderer';

import { DatePickerField } from '..';

describe('DatePickerField Component', () => {
  it('DatePickerField renders', () => {
    const tree = renderer.create(<DatePickerField name='name' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('DatePickerField renders with values in readonly', () => {
    const tree = renderer
      .create(<DatePickerField inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')} name='name' readOnly />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('DatePickerField renders with values in disabled highligted', () => {
    const tree = renderer
      .create(
        <DatePickerField
          inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')}
          name='name'
          disabled
          highlighted
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('DatePickerField renders with values with fieldSize and inline', () => {
    const tree = renderer
      .create(
        <DatePickerField
          inputValue={new Date('Wed Mar 02 2022 01:22:48 GMT+0100 (CET)')}
          name='name'
          inline
          fieldSize={6}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
