import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

export interface IRowProps {
  className?: string;
  style?: CSSProperties;
  width?: CSSProperties['width'];
}

const Row = (props: PropsWithChildren<IRowProps>): ReactElement => {
  const { children, className, style, width } = props;

  return (
    <div className={classnames(className, 'gds-row')} style={{ ...style, width: width }}>
      {React.Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};

export default Row;
