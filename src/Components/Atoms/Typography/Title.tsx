import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

export interface ITitleProps {
  /** Custom classname (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Header level (optional, default: 2) */
  level?: 1 | 2 | 3;
  /** Additional style (optional, default: undefined) */
  style?: CSSProperties;
}

const Title = (props: PropsWithChildren<ITitleProps>): ReactElement => {
  const { children, className, dataTestId, ellipsis, level, style } = props;

  const HeaderTag = (level && [1, 2, 3].includes(level) ? `h${level}` : 'h2') as keyof JSX.IntrinsicElements;

  return (
    <HeaderTag
      className={classNames(styles.typography, { [styles.ellipsis]: ellipsis }, styles[HeaderTag], className)}
      data-testid={dataTestId}
      style={style}
      title={children && ellipsis && typeof children === 'string' ? children : undefined}>
      {children}
    </HeaderTag>
  );
};

Title.defaultProps = {
  className: undefined,
  ellipsis: false,
  level: 2,
  style: undefined,
};

export default Title;
