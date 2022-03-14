import React, { ReactElement, useRef, useState } from 'react';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

import { Icon, IconProp } from '../../Atoms/Icon';
import { Badge, BadgeColorsEnum } from '../../Atoms/Badge';
import { Portal } from '../../Atoms/Portal';

export interface INavItemProps {
  /** Counter in a badge floating above the NavItem (optional, default: undefined) */
  counter?: string | number;
  /** custom submenu (optional, default: undefined) */
  customSubItem?: ReactElement;
  /** Icon on the left of the clickable button (optional if label is defined, default: undefined) */
  icon?: IconProp;
  /** Label of the menu (optional if icon is defuned, default: undefined) */
  label?: string;
  /** Link for redirection on click (optional, default: undefined) */
  link?: string;
  /** On Click handler (optional, default: undefined) */
  onClick?: () => void;
  /** Submenu items (optional, default: undefined) */
  subItems?: Array<INavItemProps>;
}

const NavItem = (props: INavItemProps): ReactElement => {
  const { counter, customSubItem, icon, label, onClick, subItems } = props;

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
      <div className='nav-bar-menu-item' ref={ref} onClick={handleClick}>
        {icon && <Icon icon={icon} size='2x' />}
        {label && <div className='nav-bar-menu-label'>{label}</div>}
        {counter && (
          <Badge color={BadgeColorsEnum.DANGER} type='notification' className='counter'>
            {counter}
          </Badge>
        )}
        {hasMenu && label && <Icon icon={['fas', 'caret-down']} size='lg' className='nav-bar-menu-caret' />}
      </div>
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
              return (
                <MenuItem
                  key={item.label}
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
