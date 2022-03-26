import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnButton } from '../types';
import { Button, ColorButtonEnum } from '../../../../Molecules/Button';

const DISPLAY_BUTTON_THRESHOLD = 3;

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
            tooltip={column.moreActionsMessage}
            icon={['fal', 'ellipsis-h']}
            itemList={column.buttons?.map((item) => {
              return {
                itemId: item.label,
                label: item.label,
                hidden: !(!item.hidden || !item.hidden(row, rowIndex)),
                onClick: () => {
                  if (item.onClick) {
                    item.onClick(row, rowIndex);
                  }
                },
              };
            })}
            color={ColorButtonEnum.REVERSED}
          />
        ) : (
          visibleButtons.map((button) => {
            return (
              <Button
                dataTestId={button.dataTestId}
                key={button.label}
                tooltip={button.label}
                icon={button.icon}
                onClick={(event) => {
                  event.stopPropagation();
                  if (!button.popover && button.onClick) {
                    button.onClick(row, rowIndex);
                  }
                }}
                color={ColorButtonEnum.REVERSED}
                popover={
                  button.popover
                    ? {
                        title: button.popover.message,
                        buttons: [
                          {
                            label: button.popover.cancel,
                            color: ColorButtonEnum.SECONDARY,
                            dataTestId: 'cancel',
                          },
                          {
                            label: button.popover.confirm,
                            color: ColorButtonEnum.PRIMARY,
                            dataTestId: 'confirm',
                            onClick: () => {
                              if (button.onClick) {
                                button.onClick(row, rowIndex);
                              }
                            },
                          },
                        ],
                      }
                    : undefined
                }
              />
            );
          })
        )}
      </div>
    </td>
  );
};

export default ButtonCell;
