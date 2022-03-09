import { RefObject, useEffect } from 'react';

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
