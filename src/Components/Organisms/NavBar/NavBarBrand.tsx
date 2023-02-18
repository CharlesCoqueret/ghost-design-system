import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export interface IBrandProps {
  /** Logo positionned at the top right corner of the app */
  logoSource: string;
  /** Link on click on the logo (optional, default: '') */
  redirection?: string;
  /** Alternative to the logo in text format (optional, default: 'logo') */
  alt?: string;
}

const NavBarBrand = (props: IBrandProps): ReactElement => {
  const { redirection, logoSource, alt } = props;
  return (
    <NavLink to={redirection || NavBarBrand.defaultProps.redirection} className='nav-bar-brand'>
      <img src={logoSource} alt={alt ?? NavBarBrand.defaultProps.alt} className='nav-bar-brand-image' />
    </NavLink>
  );
};

NavBarBrand.defaultProps = {
  redirection: '/',
  alt: 'logo',
};

export default NavBarBrand;
