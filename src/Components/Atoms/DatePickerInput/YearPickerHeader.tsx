import React, { ReactElement } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { Button, ColorButtonEnum } from '../../Molecules/Button';

const YearPickerHeader = (props: ReactDatePickerCustomHeaderProps & { dataTestId?: string }): ReactElement => {
  const { dataTestId, decreaseYear, increaseYear, prevYearButtonDisabled, nextYearButtonDisabled } = props;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}>
        <Button
          color={ColorButtonEnum.REVERSED}
          dataTestId={dataTestId ? `${dataTestId}-decreaseYear` : undefined}
          disabled={prevYearButtonDisabled}
          icon={['fal', 'chevron-left']}
          onClick={decreaseYear}
        />

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

export default YearPickerHeader;
