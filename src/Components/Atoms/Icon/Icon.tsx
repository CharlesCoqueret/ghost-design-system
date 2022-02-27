import React, { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const Icon = ({ className, ...props }: FontAwesomeIconProps): ReactElement => {
  return <FontAwesomeIcon {...props} className={classnames(className, 'icon')} />;
};

export default Icon;
