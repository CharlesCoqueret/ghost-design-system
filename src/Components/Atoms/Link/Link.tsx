import React, { PropsWithChildren, ReactElement } from 'react';
import { NavLink, NavLinkProps, To } from 'react-router-dom';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import styles from './Link.module.scss';

export interface ILinkProps extends NavLinkProps {
  /** External link indicator (optional, default: false) */
  externalLink?: boolean;
  /** Url of the destination in a string or Location format */
  to: To;
  /** Tooltip content of the link (optional, default: undefined) */
  tooltip?: string;
}

const Link = (props: PropsWithChildren<ILinkProps>): ReactElement => {
  const { children, externalLink, to, tooltip, ...rest } = props;

  return (
    <div className={styles.container}>
      <NavLink
        to={to}
        {...rest}
        rel={externalLink ? 'noreferrer' : rest.rel}
        target={externalLink ? '_blank' : rest.target}>
        <Tooltip tooltip={tooltip}>
          <>{children}</>
        </Tooltip>
        {externalLink && <Icon icon={['fal', 'external-link']} className={styles.icon} size='1x' />}
      </NavLink>
    </div>
  );
};

Link.defaultProps = {
  externalLink: false,
  tooltip: undefined,
};

export default Link;
