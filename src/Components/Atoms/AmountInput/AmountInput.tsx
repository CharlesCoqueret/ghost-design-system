import React, { ReactElement } from 'react';
import Numeral from 'numeral';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import classnames from 'classnames';
import compact from 'lodash/compact';

import { Typography } from '../Typography';

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
  /** Note: '' is used as default to ensure update of the underlaying component */
  inputValue?: string | number;
  /** Error indication should be present (optional, default: undefined) */
  isInError?: boolean;
  /** Max value (optional, default: undefined) */
  maxValue?: number;
  /** Min value (optional, default: undefined) */
  minValue?: number;
  /** Name of select input */
  name: string;
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
    inputValue,
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

  const onValueChange = (newValue: NumberFormatValues): void => {
    if (onChange) {
      onChange(newValue.floatValue);
    }
  };

  /**
   * Read only case
   */
  if (readOnly) {
    if (!inputValue || !Number.isFinite(Number(inputValue))) {
      return (
        <div
          className={classnames(
            'gds-amount-field',
            'amount-field-read-only',
            { 'field-highlighted': readOnly && highlighted },
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
            'gds-amount-field',
            'amount-field-read-only',
            { 'field-highlighted': readOnly && highlighted },
            className,
          )}
          data-testid={dataTestId}>
          <Typography.Text ellipsis={ellipsis}>
            {compact([
              prefix,
              Numeral(inputValue).format(
                '0.' + '0'.repeat(decimalScale ?? AmountInput.defaultProps.decimalScale) + ' a',
              ),
              suffix,
            ]).join(' ')}
          </Typography.Text>
        </div>
      );
    }
    return (
      <NumberFormat
        thousandSeparator={numberFormatThousandSeparator}
        decimalSeparator={decimalSeparator}
        thousandsGroupStyle={numberFormatThousandGroupStyle}
        data-testid={dataTestId}
        decimalScale={decimalScale}
        id={name}
        name={name}
        value={inputValue}
        className={classnames(
          'gds-amount-field',
          'amount-field-read-only',
          { 'field-highlighted': readOnly && highlighted },
          className,
        )}
        format={placeholder}
        allowEmptyFormatting
        displayType={'text'}
        isNumericString={typeof inputValue === 'string'}
        prefix={prefix ? `${prefix} ` : undefined}
        suffix={suffix ? ` ${suffix}` : undefined}
      />
    );
  }

  /**
   * Editable case
   */
  return (
    <NumberFormat
      thousandSeparator={numberFormatThousandSeparator}
      decimalSeparator={decimalSeparator}
      thousandsGroupStyle={numberFormatThousandGroupStyle}
      data-testid={dataTestId}
      decimalScale={decimalScale}
      allowNegative={allowNegative}
      name={name}
      className={classnames(
        'gds-amount-field',
        { 'amount-field-error': !readOnly && !disabled && isInError },
        className,
      )}
      isAllowed={(newValue: NumberFormatValues): boolean => {
        if (minValue && newValue.floatValue && newValue.floatValue < minValue) return false;
        if (maxValue && newValue.floatValue && newValue.floatValue > maxValue) return false;
        return true;
      }}
      allowEmptyFormatting
      value={inputValue}
      placeholder={placeholder}
      onValueChange={onValueChange}
      disabled={disabled}
      isNumericString={typeof inputValue === 'string'}
      prefix={prefix ? `${prefix} ` : undefined}
      suffix={suffix ? ` ${suffix}` : undefined}
    />
  );
};

AmountInput.defaultProps = {
  allowNegative: true,
  decimalScale: 2,
  decimalSeparator: '.',
  ellipsis: false,
  inputValue: '',
  placeholder: undefined,
  prefix: undefined,
  suffix: undefined,
  thousandSeparator: ',',
  thousandsGroupStyle: ThousandsGroupStyle.THOUSAND,
};

export default AmountInput;
