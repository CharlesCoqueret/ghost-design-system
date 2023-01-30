import React, { ReactElement } from 'react';
import { toast, Toaster as HotToaster } from 'react-hot-toast';
import { Icon } from '../../Atoms';
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
        <Portal rootId="toaster-portal-id">
            <HotToaster
                position="bottom-right"
                toastOptions={{
                    success: {
                        icon: <Icon icon={['fas', 'circle-check']} color="green" />,
                        duration: 3000, // 3 seconds
                    },
                    error: {
                        icon: <Icon icon={['fas', 'circle-xmark']} color="red" />,
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
 * Toast a basic message with default configuration (@see Toaster)
 * @param message message to toast
 */
export const notify = (message: string): string => toast(message);

/**
 * Toast a success message with default configuration (@see Toaster)
 * @param message message to toast
 */
export const success = (message: string): string => toast.success(message);

/**
 * Toast an error message with default configuration (@see Toaster)
 * @param message message to toast
 */
export const error = (message: string): string => toast.error(message);

/**
 * Toast a persistent error message
 * Configuration: icon xmark, a button (xmark) to dismiss toast
 * @param message message to toast
 */
export const errorPersistent = (message: string): string =>
    toast.error(
        (t) => (
            <div
                className="persistent-toast-content"
                onClick={(event): void => {
                    event.stopPropagation();
                    event.preventDefault();
                }}>
                <div>{message}</div>
                <div
                    className="toast-close-icon"
                    data-testid={`toast-${t.id}-close-icon`}
                    onClick={(event): void => {
                        event.stopPropagation();
                        event.preventDefault();
                        toast.dismiss(t.id);
                    }}>
                    <Icon icon={['fal', 'xmark']} />
                </div>
            </div>
        ),
        {
            duration: Infinity,
        },
    );

export default Toaster;
