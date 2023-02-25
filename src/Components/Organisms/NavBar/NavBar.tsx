import React, { PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import NavBarBrand, { IBrandProps } from './NavBarBrand';

import styles from './NavBar.module.scss';

export interface INavBarProps extends IBrandProps {
  /** Classname to be propagated to the top level container (options, default: undefined) */
  className?: string;
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
