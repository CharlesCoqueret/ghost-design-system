import React, { Fragment, ReactElement, useRef, useState } from 'react';
import { ControlledMenu, MenuDivider, MenuHeader, MenuItem } from '@szhsin/react-menu';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { Icon, IconProp } from '../../Atoms/Icon';
import { Badge, BadgeColorsEnum } from '../../Atoms/Badge';
import { Portal } from '../../Atoms/Portal';
import { Tooltip } from '../../Atoms/Tooltip';

import styles from './NavItem.module.scss';

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
        <div className={styles.item} data-testid={dataTestId} ref={ref} onClick={handleClick}>
          {link ? (
            <NavLink to={link} key='link'>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              {label && <div className={styles.label}>{label}</div>}
            </NavLink>
          ) : (
            <Fragment key='icon'>
              {icon && <Icon icon={icon} size={label ? '1x' : '2x'} />}
              {label && <div className={styles.label}>{label}</div>}
            </Fragment>
          )}
          {counter && (
            <Badge color={BadgeColorsEnum.DANGER} type='notification' className={styles.counter}>
              {isFinite(Number(counter)) && Number(counter) > 99 ? '+99' : counter}
            </Badge>
          )}
          {hasMenu && label && <Icon icon={['fas', 'caret-down']} size='lg' className={styles.caret} />}
        </div>
      </Tooltip>
      {hasMenu && (
        <Portal key='portal'>
          <ControlledMenu
            align={customInfiniteScrollConfig ? 'end' : 'center'}
            anchorRef={ref}
            arrow
            onClose={closeMenu}
            key='controlledmenu'
            state={isOpen ? 'open' : 'closed'}
            menuStyle={{ position: 'fixed' }}
            skipOpen={skipOpen}>
            {subItems?.map((item): ReactElement => {
              return (
                <NavLink to={item.link || '#'} key={item.label}>
                  <MenuItem
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
            })}
            {customSubItem}
            {customInfiniteScrollConfig && (
              <Fragment key='infinitescroll'>
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
                      customInfiniteScrollConfig.items.map((item, index) => (
                        <Fragment key={`notification-${index}`}>
                          <MenuItem>{customInfiniteScrollConfig.renderItem(item)}</MenuItem>
                          <MenuDivider />
                        </Fragment>
                      ))
                    )}
                  </InfiniteScroll>
                </div>
              </Fragment>
            )}
          </ControlledMenu>
        </Portal>
      )}
    </>
  );
};

export default NavItem;
