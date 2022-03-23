import React, { MouseEvent, ReactElement, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { NavLink, useNavigate, Location } from 'react-router-dom';

import { Icon } from '../../Atoms';
import { SideBarContext } from './SideBarContext';

export interface ISideBarItem {
  /** For test purpose only */
  dataTestId?: string;
  /** Disable the item (optional, default: false) */
  disabled?: boolean;
  /** Force external link, when internal link need to be open in another tab (optional, default: false) */
  externalLink?: boolean;
  /** Hide the item (optional, default: false) */
  hidden?: boolean;
  /** Label of the item */
  label: string;
  /** SubItems under the item (optional, default: undefined) */
  subItems?: Array<ISideBarItem>;
  /** Redicrection applied on click on item */
  to: string | Location;
}

export interface ISideBarSection {
  /** Disable the section, visible, but no interaction (optional, default: false) */
  disabled?: boolean;
  /** Label of the section (optional, default: undefined) */
  title?: string;
  /** Hide the section and the its items (optional, default: false) */
  hidden?: boolean;
  /** Add divider to the section (optional, default: false) */
  divider?: boolean;
  /** Items inside the section */
  items: Array<ISideBarItem>;
}

/**
 * Converts a Location of string to full path
 *
 * @param location string or Location object
 * @returns full path
 */
const locationString = (location: string | Location): string => {
  if (typeof location === 'string') {
    return location;
  }
  return location.pathname;
};

/**
 * Inidicates if the url is an external link
 *
 * @param url string or Location object
 * @returns true if the link is an external link
 */
const isExternalLink = (url: string | Location): boolean => {
  const tmp = document.createElement('a');
  tmp.href = locationString(url);
  return tmp.host !== window.location.host;
};

export interface ISideBarSectionProps {
  /** Items inside the section */
  section: ISideBarSection;
}

export const SideBarSection = (props: ISideBarSectionProps): ReactElement => {
  const { section } = props;
  const { divider, title, hidden, items } = section;

  return (
    <>
      {!hidden && divider && <div className='sidebar-divider' />}
      {!hidden && title && <div className='title'>{title}</div>}
      {!hidden &&
        items &&
        items.map((item) => {
          return <SideBarItem key={item.label} item={item} />;
        })}
    </>
  );
};

/**
 * Interface of navigation item component
 */
export interface ISideBarItemProps {
  item: ISideBarItem;
}

export const SideBarItem = (props: ISideBarItemProps): ReactElement => {
  const { item } = props;
  const { dataTestId, disabled, externalLink, hidden, label, subItems: subitems, to } = item;
  const { isInSubMenu, setIsInSubMenu, backToMenu } = useContext(SideBarContext);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const navigate = useNavigate();

  const targetType = isExternalLink(item.to) || externalLink ? '_blank' : undefined;

  const toggleSubMenu = (): void => {
    if (!disabled) {
      setIsInSubMenu(!isInSubMenu);
      setSubMenuActive(!subMenuActive);
    }
  };

  const hasSubitems = subitems && subitems.filter((item) => !item.hidden).length > 0;
  const onClickHandler = !disabled && hasSubitems ? toggleSubMenu : undefined;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (hasSubitems && !disabled) {
      event.preventDefault();
      navigate(locationString(subitems[0].to));
    }
  };

  useEffect(
    () => (): void => {
      setIsInSubMenu(false);
    },
    [],
  );

  // Is hidden
  if (hidden) return <></>;

  // Has unique subitem
  if (subitems && subitems.filter((item) => !item.hidden).length === 1) {
    return <SideBarItem item={{ label: label, to: subitems[0].to, hidden: hidden, disabled: disabled }} />;
  }

  // Is not hidden or has subitems
  return (
    <>
      <li className={`item ${disabled ? 'disabled' : ''}`} onClick={onClickHandler}>
        <NavLink
          className={classnames({ disabled: disabled })}
          data-testid={dataTestId}
          end={!subitems}
          onClick={handleClick}
          target={targetType}
          to={to}>
          <div className='label'>{label}</div>
          {externalLink && <Icon icon={['fal', 'external-link']} className='external-link' />}
          {!disabled && hasSubitems && <Icon icon={['fal', 'chevron-right']} className='chevron-right' />}
        </NavLink>
      </li>
      {hasSubitems && (
        <ul className={classnames('submenu', { 'in-submenu': subMenuActive })}>
          <li className='back' onClick={toggleSubMenu}>
            <div className='label'>
              <Icon icon={['fal', 'chevron-left']} className='chevron-left' />
              {backToMenu}
            </div>
          </li>
          <div className='sidebar-divider' />
          {subitems.map((item, index) => (
            <SideBarItem key={`item-${item.label}-${index}`} item={item} />
          ))}
        </ul>
      )}
    </>
  );
};

export default SideBarSection;
