import React, { useRef, useEffect, useState, useCallback, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import useWindowSize from '../../../hooks/use-window-size';

interface IOverflowWrapper {
  children?: ReactNode;
}

interface IExtendedElement extends Element {
  dataset: { targetid: string };
}

const OverflowWrapper = (props: IOverflowWrapper): ReactElement => {
  const { children } = props;

  const navRef = useRef<HTMLDivElement>(null);
  const [hiddingMap, setHiddingMap] = useState<Record<string, boolean>>({});

  const { width } = useWindowSize();

  const handleIntersection = useCallback((entries: Array<IntersectionObserverEntry>) => {
    const updatedEntries: Record<string, boolean> = {};
    entries.forEach((entry) => {
      if (!entry?.isIntersecting || entry?.intersectionRatio < 1) {
        updatedEntries[(entry?.target as IExtendedElement)?.dataset?.targetid] = true;
      } else {
        updatedEntries[(entry?.target as IExtendedElement)?.dataset?.targetid] = false;
      }
    });
    setHiddingMap(updatedEntries);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });

    if (navRef.current && navRef.current.children) {
      Array.from(navRef.current.children).forEach((item) => {
        if ((item as IExtendedElement)?.dataset?.targetid) {
          observer.observe(item);
        }
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [children, handleIntersection, width]);

  return (
    <>
      <div className='toolbarWrapper' ref={navRef}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (
              child.props?.data?.value &&
              hiddingMap.hasOwnProperty(child.props?.data?.value) &&
              hiddingMap[child.props?.data?.value]
            ) {
              return React.cloneElement(child, {
                className: classnames(child.props?.className, {
                  visible: false,
                  invisible: true,
                }),
              });
            } else {
              return React.cloneElement(child, {
                className: classnames(child.props?.className, {
                  visible: true,
                  invisible: false,
                }),
              });
            }
          }
          return child;
        })}
      </div>
      <div className='overflowStyle'>
        {Object.keys(hiddingMap).filter((key) => hiddingMap[key]).length > 0 ? (
          `+ ${Object.keys(hiddingMap).filter((key) => hiddingMap[key]).length}`
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default OverflowWrapper;
