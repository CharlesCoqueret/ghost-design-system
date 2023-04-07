import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Row.module.scss';

export interface IRowProps {
  /** Additional class (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const Row = (props: PropsWithChildren<IRowProps>): ReactElement => {
  const { children, className, style } = props;

  return (
    <div className={classnames(styles.row, className)} style={style}>
      {children}
    </div>
  );
};

export default Row;
