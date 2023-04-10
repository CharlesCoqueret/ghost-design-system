import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

import { IToggleEntry } from '../../../Atoms/CheckBoxInput';
import { FileStatusEnum, IFile } from '../../../Atoms/FileInput';
import { ColumnType } from '../../DataTable/Common';

let onChangeHandlerAmountField: ((value: number | undefined) => void) | undefined;
let onChangeHandlerCheckboxField: ((value: Array<IToggleEntry>) => void) | undefined;
let onChangeHandlerDateField: ((value: Date | null | undefined) => void) | undefined;
let onChangeHandlerDynamicSearchField: ((value: string | number | undefined) => void) | undefined;
let onChangeHandlerFileField: ((value: Array<IFile>) => void) | undefined;
let onChangeHandlerMultiSelectField: ((value: Array<string | number> | undefined) => void) | undefined;
let onChangeHandlerPercentageField: ((value: number | undefined) => void) | undefined;
let onChangeHandlerRichTextField: ((value: string | undefined) => void) | undefined;
let onChangeHandlerSelectField: ((value: string | number | undefined) => void) | undefined;
let onChangeHandlerSwitchField: ((value: Array<IToggleEntry>) => void) | undefined;
let onRowSubmitTableField: ((row: { number: number | undefined } | undefined, rowIndex: number) => void) | undefined;
let onRowDeleteTableField: ((row: { number: number | undefined } | undefined, rowIndex: number) => void) | undefined;
let onChangeHandlerTextField: ((value: string | undefined) => void) | undefined;
let onChangeHandlerTextAreaField: ((value: string | undefined) => void) | undefined;
let onChangeHandlerYearField: ((value: number | undefined) => void) | undefined;

jest.mock('../../../Molecules/AmountField', () => {
  return {
    AmountField: (props: { onChange: typeof onChangeHandlerAmountField }) => {
      if (props.onChange) onChangeHandlerAmountField = props.onChange;
      return <div>Mocked AmountField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/CheckboxField', () => {
  return {
    CheckboxField: (props: { onChange: typeof onChangeHandlerCheckboxField }) => {
      if (props.onChange) onChangeHandlerCheckboxField = props.onChange;
      return <div>Mocked CheckboxField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/CheckboxField', () => {
  return {
    CheckboxField: (props: { onChange: typeof onChangeHandlerCheckboxField }) => {
      if (props.onChange) onChangeHandlerCheckboxField = props.onChange;
      return <div>Mocked CheckboxField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/DatePickerField', () => {
  return {
    DatePickerField: (props: { onChange: typeof onChangeHandlerDateField }) => {
      if (props.onChange) onChangeHandlerDateField = props.onChange;
      return <div>Mocked DatePickerField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/DynamicSearchField', () => {
  return {
    DynamicSearchField: (props: { onChange: typeof onChangeHandlerDynamicSearchField }) => {
      if (props.onChange) onChangeHandlerDynamicSearchField = props.onChange;
      return <div>Mocked DynamicSearchField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/FileField', () => {
  return {
    FileField: (props: { onChange: typeof onChangeHandlerFileField }) => {
      if (props.onChange) onChangeHandlerFileField = props.onChange;
      return <div>Mocked FileField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/MultiSelectField', () => {
  return {
    MultiSelectField: (props: { onChange: typeof onChangeHandlerMultiSelectField }) => {
      if (props.onChange) onChangeHandlerMultiSelectField = props.onChange;
      return <div>Mocked MultiSelectField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/PercentageField', () => {
  return {
    PercentageField: (props: { onChange: typeof onChangeHandlerPercentageField }) => {
      if (props.onChange) onChangeHandlerPercentageField = props.onChange;
      return <div>Mocked PercentageField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/RichTextField', () => {
  return {
    RichTextField: (props: { onChange: typeof onChangeHandlerRichTextField }) => {
      if (props.onChange) onChangeHandlerRichTextField = props.onChange;
      return <div>Mocked RichTextField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/SelectField', () => {
  return {
    SelectField: (props: { onChange: typeof onChangeHandlerSelectField }) => {
      if (props.onChange) onChangeHandlerSelectField = props.onChange;
      return <div>Mocked SelectField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/SwitchField', () => {
  return {
    SwitchField: (props: { onChange: typeof onChangeHandlerSwitchField }) => {
      if (props.onChange) onChangeHandlerSwitchField = props.onChange;
      return <div>Mocked SwitchField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../DataTable/LineEditableDataTable', () => {
  return {
    LineEditableDataTable: (props: {
      extra: {
        onRowSubmit: typeof onRowSubmitTableField;
        onRowDelete: typeof onRowDeleteTableField;
      };
    }) => {
      if (props?.extra?.onRowSubmit) onRowSubmitTableField = props.extra.onRowSubmit;
      if (props?.extra?.onRowDelete) onRowDeleteTableField = props.extra.onRowDelete;
      return <div>Mocked SwitchField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/TextAreaField', () => {
  return {
    TextAreaField: (props: { onChange: typeof onChangeHandlerTextAreaField }) => {
      if (props.onChange) onChangeHandlerTextAreaField = props.onChange;
      return <div>Mocked TextAreaField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/TextField', () => {
  return {
    TextField: (props: { onChange: typeof onChangeHandlerTextField }) => {
      if (props.onChange) onChangeHandlerTextField = props.onChange;
      return <div>Mocked TextField props: {JSON.stringify(props)}</div>;
    },
  };
});

jest.mock('../../../Molecules/YearPickerField', () => {
  return {
    YearPickerField: (props: { onChange: typeof onChangeHandlerYearField }) => {
      if (props.onChange) onChangeHandlerYearField = props.onChange;
      return <div>Mocked YearPickerField props: {JSON.stringify(props)}</div>;
    },
  };
});

import FormFieldLegacy from '../FormFieldLegacy';
import { FieldLegacyTypeEnum } from '../types';

afterEach(() => {
  onChangeHandlerAmountField = undefined;
  onChangeHandlerCheckboxField = undefined;
  onChangeHandlerDateField = undefined;
  onChangeHandlerDynamicSearchField = undefined;
  onChangeHandlerFileField = undefined;
  onChangeHandlerMultiSelectField = undefined;
  onChangeHandlerPercentageField = undefined;
  onChangeHandlerRichTextField = undefined;
  onChangeHandlerSelectField = undefined;
  onChangeHandlerSwitchField = undefined;
  onRowSubmitTableField = undefined;
  onRowDeleteTableField = undefined;
  onChangeHandlerTextField = undefined;
  onChangeHandlerTextAreaField = undefined;
  onChangeHandlerYearField = undefined;
});

describe('FormFieldLegacy Component', () => {
  it('FormFieldLegacy renders amount field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ amount: 50 }}
        field={{ dataIndex: 'amount', fieldType: FieldLegacyTypeEnum.AMOUNT, label: 'amount' }}
        handleChange={handleChangeMock}
        previousData={{ amount: 0 }}
        validationError={{ amount: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerAmountField) {
      onChangeHandlerAmountField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('amount', 100);

    container.rerender(
      <FormFieldLegacy
        data={{ amount: undefined, field: 'field' }}
        field={{ dataIndex: 'amount', fieldType: FieldLegacyTypeEnum.AMOUNT, label: 'amount' }}
        handleChange={handleChangeMock}
        validationError={{ field: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders checkbox field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{
          checkbox: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2', checked: true },
            { value: 'value3', label: 'label3', checked: false },
          ],
        }}
        field={{ dataIndex: 'checkbox', fieldType: FieldLegacyTypeEnum.CHECKBOX, label: 'checkbox' }}
        handleChange={handleChangeMock}
        previousData={{
          checkbox: [
            { value: 'value1', label: 'label1', checked: true },
            { value: 'value2', label: 'label2', checked: false },
            { value: 'value3', label: 'label3' },
            { value: 'value4', label: 'label4' },
          ],
        }}
        validationError={{ checkbox: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerCheckboxField) {
      onChangeHandlerCheckboxField([
        { value: 'value1', label: 'label1', checked: true },
        { value: 'value2', label: 'label2', checked: true },
        { value: 'value3', label: 'label3', checked: false },
      ]);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('checkbox', [
      { value: 'value1', label: 'label1', checked: true },
      { value: 'value2', label: 'label2', checked: true },
      { value: 'value3', label: 'label3', checked: false },
    ]);

    container.rerender(
      <FormFieldLegacy
        data={{ checkbox: undefined }}
        field={{ dataIndex: 'checkbox', fieldType: FieldLegacyTypeEnum.CHECKBOX, label: 'checkbox' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders custom field', () => {
    const handleChangeMock = jest.fn();
    let onChangeHandlerCustomField: ((newValue: number) => void) | undefined;

    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ custom: 1 }}
        field={{
          customField: (props: { onChange?: typeof onChangeHandlerCustomField }) => {
            if (props.onChange) onChangeHandlerCustomField = props.onChange;
            return <div>Mocked CustomField props: {JSON.stringify(props)}</div>;
          },
          dataIndex: 'custom',
          fieldType: FieldLegacyTypeEnum.CUSTOM,
          label: 'custom',
          isEqual: (previous?: number, current?: number) => {
            return previous === current;
          },
        }}
        handleChange={handleChangeMock}
        previousData={{ custom: 0 }}
        validationError={{ custom: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerCustomField) {
      onChangeHandlerCustomField(2);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('custom', 2);

    container.rerender(
      <FormFieldLegacy
        data={{ custom: undefined }}
        field={{
          customField: (props: unknown) => {
            return <div>Mocked CustomField props: {JSON.stringify(props)}</div>;
          },
          dataIndex: 'custom',
          fieldType: FieldLegacyTypeEnum.CUSTOM,
          label: 'custom',
          isEqual: (previous?: number, current?: number) => {
            return previous === current;
          },
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders date field', () => {
    const handleChangeMock = jest.fn();

    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ date: new Date('2022-04-12T00:00:00.000Z') }}
        field={{
          dataIndex: 'date',
          fieldType: FieldLegacyTypeEnum.DATE,
          label: 'date',
        }}
        handleChange={handleChangeMock}
        previousData={{ date: new Date('1984-09-24T00:00:00.000Z') }}
        validationError={{ date: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerDateField) {
      onChangeHandlerDateField(new Date('2022-04-10T00:00:00.000Z'));
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('date', new Date('2022-04-10T00:00:00.000Z'));

    container.rerender(
      <FormFieldLegacy
        data={{ date: undefined }}
        field={{
          dataIndex: 'date',
          fieldType: FieldLegacyTypeEnum.DATE,
          label: 'date',
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders dynamic search field', () => {
    const handleChangeMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();

    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ dynamicsearch: 'value1' }}
        field={{
          dataIndex: 'dynamicsearch',
          fieldType: FieldLegacyTypeEnum.DYNAMICSEARCH,
          label: 'dynamicsearch',
          noOptionsMessage: noOptionsMessageMock,
          resolveValue: resolveValueMock,
          searchOptions: searchOptionsMock,
        }}
        handleChange={handleChangeMock}
        previousData={{ dynamicsearch: 'value2' }}
        validationError={{ dynamicsearch: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerDynamicSearchField) {
      onChangeHandlerDynamicSearchField('value3');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('dynamicsearch', 'value3');

    container.rerender(
      <FormFieldLegacy
        data={{ dynamicsearch: undefined }}
        field={{
          dataIndex: 'dynamicsearch',
          fieldType: FieldLegacyTypeEnum.DYNAMICSEARCH,
          label: 'dynamicsearch',
          noOptionsMessage: noOptionsMessageMock,
          resolveValue: resolveValueMock,
          searchOptions: searchOptionsMock,
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders file field', () => {
    const handleChangeMock = jest.fn();
    const onDeleteMock = jest.fn();

    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ file: [{ name: 'file1', size: 1, type: 'type1', status: FileStatusEnum.DONE }] }}
        field={{
          dataIndex: 'file',
          fieldType: FieldLegacyTypeEnum.FILE,
          label: 'file',
          onDelete: onDeleteMock,
          requestMethod: 'POST',
          requestUrl: 'test.url',
        }}
        handleChange={handleChangeMock}
        previousData={{ file: [{ name: 'file2', size: 2, type: 'type2', status: FileStatusEnum.DONE }] }}
        validationError={{ file: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerFileField) {
      onChangeHandlerFileField([
        { name: 'file1', size: 1, type: 'type1', status: FileStatusEnum.DONE },
        { name: 'file2', size: 2, type: 'type2', status: FileStatusEnum.DONE },
      ]);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('file', [
      { name: 'file1', size: 1, type: 'type1', status: FileStatusEnum.DONE },
      { name: 'file2', size: 2, type: 'type2', status: FileStatusEnum.DONE },
    ]);

    container.rerender(
      <FormFieldLegacy
        data={{ file: undefined }}
        field={{
          dataIndex: 'file',
          fieldType: FieldLegacyTypeEnum.FILE,
          label: 'file',
          onDelete: onDeleteMock,
          requestMethod: 'POST',
          requestUrl: 'test.url',
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders multi select field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ multiselect: ['value1'] }}
        field={{
          dataIndex: 'multiselect',
          fieldType: FieldLegacyTypeEnum.MULTISELECT,
          label: 'multiselect',
          numberOfItemLabel: '{} item selected',
          numberOfItemsLabel: '{} items selected',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
        previousData={{ multiselect: ['value2'] }}
        validationError={{ multiselect: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerMultiSelectField) {
      onChangeHandlerMultiSelectField(['value1', 'value2']);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('multiselect', ['value1', 'value2']);

    container.rerender(
      <FormFieldLegacy
        data={{ multiselect: undefined }}
        field={{
          dataIndex: 'multiselect',
          fieldType: FieldLegacyTypeEnum.MULTISELECT,
          label: 'multiselect',
          numberOfItemLabel: '{} item selected',
          numberOfItemsLabel: '{} items selected',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);

    container.rerender(
      <FormFieldLegacy
        data={{ multiselect: ['value-invalid'] }}
        field={{
          dataIndex: 'multiselect',
          eraseValueWhenNotInOptions: true,
          fieldType: FieldLegacyTypeEnum.MULTISELECT,
          label: 'multiselect',
          numberOfItemLabel: '{} item selected',
          numberOfItemsLabel: '{} items selected',
          options: () => [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(2);
    expect(handleChangeMock).toBeCalledWith('multiselect', []);
  });

  it('FormFieldLegacy renders number field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ number: 50 }}
        field={{ dataIndex: 'number', fieldType: FieldLegacyTypeEnum.NUMBER, label: 'number' }}
        handleChange={handleChangeMock}
        previousData={{ number: '0' }}
        validationError={{ number: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerAmountField) {
      onChangeHandlerAmountField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('number', 100);

    container.rerender(
      <FormFieldLegacy
        data={{ number: undefined }}
        field={{ dataIndex: 'number', fieldType: FieldLegacyTypeEnum.NUMBER, label: 'number' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders percentage field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ percentage: 50 }}
        field={{ dataIndex: 'percentage', fieldType: FieldLegacyTypeEnum.PERCENTAGE, label: 'percentage' }}
        handleChange={handleChangeMock}
        previousData={{ percentage: '0' }}
        validationError={{ percentage: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerPercentageField) {
      onChangeHandlerPercentageField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('percentage', 100);

    container.rerender(
      <FormFieldLegacy
        data={{ percentage: undefined }}
        field={{ dataIndex: 'percentage', fieldType: FieldLegacyTypeEnum.PERCENTAGE, label: 'percentage' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders rich text field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ richtext: 'richtext' }}
        field={{ dataIndex: 'richtext', fieldType: FieldLegacyTypeEnum.RICHTEXT, label: 'richtext' }}
        handleChange={handleChangeMock}
        previousData={{ richtext: 'old richtext' }}
        validationError={{ richtext: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerRichTextField) {
      onChangeHandlerRichTextField('new richtext');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('richtext', 'new richtext');

    container.rerender(
      <FormFieldLegacy
        data={{ richtext: undefined }}
        field={{ dataIndex: 'richtext', fieldType: FieldLegacyTypeEnum.RICHTEXT, label: 'richtext' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders select field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ select: 'value1' }}
        field={{
          dataIndex: 'select',
          fieldType: FieldLegacyTypeEnum.SELECT,
          label: 'select',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
        previousData={{ select: 'value1' }}
        validationError={{ select: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerSelectField) {
      onChangeHandlerSelectField('value2');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('select', 'value2');

    container.rerender(
      <FormFieldLegacy
        data={{ select: undefined }}
        field={{
          dataIndex: 'select',
          fieldType: FieldLegacyTypeEnum.SELECT,
          label: 'select',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);

    container.rerender(
      <FormFieldLegacy
        data={{ select: 'value-invalid' }}
        field={{
          dataIndex: 'select',
          eraseValueWhenNotInOptions: true,
          fieldType: FieldLegacyTypeEnum.SELECT,
          label: 'select',
          options: () => [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(2);
    expect(handleChangeMock).toBeCalledWith('select', undefined);
  });

  it('FormFieldLegacy renders switch field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{
          switch: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2', checked: true },
            { value: 'value3', label: 'label3', checked: false },
          ],
        }}
        field={{ dataIndex: 'switch', fieldType: FieldLegacyTypeEnum.SWITCH, label: 'switch' }}
        handleChange={handleChangeMock}
        previousData={{
          switch: [
            { value: 'value1', label: 'label1', checked: true },
            { value: 'value2', label: 'label2', checked: false },
            { value: 'value3', label: 'label3' },
            { value: 'value4', label: 'label4' },
          ],
        }}
        validationError={{ switch: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerSwitchField) {
      onChangeHandlerSwitchField([
        { value: 'value1', label: 'label1', checked: true },
        { value: 'value2', label: 'label2', checked: true },
        { value: 'value3', label: 'label3', checked: false },
      ]);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('switch', [
      { value: 'value1', label: 'label1', checked: true },
      { value: 'value2', label: 'label2', checked: true },
      { value: 'value3', label: 'label3', checked: false },
    ]);

    container.rerender(
      <FormFieldLegacy
        data={{ switch: undefined }}
        field={{ dataIndex: 'switch', fieldType: FieldLegacyTypeEnum.SWITCH, label: 'switch' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders table field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        data={{ table: [{ number: 1 }, { number: 2 }, { number: 3 }] }}
        field={{
          columns: [
            {
              title: 'number',
              dataIndex: 'number',
              type: ColumnType.NUMBER,
            },
          ],
          dataIndex: 'table',
          extra: {
            validationSchema: yup.object({
              number: yup.number().required('Value for number is required'),
            }),
          },
          fieldType: FieldLegacyTypeEnum.LINE_EDITABLE_TABLE,
          label: 'table',
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onRowSubmitTableField) {
      onRowSubmitTableField({ number: 4 }, 3);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('table', [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }]);

    if (onRowDeleteTableField) {
      onRowDeleteTableField({ number: 1 }, 0);
    }

    expect(handleChangeMock).toBeCalledTimes(2);
    expect(handleChangeMock).toBeCalledWith('table', [{ number: 2 }, { number: 3 }, { number: 4 }]);
  });

  it('FormFieldLegacy renders text field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ text: 'text' }}
        field={{ dataIndex: 'text', fieldType: FieldLegacyTypeEnum.TEXT, label: 'text' }}
        handleChange={handleChangeMock}
        previousData={{ text: 'old text' }}
        validationError={{ text: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerTextField) {
      onChangeHandlerTextField('new text');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('text', 'new text');

    container.rerender(
      <FormFieldLegacy
        data={{ text: undefined }}
        field={{ dataIndex: 'text', fieldType: FieldLegacyTypeEnum.TEXT, label: 'text' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders textarea field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ textarea: 'textarea' }}
        field={{ dataIndex: 'textarea', fieldType: FieldLegacyTypeEnum.TEXTAREA, label: 'textearea' }}
        handleChange={handleChangeMock}
        previousData={{ textarea: 'old textarea' }}
        validationError={{ textarea: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerTextAreaField) {
      onChangeHandlerTextAreaField('new textarea');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('textarea', 'new textarea');

    container.rerender(
      <FormFieldLegacy
        data={{ textarea: undefined }}
        field={{ dataIndex: 'textarea', fieldType: FieldLegacyTypeEnum.TEXTAREA, label: 'textarea' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormFieldLegacy renders year field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormFieldLegacy
        enableOldData
        enableSideBySide
        data={{ year: 2022 }}
        field={{ dataIndex: 'year', fieldType: FieldLegacyTypeEnum.YEAR, label: 'year' }}
        handleChange={handleChangeMock}
        previousData={{ year: 2020 }}
        validationError={{ year: 'ERROR' }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerYearField) {
      onChangeHandlerYearField(1984);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('year', 1984);

    container.rerender(
      <FormFieldLegacy
        data={{ year: undefined }}
        field={{ dataIndex: 'year', fieldType: FieldLegacyTypeEnum.YEAR, label: 'year' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });
});
