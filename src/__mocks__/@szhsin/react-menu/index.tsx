import React, { forwardRef } from 'react';
import { ControlledMenuProps, MenuItemProps } from '@szhsin/react-menu';

const ControlledMenu = forwardRef((props: ControlledMenuProps, ref) => (
  <div>
    ControlleMenu
    {props?.state}
    {props?.children}
    {ref ? 'has ref' : 'has no ref'}
  </div>
));
ControlledMenu.displayName = 'ControlledMenu';

const MenuItem = (props: MenuItemProps) => <div>MenuItem{props.children}</div>;

const MenuDivider = () => <div>MenuDivider</div>;

export type MenuAlign = 'start' | 'center' | 'end';

module.exports = { ControlledMenu, MenuDivider, MenuItem };
