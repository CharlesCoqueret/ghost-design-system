import React, { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';

export interface ISectionProps {
  /** When set the section gets collapsable ability (optional, default true) */
  collapsable?: boolean;
  /** Open initially if collapsable (optional, default: true) */
  openInitially?: boolean;
  /** Title of the section element */
  title: string;
  /** For test purpose only */
  dataTestId?: string;
}

const Section = (props: PropsWithChildren<ISectionProps>): ReactElement => {
  const { children, collapsable, dataTestId, openInitially, title } = props;

  const [open, setOpen] = useState<boolean>(collapsable ? openInitially === true : true);
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
    if (collapsable) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className='section-container'>
      <div
        className={classnames('section-header', { collapsable: collapsable })}
        onClick={handleClick}
        data-testid={dataTestId}>
        {title}
        {collapsable && (
          <Icon icon={['fal', 'chevron-left']} size='lg' className={classnames('icon', { open: open })} />
        )}
      </div>
      <div className='section-body' ref={contentRef}>
        {children}
      </div>
      <div className='section-footer' />
    </div>
  );
};

Section.defaultProps = {
  collapsable: true,
  openInitially: true,
};

export default Section;
