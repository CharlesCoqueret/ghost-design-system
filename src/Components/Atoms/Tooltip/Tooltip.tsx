import React, { CSSProperties, ReactElement } from 'react';

import Tippy from '@tippyjs/react';

import { MenuDirectionEnum } from './types';

export interface ITooltipProps {
  /** Tooltip has arrow (optional, default: true) */
  arrow?: boolean;
  /** Delay for the tooltip in ms (optional, default: 0) */
  delay?: number;
  /** Should the tooltip be enabled (optional, default: false) */
  disabled?: boolean;
  /** Direction of the tooltip (optional, default: bottom) */
  direction?: MenuDirectionEnum;
  /** Childre node (optional, default: undefined) */
  children: ReactElement;
  /** Tooltip content (optional, default: undefined) */
  tooltip?: string | ReactElement;
}

export interface ITooltipStates {
  visible: boolean;
  style?: CSSProperties;
}

const Tooltip = (props: ITooltipProps) => {
  const { arrow, children, delay, direction, disabled, tooltip } = props;

  if (!children) return <></>;

  if (!tooltip || disabled) return <>{children}</>;

  return (
    <Tippy content={tooltip} placement={direction} arrow={arrow} animation='fade' delay={delay}>
      {children}
    </Tippy>
  );
};

Tooltip.defaultProps = {
  arrow: true,
  delay: 0,
  disabled: false,
  direction: MenuDirectionEnum.BOTTOM,
  children: undefined,
  tooltip: undefined,
};

export default Tooltip;
