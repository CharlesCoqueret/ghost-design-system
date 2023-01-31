import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Row.module.scss';

export interface IRowProps {
  className?: string;
  style?: CSSProperties;
  width?: CSSProperties['width'];
}

const Row = (props: PropsWithChildren<IRowProps>): ReactElement => {
  const { children, className, style, width } = props;

  return (
    <div className={classnames(styles.row, className)} style={{ width: width, ...style }}>
      {children}
    </div>
  );
};

export default Row;
