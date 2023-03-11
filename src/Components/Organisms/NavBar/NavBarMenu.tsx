import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './NavBarMenu.module.scss';

export interface INavBarMenuProps {
  /** Class for the container (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const NavBarMenu = (props: PropsWithChildren<INavBarMenuProps>): ReactElement => {
  const { children, className, style } = props;
  return (
    <div className={classnames(styles.group, className)} key='leftitems' style={style}>
      {children}
    </div>
  );
};

export default NavBarMenu;
