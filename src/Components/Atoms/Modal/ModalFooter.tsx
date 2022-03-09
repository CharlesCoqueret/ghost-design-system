import React, { PropsWithChildren, ReactElement } from 'react';

const ModalFooter = (props: PropsWithChildren<unknown>): ReactElement => {
  const { children } = props;

  return <div className='modal-footer'>{children}</div>;
};

export default ModalFooter;
