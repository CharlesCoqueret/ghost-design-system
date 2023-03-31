import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './ModalBody.module.scss';

export interface IModalBodyProps {
  /** Additional class (optional, default: undefined) */
  className?: string;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const ModalBody = (props: PropsWithChildren<IModalBodyProps>): ReactElement => {
  const { children, className, style } = props;

  return (
    <div className={classnames(styles.container, className)} style={style}>
      {children}
    </div>
  );
};

ModalBody.defaultProps = {
  className: undefined,
  style: undefined,
};

export default ModalBody;
