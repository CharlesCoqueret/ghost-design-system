import React from 'react';
import { render } from '@testing-library/react';

import FilterItem from '../FilterItem';
import { FilterTypeEnum } from '../types';
import { IToggleEntry } from '../../../Atoms/CheckBoxInput';

let onChangeHandlerCheckbox: ((value: Array<IToggleEntry>) => void) | undefined;
let onChangeHandlerDate: ((value: Date | null | undefined) => void) | undefined;
let onChangeHandlerDynamicSearch: ((value: string | number | undefined) => void) | undefined;
let onChangeHandlerMultiSelectField: ((value: Array<string | number> | undefined) => void) | undefined;
let onChangeHandlerAmountField: ((value: number | undefined) => void) | undefined;
let onChangeHandlerSelectField: ((value: string | number | undefined) => void) | undefined;
let onChangeHandlerTextField: ((value: string | undefined) => void) | undefined;

jest.mock('../../../Molecules/CheckboxField', () => {
  return {
    CheckboxField: (props: { onChange: typeof onChangeHandlerCheckbox }) => {
      onChangeHandlerCheckbox = props.onChange;
      return <div>Mocked CheckboxField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/DatePickerField', () => {
  return {
    DatePickerField: (props: { onChange: typeof onChangeHandlerDate }) => {
      onChangeHandlerDate = props.onChange;
      return <div>Mocked DatePickerField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/DynamicSearchField', () => {
  return {
    DynamicSearchField: (props: { onChange: typeof onChangeHandlerDynamicSearch }) => {
      onChangeHandlerDynamicSearch = props.onChange;
      return <div>Mocked DynamicSearchField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/MultiSelectField', () => {
  return {
    MultiSelectField: (props: { onChange: typeof onChangeHandlerMultiSelectField }) => {
      onChangeHandlerMultiSelectField = props.onChange;
      return <div>Mocked MultiSelectField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/AmountField', () => {
  return {
    AmountField: (props: { onChange: typeof onChangeHandlerAmountField }) => {
      onChangeHandlerAmountField = props.onChange;
      return <div>Mocked AmountField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/SelectField', () => {
  return {
    SelectField: (props: { onChange: typeof onChangeHandlerSelectField }) => {
      onChangeHandlerSelectField = props.onChange;
      return <div>Mocked SelectField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/TextField', () => {
  return {
    TextField: (props: { onChange: typeof onChangeHandlerTextField }) => {
      onChangeHandlerTextField = props.onChange;
      return <div>Mocked TextField props: {JSON.stringify(props)}</div>;
    },
  };
});

describe('FilterItem Component', () => {
  afterAll(() => {
    onChangeHandlerCheckbox = undefined;
    onChangeHandlerDate = undefined;
    onChangeHandlerDynamicSearch = undefined;
    onChangeHandlerMultiSelectField = undefined;
    onChangeHandlerAmountField = undefined;
    onChangeHandlerSelectField = undefined;
    onChangeHandlerTextField = undefined;
  });

  it('FilterItem renders CheckboxField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ checkbox: Array<IToggleEntry> }>
        inputValues={{ checkbox: [{ label: 'LABEL', value: 'VALUE' }] }}
        item={{ dataIndex: 'checkbox', filterType: FilterTypeEnum.CHECKBOX }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerCheckbox).toBeDefined();
    if (onChangeHandlerCheckbox) {
      onChangeHandlerCheckbox([{ label: 'LABEL', value: 'VALUE', checked: true }]);
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('checkbox', [{ label: 'LABEL', value: 'VALUE', checked: true }]);
  });

  it('FilterItem renders DatePickerField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ date: Date | undefined | null }>
        inputValues={{ date: new Date('2022-04-10T00:00:00.000Z') }}
        item={{ dataIndex: 'date', filterType: FilterTypeEnum.DATE }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerDate).toBeDefined();
    if (onChangeHandlerDate) {
      onChangeHandlerDate(new Date('1990-01-01T00:00:00.000Z'));
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('date', new Date('1990-01-01T00:00:00.000Z'));
  });

  it('FilterItem renders DynamicSearchField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ dynamicsearch: string | undefined }>
        inputValues={{ dynamicsearch: 'value1' }}
        item={{
          dataIndex: 'dynamicsearch',
          filterType: FilterTypeEnum.DYNAMICSEARCH,
          noOptionsMessage: () => {
            return '';
          },
          resolveValue: () => {
            return Promise.resolve(undefined);
          },
          searchOptions: () => {
            return Promise.resolve(undefined);
          },
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerDynamicSearch).toBeDefined();
    if (onChangeHandlerDynamicSearch) {
      onChangeHandlerDynamicSearch('value2');
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('dynamicsearch', 'value2');
  });

  it('FilterItem renders MultiSelectField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ multiselect: Array<string | number> | undefined }>
        inputValues={{ multiselect: ['value1'] }}
        item={{
          dataIndex: 'multiselect',
          filterType: FilterTypeEnum.MULTISELECT,
          options: [],
          numberOfItemLabel: '',
          numberOfItemsLabel: '',
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerMultiSelectField).toBeDefined();
    if (onChangeHandlerMultiSelectField) {
      onChangeHandlerMultiSelectField(['value1', 'value2']);
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('multiselect', ['value1', 'value2']);
  });

  it('FilterItem renders Number / AmountField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ number: number | undefined }>
        inputValues={{ number: -12.34 }}
        item={{
          dataIndex: 'number',
          filterType: FilterTypeEnum.NUMBER,
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerAmountField).toBeDefined();
    if (onChangeHandlerAmountField) {
      onChangeHandlerAmountField(9876.54);
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('number', 9876.54);
  });

  it('FilterItem renders SelectField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ select: string | number | undefined }>
        inputValues={{ select: 'VALUE1' }}
        item={{
          dataIndex: 'select',
          filterType: FilterTypeEnum.SELECT,
          options: [],
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerSelectField).toBeDefined();
    if (onChangeHandlerSelectField) {
      onChangeHandlerSelectField('VALUE2');
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('select', 'VALUE2');
  });

  it('FilterItem renders TextField', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem<{ text: string | undefined }>
        inputValues={{ text: 'TEXT' }}
        item={{
          dataIndex: 'text',
          filterType: FilterTypeEnum.TEXT,
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerTextField).toBeDefined();
    if (onChangeHandlerTextField) {
      onChangeHandlerTextField('NEWTEXT');
    }
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith('text', 'NEWTEXT');
  });

  it('FilterItem renders Column and title', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <FilterItem
        item={{
          filterType: FilterTypeEnum.COLUMN,
          fields: [
            {
              filterType: FilterTypeEnum.TITLE,
              label: 'TITLE',
            },
            {
              filterType: FilterTypeEnum.NUMBER,
              dataIndex: 'number',
            },
          ],
        }}
        onChange={onChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
