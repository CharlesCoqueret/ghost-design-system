import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';

export interface ITitleProps {
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Header level */
  level: 1 | 2 | 3;
  /** Additional style (optional, default: undefined) */
  style?: CSSProperties;
}

const Title = (props: PropsWithChildren<ITitleProps>): ReactElement => {
  const { children, ellipsis, level, style } = props;

  const innerProps = { className: classNames('typography', { ellipsis: ellipsis }), style: style };

  const HeaderTag = `h${level || 3}` as keyof JSX.IntrinsicElements;

  return <HeaderTag {...innerProps}>{children}</HeaderTag>;
};
Title.defaultProps = {
  ellipsis: false,
  style: undefined,
};

export enum TextTypeEnum {
  BODY = 'body',
  ERROR = 'error',
  DISABLED = 'disabled',
  HELPER = 'helper',
  HIGHLIGHTED = 'highlighted',
  LABEL = 'label',
  PLACEHOLDER = 'placeholder',
  TINY = 'tiny',
}

export interface ITextProps {
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
  const { children, ellipsis, onClick, style, type } = props;

  const isLink = onClick !== undefined;

  return (
    <span
      className={classNames('typography', {
        ellipsis: ellipsis,
        error: type === TextTypeEnum.ERROR || (Array.isArray(type) && type?.includes(TextTypeEnum.PLACEHOLDER)),
        disabled: type === TextTypeEnum.DISABLED || (Array.isArray(type) && type?.includes(TextTypeEnum.DISABLED)),
        helper: type === TextTypeEnum.HELPER || (Array.isArray(type) && type?.includes(TextTypeEnum.HELPER)),
        highlighted:
          type === TextTypeEnum.HIGHLIGHTED || (Array.isArray(type) && type?.includes(TextTypeEnum.HIGHLIGHTED)),
        label: type === TextTypeEnum.LABEL || (Array.isArray(type) && type?.includes(TextTypeEnum.TINY)),
        link: isLink,
        placeholder:
          type === TextTypeEnum.PLACEHOLDER || (Array.isArray(type) && type?.includes(TextTypeEnum.PLACEHOLDER)),
        tiny: type === TextTypeEnum.TINY || (Array.isArray(type) && type?.includes(TextTypeEnum.TINY)),
      })}
      style={style}>
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

export { Title, Text };
export default Typography;
