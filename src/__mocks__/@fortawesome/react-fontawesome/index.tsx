import React, { ReactElement } from 'react';

export const FontAwesomeIcon = (props: Record<string, string>): ReactElement => {
  return <i className='fa' {...props} {...(props['spin'] ? { spin: 'true' } : undefined)} />;
};
