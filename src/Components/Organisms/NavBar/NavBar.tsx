import React, { PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import NavBarBrand, { IBrandProps } from './NavBarBrand';

export interface INavBarProps extends IBrandProps {
  /** Classname to be propagated to the top level container (options, default: undefined) */
  className?: string;
}

const NavBar = (props: PropsWithChildren<INavBarProps>): ReactElement => {
  const { alt, children, className, logoSource, redirection } = props;

  return (
    <nav className={classnames('gds-nav-bar-container', 'noselect', className)}>
      <NavBarBrand alt={alt} logoSource={logoSource} redirection={redirection} />
      <div className='nav-bar-items-container' key='items'>
        {children}
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  className: undefined,
};

export default NavBar;
