import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import classnames from 'classnames';
import useCollapse from 'react-collapsed';

import { Icon } from '../Icon';
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

  const { getCollapseProps, setExpanded, isExpanded } = useCollapse({ duration: 500 });

  useEffect(() => {
    setExpanded(collapsable ? openInitially === true : true);
  }, [collapsable, openInitially]);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className='gds-layout-section-container'>
      <div
        className={classnames('section-header', { collapsable: collapsable })}
        onClick={handleClick}
        data-testid={dataTestId}>
        <Typography.Title level={level || 2}>{title}</Typography.Title>
        {collapsable && (
          <Icon
            icon={['fal', 'chevron-left']}
            size='xs'
            className={classnames('collapse-icon', { open: isExpanded })}
          />
        )}
      </div>
      <div className='section-body' {...getCollapseProps()}>
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
