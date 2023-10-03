import React, { Fragment, MouseEvent, ReactElement, useRef, useState } from 'react';
import { MenuDivider, MenuItem, ControlledMenu, MenuAlign } from '@szhsin/react-menu';
import classnames from 'classnames';

import { Icon, IconProp } from '../../Atoms/Icon';
import { MenuDirectionEnum, Tooltip } from '../../Atoms/Tooltip';
import Portal from '../../Atoms/Portal/Portal';
import Popover from '../Popover/Popover';

import styles from './Button.module.scss';
import { IItemListProps } from './ItemList';

export enum ButtonColorEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  REVERSED = 'reversed',
}

export interface IButtonProps {
  /** Custom className (optional, default: undefined) */
  className?: string;
  /** Color of the button (optional, default: ButtonColorEnum.SECONDARY) */
  color?: ButtonColorEnum;
  /** Button is disabled (optional, default: false) */
  disabled?: boolean;
  /** Dropdown alignment option (optional, default: 'end' ) */
  dropdownAlign?: MenuAlign;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** List of items to display in the dropdown on click on the button (optional, default: undefined) */
  itemList?: Array<IItemListProps>;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (event: MouseEvent) => void;
  /** Optional popover (optional, default: undefined) */
  popover?: { buttons: Array<IButtonProps>; title: string };
  /**
   * Text to be displayed as a tooltip (optional, default: undefined)
   * note: only visible when there is no label
   */
  tooltip?: string;
  /** Position of the tooltip (optional, default: 'bottom') */
  tooltipDirection?: MenuDirectionEnum;
  /** Button type (optional, default: 'button') */
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

  const ref = useRef<HTMLButtonElement>(null);

  const hasMenu = itemList && itemList.length > 0;

  if (!label && !icon) return <></>;

  return (
    <>
      <Tooltip direction={tooltipDirection} tooltip={label ? undefined : tooltip}>
        <button
          className={classnames(styles.button, className)}
          color={color}
          data-testid={dataTestId}
          disabled={loading || disabled}
          onClick={(event: MouseEvent) => {
            if (onClick) {
              onClick(event);
            }
            if (hasMenu && !disabled) {
              setIsMenuOpen((prev) => !prev);
            }
            if (popover && !disabled) {
              setIsPopoverOpen(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.stopPropagation();
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') e.stopPropagation();
          }}
          ref={ref}
          type={type}
          tabIndex={loading || disabled ? -1 : 0}>
          {(icon !== undefined || loading !== false) && (
            <div key='icon' className={styles.icon}>
              {loading && <Icon icon={['fal', 'spinner']} size='lg' />}
              {!loading && icon && <Icon icon={icon} size='lg' />}
            </div>
          )}

          {label ? (
            <>
              <div key='label' className={styles.label}>
                {label}
              </div>
              {hasMenu ? (
                <div key='control' className={styles.menuControl}>
                  <Icon icon={['fal', 'pipe']} size='lg' />
                  <Icon icon={['fas', 'caret-down']} size='lg' />
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
            anchorRef={ref}
            onClose={() => setIsMenuOpen(false)}>
            {itemList.map((item): ReactElement => {
              if (item.hidden) return <Fragment key={item.itemId}></Fragment>;
              return (
                <Fragment key={item.itemId}>
                  {item.divider && <MenuDivider />}
                  <MenuItem
                    data-testid={item.dataTestId}
                    value={item.itemId}
                    onClick={(event) => {
                      event.stopPropagation = true;
                      if (item.onClick) {
                        item.onClick(event.value as string);
                      }
                    }}>
                    {item.label}
                  </MenuItem>
                </Fragment>
              );
            })}
          </ControlledMenu>
        </Portal>
      ) : (
        <></>
      )}
      {popover ? (
        <Popover
          anchorRef={ref}
          buttons={popover.buttons.map((button) => {
            return {
              ...button,
              onClick: (e: MouseEvent) => {
                setIsPopoverOpen(false);
                if (button.onClick) {
                  button.onClick(e);
                }
              },
            };
          })}
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}
          title={popover.title}
        />
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
