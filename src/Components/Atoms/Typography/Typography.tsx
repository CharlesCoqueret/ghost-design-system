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

  const HeaderTag = `h${level || 3}`;

  return <HeaderTag {...innerProps}>{children}</HeaderTag>;
};
Title.defaultProps = {
  ellipsis: false,
  style: undefined,
};

export enum TextTypeEnum {
  BODY = 'body',
  TINY = 'tiny',
  LABEL = 'label',
  PLACEHOLDER = 'placeholder',
  HELPER = 'helper',
  ERROR = 'error',
}

export interface ITextProps {
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Click handler (options, default: undefined) */
  onClick?: () => void;
  /** Additional style */
  style?: CSSProperties;
  /** Type of text (optional, default: TextTypeEnum.BODY)*/
  type?: TextTypeEnum;
}

const Text = (props: PropsWithChildren<ITextProps>): ReactElement => {
  const { children, ellipsis, onClick, style, type } = props;

  const isLink = onClick !== undefined;

  return (
    <span
      className={classNames('typography', {
        ellipsis: ellipsis,
        link: isLink,
        tiny: type === TextTypeEnum.TINY,
        label: type === TextTypeEnum.LABEL,
        placeholder: type === TextTypeEnum.PLACEHOLDER,
        helper: type === TextTypeEnum.HELPER,
        error: type === TextTypeEnum.ERROR,
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
