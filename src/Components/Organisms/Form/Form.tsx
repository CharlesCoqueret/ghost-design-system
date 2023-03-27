import React, { FormHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import classnames from 'classnames';

import styles from './Form.module.scss';

const Form = (props: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>): ReactElement => {
  const { children, className, ...rest } = props;
  return (
    <form className={classnames(styles.form, className)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
