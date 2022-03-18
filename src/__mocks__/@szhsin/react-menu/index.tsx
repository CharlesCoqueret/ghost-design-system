import React, { forwardRef } from 'react';
import { ClickEvent, ControlledMenuProps, MenuItemProps } from '@szhsin/react-menu';

const ControlledMenu = forwardRef((props: ControlledMenuProps, ref) => (
  <div>
    ControlleMenu
    {props?.state}
    {props?.children}
    {ref ? 'has ref' : 'has no ref'}
  </div>
));
ControlledMenu.displayName = 'ControlledMenu';

const MenuItem = (props: MenuItemProps & { ['data-testid']: string }) => {
  return (
    <div
      data-testid={'data-testid' in props ? props['data-testid'] : undefined}
      onClick={(event) => {
        if (props.onClick) {
          props.onClick(event as unknown as ClickEvent);
        }
      }}>
      MenuItem{props.children}
    </div>
  );
};

const MenuDivider = () => <div>MenuDivider</div>;

export type MenuAlign = 'start' | 'center' | 'end';

module.exports = { ControlledMenu, MenuDivider, MenuItem };
