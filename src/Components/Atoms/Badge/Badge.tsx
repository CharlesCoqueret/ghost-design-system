import React, { PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';
import { MenuDirectionEnum, Tooltip } from '../Tooltip';

import styles from './Badge.module.scss';

export enum BadgeColorsEnum {
  DANGER = 'danger',
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  STATUS = 'status',
  SUCCESS = 'success',
  TERTIARY = 'tertiary',
  WARNING = 'warning',
}

export interface IBadgeProps {
  type?: 'notification' | 'indicator';
  className?: string;
  color?: BadgeColorsEnum;
  tooltip?: string;
  tooltipDirection?: MenuDirectionEnum;
}

const Badge = (props: PropsWithChildren<IBadgeProps>): ReactElement => {
  const { type, children, className, color, tooltip, tooltipDirection } = props;

  if (!children || (typeof children === 'string' && children.trim() === '')) return <></>;

  return (
    <Tooltip tooltip={tooltip} direction={tooltipDirection}>
      <span
        className={classnames(
          styles.default,
          { [styles.pill]: type === 'notification' },
          styles[color as string],
          className,
        )}>
        {typeof children === 'string' ? children.trim() : children}
      </span>
    </Tooltip>
  );
};

Badge.defaultProps = {
  type: 'indicator',
  color: BadgeColorsEnum.SECONDARY,
};

export default Badge;
