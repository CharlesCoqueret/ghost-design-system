import React, { PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { NavLink, Location, useNavigate } from 'react-router-dom';

import { Icon } from '../../Atoms/Icon';
import { SideBarContext } from './SideBarContext';
import { isExternalLink } from './sidebarUtils';

/**
 * Interface of navigation item component
 */
export interface ISideBarItemProps {
  /** For test purpose only */
  dataTestId?: string;
  /** Disable the item (optional, default: false) */
  disabled?: boolean;
  /** Force external link, when internal link need to be open in another tab (optional, default: false) */
  externalLink?: boolean;
  /** Hide the item (optional, default: false) */
  hidden?: boolean;
  /** Label of the item */
  label: string;
  /** Redicrection applied on click on item */
  to: string | Location;
}

const SideBarItem = (props: PropsWithChildren<ISideBarItemProps>): ReactElement => {
  const { children, dataTestId, disabled, externalLink, hidden, label, to } = props;
  const { isInSubMenu, setIsInSubMenu, backToMenu, unfixed, width } = useContext(SideBarContext);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const navigate = useNavigate();

  const [hasSubMenu, setHasSubMenu] = useState(false);
  const [subMenuEntries, setSubMenuEntries] = useState(0);
  const [singleTo, setSingleTo] = useState(to);
  const [firstTo, setFirstTo] = useState<string | Location | undefined>(undefined);

  useEffect(() => {
    let localHasSubMenu = false;
    let localSubMenuEntries = 0;
    let localSingleTo = singleTo;
    let localFirstTo: typeof firstTo = undefined;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (
          (!('hidden' in child.props) || child.props.hidden === false) &&
          (!('disabled' in child.props) || child.props.disabled === false)
        ) {
          localHasSubMenu = true;
          localSubMenuEntries += 1;
          if ('to' in child.props) {
            localSingleTo = child.props.to;
            if (localFirstTo === undefined) {
              localFirstTo = child.props.to;
            }
          }
          return;
        }
      }
    });
    setHasSubMenu(localHasSubMenu);
    setSubMenuEntries(localSubMenuEntries);
    setSingleTo(localSingleTo);
    setFirstTo(localFirstTo);
  }, [children]);

  const toggleSubMenu = (): void => {
    setIsInSubMenu(!isInSubMenu);
    setSubMenuActive(!subMenuActive);
    if (firstTo) {
      navigate(firstTo, { replace: true });
    }
  };

  const onClickHandler = !disabled && hasSubMenu && subMenuEntries > 1 ? toggleSubMenu : undefined;

  useEffect(
    () => (): void => {
      setIsInSubMenu(false);
    },
    [],
  );

  // Is hidden
  if (hidden) return <></>;

  const targetType =
    isExternalLink(children && subMenuEntries === 1 ? singleTo : to) || externalLink ? '_blank' : undefined;

  // Is not hidden or has subitems
  return (
    <>
      <li
        className={classnames('item', { disabled: disabled || (children && subMenuEntries === 0) })}
        onClick={onClickHandler}>
        <NavLink
          className={classnames({ disabled: disabled })}
          data-testid={dataTestId}
          end={!hasSubMenu}
          target={targetType}
          to={children && subMenuEntries === 1 ? singleTo : to}>
          <div className='label'>{label}</div>
          {externalLink && <Icon icon={['fal', 'external-link']} className='external-link' />}
          {!disabled && hasSubMenu && subMenuEntries > 1 && (
            <Icon icon={['fal', 'chevron-right']} className='chevron-right' />
          )}
        </NavLink>
      </li>
      {hasSubMenu && subMenuEntries > 1 && (
        <ul
          className={classnames('submenu', { visible: subMenuActive })}
          style={{ width: width, left: unfixed ? width : subMenuActive ? '0px' : width }}>
          <li className='back' onClick={toggleSubMenu}>
            <div className='label'>
              <Icon icon={['fal', 'chevron-left']} className='chevron-left' />
              {backToMenu}
            </div>
          </li>
          <div className='sidebar-divider' />
          {children}
        </ul>
      )}
    </>
  );
};

SideBarItem.defaultProps = {
  dataTestId: undefined,
  disabled: false,
  externalLink: false,
  hidden: false,
};

export default SideBarItem;
