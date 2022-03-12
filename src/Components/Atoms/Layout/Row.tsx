import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

export interface IRowProps {
  className?: string;
  width?: CSSProperties['width'];
}

const Row = (props: PropsWithChildren<IRowProps>): ReactElement => {
  const { children, className, width } = props;

  return (
    <div className={classnames(className, 'row')} style={{ width: width }}>
      {React.Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Row;
