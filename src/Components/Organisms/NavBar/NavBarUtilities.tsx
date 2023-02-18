import React, { ReactElement, ReactNode } from 'react';

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
      <div />
      <div className='nav-bar-items-group' key='rightitems'>
        {children}
      </div>
    </>
  );
};

export default NavBarUtilities;
