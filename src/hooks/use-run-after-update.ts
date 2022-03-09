import { useRef, useLayoutEffect } from 'react';

/** Hook enabling to run a callback after DOM has updated */
const useRunAfterUpdate = (): ((callback: () => void) => void) => {
  const afterPaintRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current();
      afterPaintRef.current = undefined;
    }
  });

  const runAfterUpdate = (callback: () => void): void => {
    afterPaintRef.current = callback;
  };

  return runAfterUpdate;
};

export default useRunAfterUpdate;
