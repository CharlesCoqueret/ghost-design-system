import React, { CSSProperties } from 'react';
import classnames from 'classnames';

import styles from './Separator.module.scss';

export interface ISeparatorProps {
  /** Additional class (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const Separator = (props: ISeparatorProps) => {
  const { className, style } = props;
  return <hr className={classnames(styles.footer, className)} style={style} />;
};

Separator.defaultProps = {
  className: undefined,
  style: undefined,
};

export default Separator;
