import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import classnames from 'classnames';

import SideBarSection, { ISideBarSection } from './SideBarSection';
import { SideBarContext } from './SideBarContext';

export interface ISideBarProps {
  /** Back to menu label */
  backToMenu: string;
  /** Custom class (optional, default undefined) */
  className?: string;
  /** List of sections to be displayed in the submenu (optional, default: undefined) */
  sections?: Array<ISideBarSection>;
  /** override css property (optional, default: undefined) */
  style?: CSSProperties;
  /** Keep the sidebar unfixed for demo (optional, default: false) */
  unfixed?: boolean;
}

const SideBar = (props: PropsWithChildren<ISideBarProps>): React.ReactElement => {
  const { backToMenu, children, className, sections, style, unfixed } = props;

  const [isInSubMenu, setIsInSubMenu] = useState(false);

  return (
    <nav className={classnames('sidebar-container', className, { unfixed: unfixed })} style={style}>
      <SideBarContext.Provider
        value={{
          backToMenu: backToMenu,
          isInSubMenu: isInSubMenu,
          setIsInSubMenu: setIsInSubMenu,
        }}>
        <ul className={classnames('mainmenu', { 'in-submenu': isInSubMenu })}>
          {sections &&
            sections.map((section, index) => {
              return <SideBarSection key={`section-${section.title}-${index}`} section={section} />;
            })}
          {children}
        </ul>
      </SideBarContext.Provider>
    </nav>
  );
};

SideBar.defaultProps = {
  className: undefined,
  sections: undefined,
  style: undefined,
  unfixed: false,
};

export default SideBar;
