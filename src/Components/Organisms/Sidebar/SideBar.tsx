import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import classnames from 'classnames';

import { SideBarContext } from './SideBarContext';

export interface ISideBarProps {
  /** Back to menu label */
  backToMenu: string;
  /** Custom class (optional, default undefined) */
  className?: string;
  /** Height of the sidebar (optional, default: '100%') */
  height?: CSSProperties['height'];
  /** override css property (optional, default: undefined) */
  style?: CSSProperties;
  /** whether the sidebar can be used unfixed for demo mostyly (optional, default: false) */
  unfixed?: boolean;
  /** Width of the sidebar (optional, default: '270px')*/
  width?: CSSProperties['width'];
}

const SideBar = (props: PropsWithChildren<ISideBarProps>): React.ReactElement => {
  const { backToMenu, children, className, height, style, unfixed, width } = props;

  const [isInSubMenu, setIsInSubMenu] = useState(false);

  return (
    <SideBarContext.Provider
      value={{
        backToMenu: backToMenu,
        height: height,
        isInSubMenu: isInSubMenu,
        setIsInSubMenu: setIsInSubMenu,
        unfixed: unfixed,
        width: width,
      }}>
      <nav
        className={classnames('gds-sidebar-container', { unfixed: unfixed }, { submenu: isInSubMenu }, className)}
        style={{ height: height, width: width, ...style }}>
        <ul className='sidebar' style={{ width: width, left: isInSubMenu ? `-${width}` : '0px' }}>
          {children}
        </ul>
      </nav>
    </SideBarContext.Provider>
  );
};

SideBar.defaultProps = {
  className: undefined,
  height: '100%',
  style: undefined,
  unfixed: false,
  width: '270px',
};

export default SideBar;
