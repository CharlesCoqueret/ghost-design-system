import React, { ReactElement } from 'react';
import classNames from 'classnames';

import styles from './GenericFieldLabel.module.scss';

interface IGenericFieldLabelProps {
  /** Additional class name (optional, default: undefined) */
  className?: string;
  /** Label text (optional, default: undefined) */
  label?: string;
  /** Mandatory field, adding a red star after the text (optional, default: false) */
  mandatory?: boolean;
  /** Read only (optional, default: false) */
  readOnly?: boolean;
  /** Size of the field (optional, default: undefined) */
  size?: number;
}

/**
 * Generic field label
 *
 * Displays the label if defined and not empty.
 * Optionnaly displays a red star after the label if the field is mandatory and not readOnly.
 * Optionnaly displays the label in line.
 *
 */
const GenericFieldLabel = (props: IGenericFieldLabelProps): ReactElement => {
  const { className, label, mandatory, readOnly, size } = props;

  if (label === undefined || label === '') return <></>;

  return (
    <label className={classNames(styles.label, size && styles[`size-${size}`], className)}>
      {label}
      {!readOnly && mandatory && <span className={styles.mandatory}>*</span>}
    </label>
  );
};

GenericFieldLabel.defaultProps = {
  label: undefined,
  mandatory: false,
  readOnly: false,
  size: undefined,
};

export default GenericFieldLabel;
