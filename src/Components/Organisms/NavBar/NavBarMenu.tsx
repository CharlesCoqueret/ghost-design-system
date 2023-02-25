import React, { ReactElement, ReactNode } from 'react';

export interface INavBarMenuProps {
  children: ReactNode;
}

const NavBarMenu = (props: INavBarMenuProps): ReactElement => {
  const { children } = props;
  return (
    <div className='nav-bar-items-group' key='leftitems'>
      {children}
    </div>
  );
};

export default NavBarMenu;
