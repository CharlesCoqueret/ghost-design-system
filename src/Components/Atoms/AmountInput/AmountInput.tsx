import React, { ReactElement } from 'react';
import Numeral from 'numeral';
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format';
import classnames from 'classnames';
import compact from 'lodash/compact';

import { Typography } from '../Typography';
import styles from './AmountInput.module.scss';

/**
 * Numeral Options:
 *  'none': 1234567.89
 *  'lakh': 12,34,567.89
 *  'thousand': 1,234,567.89
 *  'wan': 123,4567.89
 *  'shorten': 1.23m
 */
export enum ThousandsGroupStyle {
  THOUSAND = 'thousand',
  LAKH = 'lakh',
  WAN = 'wan',
  SHORTEN = 'shorten',
  NONE = 'none',
}

export interface IAmountInputProps {
  /** Allows negative values (optional, default: true) */
  allowNegative?: boolean;
  /** Additional class names to be added (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Decimal scale (optional, default: 2) */
  decimalScale?: number;
  /** Decimal separator (optional, default: '.') */
  decimalSeparator?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipsis in readonly (optional, default: false) */
  ellipsis?: boolean;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Input or number string value (optional, default: '') */
  /** Note: '' is used as default to ensure update of the underlying component */
  input?: string | number;
  /** Error indication should be present (optional, default: undefined) */
  isInError?: boolean;
  /** Max value (optional, default: undefined) */
  maxValue?: number;
  /** Min value (optional, default: undefined) */
  minValue?: number;
  /** Name of input (optional, default: undefined) */
  name?: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (value: number | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Prefix (optional, default: undefined) */
  prefix?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Suffix (optional, default: undefined) */
  suffix?: string;
  /** Thousand separator (optional, default: ',')*/
  thousandSeparator?: string;
  /** Thousands grouping style (default: ThousandsGroupStyle.THOUSAND )*/
  thousandsGroupStyle?: ThousandsGroupStyle;
}

const AmountInput = (props: IAmountInputProps): ReactElement => {
  const {
    allowNegative,
    className,
    dataTestId,
    decimalScale,
    decimalSeparator,
    disabled,
    ellipsis,
    highlighted,
    input,
    isInError,
    maxValue,
    minValue,
    name,
    onChange,
    placeholder,
    prefix,
    readOnly,
    suffix,
    thousandSeparator,
    thousandsGroupStyle,
  } = props;

  const numberFormatThousandGroupStyle =
    !thousandsGroupStyle ||
    thousandsGroupStyle === ThousandsGroupStyle.NONE ||
    thousandsGroupStyle === ThousandsGroupStyle.SHORTEN
      ? ThousandsGroupStyle.THOUSAND
      : thousandsGroupStyle;

  const numberFormatThousandSeparator = thousandsGroupStyle === ThousandsGroupStyle.NONE ? '' : thousandSeparator;

  const onValueChange = (newValue: NumberFormatValues, sourceInfo: SourceInfo): void => {
    if (sourceInfo.source !== 'prop' && onChange) {
      onChange(newValue.floatValue);
    }
  };

  /**
   * Read only case
   */
  if (readOnly) {
    if (input === undefined || input === null || input === '' || !Number.isFinite(Number(input))) {
      return (
        <div
          className={classnames(
            styles.default,
            styles.readOnly,
            {
              [styles.highlighted]: (readOnly || disabled) && highlighted,
            },
            className,
          )}
          data-testid={dataTestId}>
          <Typography.Text ellipsis={ellipsis}>{compact([prefix, '-', suffix]).join(' ')}</Typography.Text>
        </div>
      );
    }
    if (thousandsGroupStyle === 'shorten') {
      return (
        <div
          className={classnames(
            styles.default,
            styles.readOnly,
            {
              [styles.highlighted]: (readOnly || disabled) && highlighted,
            },
            className,
          )}
          data-testid={dataTestId}>
          <Typography.Text ellipsis={ellipsis}>
            {compact([
              prefix,
              Numeral(input).format('0.' + '0'.repeat(Math.abs(decimalScale ?? 2)) + ' a'),
              suffix,
            ]).join(' ')}
          </Typography.Text>
        </div>
      );
    }
    return (
      <NumberFormat
        allowEmptyFormatting
        autoComplete='off'
        className={classnames(
          styles.default,
          styles.readOnly,
          {
            [styles.highlighted]: (readOnly || disabled) && highlighted,
          },
          className,
        )}
        data-testid={dataTestId}
        decimalScale={decimalScale}
        decimalSeparator={decimalSeparator}
        displayType={'text'}
        id={name}
        isNumericString={typeof input === 'string'}
        name={name}
        prefix={prefix ? `${prefix} ` : undefined}
        suffix={suffix ? ` ${suffix}` : undefined}
        thousandSeparator={numberFormatThousandSeparator}
        thousandsGroupStyle={numberFormatThousandGroupStyle}
        value={input}
      />
    );
  }

  /**
   * Editable case
   */
  return (
    <NumberFormat
      allowEmptyFormatting
      allowNegative={allowNegative}
      autoComplete='off'
      className={classnames(
        styles.default,
        { [styles.disabled]: disabled },
        { [styles.error]: !readOnly && !disabled && isInError },
        className,
      )}
      data-testid={dataTestId}
      decimalScale={decimalScale}
      decimalSeparator={decimalSeparator}
      disabled={disabled}
      isAllowed={(newValue: NumberFormatValues): boolean => {
        if (minValue !== undefined && newValue.floatValue && newValue.floatValue < minValue) return false;
        if (maxValue !== undefined && newValue.floatValue && newValue.floatValue > maxValue) return false;
        return true;
      }}
      isNumericString={typeof input === 'string'}
      name={name}
      onValueChange={onValueChange}
      placeholder={placeholder}
      prefix={prefix ? `${prefix} ` : undefined}
      suffix={suffix ? ` ${suffix}` : undefined}
      thousandSeparator={numberFormatThousandSeparator}
      thousandsGroupStyle={numberFormatThousandGroupStyle}
      value={input}
    />
  );
};

AmountInput.defaultProps = {
  allowNegative: true,
  decimalSeparator: '.',
  ellipsis: false,
  input: '',
  name: undefined,
  placeholder: undefined,
  prefix: undefined,
  suffix: undefined,
  thousandSeparator: ',',
  thousandsGroupStyle: ThousandsGroupStyle.THOUSAND,
};

export default AmountInput;
