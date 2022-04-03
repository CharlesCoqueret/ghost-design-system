import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import { Portal } from '../Portal';
import { computePosition, MenuDirectionEnum } from './tooltipUtils';

export interface ITooltipProps {
  /** Tooltip has arrow (optional, default: true) */
  arrow?: boolean;
  /** Custom classname (optional, default: undefined) */
  className?: string;
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
  /** Additional style (optional, deafault: undefined) */
  style?: CSSProperties;
  /** Tooltip content (optional, default: undefined) */
  tooltip?: string;
}

export interface ITooltipStates {
  visible: boolean;
  style?: CSSProperties;
}

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
          className={this.props.className}
          onMouseOver={this.showTooltip}
          onMouseOut={this.hideTooltip}
          onClick={this.hideTooltip}
          ref={(el) => (this.trigger = el)}
          style={this.props.style}>
          {this.props.children}
        </span>
        <Portal>
          <div
            className={classnames('gds-tooltip', this.direction)}
            ref={(el) => (this.tooltip = el)}
            style={{ ...this.state.style, opacity: this.state.visible ? 1 : 0 }}>
            {this.arrow && <div className='tooltip-arrow' />}
            <div className='tooltip-label'>{this.props.tooltip}</div>
          </div>
        </Portal>
      </>
    );
  }
}

export default Tooltip;
