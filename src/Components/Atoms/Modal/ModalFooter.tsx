import React, { PropsWithChildren, ReactElement } from 'react';

import styles from './ModalFooter.module.scss';

const ModalFooter = (props: PropsWithChildren<unknown>): ReactElement => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default ModalFooter;
