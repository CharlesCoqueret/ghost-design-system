import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './ModalFooter.module.scss';

export interface IModalFooterProps {
  /** Additional class (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const ModalFooter = (props: PropsWithChildren<IModalFooterProps>): ReactElement => {
  const { children, className, style } = props;

  return (
    <div className={classnames(styles.container, className)} style={style}>
      {children}
    </div>
  );
};

ModalFooter.defaultProps = {
  className: undefined,
  style: undefined,
};

export default ModalFooter;
