import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Col.module.scss';

export interface IColProps {
  /** Additional class (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const Col = (props: PropsWithChildren<IColProps>): ReactElement => {
  const { children, className, style } = props;

  return (
    <div className={classnames(styles.col, className)} style={style}>
      {children}
    </div>
  );
};

export default Col;
