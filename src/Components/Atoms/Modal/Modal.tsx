import React, { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { useOnClickOutside, useOnEscapePressed } from '../../../hooks';
import { Portal } from '../Portal';
import { Icon } from '../Icon';

export interface IModalProps {
  /** Show the close icon (optional, default: false) */
  closeIcon?: boolean;
  /** Enable closing the dialog by pressing the escape key (optional, default: false) */
  closeOnPressEscape?: boolean;
  /** Enable closing the dialog by clicking outside the dialog (optional, default: false) */
  closeOnClickOutside?: boolean;
  /** For test purpose only */
  dataTestId?: string;
  /** Disable tabbing outside modal (optional, default: true) */
  disableTabOutside?: boolean;
  /** Callback when a closing button has been triggered (close icon or click outiside for example) (optional, default: undefined) */
  onHide?: () => void;
  /** Control of the modal */
  show: boolean;
  /** Dialog window size: sm: 300px, lg: 800px (optionsl, default: 'sm')  */
  size?: 'sm' | 'lg';
  /** Title of the modal (optional, default undefined) */
  title?: string;
}

const Modal = (props: PropsWithChildren<IModalProps>): ReactElement => {
  const {
    children,
    closeIcon,
    closeOnPressEscape,
    closeOnClickOutside,
    dataTestId,
    disableTabOutside,
    onHide,
    show,
    size,
    title,
  } = props;

  const [isShaking, setIsShaking] = useState(false);
  const [initialBodyStyle, setInitialBodyStyle] = useState<Partial<CSSStyleDeclaration>>();
  const contentRef = useRef<HTMLDivElement>(null);

  const preventDefaults = (event: KeyboardEvent) => {
    if (event.code !== 'Tab' && event.key !== 'Tab') return;

    const focusable = contentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusable && focusable[0];
    const lastFocusable = focusable && focusable[focusable.length - 1];

    // If first focusable element, prevent shift + tab
    if (focusable && document.activeElement === firstFocusable && event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
    }

    // If last focusable element, prevent tab
    if (focusable && document.activeElement === lastFocusable && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
    }

    // If inside the modal, no worries
    if (event.target && contentRef.current && contentRef.current.contains(event.target as Node)) {
      return;
    }

    // else, prevent
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (show) {
      setInitialBodyStyle({ overflowX: document.body.style.overflowX, overflowY: document.body.style.overflowX });
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'hidden';
      disableTabOutside && document.body.addEventListener('keydown', preventDefaults, false);
    } else {
      document.body.style.overflowX = initialBodyStyle?.overflowX || '';
      document.body.style.overflowY = initialBodyStyle?.overflowY || '';
      disableTabOutside && document.body.removeEventListener('keydown', preventDefaults);
    }

    return () => {
      document.body.style.overflowX = initialBodyStyle?.overflowX || '';
      document.body.style.overflowY = initialBodyStyle?.overflowY || '';
      disableTabOutside && document.body.removeEventListener('keydown', preventDefaults);
    };
  }, [show]);

  const shake = () => {
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  useOnClickOutside(contentRef, () => {
    if (closeOnClickOutside && onHide) {
      onHide();
    } else {
      shake();
    }
  });

  useOnEscapePressed(() => {
    if (closeOnPressEscape && onHide) {
      onHide();
    } else {
      shake();
    }
  });

  if (show)
    return (
      <Portal>
        <div className='gds-modal-overlay'>
          <div
            className={classnames('modal-content', {
              'size-sm': size === 'sm',
              'size-lg': size === 'lg',
              shake: isShaking,
            })}
            ref={contentRef}>
            {(closeIcon || title) && (
              <div className='modal-header'>
                <div className='modal-title'>{title}</div>
                {closeIcon && (
                  <div
                    className='modal-close-icon'
                    data-testid={dataTestId}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (onHide) {
                        onHide();
                      }
                    }}>
                    <Icon icon={['fal', 'times']} size='2x' />
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </Portal>
    );
  return <></>;
};

Modal.defaultProps = {
  closeIcon: false,
  disableTabOutside: true,
  enableClickOutside: false,
  onHide: undefined,
  size: 'sm',
  title: undefined,
};

export default Modal;
