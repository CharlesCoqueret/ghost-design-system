import React, { ReactElement, ReactNode } from 'react';

import styles from './NavBarMenu.module.scss';

export interface INavBarMenuProps {
  children: ReactNode;
}

const NavBarMenu = (props: INavBarMenuProps): ReactElement => {
  const { children } = props;
  return (
    <div className={styles.group} key='leftitems'>
      {children}
    </div>
  );
};

export default NavBarMenu;
