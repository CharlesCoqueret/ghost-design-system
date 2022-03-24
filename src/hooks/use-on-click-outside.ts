import { RefObject } from 'react';
import useEventListener from './use-event-listener';

type Handler = (event: Event) => void;

/** Hook capturing the click outside of a reference element and triggering the callback function */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler): void => {
  useEventListener('mousedown', (event) => {
    const el = ref?.current;
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  });

  useEventListener('touchstart', (event) => {
    const el = ref?.current;
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  });
};

export default useOnClickOutside;
