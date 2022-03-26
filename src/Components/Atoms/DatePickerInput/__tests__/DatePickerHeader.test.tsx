import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePickerHeader from '../DatePickerHeader';
import { importFnsLocaleFile } from '../dateUtils';

describe('DatePickerHeader Component', () => {
  it('DatePickerHeader renders handles changes in French', async () => {
    const changeYearMock = jest.fn();
    const changeMonthMock = jest.fn();
    const decreaseMonthMock = jest.fn();
    const increaseMonthMock = jest.fn();
    const decreaseYearMock = jest.fn();
    const increaseYearMock = jest.fn();

    await importFnsLocaleFile('fr');

    const DatePickerHeaderComponent = DatePickerHeader('fr');
    const container = render(
      <DatePickerHeaderComponent
        changeMonth={changeMonthMock}
        changeYear={changeYearMock}
        date={new Date('03/23/2022')}
        dataTestId='TESTID'
        decreaseMonth={decreaseMonthMock}
        decreaseYear={decreaseYearMock}
        increaseMonth={increaseMonthMock}
        increaseYear={increaseYearMock}
        monthDate={new Date('03/23/2022')}
        prevMonthButtonDisabled={false}
        nextMonthButtonDisabled={false}
        prevYearButtonDisabled={false}
        nextYearButtonDisabled={false}
        customHeaderCount={1}
      />,
    );
    expect(container).toMatchSnapshot();

    const decreaseMonth = await screen.findByTestId('TESTID-decreaseMonth');
    const increaseMonth = await screen.findByTestId('TESTID-increaseMonth');
    const month = await screen.findByTestId('TESTID-month');
    const decreaseYear = await screen.findByTestId('TESTID-decreaseYear');
    const increaseYear = await screen.findByTestId('TESTID-increaseYear');
    const year = await screen.findByTestId('TESTID-year');

    expect((month as HTMLSelectElement).value).toBe('mars');
    expect((year as HTMLSelectElement).value).toBe('2022');

    userEvent.click(increaseMonth);
    expect(increaseMonthMock).toBeCalledTimes(1);

    userEvent.click(decreaseMonth);
    expect(decreaseMonthMock).toBeCalledTimes(1);

    userEvent.click(increaseYear);
    expect(increaseYearMock).toBeCalledTimes(1);

    userEvent.click(decreaseYear);
    expect(decreaseYearMock).toBeCalledTimes(1);

    userEvent.selectOptions(month, 'janvier');
    expect(changeMonthMock).toBeCalledTimes(1);
    expect(changeMonthMock).toBeCalledWith(0);

    userEvent.selectOptions(year, '1984');
    expect(changeYearMock).toBeCalledTimes(1);
    expect(changeYearMock).toBeCalledWith(1984);
  });
});
