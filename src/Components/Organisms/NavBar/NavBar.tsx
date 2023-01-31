import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import NavItem, { INavItemProps } from './NavItem';
import SearchBar, { ISearchBarProps } from './SearchBar';

import styles from './NavBar.module.scss';

export interface IBrandProps {
  /** Logo positionned at the top right corner of the app */
  logoSource: string;
  /** Link on click on the logo (optional, default: '') */
  redirection?: string;
  /** Alternative to the logo in text format (optional, default: 'logo') */
  alt?: string;
}

export interface INavBarProps {
  /** Brand properties */
  brand: IBrandProps;
  /** Classname to be propagated to the top level container (options, default: undefined) */
  className?: string;
  /** Navigation Buttons (on the left side) (optional, default: undefined) */
  navButtons?: Array<INavItemProps>;
  /** Navigation Buttons (on the right side) (optional, default: undefined) */
  navIcons?: Array<INavItemProps>;
  /** Search (on the right side before the navIdons) (optional, default: undefined) */
  searchBar?: ISearchBarProps;
}

const NavBar = (props: INavBarProps): ReactElement => {
  const { brand, navButtons, navIcons, searchBar, className } = props;

  return (
    <nav className={classnames(styles.container, className)}>
      <div className={styles.brand} key='brand'>
        <NavLink to={brand.redirection || NavBar.defaultProps.brand.redirection}>
          <img src={brand.logoSource} alt={brand.alt ?? NavBar.defaultProps.brand.alt} className={styles.brandLogo} />
        </NavLink>
      </div>
      <div className={styles.itemsContainer} key='items'>
        <div className={styles.itemsGroup} key='leftitems'>
          {navButtons?.map((navItem) => (
            <NavItem key={`menu-${navItem.label || navItem.tooltip}`} {...navItem} />
          ))}
        </div>
        <div className={styles.itemsGroup} key='rightitems'>
          {searchBar && <SearchBar key='searchbar' {...searchBar} />}
          {navIcons?.map((navItem) => (
            <NavItem
              key={`menu-${
                navItem.label || (navItem.icon && Array.isArray(navItem.icon) && navItem.icon[1]) || navItem.tooltip
              }`}
              {...navItem}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  brand: { redirection: '/', alt: 'logo' },
  className: undefined,
  navButtons: undefined,
  navIcons: undefined,
  searchBar: undefined,
};

export default NavBar;
