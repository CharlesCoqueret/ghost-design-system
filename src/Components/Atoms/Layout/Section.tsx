import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import classnames from 'classnames';
import { useCollapse } from 'react-collapsed';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import Separator from './Separator';

import styles from './Section.module.scss';

export interface ISectionProps {
  /** When set the section gets collapsible ability (optional, default true) */
  collapsible?: boolean;
  /** Open initially if collapsible (optional, default: true) */
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
  const { children, collapsible, dataTestId, level, openInitially, separator, title } = props;

  const { getCollapseProps, setExpanded, isExpanded } = useCollapse({
    duration: 500,
  });

  useEffect(() => {
    setExpanded(collapsible ? openInitially === true : true);
  }, [collapsible, openInitially]);

  const handleClick = () => {
    if (collapsible) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={classnames(styles.header, { [styles.collapsible]: collapsible })}
        onClick={handleClick}
        data-testid={dataTestId}>
        <Typography.Title level={level || 2}>{title}</Typography.Title>
        {collapsible && (
          <Icon
            icon={['fal', 'chevron-left']}
            size='xs'
            className={classnames(styles.icon, { [styles.open]: isExpanded })}
          />
        )}
      </div>
      <div className={styles.body} {...getCollapseProps()}>
        {children}
      </div>
      {separator && <Separator />}
    </>
  );
};

Section.defaultProps = {
  collapsible: true,
  openInitially: true,
  separator: true,
};

export default Section;
