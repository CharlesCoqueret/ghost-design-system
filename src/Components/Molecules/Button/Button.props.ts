import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MenuAlign } from '@szhsin/react-menu';

import { MenuDirectionEnum } from '../../Atoms/Tooltip/types';
import { IItemListProps } from './ItemList';

export enum ColorButtonEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  REVERSED = 'reversed',
}

export interface IButtonProps {
  /** Custom className (optional, default: undefined) */
  className?: string;
  /** Color of the button (optional, default: ColorButtonEnum.SECONDARY) */
  color?: ColorButtonEnum;
  /** Button is disabled (optional, default: false) */
  disabled?: boolean;
  /** Dropdown alignment option (optional, default: 'end' ) */
  dropdownAlign?: MenuAlign;
  /** Icon name (optional, default: undefined) */
  icon?: IconProp;
  /** List of items to display in the dropdown on click on the button (optional, default: undefined) */
  itemList?: Array<IItemListProps>;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Loading state, disabling the button and replacing icon with spiner (optional, default: false) */
  loading?: boolean;
  /** Button click event handler (optional, default: undefined) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Optional popover (optional, default: undefined) */
  popover?: { buttons: Array<IButtonProps>; title: string };
  /**
   * Text to be displayed as a tooltip (optional, default: undefined)
   * note: only visible when there is no label
   */
  tooltip?: string;
  /** Position of the tooltip (optional, default: 'bottom') */
  tooltipDirection?: MenuDirectionEnum;
  /** Button type (optional, default: 'button') */
  type?: 'submit' | 'button' | 'reset';
  /** For test purpose only */
  dataTestId?: string;
}
