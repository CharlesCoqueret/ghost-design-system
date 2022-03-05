import React, { PropsWithChildren, ReactElement } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

export enum MenuDirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface ITooltipProps {
  // Tooltip content (optional, default: undefined)
  tooltip?: string;
  // Direction of the tooltip (optional, default: bottom)
  direction?: MenuDirectionEnum;
  // Delay for the tooltip in ms (optional, default: 0)
  delay?: number;
}

const Tooltip = (props: PropsWithChildren<ITooltipProps>): ReactElement => {
  const { children, direction, tooltip, delay } = props;

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement: direction,
    delayHide: delay,
    delayShow: delay,
    interactive: false,
    closeOnTriggerHidden: true,
    trigger: ['hover', 'click'],
  });

  if (!tooltip || tooltip?.trim() === '') {
    return <>{children}</>;
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ref: setTriggerRef,
          });
        }
        return child;
      })}

      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          {tooltip}
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
        </div>
      )}
    </>
  );
};

Tooltip.defaultProps = {
  tooltip: undefined,
  direction: undefined,
  delay: 0,
};

export default Tooltip;
