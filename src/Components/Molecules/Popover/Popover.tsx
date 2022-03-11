import React, { ReactElement, Ref, useEffect, useRef, useState } from 'react';
import { ControlledMenu } from '@szhsin/react-menu';
import classnames from 'classnames';

import { useOnClickOutside } from '../../../hooks';
import { Portal } from '../../Atoms/Portal';
import Button, { IButtonProps } from '../Button/Button';

export interface IPopoverProps {
  buttons: Array<IButtonProps>;
  open?: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  title?: string;
}

const Popover = (props: IPopoverProps): ReactElement => {
  const { buttons, open, anchorRef, title } = props;

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const [isShaking, setIsShaking] = useState(false);
  const skipOpen = useRef(false);
  const menuRef = useRef(null);

  const pnClickOutside = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  useOnClickOutside(menuRef, () => {
    if (open) {
      pnClickOutside();
    }
  });

  useEffect(() => {
    if (!skipOpen.current) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <Portal>
      <ControlledMenu
        ref={menuRef}
        state={isOpen ? 'open' : 'closed'}
        align='center'
        direction='top'
        arrow
        className={classnames({ shake: isShaking })}
        anchorRef={anchorRef}
        skipOpen={skipOpen}>
        <div className='popover-container'>
          <div className='popover-title'>{title}</div>
          <div className='popover-buttons'>
            {buttons.map((button) => (
              <Button key={`${button.label}-${button.icon?.toString()}`} {...button} />
            ))}
          </div>
        </div>
      </ControlledMenu>
    </Portal>
  );
};

export default Popover;
