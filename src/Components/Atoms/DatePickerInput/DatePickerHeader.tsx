import React, { ChangeEvent, ReactElement } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { Button, ColorButtonEnum } from '../../Molecules/Button';

import { getMonthInLocale } from './dateUtils';

const DatePickerHeader = (locale?: string) =>
  function DatePickerHeaderInner(props: ReactDatePickerCustomHeaderProps & { dataTestId?: string }): ReactElement {
    const {
      changeMonth,
      changeYear,
      dataTestId,
      date,
      decreaseMonth,
      decreaseYear,
      increaseMonth,
      increaseYear,
      monthDate,
      nextMonthButtonDisabled,
      nextYearButtonDisabled,
      prevMonthButtonDisabled,
      prevYearButtonDisabled,
    } = props;

    const years: Array<number> = [];
    for (let yearNumber = monthDate.getFullYear() - 50; yearNumber <= monthDate.getFullYear() + 50; yearNumber++) {
      years.push(yearNumber);
    }

    const months: Array<string> = [];
    for (let monthNumber = 0; monthNumber < 12; monthNumber++) {
      months.push(getMonthInLocale(monthNumber, locale));
    }

    return (
      <div>
        <div className='react-datepicker__header-select-wrapper'>
          <Button
            color={ColorButtonEnum.REVERSED}
            dataTestId={dataTestId ? `${dataTestId}-decreaseMonth` : undefined}
            disabled={prevMonthButtonDisabled}
            icon={['fal', 'chevron-left']}
            onClick={decreaseMonth}
          />

          <select
            className='react-datepicker__header-select'
            data-testid={dataTestId ? `${dataTestId}-month` : undefined}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const newValue = event.target.value;
              changeMonth(months.indexOf(newValue));
            }}
            value={months[date.getMonth()]}>
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button
            color={ColorButtonEnum.REVERSED}
            dataTestId={dataTestId ? `${dataTestId}-increaseMonth` : undefined}
            disabled={nextMonthButtonDisabled}
            icon={['fal', 'chevron-right']}
            onClick={increaseMonth}
          />
        </div>

        <div className='react-datepicker__header-select-wrapper'>
          <Button
            color={ColorButtonEnum.REVERSED}
            dataTestId={dataTestId ? `${dataTestId}-decreaseYear` : undefined}
            disabled={prevYearButtonDisabled}
            onClick={decreaseYear}
            icon={['fal', 'chevron-left']}
          />

          <select
            className='react-datepicker__header-select'
            data-testid={dataTestId ? `${dataTestId}-year` : undefined}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const newValue = event.target.value;
              changeYear(Number(newValue));
            }}
            value={date.getFullYear()}>
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button
            color={ColorButtonEnum.REVERSED}
            dataTestId={dataTestId ? `${dataTestId}-increaseYear` : undefined}
            disabled={nextYearButtonDisabled}
            onClick={increaseYear}
            icon={['fal', 'chevron-right']}
          />
        </div>
      </div>
    );
  };

export default DatePickerHeader;
