import { ReactElement } from 'react';

export interface IItemListProps {
  /** item identifier */
  itemId: string;
  /** value of the item to display if elementValue not defined (optional) */
  value?: string | ReactElement;
  /** determine if the item should be preceded by a dropdown divider (optional) */
  divider?: boolean;
  /** on click event handler on the item (optional) */
  onClick?: (key: string | undefined) => void;
  /** react route link on click on item (optional) */
  link?: string;
  /** do not render the item if true (render the item otherwise) */
  hidden?: boolean;
}
