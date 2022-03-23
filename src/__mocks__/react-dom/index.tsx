import React, { ReactNode, ReactPortal } from 'react';
import ReactDom from 'react-dom';

const mockCreatePortal = (children: ReactNode) => {
  return (<div>{children}</div>) as ReactPortal;
};

ReactDom.createPortal = mockCreatePortal;

module.exports = ReactDom;
