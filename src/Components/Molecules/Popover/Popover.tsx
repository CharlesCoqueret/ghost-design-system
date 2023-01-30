import React, { PropsWithChildren, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { ControlledMenu } from '@szhsin/react-menu';

import { useOnClickOutside } from '../../../hooks';
import { Portal } from '../../Atoms/Portal';

export interface IPopoverProps {
  /** Reference of the element from which the popover pops */
  anchorRef: RefObject<HTMLElement>;
  /** Callback when a click is captured outside the popover (it is recommended to set open to close) */
  onClose: () => void;
  /** Control of the popover (true to open the popover) */
  open: boolean;
}

const Popover = (props: PropsWithChildren<IPopoverProps>): ReactElement => {
  const { anchorRef, children, onClose, open } = props;

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const skipOpen = useRef(false);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, menuRef, true, () => {
    if (open) {
      onClose();
    }
  });

  useEffect(() => {
    if (!skipOpen.current) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <Portal rootId='popover-portal-id'>
      <ControlledMenu
        ref={menuRef}
        state={isOpen ? 'open' : 'closed'}
        align='center'
        direction='top'
        arrow
        anchorRef={anchorRef}
        skipOpen={skipOpen}>
        <div className='gds-popover-container'>{children}</div>
      </ControlledMenu>
    </Portal>
  );
};

Popover.defaultProps = {
  title: undefined,
};

export default Popover;
