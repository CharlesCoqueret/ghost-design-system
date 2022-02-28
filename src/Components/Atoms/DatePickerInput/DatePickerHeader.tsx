import React, { ReactElement } from 'react';
import { ReactDatePickerCustomHeaderProps /*registerLocale*/ } from 'react-datepicker';
// import fr from "date-fns/locale/fr";

import { getMonthInLocale } from './dateUtils';

const DatePickerHeader = (locale?: string) =>
  function DatePickerHeaderInner(props: ReactDatePickerCustomHeaderProps): ReactElement {
    const {
      monthDate,
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
      decreaseYear,
      increaseYear,
      prevYearButtonDisabled,
      nextYearButtonDisabled,
    } = props;

    const years: Array<string> = [];
    for (let yearNumber = monthDate.getFullYear() - 50; yearNumber <= monthDate.getFullYear() + 50; yearNumber++) {
      years.push(Number(yearNumber).toString());
    }

    const months: Array<string> = [];
    for (let monthNumber = 0; monthNumber < 12; monthNumber++) {
      months.push(getMonthInLocale(monthNumber, locale));
    }

    return (
      <div>
        <div className='react-datepicker__header-select-wrapper'>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {'<'}
          </button>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className='react-datepicker__header-select'>
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {'>'}
          </button>
        </div>
        <div className='react-datepicker__header-wrapper'>
          <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
            {'<'}
          </button>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className='react-datepicker__header-select'>
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
            {'>'}
          </button>
        </div>
      </div>
    );
  };

export default DatePickerHeader;
