import React, { ReactElement, useRef, useState } from 'react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import { NavLink } from 'react-router-dom';

import { Icon, IconProp } from '../../Atoms/Icon';
import { Badge, BadgeColorsEnum } from '../../Atoms/Badge';
import { Portal } from '../../Atoms/Portal';
import { Tooltip } from '../../Atoms/Tooltip';

export interface INavItemProps {
  /** Counter in a badge floating above the NavItem (optional, default: undefined) */
  counter?: string | number;
  /** custom submenu (optional, default: undefined) */
  customSubItem?: ReactElement;
  /** For test purpose only */
  dataTestId?: string;
  /** Icon on the left of the clickable button (optional if label is defined, default: undefined) */
  icon?: IconProp;
  /** Label of the menu (optional if icon is defuned, default: undefined) */
  label?: string;
  /** Link (optional, default: undefined) */
  link?: string;
  /** On Click handler (optional, default: undefined) */
  onClick?: () => void;
  /** Submenu items (optional, default: undefined) */
  subItems?: Array<INavItemProps>;
  /** Tooltip (optional, default: undefined) */
  tooltip?: string;
}

const NavItem = (props: INavItemProps): ReactElement => {
  const { counter, customSubItem, dataTestId, icon, label, link, onClick, subItems, tooltip } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const skipOpen = useRef(false);
  const hasMenu = (subItems && subItems.length > 0) || customSubItem !== undefined;

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (hasMenu) {
      if (!skipOpen.current) {
        setIsOpen((prev) => !prev);
      }
    }
  };

  const handleClick = () => {
    toggleMenu();
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Tooltip tooltip={tooltip}>
        <div className='nav-bar-menu-item' data-testid={dataTestId} ref={ref} onClick={handleClick}>
          {label && link ? (
            <NavLink to={link}>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              <div className='nav-bar-menu-label'>{label}</div>
            </NavLink>
          ) : (
            <>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              <div className='nav-bar-menu-label'>{label}</div>
            </>
          )}
          {counter && (
            <Badge color={BadgeColorsEnum.DANGER} type='notification' className='counter'>
              {counter}
            </Badge>
          )}
          {hasMenu && label && <Icon icon={['fas', 'caret-down']} size='lg' className='nav-bar-menu-caret' />}
        </div>
      </Tooltip>
      {hasMenu ? (
        <Portal>
          <ControlledMenu
            state={isOpen ? 'open' : 'closed'}
            align='center'
            arrow
            anchorRef={ref}
            skipOpen={skipOpen}
            onClose={closeMenu}>
            {subItems?.map((item): ReactElement => {
              if (item.link)
                return (
                  <NavLink to={item.link}>
                    <MenuItem
                      key={item.label}
                      data-testid={item.dataTestId}
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        }
                      }}>
                      {item.label}
                    </MenuItem>
                  </NavLink>
                );

              return (
                <MenuItem
                  key={item.label}
                  data-testid={item.dataTestId}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}>
                  {item.label}
                </MenuItem>
              );
            })}
            {customSubItem}
          </ControlledMenu>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavItem;
