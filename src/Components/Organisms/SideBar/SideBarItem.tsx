import React, { PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { LocationDescriptor } from 'history';
import { NavLink, useNavigate } from 'react-router-dom';
import get from 'lodash/get';

import { Icon } from '../../Atoms/Icon';
import { SideBarContext } from './SideBarContext';

import styles from './SideBarItem.module.scss';

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
  /** Redirection applied on click on item */
  to: LocationDescriptor;
  /** Route should be exact for this item (optional, default: true)  */
  exact?: boolean;
}

const SideBarItem = (props: PropsWithChildren<ISideBarItemProps>): ReactElement => {
  const { children, dataTestId, disabled, externalLink, hidden, label, to, exact } = props;
  const { isInSubMenu, setIsInSubMenu, backToMenu, unfixed, width } = useContext(SideBarContext);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const navigate = useNavigate();

  const [hasSubMenu, setHasSubMenu] = useState(false);
  const [subMenuEntries, setSubMenuEntries] = useState(0);
  const [singleTo, setSingleTo] = useState(to);
  const [firstTo, setFirstTo] = useState<LocationDescriptor | undefined>(undefined);

  useEffect(() => {
    let localHasSubMenu = false;
    let localSubMenuEntries = 0;
    let localSingleTo = singleTo;
    let localFirstTo: typeof firstTo = undefined;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (
          (!('hidden' in child.props) || get(child.props, 'hidden', true) === false) &&
          (!('disabled' in child.props) || get(child.props, 'disabled', true) === false)
        ) {
          localHasSubMenu = true;
          localSubMenuEntries += 1;
          if ('to' in child.props) {
            localSingleTo = get(child.props, 'to', '') as string;
            if (localFirstTo === undefined) {
              localFirstTo = get(child.props, 'to', '') as string;
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
      navigate(firstTo);
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

  const targetType = externalLink ? '_blank' : undefined;

  // Is not hidden or has subitems
  return (
    <>
      <li
        className={classnames(styles.item, { [styles.disabled]: disabled || (children && subMenuEntries === 0) })}
        onClick={onClickHandler}>
        <NavLink
          className={classnames({ [styles.disabled]: disabled })}
          data-testid={dataTestId}
          end={exact === true && !hasSubMenu}
          target={targetType}
          to={children && subMenuEntries === 1 ? singleTo : to}>
          <div className={styles.label}>{label}</div>
          {externalLink && <Icon icon={['fal', 'external-link']} size='sm' className={styles.externalLink} />}
          {!disabled && hasSubMenu && subMenuEntries > 1 && (
            <Icon icon={['fal', 'chevron-right']} size='lg' className={styles.chevronRight} />
          )}
        </NavLink>
      </li>
      {hasSubMenu && subMenuEntries > 1 && (
        <ul
          className={classnames(styles.submenu, { [styles.visible]: subMenuActive, [styles.unfixed]: unfixed })}
          style={{ width: width, left: unfixed ? width : subMenuActive ? '0px' : width }}>
          <li className={styles.back} onClick={toggleSubMenu}>
            <div className={styles.label}>
              <Icon icon={['fal', 'chevron-left']} size='lg' className={styles.chevronLeft} />
              {backToMenu}
            </div>
          </li>
          <div className={styles.divider} />
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
  exact: true,
} as Partial<ISideBarItemProps>;

export default SideBarItem;
