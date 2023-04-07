import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

export enum TextTypeEnum {
  BODY = 'body',
  DISABLED = 'disabled',
  ERROR = 'error',
  HELPER = 'helper',
  HIGHLIGHTED = 'highlighted',
  LABEL = 'label',
  PLACEHOLDER = 'placeholder',
  TINY = 'tiny',
}

export interface ITextProps {
  /** custom classname (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Additional style (optional, default: undefined) */
  style?: CSSProperties;
  /** Type of text (optional, default: TextTypeEnum.BODY) */
  type?: TextTypeEnum | Array<TextTypeEnum>;
}

const Text = (props: PropsWithChildren<ITextProps>): ReactElement => {
  const { children, className, dataTestId, ellipsis, style, type } = props;

  return (
    <span
      className={classNames(styles.typography, className, {
        [styles.ellipsis]: ellipsis,
        [styles.error]:
          type && (type === TextTypeEnum.ERROR || (Array.isArray(type) && type.includes(TextTypeEnum.PLACEHOLDER))),
        [styles.disabled]:
          type && (type === TextTypeEnum.DISABLED || (Array.isArray(type) && type.includes(TextTypeEnum.DISABLED))),
        [styles.helper]:
          type && (type === TextTypeEnum.HELPER || (Array.isArray(type) && type.includes(TextTypeEnum.HELPER))),
        [styles.highlighted]:
          type &&
          (type === TextTypeEnum.HIGHLIGHTED || (Array.isArray(type) && type.includes(TextTypeEnum.HIGHLIGHTED))),
        [styles.label]:
          type && (type === TextTypeEnum.LABEL || (Array.isArray(type) && type.includes(TextTypeEnum.TINY))),
        [styles.placeholder]:
          type &&
          (type === TextTypeEnum.PLACEHOLDER || (Array.isArray(type) && type.includes(TextTypeEnum.PLACEHOLDER))),
        [styles.tiny]:
          type && (type === TextTypeEnum.TINY || (Array.isArray(type) && type.includes(TextTypeEnum.TINY))),
      })}
      data-testid={dataTestId}
      style={style}
      title={children && ellipsis && typeof children === 'string' ? children : undefined}>
      {children}
    </span>
  );
};

Text.defaultProps = {
  ellipsis: false,
  onClick: undefined,
  style: undefined,
  type: TextTypeEnum.BODY,
};

export default Text;
