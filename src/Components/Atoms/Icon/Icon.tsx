import React, { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import Loader from './icons/Loader';

const Icon = ({ className, ...props }: FontAwesomeIconProps): ReactElement => {
  if (props.icon && Array.isArray(props.icon) && props.icon.length === 2) {
    if (props.icon[1] === 'spinner') return <Loader {...props} size={props.size} className={className} />;
  }
  return <FontAwesomeIcon {...props} className={classnames(className, 'icon')} />;
};

export default Icon;
