import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

export enum MenuDirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

const MenuDirectionOrder = [
  MenuDirectionEnum.TOP,
  MenuDirectionEnum.RIGHT,
  MenuDirectionEnum.BOTTOM,
  MenuDirectionEnum.LEFT,
];

export interface ITooltipProps {
  /** Tooltip has arrow (optional, default: true) */
  arrow?: boolean;
  /** Delay for the tooltip in ms (optional, default: 0) */
  delay?: number;
  /** Direction of the tooltip (optional, default: bottom) */
  direction?: MenuDirectionEnum;
  /** Extra margin for position computation (optional, default: 0) */
  extraMargin?: number;
  /** Maximum width of the tooltip (optional, default: 256) */
  maxWidth?: number;
  /** Childre node (optional, default: undefined) */
  children: ReactNode;
  /** Tooltip content (optional, default: undefined) */
  tooltip?: string;
}

export interface ITooltipStates {
  visible: boolean;
  style?: CSSProperties;
}

const computePosition = (
  preferedDirection: MenuDirectionEnum,
  triggerDimensions: DOMRect,
  tooltipDimensions: DOMRect,
  extraMargin: number,
  arrow: boolean,
): { left: number; top: number; direction: MenuDirectionEnum } => {
  const results = {
    [MenuDirectionEnum.TOP]: {
      left: triggerDimensions.left + triggerDimensions.width / 2 - tooltipDimensions.width / 2,
      top: triggerDimensions.top - tooltipDimensions.height - extraMargin,
    },
    [MenuDirectionEnum.RIGHT]: {
      left: triggerDimensions.left + triggerDimensions.width + extraMargin,
      top: triggerDimensions.top + triggerDimensions.height / 2 - tooltipDimensions.height / 2,
    },
    [MenuDirectionEnum.BOTTOM]: {
      left: triggerDimensions.left + triggerDimensions.width / 2 - tooltipDimensions.width / 2,
      top: triggerDimensions.top + triggerDimensions.height + extraMargin,
    },
    [MenuDirectionEnum.LEFT]: {
      left: triggerDimensions.left - tooltipDimensions.width - extraMargin,
      top: triggerDimensions.top + triggerDimensions.height / 2 - tooltipDimensions.height / 2,
    },
  };

  const fitMap = MenuDirectionOrder.filter((direction) => {
    return (
      results[direction].left > 0 &&
      results[direction].left + tooltipDimensions.width <= screen.availWidth &&
      results[direction].top > 0 &&
      results[direction].top + tooltipDimensions.height <= screen.availHeight
    );
  });

  // Check prefered direction
  if (fitMap.length === 0 || fitMap.indexOf(preferedDirection) >= 0) {
    return { ...results[preferedDirection], direction: preferedDirection };
  }

  // Check opposite to prefered direction
  const oppositeToPreferedDirection = MenuDirectionOrder[(MenuDirectionOrder.indexOf(preferedDirection) + 2) % 4];
  if (fitMap.indexOf(oppositeToPreferedDirection) >= 0) {
    return { ...results[oppositeToPreferedDirection], direction: oppositeToPreferedDirection };
  }

  const fitingDirection = fitMap[0];
  return { ...results[fitingDirection], direction: fitingDirection };
};

class Tooltip extends React.PureComponent<ITooltipProps, ITooltipStates> {
  arrow: boolean;
  direction: MenuDirectionEnum;
  extraMargin: number;
  maxWidth: number;
  tooltip: HTMLSpanElement | null;
  trigger: HTMLSpanElement | null;

  constructor(props: ITooltipProps) {
    super(props);

    this.arrow = props.arrow === undefined ? true : props.arrow;
    this.direction = props.direction || MenuDirectionEnum.BOTTOM;
    this.extraMargin = props.extraMargin === undefined ? 0 : props.extraMargin;
    this.maxWidth = props.maxWidth === undefined ? 256 : props.maxWidth;
    this.tooltip = null;
    this.trigger = null;

    this.state = {
      visible: false,
      style: {
        left: -99999,
        top: -99999,
      },
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip(): void {
    if (!this.trigger || !this.tooltip) return;

    const triggerDimensions = this.trigger.getBoundingClientRect();
    const tooltipDimensions = this.tooltip.getBoundingClientRect();

    const { left, top, direction } = computePosition(
      this.direction,
      triggerDimensions,
      tooltipDimensions,
      this.extraMargin,
      this.arrow,
    );

    this.direction = direction;

    this.setState({
      visible: true,
      style: { left, top, maxWidth: this.maxWidth },
    });
  }

  hideTooltip(): void {
    this.setState({
      visible: false,
      style: {
        left: -99999,
        top: -99999,
      },
    });
  }

  render(): ReactElement {
    if (!this.props.tooltip) return <>{this.props.children}</>;

    return (
      <>
        <span
          onMouseOver={this.showTooltip}
          onMouseOut={this.hideTooltip}
          onClick={this.hideTooltip}
          ref={(el) => (this.trigger = el)}>
          {this.props.children}
        </span>

        <div
          className={classnames('tooltip', this.direction)}
          ref={(el) => (this.tooltip = el)}
          style={{ ...this.state.style, opacity: this.state.visible ? 1 : 0 }}>
          {this.arrow && <div className='tooltip-arrow' />}
          <div className='tooltip-label'>{this.props.tooltip}</div>
        </div>
      </>
    );
  }
}

export default Tooltip;
