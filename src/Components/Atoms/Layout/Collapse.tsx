import React, { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';

export interface ICollapseProps {
  /** Open initially the collapse elemeent (optional, default: false) */
  openInitially?: boolean;
  /** Title of the collapse element */
  title: string;
}

const Collapse = (props: PropsWithChildren<ICollapseProps>): ReactElement => {
  const { children, openInitially, title } = props;

  const [open, setOpen] = useState(openInitially);
  const contentRef = useRef<HTMLDivElement>(null);

  const transitionEnd = (event: TransitionEvent) => {
    if (!contentRef.current) return;
    if (event.propertyName == 'height') {
      contentRef.current.style.transition = '';
      contentRef.current.style.height = 'auto';
      contentRef.current.removeEventListener('transitionend', transitionEnd, false);
    }
  };

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    // Initial run, to ensure the proper value
    if (contentRef.current.style.height === '') {
      contentRef.current.style.height = open ? 'auto' : '0px';
      return;
    }

    // From height auto to 0px
    if (!open) {
      contentRef.current.style.height = getComputedStyle(contentRef.current).height;
      contentRef.current.style.transition = 'height 500ms linear';
      contentRef.current.offsetHeight;
      contentRef.current.style.height = '0px';
    }
    // From 0px to auto
    else {
      const prevHeight = contentRef.current.style.height;
      contentRef.current.style.height = 'auto';
      const endHeight = getComputedStyle(contentRef.current).height;
      contentRef.current.style.height = prevHeight;
      contentRef.current.offsetHeight;
      contentRef.current.style.transition = 'height 500ms linear';
      contentRef.current.style.height = endHeight;
      contentRef.current.addEventListener('transitionend', transitionEnd, false);
    }
  }, [open]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='collapse-container'>
      <div className='collapse-header' onClick={handleClick}>
        {title}
        <Icon icon={['fal', 'chevron-left']} size='lg' className={classnames('icon', { open: open })} />
      </div>
      <div className='collapse-body' ref={contentRef}>
        {children}
      </div>
      <div className='collapse-footer' />
    </div>
  );
};

Collapse.defaultProps = {
  openInitially: false,
};

export default Collapse;
