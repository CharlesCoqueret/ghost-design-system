import { useRef, useLayoutEffect } from 'react';

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
