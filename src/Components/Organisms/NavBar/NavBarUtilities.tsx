import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './NavBarUtilities.module.scss';

export interface INavBarUtilitiesProps {
  /** Class for the container (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

/**
 * Note: the first div inside this bar serves as spacer when the utilities are alone
 */
const NavBarUtilities = (props: PropsWithChildren<INavBarUtilitiesProps>): ReactElement => {
  const { children, className, style } = props;
  return (
    <>
      <div key='spacer' />
      <div className={classnames(styles.group, className)} key='rightitems' style={style}>
        {children}
      </div>
    </>
  );
};

export default NavBarUtilities;
