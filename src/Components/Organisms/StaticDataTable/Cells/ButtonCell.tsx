import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnButton } from '../types';
import { Button } from '../../../Molecules/Button';

const DISPLAY_BUTTON_THRESHOLD = 2;

const ButtonCell = <T,>(props: ICellProps<T, IColumnButton<T>>): ReactElement => {
  const { column, row, rowIndex } = props;

  if (!row) throw new Error('missing row property');

  const visibleButtons = column.buttons.filter((button) => {
    return !button.hidden || !button.hidden(row, rowIndex);
  });

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <div className='table--cell--value--button'>
        {visibleButtons.length > DISPLAY_BUTTON_THRESHOLD ? (
          <Button
            tooltip='More elements' // TODO to manage translation
            icon={['fal', 'ellipsis-h']}
            itemList={column.buttons?.map((item) => {
              return {
                itemId: item.label,
                value: item.label,
                onClick: () => {
                  if (item.onClick) {
                    item.onClick(row, rowIndex);
                  }
                },
              };
            })}
            color={'reversed'}
          />
        ) : (
          visibleButtons.map((button) => {
            return (
              <Button
                key={button.label}
                tooltip={button.label}
                icon={button.icon}
                onClick={(event) => {
                  event.stopPropagation();
                  if (button.onClick) {
                    button.onClick(row, rowIndex);
                  }
                }}
                color={'reversed'}
              />
            );
          })
        )}
      </div>
    </td>
  );
};

export default ButtonCell;
