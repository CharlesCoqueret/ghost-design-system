import { useEffect } from 'react';

/** Hook capturing the press on the escape key and triggering the callback function */
const useOnEscapePressed = (callback: (event: KeyboardEvent) => void): void => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      callback(event);
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [callback]);
};

export default useOnEscapePressed;
