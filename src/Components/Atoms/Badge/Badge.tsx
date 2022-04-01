import React, { PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';
import { MenuDirectionEnum, Tooltip } from '../Tooltip';

export enum BadgeColorsEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  STATUS = 'status',
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
      <span className={classnames('gds-badge', { pill: type === 'notification' }, color, className)}>
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
