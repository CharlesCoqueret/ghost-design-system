import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnButton } from '../types';
import { Button } from '../../..';

const ButtonCell = <T,>(props: ICellProps<T, IColumnButton<T>>): ReactElement => {
  const { column, row } = props;

  if (!row) throw new Error('missing row property');

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <div className='table--cell--value--button'>
        {column.buttons?.length > 2 ? (
          <Button
            tooltip='More elements' // TODO to manage translation
            icon={['fal', 'ellipsis-h']}
            itemList={column.buttons?.map((item) => {
              return {
                itemId: item.label,
                value: item.label,
                hidden: (item.hidden && item.hidden(row)) || false,
                onClick: () => {
                  if (item.onClick) {
                    item.onClick(row);
                  }
                },
              };
            })}
            color={'reversed'}
          />
        ) : (
          column.buttons?.map((button) => {
            if ((button.hidden && button.hidden(row)) || false) {
              return;
            }

            return (
              <Button
                key={button.label}
                tooltip={button.label}
                icon={button.icon}
                onClick={(event) => {
                  event.stopPropagation();
                  if (button.onClick) {
                    button.onClick(row);
                  }
                }}
                itemList={button?.itemList?.map((item) => {
                  return {
                    itemId: item.label,
                    value: item.label,
                    hidden: (item.hidden && item.hidden(row)) || false,
                    onClick: () => {
                      if (item.onClick) {
                        item.onClick(row);
                      }
                    },
                  };
                })}
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
