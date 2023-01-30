import { RefObject, useEffect, useRef } from 'react';

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

/** Hook handeling event listener */
const useEventListener = <
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: RefObject<T>,
  startListening?: boolean,
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element?.current) return;
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener: typeof handler = (event) => savedHandler.current(event);
    console.log('target element', targetElement);
    targetElement.addEventListener(eventName, eventListener);

    return () => {
      console.log('remove listener', targetElement);
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, startListening]);
};

export default useEventListener;
