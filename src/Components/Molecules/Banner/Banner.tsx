import React, { PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Banner.module.scss';

export enum BannerType {
  INFORMATION = 'information',
}

export interface IBannerProps {
  /** Banner type (optional, default: BannerType.INFORMATION )*/
  type?: BannerType;
}

const Banner = (props: PropsWithChildren<IBannerProps>): ReactElement => {
  const { children, type } = props;

  if (!children) return <></>;

  return (
    <div
      className={classnames(styles.container, {
        [styles[type as string]]: true,
      })}>
      {children}
    </div>
  );
};

Banner.defaultProps = {
  type: BannerType.INFORMATION,
};

export default Banner;
