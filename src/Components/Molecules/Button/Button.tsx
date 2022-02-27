import React, { ReactElement } from 'react';
import { Menu, MenuDivider, MenuItem, MenuDirection, MenuAlign } from '@szhsin/react-menu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { Tooltip } from '../../Atoms';
import { IItemListProps } from './ItemList';

export interface IButtonProps {
  /** Label (optional, default: undefined) */
  label?: string;
  /** text to be displayed as a tooltip (optional, default: undefinef=d) */
  tooltip?: string | ReactElement;
  /** position of the tooltip (optional, default: 'bottom') */
  tooltipDirection?: MenuDirection;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** :ist of items to display in the dropdown on click on the button (optional, default: undefined) */
  itemList?: Array<IItemListProps>;
  /** Dropdown alignment option (optional, default: 'end' ) */
  dropdownAlign?: MenuAlign;
  /** Color of the button (optional, default: 'secondary') */
  color?: 'primary' | 'secondary' | 'reversed';
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
}

const Button = (props: IButtonProps): ReactElement => {
  const {
    className,
    color,
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

  const hasMenu = itemList && itemList.length > 0;

  const button = (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={classNames('button-content', className)}
      color={color}>
      {(icon !== undefined || loading !== false) && (
        <div key='icon' className='button-icon-container'>
          {loading && <FontAwesomeIcon icon={['fal', 'spinner']} /*spin*/ size='1x' className='button-icon' />}
          {!loading && icon && <FontAwesomeIcon icon={icon} size='1x' className='button-icon' />}
        </div>
      )}

      {label ? (
        <div key='label' className='button-label-container'>
          {typeof label === 'string' ? `${label}` : label}
        </div>
      ) : (
        <></>
      )}

      {hasMenu ? (
        <div key='control' className='button-menu-control-container'>
          <FontAwesomeIcon icon={['fal', 'pipe']} size='1x' className='button-icon' />
          <FontAwesomeIcon icon={['fas', 'caret-down']} size='1x' className='button-icon' />
        </div>
      ) : (
        <></>
      )}
    </button>
  );

  if (!label && !icon) return <></>;

  return (
    <Tooltip direction={tooltipDirection} tooltip={label ? undefined : tooltip}>
      {hasMenu ? (
        <Menu menuButton={button} align={dropdownAlign} className={className}>
          {itemList?.map((item): ReactElement => {
            if (item.hidden) return <></>;
            return (
              <>
                {item.divider && <MenuDivider />}
                <MenuItem
                  key={item.itemId}
                  value={item.itemId}
                  onClick={(event) => {
                    if (item.onClick) {
                      item.onClick(event.value);
                    }
                    event.stopPropagation = true;
                  }}>
                  {item.value}
                </MenuItem>
              </>
            );
          })}
        </Menu>
      ) : (
        button
      )}
    </Tooltip>
  );
};

Button.defaultProps = {
  label: undefined,
  tooltip: undefined,
  tooltipDirection: 'bottom',
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
