import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

export interface IColProps {
  className?: string;
  height?: CSSProperties['height'];
}

const Col = (props: PropsWithChildren<IColProps>): ReactElement => {
  const { children, className, height } = props;

  return (
    <div className={classnames(className, 'col')} style={{ height: height }}>
      {React.Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Col;
