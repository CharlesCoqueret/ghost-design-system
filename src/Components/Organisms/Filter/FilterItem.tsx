import React, { ReactElement } from 'react';
import { IToggleEntry } from '../../Atoms/CheckBoxInput';

import { Col, Section } from '../../Atoms/Layout';
import { AmountField } from '../../Molecules/AmountField';
import { CheckboxField } from '../../Molecules/CheckboxField';
import { DatePickerField } from '../../Molecules/DatePickerField';
import { DynamicSearchField } from '../../Molecules/DynamicSearchField';
import { MultiSelectField } from '../../Molecules/MultiSelectField';
import { SelectField } from '../../Molecules/SelectField';
import { TextField } from '../../Molecules/TextField';
import { FilterTypeEnum, IFilterLayoutAndFieldsProps } from './types';

export interface IFilterItemProps<T> {
  inline?: boolean;
  inputValues?: Partial<T>;
  item: IFilterLayoutAndFieldsProps<T>;
  onChange: (dataIndex: keyof T, newValue: T[keyof T] | undefined) => void;
}

const FilterItem = <T,>(props: IFilterItemProps<T>): ReactElement => {
  const { inline, inputValues, item, onChange } = props;

  switch (item.filterType) {
    case FilterTypeEnum.CHECKBOX: {
      return (
        <CheckboxField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as Array<IToggleEntry> | undefined)}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.DATE: {
      return (
        <DatePickerField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          name={item.name || item.dataIndex.toString()}
          placeholder={item.placeholder}
          calendarStartDay={item.calendarStartDay}
          dateFormat={item.dateFormat}
          isClearable={item.isClearable}
          locale={item.locale}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as Date | null | undefined)}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
          usePortal={inline}
        />
      );
    }
    case FilterTypeEnum.DYNAMICSEARCH: {
      return (
        <DynamicSearchField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as string | number | undefined)}
          name={item.name || item.dataIndex.toString()}
          colors={item.colors}
          noOptionsMessage={item.noOptionsMessage}
          isClearable={item.isClearable}
          placeholder={item.placeholder}
          resolveValue={item.resolveValue}
          searchOptions={item.searchOptions}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.MULTISELECT: {
      return (
        <MultiSelectField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as Array<string | number> | undefined)}
          name={item.name || item.dataIndex.toString()}
          colors={item.colors}
          numberOfItemLabel={item.numberOfItemLabel}
          numberOfItemsLabel={item.numberOfItemsLabel}
          options={item.options}
          isClearable={item.isClearable}
          placeholder={item.placeholder}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.NUMBER: {
      return (
        <AmountField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          name={item.name || item.dataIndex.toString()}
          placeholder={item.placeholder}
          allowNegative={item.allowNegative}
          decimalScale={item.decimalScale}
          decimalSeparator={item.decimalSeparator}
          maxValue={item.maxValue}
          minValue={item.minValue}
          prefix={item.prefix}
          suffix={item.suffix}
          thousandSeparator={item.thousandSeparator}
          thousandsGroupStyle={item.thousandsGroupStyle}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as string | undefined)}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.COLUMN: {
      return (
        <Col>
          {item.fields.map((subitem, index) => {
            return (
              <FilterItem<T>
                inputValues={inputValues}
                item={subitem}
                key={'dataIndex' in subitem ? subitem.dataIndex.toString() : `section-${index}`}
                onChange={onChange}
              />
            );
          })}
        </Col>
      );
    }
    case FilterTypeEnum.SELECT: {
      return (
        <SelectField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as string | number | undefined)}
          name={item.name || item.dataIndex.toString()}
          colors={item.colors}
          options={item.options}
          isClearable={item.isClearable}
          placeholder={item.placeholder}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.TEXT: {
      return (
        <TextField
          fieldClassName={item.fieldClassName}
          fieldSize={item.fieldSize}
          helperText={item.helperText}
          inputClassName={item.inputClassName}
          label={item.label}
          inputValue={inputValues && (inputValues[item.dataIndex] as unknown as string | undefined)}
          name={item.name || item.dataIndex.toString()}
          maxLength={item.maxLength}
          minLength={item.minLength}
          placeholder={item.placeholder}
          onChange={(newValue) => {
            onChange(item.dataIndex, newValue as unknown as T[keyof T]);
          }}
          inline={inline}
        />
      );
    }
    case FilterTypeEnum.TITLE: {
      return <Section title={item.label} collapsable={false} separator={false} />;
    }
    default: {
      throw new Error('Missing ColumnType');
    }
  }
  throw new Error('Should have returned by then');
};

FilterItem.defaultProps = {
  inline: false,
  inputValues: undefined,
};

export default FilterItem;
