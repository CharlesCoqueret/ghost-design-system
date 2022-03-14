import React, { ReactElement, useRef, useState } from 'react';
import { MenuDivider, MenuItem, MenuAlign, ControlledMenu } from '@szhsin/react-menu';
import classnames from 'classnames';

import { Icon, MenuDirectionEnum, Tooltip, IconProp } from '../../Atoms';
import { IItemListProps } from './ItemList';
import Portal from '../../Atoms/Portal/Portal';
import Popover from '../Popover/Popover';

export enum ColorButtonEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  REVERSED = 'reversed',
}

export interface IButtonProps {
  /** Custom className (optional, default: undefined) */
  className?: string;
  /** Color of the button (optional, default: ColorButtonEnum.SECONDARY) */
  color?: ColorButtonEnum;
  /** Button is disabled (optional, default: false) */
  disabled?: boolean;
  /** Dropdown alignment option (optional, default: 'end' ) */
  dropdownAlign?: MenuAlign;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** :ist of items to display in the dropdown on click on the button (optional, default: undefined) */
  itemList?: Array<IItemListProps>;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Optional popover (optional, default: undefined) */
  popover?: { buttons?: Array<IButtonProps>; title?: string };
  /** text to be displayed as a tooltip (optional, default: undefinef=d) */
  tooltip?: string;
  /** position of the tooltip (optional, default: 'bottom') */
  tooltipDirection?: MenuDirectionEnum;
  /** button type (optional, default: 'button') */
  type?: 'submit' | 'button' | 'reset';
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
    popover,
    tooltip,
    tooltipDirection,
    type,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const skipOpen = useRef(false);
  const ref = useRef<HTMLButtonElement>(null);

  const hasMenu = itemList && itemList.length > 0;
  const hasPopover = popover !== undefined;

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
              if (!skipOpen.current) setIsMenuOpen((prev) => !prev);
            }
            if (hasPopover) {
              setIsPopoverOpen(true);
            }
          }}
          disabled={loading || disabled}
          className={classnames('button-content', className)}
          color={color}
          data-testid={dataTestId}>
          {(icon !== undefined || loading !== false) && (
            <div key='icon' className='button-icon-container'>
              {loading && <Icon icon={['fal', 'spinner']} spin size='lg' className='button-icon' />}
              {!loading && icon && <Icon icon={icon} size='lg' className='button-icon' />}
            </div>
          )}

          {label ? (
            <>
              <div key='label' className='button-label-container'>
                {typeof label === 'string' ? `${label}` : label}
              </div>
              {hasMenu ? (
                <div key='control' className='button-menu-control-container'>
                  <Icon icon={['fal', 'pipe']} size='lg' className='button-icon' />
                  <Icon icon={['fas', 'caret-down']} size='lg' className='button-icon' />
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
            state={isMenuOpen ? 'open' : 'closed'}
            align={dropdownAlign}
            menuClassName='button-menu'
            anchorRef={ref}
            skipOpen={skipOpen}
            onClose={() => setIsMenuOpen(false)}>
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
      {hasPopover && popover ? (
        <Popover
          anchorRef={ref}
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}>
          {popover.title && <div className='popover-title'>{popover.title}</div>}
          <div className='popover-buttons'>
            {popover.buttons?.map((button) => (
              <Button
                key={`${button.label}-${button.icon?.toString()}`}
                {...button}
                onClick={(e) => {
                  setIsPopoverOpen(false);
                  if (button.onClick) {
                    button.onClick(e);
                  }
                }}
              />
            ))}
          </div>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
};

Button.defaultProps = {
  className: undefined,
  color: 'secondary',
  disabled: false,
  dropdownAlign: 'end',
  icon: undefined,
  itemList: undefined,
  label: undefined,
  loading: false,
  onClick: undefined,
  popover: undefined,
  tooltip: undefined,
  tooltipDirection: MenuDirectionEnum.BOTTOM,
  type: 'button',
};

export default Button;
