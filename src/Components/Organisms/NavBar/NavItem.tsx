import React, { ReactElement, useRef, useState } from 'react';
import { ControlledMenu, MenuDivider, MenuHeader, MenuItem } from '@szhsin/react-menu';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { Icon, IconProp } from '../../Atoms/Icon';
import { Badge, BadgeColorsEnum } from '../../Atoms/Badge';
import { Portal } from '../../Atoms/Portal';
import { Tooltip } from '../../Atoms/Tooltip';

export interface INavItemProps {
  /** Counter in a badge floating above the NavItem (optional, default: undefined) */
  counter?: string | number;
  /** custom infinite scroll config (optional, default: undefined) */
  customInfiniteScrollConfig?: {
    header: string;
    items: Array<{ [key: string]: unknown }>;
    loadMore: (p: number) => void;
    loading: boolean;
    noItems: string;
    renderItem: (item: { [key: string]: unknown }) => ReactElement;
    total: number | undefined;
  };
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
  const {
    counter,
    customInfiniteScrollConfig,
    customSubItem,
    dataTestId,
    icon,
    label,
    link,
    onClick,
    subItems,
    tooltip,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const skipOpen = useRef(false);
  const hasMenu =
    (subItems && subItems.length > 0) || customInfiniteScrollConfig !== undefined || customSubItem !== undefined;

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
          {link ? (
            <NavLink to={link}>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              {label && <div className='nav-bar-menu-label'>{label}</div>}
            </NavLink>
          ) : (
            <>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              {label && <div className='nav-bar-menu-label'>{label}</div>}
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
            align={customInfiniteScrollConfig ? 'end' : 'center'}
            anchorRef={ref}
            arrow
            onClose={closeMenu}
            state={isOpen ? 'open' : 'closed'}
            skipOpen={skipOpen}>
            {subItems?.map((item): ReactElement => {
              return (
                <MenuItem
                  data-testid={item.dataTestId}
                  href={item.link}
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
            {customInfiniteScrollConfig && (
              <>
                <MenuHeader key='header'>{customInfiniteScrollConfig.header}</MenuHeader>
                <div style={{ maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
                  <InfiniteScroll
                    key='infinite'
                    loadMore={customInfiniteScrollConfig.loadMore}
                    hasMore={
                      !customInfiniteScrollConfig.loading &&
                      (customInfiniteScrollConfig.total === undefined ||
                        customInfiniteScrollConfig.items.length < customInfiniteScrollConfig.total)
                    }
                    threshold={1}
                    useWindow={false}
                    initialLoad={true}>
                    {customInfiniteScrollConfig.total === 0 ? (
                      <MenuHeader key='header-noitem'>{customInfiniteScrollConfig.noItems}</MenuHeader>
                    ) : (
                      customInfiniteScrollConfig.items.map((item) => (
                        <React.Fragment key={item.label as string}>
                          <MenuItem>{customInfiniteScrollConfig.renderItem(item)}</MenuItem>
                          <MenuDivider />
                        </React.Fragment>
                      ))
                    )}
                  </InfiniteScroll>
                </div>
              </>
            )}
          </ControlledMenu>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavItem;
