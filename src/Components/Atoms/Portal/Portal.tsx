import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface IPortalProps {
  rootId?: string;
}

const Portal = (props: PropsWithChildren<IPortalProps>): ReactElement => {
  const { children, rootId } = props;
  const target = useRef<HTMLDivElement>();
  const finalRootId = rootId || 'root-portal-id';

  useEffect(() => {
    let container = document.getElementById(finalRootId);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', finalRootId);
      document.body.appendChild(container);
    }

    if (target.current) {
      container.appendChild(target.current);
    }

    return () => {
      if (target.current) {
        target.current.remove();
      }
      if (container && container.childNodes.length === 0) {
        // container.remove();
      }
    };
  }, [rootId]);

  if (!target.current) {
    target.current = document.createElement('div');
  }

  return createPortal(children, target.current);
};

export default Portal;
