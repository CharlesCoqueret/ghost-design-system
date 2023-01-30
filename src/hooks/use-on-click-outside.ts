import { RefObject } from 'react';
import useEventListener from './use-event-listener';

type Handler = (event: Event) => void;

/** Hook capturing the click outside of a reference element and triggering the callback function */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(contentRef: RefObject<T>, containerRef: RefObject<T>, startListening: boolean, handler: Handler): void => {
  useEventListener('mousedown', (event) => {
    console.log('mousedown', contentRef, event);
    if (!contentRef.current || !(event instanceof MouseEvent)) return;

    // const x = 'x' in event ? event.x : undefined;
    // const y = 'y' in event ? event.y : undefined;
    // const bound = contentRef.current.getBoundingClientRect();

    const el = contentRef?.current;
    console.log('useOnClickOutside', contentRef, el);
    if (
        !el ||
        el.contains(event.target as Node)
        // || (x && y && x > bound.left && x < bound.right && y > bound.top && y < bound.bottom)
    ) {
      console.log('click inside');
      return;
    }

    console.log('click outside');
    handler(event);
  }, containerRef, startListening);

};

export default useOnClickOutside;
