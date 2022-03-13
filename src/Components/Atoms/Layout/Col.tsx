import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

export interface IColProps {
  className?: string;
  height?: CSSProperties['height'];
  style?: CSSProperties;
}

const Col = (props: PropsWithChildren<IColProps>): ReactElement => {
  const { children, className, height, style } = props;

  return (
    <div className={classnames(className, 'col')} style={{ ...style, height: height }}>
      {React.Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Col;
