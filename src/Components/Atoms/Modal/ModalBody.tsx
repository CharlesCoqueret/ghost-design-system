import React, { PropsWithChildren, ReactElement } from 'react';

const ModalBody = (props: PropsWithChildren<unknown>): ReactElement => {
  const { children } = props;

  return <div className='modal-body'>{children}</div>;
};

export default ModalBody;
