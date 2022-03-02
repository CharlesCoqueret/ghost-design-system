import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import { ControlledMenu, useMenuState } from '@szhsin/react-menu';

export enum MenuDirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface ITooltipProps {
  // Tooltip content (optional, default: undefined)
  tooltip?: string | ReactElement;
  // Direction of the tooltip (optional, default: bottom)
  direction?: MenuDirectionEnum;
  // Delay for the tooltip in ms (optional, default: 400)
  delay?: number;
}

const Tooltip = (props: PropsWithChildren<ITooltipProps>): ReactElement => {
  const { children, direction, tooltip } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { toggleMenu, ...menuProps } = useMenuState({ transition: true });
  let timeout: NodeJS.Timeout;

  const openTooltip = () => toggleMenu(true);
  const closeTooltip = () => toggleMenu(false);

  if (!tooltip || ((typeof tooltip === 'string' || tooltip instanceof String) && tooltip.trim() === '')) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className='tooltip-parent'
        ref={ref}
        onMouseEnter={() => {
          timeout = setTimeout(openTooltip, 400);
        }}
        onMouseLeave={() => {
          if (timeout) clearTimeout(timeout);
          closeTooltip();
        }}>
        {children}
      </div>

      <ControlledMenu
        {...menuProps}
        arrow
        align='center'
        className='tooltip-container'
        direction={direction}
        anchorRef={ref}>
        {tooltip}
      </ControlledMenu>
    </>
  );
};

Tooltip.defaultProps = {
  tooltip: undefined,
  direction: undefined,
  delay: 400,
};

export default Tooltip;
