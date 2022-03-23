import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import YearPickerHeader from '../YearPickerHeader';

describe('YearPickerHeader Component', () => {
  it('YearPickerHeader renders handles changes', async () => {
    const decreaseYearMock = jest.fn();
    const increaseYearMock = jest.fn();

    const container = render(
      <YearPickerHeader
        changeMonth={() => {
          return;
        }}
        changeYear={() => {
          return;
        }}
        date={new Date()}
        dataTestId='TESTID'
        decreaseMonth={() => {
          return;
        }}
        decreaseYear={decreaseYearMock}
        increaseMonth={() => {
          return;
        }}
        increaseYear={increaseYearMock}
        monthDate={new Date()}
        prevMonthButtonDisabled={true}
        nextMonthButtonDisabled={true}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        customHeaderCount={1}
      />,
    );
    expect(container).toMatchSnapshot();

    const decreaseYear = await screen.findByTestId('TESTID-decreaseYear');
    const increaseYear = await screen.findByTestId('TESTID-increaseYear');

    userEvent.click(increaseYear);
    expect(increaseYearMock).toBeCalledTimes(1);

    userEvent.click(decreaseYear);
    expect(decreaseYearMock).toBeCalledTimes(1);
  });

  it('YearPickerHeader renders without data-testid', async () => {
    const container = render(
      <YearPickerHeader
        changeMonth={() => {
          return;
        }}
        changeYear={() => {
          return;
        }}
        date={new Date()}
        decreaseMonth={() => {
          return;
        }}
        decreaseYear={() => {
          return;
        }}
        increaseMonth={() => {
          return;
        }}
        increaseYear={() => {
          return;
        }}
        monthDate={new Date()}
        prevMonthButtonDisabled={true}
        nextMonthButtonDisabled={true}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        customHeaderCount={1}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
