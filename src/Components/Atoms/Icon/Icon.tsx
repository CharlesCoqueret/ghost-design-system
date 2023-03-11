import React, { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import Loader from './icons/Loader';

import styles from './Icon.module.scss';

const Icon = (props: FontAwesomeIconProps): ReactElement => {
  if (props.icon && Array.isArray(props.icon) && props.icon.length === 2) {
    if (props.icon[1] === 'spinner') return <Loader {...props} />;
  }
  return <FontAwesomeIcon {...props} className={classnames(styles.icon, props.className)} />;
};

export default Icon;
