import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import { Icon, IconProp } from '../../Atoms/Icon';

import styles from './Alert.module.scss';

const iconForAlert = (type?: AlertType): IconProp => {
  switch (type) {
    default:
    case AlertType.INFORMATION:
      return ['fal', 'info-circle'];
    case AlertType.WARNING:
      return ['fal', 'warning'];
    case AlertType.ERROR:
      return ['fal', 'times-circle'];
  }
};

export enum AlertType {
  ERROR = 'error',
  INFORMATION = 'information',
  WARNING = 'warning',
}

export interface IAlertProps {
  /** Class for the container (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
  /** Alert type (optional, default: AlertType.INFORMATION )*/
  type?: AlertType;
}

const Alert = (props: PropsWithChildren<IAlertProps>): ReactElement => {
  const { children, className, style, type } = props;

  if (!children) return <></>;

  return (
    <div
      className={classnames(
        styles.container,
        {
          [styles[type as string]]: true,
        },
        className,
      )}
      style={style}>
      <span className={styles.icon}>
        <Icon icon={iconForAlert(type)} size='lg' />
      </span>
      <span>{children}</span>
    </div>
  );
};

Alert.defaultProps = {
  className: undefined,
  style: undefined,
  type: AlertType.INFORMATION,
};

export default Alert;
