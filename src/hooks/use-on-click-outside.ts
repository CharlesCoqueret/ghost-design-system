import { RefObject } from 'react';
import useEventListener from './use-event-listener';

type Handler = (event: Event) => void;

/** Hook capturing the click outside of a reference element and triggering the callback function */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler): void => {
  useEventListener('mousedown', (event) => {
    if (!ref.current || !(event instanceof MouseEvent)) return;

    const x = 'x' in event ? event.x : undefined;
    const y = 'y' in event ? event.y : undefined;
    const bound = ref.current.getBoundingClientRect();

    const el = ref?.current;
    if (
      !el ||
      el.contains(event.target as Node) ||
      (x && y && x > bound.left && x < bound.right && y > bound.top && y < bound.bottom)
    ) {
      return;
    }

    handler(event);
  });

  useEventListener('touchstart', (event) => {
    if (!ref.current || !(event instanceof TouchEvent)) return;

    const x = 'touches' in event ? event.touches[0].clientX : undefined;
    const y = 'touches' in event ? event.touches[0].clientY : undefined;
    const bound = ref.current.getBoundingClientRect();

    if (x && y && x > bound.left && x < bound.right && y > bound.top && y < bound.bottom) {
      return;
    }
    handler(event);
  });
};

export default useOnClickOutside;
