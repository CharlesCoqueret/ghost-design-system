import React, { ReactElement, ReactNode } from 'react';

import styles from './NavBarUtilities.module.scss';

export interface INavBarUtilitiesProps {
  children: ReactNode;
}

/**
 * Note: the first div inside this bar serves as spacer when the utilities are alone
 */
const NavBarUtilities = (props: INavBarUtilitiesProps): ReactElement => {
  const { children } = props;
  return (
    <>
      <div key='spacer' />
      <div className={styles.group} key='rightitems'>
        {children}
      </div>
    </>
  );
};

export default NavBarUtilities;
