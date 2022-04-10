import React, { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { Icon } from '../Icon';
import { useRunAfterUpdate } from '../../../hooks';
import { Typography } from '../Typography';

export interface ISectionProps {
  /** When set the section gets collapsable ability (optional, default true) */
  collapsable?: boolean;
  /** Open initially if collapsable (optional, default: true) */
  openInitially?: boolean;
  /** Add separator at the end of the section (optional, default: true) */
  separator?: boolean;
  /** Title of the section element */
  title: string;
  /** Header level (optional default: 2) */
  level?: 1 | 2 | 3;
  /** For test purpose only */
  dataTestId?: string;
}

const Section = (props: PropsWithChildren<ISectionProps>): ReactElement => {
  const { children, collapsable, dataTestId, level, openInitially, separator, title } = props;

  const runAfterUpdate = useRunAfterUpdate();
  const [open, setOpen] = useState<boolean>(collapsable ? openInitially === true : true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    if (contentRef.current.style.height === undefined || contentRef.current.style.height === '') {
      contentRef.current.style.height = open ? 'auto' : '0px';
      if (open) {
        runAfterUpdate(() => {
          if (!contentRef.current) return;
          contentRef.current.style.height = getComputedStyle(contentRef.current).height;
        });
      }
      return;
    }

    // From height auto to 0px
    if (!open) {
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
      contentRef.current.style.height = endHeight;
    }
  }, [open]);

  const handleClick = () => {
    if (collapsable) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className='gds-layout-section-container'>
      <div
        className={classnames('section-header', { collapsable: collapsable })}
        onClick={handleClick}
        data-testid={dataTestId}>
        <Typography.Title level={level || 2}>{title}</Typography.Title>
        {collapsable && (
          <Icon icon={['fal', 'chevron-left']} size='xs' className={classnames('collapse-icon', { open: open })} />
        )}
      </div>
      <div
        className='section-body'
        ref={contentRef}
        style={{
          transition: 'height 500ms linear',
        }}>
        {children}
      </div>
      {separator && <div className='section-footer' />}
    </div>
  );
};

Section.defaultProps = {
  collapsable: true,
  openInitially: true,
  separator: true,
};

export default Section;
