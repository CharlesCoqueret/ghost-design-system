import React, { PropsWithChildren, ReactElement } from 'react';

import styles from './ModalBody.module.scss';

const ModalBody = (props: PropsWithChildren<unknown>): ReactElement => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default ModalBody;
