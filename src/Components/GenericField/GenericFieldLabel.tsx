import React, { ReactElement } from 'react';
import classNames from 'classnames';

interface IGenericFieldLabelProps {
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
  const { label, mandatory, readOnly, size } = props;

  if (label === undefined || label === '') return <></>;

  return (
    <label className={classNames(size && `field-label-size-${size}`, 'field-label')}>
      {label}
      {!readOnly && mandatory && <span className='field-label-mandatory'>*</span>}
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
