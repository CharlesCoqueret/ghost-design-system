import React, { ReactElement } from 'react';
import { toast, Toaster as HotToaster, ToastOptions } from 'react-hot-toast';

import Icon from '../../Atoms/Icon/Icon';
import Portal from '../../Atoms/Portal/Portal';

/**
 * Toast container component
 *
 * Container for toasts, with toast default configuration
 * Success toast: duration 3s with circle-check icon
 * Error toast: duration 5s with circle-xmark icon
 * Blank toast: duration 5s
 */
export const Toaster = (): ReactElement => {
  return (
    <Portal rootId='toaster-portal-id'>
      <HotToaster
        position='bottom-right'
        toastOptions={{
          className: 'gds-toaster',
          success: {
            icon: <Icon icon={['fas', 'circle-check']} color='green' />,
            duration: 3000, // 3 seconds
          },
          error: {
            icon: <Icon icon={['fas', 'circle-xmark']} color='red' />,
            duration: 5000, // 5 seconds
          },
          blank: {
            duration: 5000, // 5 seconds
          },
        }}
      />
    </Portal>
  );
};

/**
 * Toast a basic message with default configuration (@see Toaster).
 *
 * @param message message to toast
 * @param (optional) options additional notify toast options
 *
 * @returns id of the toast
 */
export const notify = (message: string, options?: ToastOptions): string => toast(message, options);

/**
 * Toast a success message with default configuration (@see Toaster).
 *
 * @param message message to toast
 * @param (optional) options additional success toast options
 *
 * @returns id of the toast
 */
export const success = (message: string, options?: ToastOptions): string => toast.success(message, options);

/**
 * Toast an error message with default configuration (@see Toaster).
 *
 * @param message message to toast
 * @param (optional) options additional error toast options
 *
 * @returns id of the toast
 */
export const error = (message: string, options?: ToastOptions): string => toast.error(message, options);

/**
 * Toast a persistent error message.
 *
 * Configuration: icon xmark, a button (xmark) to dismiss toast.
 *
 * @param message message to toast
 * @param (optional) options additional persistent error toast options
 *
 * @returns id of the toast
 */
export const errorPersistent = (message: string, options?: ToastOptions): string =>
  toast.error(
    (t) => (
      <>
        {message}
        <Icon
          icon={['fal', 'xmark']}
          role='button'
          className='gds-toaster-close-icon'
          onClick={(event): void => {
            event.stopPropagation();
            event.preventDefault();
            toast.dismiss(t.id);
          }}
        />
      </>
    ),
    {
      duration: Infinity,
      ...options,
    },
  );

/**
 * Close the a specific toaster given its id, or all if no id provided.
 *
 * @param toastId (optional) closes the toaster identified by its id, if non provided, all are closed.
 */
export const dismiss = (toastId?: string): void => {
  toast.dismiss(toastId);
};

export default Toaster;
