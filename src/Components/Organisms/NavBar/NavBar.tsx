import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import NavBarBrand, { IBrandProps } from './NavBarBrand';

import styles from './NavBar.module.scss';

export interface INavBarProps extends IBrandProps {
  /** Class for the container (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const NavBar = (props: PropsWithChildren<INavBarProps>): ReactElement => {
  const { alt, children, className, logoSource, redirection } = props;

  return (
    <nav className={classnames(styles.container, className)}>
      <NavBarBrand alt={alt} logoSource={logoSource} redirection={redirection} key='brand' />
      <div className={styles.itemsContainer} key='items'>
        {children}
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
