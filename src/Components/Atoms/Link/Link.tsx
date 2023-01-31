import React, { ReactElement } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import styles from './Link.module.scss';

export interface ILinkProps {
  /** Text displayed for the link */
  text: string;
  /** Link url */
  link: string;
  /** Tooltip content of the link (optional, default: undefined) */
  tooltip?: string;
}

/**
 * Indicates if the url is an external link
 *
 * @param url string
 * @returns true if the link is an external link
 */
const isExternalLink = (url: string): boolean => {
  const tmp = document.createElement('a');
  tmp.href = url;
  return tmp.host !== window.location.host;
};

const Link = (props: ILinkProps): ReactElement => {
  const { text, link, tooltip } = props;
  const externalLink = isExternalLink(link);

  return (
    <div className={styles.container}>
      {externalLink ? (
        <>
          <a href={link} target='_blank' rel='noreferrer'>
            <Tooltip tooltip={tooltip}>
              <>{text}</>
            </Tooltip>
          </a>
          <Icon icon={['fal', 'external-link']} className={styles.icon} size='1x' />
        </>
      ) : (
        <a href={link}>
          <Tooltip tooltip={tooltip}>
            <>{text}</>
          </Tooltip>
        </a>
      )}
    </div>
  );
};

Link.defaultProps = {
  tooltip: undefined,
};

export default Link;
