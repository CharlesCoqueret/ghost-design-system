import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { ControlledMenu } from '@szhsin/react-menu';

import { useOnClickOutside } from '../../../hooks';
import { Portal } from '../../Atoms/Portal';
import Button from '../Button/Button';
import { IButtonProps } from '../Button/Button.props';

import styles from './Popover.module.scss';

export interface IPopoverProps {
  /** Reference of the element from which the popover pops */
  anchorRef: RefObject<HTMLElement>;
  /** List of buttons to be displayed in the popover */
  buttons: Array<IButtonProps>;
  /** Callback when a click is captured outside the popover (it is recommended to set open to close) */
  onClose: () => void;
  /** Control of the popover (true to open the popover) */
  open: boolean;
  /** Title of the popover */
  title: string;
}

const Popover = (props: IPopoverProps): ReactElement => {
  const { anchorRef, buttons, onClose, open, title } = props;

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const skipOpen = useRef(false);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => {
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
        <div className={styles.container}>
          <div key='title' className={styles.title}>
            {title}
          </div>
          <div key='buttons' className={styles.buttons}>
            {buttons.map((button) => (
              <Button key={`${button.label}-${button.icon?.toString()}`} {...button} />
            ))}
          </div>
        </div>
      </ControlledMenu>
    </Portal>
  );
};

Popover.defaultProps = {
  buttons: [],
  title: undefined,
};

export default Popover;
