import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

export interface ITitleProps {
  /** custom classname */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Header level (optional, default: 3) */
  level?: 1 | 2 | 3;
  /** Additional style (optional, default: undefined) */
  style?: CSSProperties;
  /** Click handler (options, default: undefined) */
  onClick?: () => void;
}

const Title = (props: PropsWithChildren<ITitleProps>): ReactElement => {
  const { children, className, dataTestId, ellipsis, level, onClick, style } = props;

  const HeaderTag = `h${level || 3}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderTag
      className={classNames(styles.typography, { [styles.ellipsis]: ellipsis }, styles[`h${level || 3}`], className)}
      data-testid={dataTestId}
      onClick={onClick}
      style={style}
      title={children && ellipsis && typeof children === 'string' ? children : undefined}>
      {children}
    </HeaderTag>
  );
};

Title.defaultProps = {
  className: undefined,
  ellipsis: false,
  style: undefined,
};

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
  /** custom classname */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Click handler (options, default: undefined) */
  onClick?: () => void;
  /** Additional style */
  style?: CSSProperties;
  /** Type of text (optional, default: TextTypeEnum.BODY)*/
  type?: TextTypeEnum | Array<TextTypeEnum | undefined>;
}

const Text = (props: PropsWithChildren<ITextProps>): ReactElement => {
  const { children, className, dataTestId, ellipsis, onClick, style, type } = props;

  const isLink = onClick !== undefined;

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
        [styles.link]: isLink,
        [styles.placeholder]:
          type &&
          (type === TextTypeEnum.PLACEHOLDER || (Array.isArray(type) && type.includes(TextTypeEnum.PLACEHOLDER))),
        [styles.tiny]:
          type && (type === TextTypeEnum.TINY || (Array.isArray(type) && type.includes(TextTypeEnum.TINY))),
      })}
      data-testid={dataTestId}
      onClick={onClick}
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

const Typography = {
  Title: Title,
  Text: Text,
};

export default Typography;
