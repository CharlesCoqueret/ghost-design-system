import React, { CSSProperties, ReactElement } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './NavBarBrand.module.scss';

export interface IBrandProps {
  /** Alternative to the logo in text format (optional, default: 'logo') */
  alt?: string;
  /** Logo class (optional, default: undefined) */
  logoClassName?: string;
  /** Logo positionned at the top right corner of the app */
  logoSource: string;
  /** Logo custom style (optional, default: undefined) */
  logoStyle?: CSSProperties;
  /** Link on click on the logo (optional, default: '') */
  redirection?: string;
}

const NavBarBrand = (props: IBrandProps): ReactElement => {
  const { alt, logoClassName, logoSource, logoStyle, redirection } = props;
  return (
    <NavLink to={redirection || NavBarBrand.defaultProps.redirection} className={styles.brand}>
      <img
        alt={alt || NavBarBrand.defaultProps.alt}
        className={classnames(styles.brandLogo, logoClassName)}
        src={logoSource}
        style={logoStyle}
      />
    </NavLink>
  );
};

NavBarBrand.defaultProps = {
  alt: 'logo',
  logoClassName: undefined,
  logoStyle: undefined,
  redirection: '/',
};

export default NavBarBrand;
