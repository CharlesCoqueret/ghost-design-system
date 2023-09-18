import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnButton } from '../types';
import { Button, ButtonColorEnum } from '../../../../Molecules/Button';

const DISPLAY_BUTTON_THRESHOLD = 3;

const ButtonCell = <T,>(props: ICellProps<T, IColumnButton<T>>): ReactElement => {
  const { column, dataTestId, row, rowIndex } = props;

  if (!row) {
    console.error('missing row property');
    return <></>;
  }

  const visibleButtons = column.buttons.filter((button) => {
    return !button.hidden || !button.hidden(row, rowIndex);
  });

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <div className='table--cell--value--button'>
        {visibleButtons.length > DISPLAY_BUTTON_THRESHOLD ? (
          <Button
            color={ButtonColorEnum.REVERSED}
            dataTestId={dataTestId}
            icon={['fal', 'ellipsis']}
            itemList={column.buttons.map((item) => {
              return {
                dataTestId: item.dataTestId,
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
            tooltip={column.moreActionsMessage}
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
                color={ButtonColorEnum.REVERSED}
                popover={
                  button.popover
                    ? {
                        title: button.popover.message,
                        buttons: [
                          {
                            label: button.popover.cancel,
                            color: ButtonColorEnum.SECONDARY,
                            dataTestId: 'cancel',
                          },
                          {
                            label: button.popover.confirm,
                            color: ButtonColorEnum.PRIMARY,
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
