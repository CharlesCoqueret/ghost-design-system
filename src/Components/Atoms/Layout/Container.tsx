import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

export interface IContainerProps {
  className?: string;
  style?: CSSProperties;
}

const Container = (props: PropsWithChildren<IContainerProps>): ReactElement => {
  const { children, className, style } = props;

  return (
    <div className={classnames(className, 'gds-layout-container')} style={style}>
      {children}
    </div>
  );
};

export default Container;
