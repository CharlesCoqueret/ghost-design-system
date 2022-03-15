import React, { ReactElement } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

export interface ILinkProps {
  text: string;
  link: string;
  tooltip?: string;
}

const externalRegEx = /^(https?:\/\/|\/\/)/i;

export const externalCheck = (link: string): boolean => externalRegEx.test(link);

const Link = (props: ILinkProps): ReactElement => {
  const { text, link, tooltip } = props;
  const isExternalLink = externalCheck(link);

  return (
    <div className='external-link'>
      <a
        href={link}
        target={(isExternalLink && '_blank') || undefined}
        rel={(isExternalLink && 'noreferrer') || undefined}>
        <Tooltip tooltip={tooltip}>{text}</Tooltip>
      </a>
      {isExternalLink && <Icon icon={['fal', 'external-link']} size='1x' />}
    </div>
  );
};

export default Link;
