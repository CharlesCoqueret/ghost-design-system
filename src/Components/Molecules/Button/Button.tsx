import React, { ReactElement, useRef, useState } from 'react';
import { MenuDivider, MenuItem, MenuAlign, ControlledMenu } from '@szhsin/react-menu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MenuDirectionEnum, Tooltip } from '../../Atoms';
import { IItemListProps } from './ItemList';
import Portal from '../../Atoms/Portal/Portal';

export enum ColorButtonEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  REVERSED = 'reversed',
}

export interface IButtonProps {
  /** Label (optional, default: undefined) */
  label?: string;
  /** text to be displayed as a tooltip (optional, default: undefinef=d) */
  tooltip?: string;
  /** position of the tooltip (optional, default: 'bottom') */
  tooltipDirection?: MenuDirectionEnum;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** :ist of items to display in the dropdown on click on the button (optional, default: undefined) */
  itemList?: Array<IItemListProps>;
  /** Dropdown alignment option (optional, default: 'end' ) */
  dropdownAlign?: MenuAlign;
  /** Color of the button (optional, default: ColorButtonEnum.SECONDARY) */
  color?: ColorButtonEnum;
  /** button type (optional, default: 'button') */
  type?: 'submit' | 'button' | 'reset';
  /** Button is disabled (optional, default: false) */
  disabled?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Custom className (optional, default: undefined) */
  className?: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** For test purpose only */
  dataTestId?: string;
}

const Button = (props: IButtonProps): ReactElement => {
  const {
    className,
    color,
    dataTestId,
    disabled,
    dropdownAlign,
    icon,
    itemList,
    label,
    loading,
    onClick,
    tooltip,
    tooltipDirection,
    type,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const skipOpen = useRef(false);
  const ref = useRef<HTMLButtonElement>(null);

  const hasMenu = itemList && itemList.length > 0;

  if (!label && !icon) return <></>;

  return (
    <>
      <Tooltip direction={tooltipDirection} tooltip={label ? undefined : tooltip}>
        <button
          ref={ref}
          type={type}
          onClick={(event) => {
            if (onClick) {
              onClick(event);
            }
            if (hasMenu) {
              if (!skipOpen.current) setIsOpen((prev) => !prev);
            }
          }}
          disabled={loading || disabled}
          className={classnames('button-content', className)}
          color={color}
          data-testid={dataTestId}>
          {(icon !== undefined || loading !== false) && (
            <div key='icon' className='button-icon-container'>
              {loading && <FontAwesomeIcon icon={['fal', 'spinner']} spin size='1x' className='button-icon' />}
              {!loading && icon && <FontAwesomeIcon icon={icon} size='1x' className='button-icon' />}
            </div>
          )}

          {label ? (
            <>
              <div key='label' className='button-label-container'>
                {typeof label === 'string' ? `${label}` : label}
              </div>
              {hasMenu ? (
                <div key='control' className='button-menu-control-container'>
                  <FontAwesomeIcon icon={['fal', 'pipe']} size='1x' className='button-icon' />
                  <FontAwesomeIcon icon={['fas', 'caret-down']} size='1x' className='button-icon' />
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </button>
      </Tooltip>

      {hasMenu ? (
        <Portal>
          <ControlledMenu
            state={isOpen ? 'open' : 'closed'}
            align={dropdownAlign}
            anchorRef={ref}
            skipOpen={skipOpen}
            onClose={() => setIsOpen(false)}>
            {itemList?.map((item): ReactElement => {
              if (item.hidden) return <></>;
              return (
                <>
                  {item.divider && <MenuDivider />}
                  <MenuItem
                    key={item.itemId}
                    value={item.itemId}
                    onClick={(event) => {
                      event.stopPropagation = true;
                      if (item.onClick) {
                        item.onClick(event.value);
                      }
                    }}>
                    {item.value}
                  </MenuItem>
                </>
              );
            })}
          </ControlledMenu>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

Button.defaultProps = {
  label: undefined,
  tooltip: undefined,
  tooltipDirection: MenuDirectionEnum.BOTTOM,
  icon: undefined,
  itemList: undefined,
  dropdownAlign: 'end',
  color: 'secondary',
  disabled: false,
  onClick: undefined,
  className: undefined,
  type: 'button',
  loading: false,
};

export default Button;
