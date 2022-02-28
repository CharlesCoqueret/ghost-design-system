import React, { ReactElement } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

const YearPickerHeader = (props: ReactDatePickerCustomHeaderProps): ReactElement => {
  const { decreaseYear, increaseYear, prevYearButtonDisabled, nextYearButtonDisabled } = props;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}>
        <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
          {'<'}
        </button>

        <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default YearPickerHeader;
