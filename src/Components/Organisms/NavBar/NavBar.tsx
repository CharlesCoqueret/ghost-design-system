import React, { ReactElement } from 'react';
import NavItem, { INavItemProps } from './NavItem';
import SearchBar, { ISearchBarProps } from './SearchBar';

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
  /** Navigation Buttons (on the left side) (optional, default: undefined) */
  navButtons?: Array<INavItemProps>;
  /** Navigation Buttons (on the right side) (optional, default: undefined) */
  navIcons?: Array<INavItemProps>;
  /** Search (on the right side before the navIdons) (optional, default: undefined) */
  searchBar?: ISearchBarProps;
}

const NavBar = (props: INavBarProps): ReactElement => {
  const { brand, navButtons, navIcons, searchBar } = props;

  return (
    <nav className='gds-nav-bar-container noselect'>
      <div className='nav-bar-brand'>
        <a href={brand.redirection || NavBar.defaultProps.brand.redirection}>
          <img src={brand.logoSource} alt={brand.alt ?? NavBar.defaultProps.brand.alt} />
        </a>
      </div>
      <div className='nav-bar-items-container'>
        <div className='nav-bar-items-group'>
          {navButtons?.map((navItem) => (
            <NavItem key={`menu-${navItem.label}-${navItem.icon?.toString()}`} {...navItem} />
          ))}
        </div>
        <div className='nav-bar-items-group'>
          {searchBar && <SearchBar {...searchBar} />}
          {navIcons?.map((navItem) => (
            <NavItem key={`menu-${navItem.label}-${navItem.icon?.toString()}`} {...navItem} />
          ))}
        </div>
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  brand: { redirection: '/', alt: 'logo' },
  navButtons: undefined,
  navIcons: undefined,
  searchBar: undefined,
};

export default NavBar;
