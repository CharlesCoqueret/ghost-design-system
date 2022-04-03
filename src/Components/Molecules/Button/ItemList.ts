import { ReactElement } from 'react';

export interface IItemListProps {
  /** For test purpose only */
  dataTestId?: string;
  /** item identifier */
  itemId: string;
  /** Item name (optional, default: undefined) */
  label: string | ReactElement;
  /** Should the item be preceeded by a divider (optional, default: false) */
  divider?: boolean;
  /** Handler of click on the item (optional, default: undefined) */
  onClick?: (itemId: string | undefined) => void;
  /** Item entry is hidden (optional, default: false) */
  hidden?: boolean;
}
