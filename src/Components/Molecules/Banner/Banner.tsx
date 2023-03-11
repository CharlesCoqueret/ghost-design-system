import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Banner.module.scss';

export enum BannerType {
  ERROR = 'error',
  INFORMATION = 'information',
  WARNING = 'warning',
}

export interface IBannerProps {
  /** Class for the container (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
  /** Banner type (optional, default: BannerType.INFORMATION )*/
  type?: BannerType;
}

const Banner = (props: PropsWithChildren<IBannerProps>): ReactElement => {
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
      {children}
    </div>
  );
};

Banner.defaultProps = {
  className: undefined,
  style: undefined,
  type: BannerType.INFORMATION,
};

export default Banner;
