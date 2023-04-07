import React from 'react';
import classnames from 'classnames';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import styles from './Loader.module.scss';

export interface ILoaderProps {
  className?: string;
  size?: SizeProp;
  dataTestId?: string;
}

const Loader = (props: ILoaderProps) => {
  const { className, size, ...rest } = props;

  return (
    <svg
      {...rest}
      aria-hidden='true'
      focusable='false'
      role='img'
      className={classnames(styles.icon, styles[`size-${size}`], className)}
      viewBox='0 0 100 100'
      width='50'
      height='50'
      style={{ background: 'transparent' }}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid'>
      <circle cx='50' cy='50' r='30' stroke='currentColor' strokeWidth='10' strokeLinecap='round' fill='transparent'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='2s'
          values='0 50 50;180 50 50;720 50 50'
          keyTimes='0;0.5;1'
        />
        <animate
          attributeName='stroke-dasharray'
          repeatCount='indefinite'
          dur='2s'
          values='20 150; 150 20; 20 150'
          keyTimes='0;0.5;1'
        />
      </circle>
    </svg>
  );
};

Loader.defaultProps = {
  size: '1x',
};

export default Loader;
