import React, { CSSProperties, PropsWithChildren, ReactElement, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useWindowSize } from '../../../hooks';
import { Tooltip } from '../Tooltip';

export interface ITitleProps {
  /** custom classname */
  className?: string;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Header level */
  level: 1 | 2 | 3;
  /** Additional style (optional, default: undefined) */
  style?: CSSProperties;
  /** Click handler (options, default: undefined) */
  onClick?: () => void;
}

const Title = (props: PropsWithChildren<ITitleProps>): ReactElement => {
  const { children, className, ellipsis, level, onClick, style } = props;

  const innerProps = { className: classNames('gds-typography', className, { ellipsis: ellipsis }), style: style };

  const HeaderTag = `h${level || 3}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderTag {...innerProps} onClick={onClick}>
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
  ERROR = 'error',
  DISABLED = 'disabled',
  HELPER = 'helper',
  HIGHLIGHTED = 'highlighted',
  LABEL = 'label',
  PLACEHOLDER = 'placeholder',
  TINY = 'tiny',
}

export interface ITextProps {
  /** custom classname */
  className?: string;
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
  const { children, className, ellipsis, onClick, style, type } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);

  const isLink = onClick !== undefined;
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    if (!ref.current || !ellipsis) return;
    setOverflows(ref.current.scrollWidth > ref.current.clientWidth);
  }, [ref, width]);

  return (
    <Tooltip tooltip={children?.toString()} disabled={!(ellipsis && overflows)}>
      <span
        ref={ref}
        className={classNames('gds-typography', className, {
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
    </Tooltip>
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
