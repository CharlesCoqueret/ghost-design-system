import useEventListener from './use-event-listener';

type Handler = (event: Event) => void;

/** Hook capturing the press on the escape key and triggering the callback function */
const useOnEscapePressed = (handler: Handler): void => {
  useEventListener('keydown', (event) => {
    if (!(event instanceof KeyboardEvent) || event.key !== 'Escape') {
      return;
    }
    handler(event);
  });
};

export default useOnEscapePressed;
