import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

import { IToggleEntry } from '../../../Atoms/CheckBoxInput';
import { FileStatusEnum, IFile } from '../../../Atoms/FileInput';
import { ColumnType } from '../../DataTable/Common';

// Mocking suneditor which is problematic with Jest
jest.mock('suneditor', () => {});
jest.mock('suneditor/src/plugins/', () => {});
jest.mock('suneditor/src/plugins/submenu/align', () => {});
jest.mock('suneditor/src/plugins/command/blockquote', () => {});
jest.mock('suneditor/src/plugins/submenu/fontColor', () => {});
jest.mock('suneditor/src/plugins/submenu/fontSize', () => {});
jest.mock('suneditor/src/plugins/submenu/formatBlock', () => {});
jest.mock('suneditor/src/plugins/submenu/hiliteColor', () => {});
jest.mock('suneditor/src/plugins/submenu/horizontalRule', () => {});
jest.mock('suneditor/src/plugins/dialog/image', () => {});
jest.mock('suneditor/src/plugins/dialog/link', () => {});
jest.mock('suneditor/src/plugins/submenu/lineHeight', () => {});
jest.mock('suneditor/src/plugins/submenu/list', () => {});
jest.mock('suneditor/src/plugins/submenu/paragraphStyle', () => {});
jest.mock('suneditor/src/plugins/submenu/table', () => {});
jest.mock('suneditor-react', () => {});
jest.mock('suneditor-react/dist', () => {});
jest.mock('suneditor-react/dist/types/lang', () => {});

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

import FormField from '../FormField';
import { FieldTypeEnum } from '../types';

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

describe('FormField Component', () => {
  it('FormField renders amount field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ amount: 50 }}
        field={{ dataIndex: 'amount', fieldType: FieldTypeEnum.AMOUNT, label: 'amount' }}
        handleChange={handleChangeMock}
        previousData={{ amount: '0' }}
        validationError={{ amount: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerAmountField) {
      onChangeHandlerAmountField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('amount', 100);

    container.rerender(
      <FormField
        data={{ amount: undefined, field: 'field' }}
        field={{ dataIndex: 'amount', fieldType: FieldTypeEnum.AMOUNT, label: 'amount' }}
        handleChange={handleChangeMock}
        validationError={{ field: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders checkbox field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{
          checkbox: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2', checked: true },
            { value: 'value3', label: 'label3', checked: false },
          ],
        }}
        field={{ dataIndex: 'checkbox', fieldType: FieldTypeEnum.CHECKBOX, label: 'checkbox' }}
        handleChange={handleChangeMock}
        previousData={{
          checkbox: [
            { value: 'value1', label: 'label1', checked: true },
            { value: 'value2', label: 'label2', checked: false },
            { value: 'value3', label: 'label3' },
            { value: 'value4', label: 'label4' },
          ],
        }}
        validationError={{ checkbox: { message: 'ERROR' } }}
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
      <FormField
        data={{ checkbox: undefined }}
        field={{ dataIndex: 'checkbox', fieldType: FieldTypeEnum.CHECKBOX, label: 'checkbox' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders custom field', () => {
    const handleChangeMock = jest.fn();
    let onChangeHandlerCustomField: ((newValue: number) => void) | undefined;

    const container = render(
      <FormField
        data={{ custom: 1 }}
        field={{
          customField: (props: { onChange: typeof onChangeHandlerCustomField }) => {
            if (props.onChange) onChangeHandlerCustomField = props.onChange;
            return <div>Mocked CustomField props: {JSON.stringify(props)}</div>;
          },
          dataIndex: 'custom',
          fieldType: FieldTypeEnum.CUSTOM,
          label: 'custom',
          isEqual: (previous?: number, current?: number) => {
            return previous === current;
          },
        }}
        handleChange={handleChangeMock}
        previousData={{ custom: 0 }}
        validationError={{ custom: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerCustomField) {
      onChangeHandlerCustomField(2);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('custom', 2);

    container.rerender(
      <FormField
        data={{ custom: undefined }}
        field={{
          customField: (props: unknown) => {
            return <div>Mocked CustomField props: {JSON.stringify(props)}</div>;
          },
          dataIndex: 'custom',
          fieldType: FieldTypeEnum.CUSTOM,
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

  it('FormField renders date field', () => {
    const handleChangeMock = jest.fn();

    const container = render(
      <FormField
        data={{ date: new Date('04/12/2022') }}
        field={{
          dataIndex: 'date',
          fieldType: FieldTypeEnum.DATE,
          label: 'date',
        }}
        handleChange={handleChangeMock}
        previousData={{ date: new Date('09/24/1984') }}
        validationError={{ date: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerDateField) {
      onChangeHandlerDateField(new Date('2022-04-10T00:00:00.000Z'));
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('date', new Date('2022-04-10T00:00:00.000Z'));

    container.rerender(
      <FormField
        data={{ date: undefined }}
        field={{
          dataIndex: 'date',
          fieldType: FieldTypeEnum.DATE,
          label: 'date',
        }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders dynamic search field', () => {
    const handleChangeMock = jest.fn();
    const noOptionsMessageMock = jest.fn();
    const resolveValueMock = jest.fn();
    const searchOptionsMock = jest.fn();

    const container = render(
      <FormField
        data={{ dynamicsearch: 'value1' }}
        field={{
          dataIndex: 'dynamicsearch',
          fieldType: FieldTypeEnum.DYNAMICSEARCH,
          label: 'dynamicsearch',
          noOptionsMessage: noOptionsMessageMock,
          resolveValue: resolveValueMock,
          searchOptions: searchOptionsMock,
        }}
        handleChange={handleChangeMock}
        previousData={{ dynamicsearch: 'value2' }}
        validationError={{ dynamicsearch: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerDynamicSearchField) {
      onChangeHandlerDynamicSearchField('value3');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('dynamicsearch', 'value3');

    container.rerender(
      <FormField
        data={{ dynamicsearch: undefined }}
        field={{
          dataIndex: 'dynamicsearch',
          fieldType: FieldTypeEnum.DYNAMICSEARCH,
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

  it('FormField renders file field', () => {
    const handleChangeMock = jest.fn();
    const onDeleteMock = jest.fn();

    const container = render(
      <FormField
        data={{ file: [{ name: 'file1', size: 1, type: 'type1', status: FileStatusEnum.DONE }] }}
        field={{
          dataIndex: 'file',
          fieldType: FieldTypeEnum.FILE,
          label: 'file',
          onDelete: onDeleteMock,
          requestMethod: 'POST',
          requestUrl: 'test.url',
        }}
        handleChange={handleChangeMock}
        previousData={{ file: [{ name: 'file2', size: 2, type: 'type2', status: FileStatusEnum.DONE }] }}
        validationError={{ file: { message: 'ERROR' } }}
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
      <FormField
        data={{ file: undefined }}
        field={{
          dataIndex: 'file',
          fieldType: FieldTypeEnum.FILE,
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

  it('FormField renders multi select field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ multiselect: ['value1'] }}
        field={{
          dataIndex: 'multiselect',
          fieldType: FieldTypeEnum.MULTISELECT,
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
        validationError={{ multiselect: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerMultiSelectField) {
      onChangeHandlerMultiSelectField(['value1', 'value2']);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('multiselect', ['value1', 'value2']);

    container.rerender(
      <FormField
        data={{ multiselect: undefined }}
        field={{
          dataIndex: 'multiselect',
          fieldType: FieldTypeEnum.MULTISELECT,
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
      <FormField
        data={{ multiselect: ['value-invalid'] }}
        field={{
          dataIndex: 'multiselect',
          eraseValueWhenNotInOptions: true,
          fieldType: FieldTypeEnum.MULTISELECT,
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

  it('FormField renders number field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ number: 50 }}
        field={{ dataIndex: 'number', fieldType: FieldTypeEnum.NUMBER, label: 'number' }}
        handleChange={handleChangeMock}
        previousData={{ number: '0' }}
        validationError={{ number: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerAmountField) {
      onChangeHandlerAmountField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('number', 100);

    container.rerender(
      <FormField
        data={{ number: undefined }}
        field={{ dataIndex: 'number', fieldType: FieldTypeEnum.NUMBER, label: 'number' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders percentage field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ percentage: 50 }}
        field={{ dataIndex: 'percentage', fieldType: FieldTypeEnum.PERCENTAGE, label: 'percentage' }}
        handleChange={handleChangeMock}
        previousData={{ percentage: '0' }}
        validationError={{ percentage: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerPercentageField) {
      onChangeHandlerPercentageField(100);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('percentage', 100);

    container.rerender(
      <FormField
        data={{ percentage: undefined }}
        field={{ dataIndex: 'percentage', fieldType: FieldTypeEnum.PERCENTAGE, label: 'percentage' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders rich text field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ richtext: 'richtext' }}
        field={{ dataIndex: 'richtext', fieldType: FieldTypeEnum.RICHTEXT, label: 'richtext' }}
        handleChange={handleChangeMock}
        previousData={{ richtext: 'old richtext' }}
        validationError={{ richtext: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerRichTextField) {
      onChangeHandlerRichTextField('new richtext');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('richtext', 'new richtext');

    container.rerender(
      <FormField
        data={{ richtext: undefined }}
        field={{ dataIndex: 'richtext', fieldType: FieldTypeEnum.RICHTEXT, label: 'richtext' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders select field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ select: 'value1' }}
        field={{
          dataIndex: 'select',
          fieldType: FieldTypeEnum.SELECT,
          label: 'select',
          options: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2' },
          ],
        }}
        handleChange={handleChangeMock}
        previousData={{ select: 'value1' }}
        validationError={{ select: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerSelectField) {
      onChangeHandlerSelectField('value2');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('select', 'value2');

    container.rerender(
      <FormField
        data={{ select: undefined }}
        field={{
          dataIndex: 'select',
          fieldType: FieldTypeEnum.SELECT,
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
      <FormField
        data={{ select: 'value-invalid' }}
        field={{
          dataIndex: 'select',
          eraseValueWhenNotInOptions: true,
          fieldType: FieldTypeEnum.SELECT,
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

  it('FormField renders switch field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{
          switch: [
            { value: 'value1', label: 'label1' },
            { value: 'value2', label: 'label2', checked: true },
            { value: 'value3', label: 'label3', checked: false },
          ],
        }}
        field={{ dataIndex: 'switch', fieldType: FieldTypeEnum.SWITCH, label: 'switch' }}
        handleChange={handleChangeMock}
        previousData={{
          switch: [
            { value: 'value1', label: 'label1', checked: true },
            { value: 'value2', label: 'label2', checked: false },
            { value: 'value3', label: 'label3' },
            { value: 'value4', label: 'label4' },
          ],
        }}
        validationError={{ switch: { message: 'ERROR' } }}
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
      <FormField
        data={{ switch: undefined }}
        field={{ dataIndex: 'switch', fieldType: FieldTypeEnum.SWITCH, label: 'switch' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders table field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
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
          fieldType: FieldTypeEnum.TABLE,
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

  it('FormField renders text field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ text: 'text' }}
        field={{ dataIndex: 'text', fieldType: FieldTypeEnum.TEXT, label: 'text' }}
        handleChange={handleChangeMock}
        previousData={{ text: 'old text' }}
        validationError={{ text: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerTextField) {
      onChangeHandlerTextField('new text');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('text', 'new text');

    container.rerender(
      <FormField
        data={{ text: undefined }}
        field={{ dataIndex: 'text', fieldType: FieldTypeEnum.TEXT, label: 'text' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders textarea field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ textarea: 'textarea' }}
        field={{ dataIndex: 'textarea', fieldType: FieldTypeEnum.TEXTAREA, label: 'textearea' }}
        handleChange={handleChangeMock}
        previousData={{ textarea: 'old textarea' }}
        validationError={{ textarea: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerTextAreaField) {
      onChangeHandlerTextAreaField('new textarea');
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('textarea', 'new textarea');

    container.rerender(
      <FormField
        data={{ textarea: undefined }}
        field={{ dataIndex: 'textarea', fieldType: FieldTypeEnum.TEXTAREA, label: 'textarea' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });

  it('FormField renders year field', () => {
    const handleChangeMock = jest.fn();
    const container = render(
      <FormField
        data={{ year: 2022 }}
        field={{ dataIndex: 'year', fieldType: FieldTypeEnum.YEAR, label: 'year' }}
        handleChange={handleChangeMock}
        previousData={{ year: 2020 }}
        validationError={{ year: { message: 'ERROR' } }}
      />,
    );

    expect(container.container).toMatchSnapshot();

    if (onChangeHandlerYearField) {
      onChangeHandlerYearField(1984);
    }

    expect(handleChangeMock).toBeCalledTimes(1);
    expect(handleChangeMock).toBeCalledWith('year', 1984);

    container.rerender(
      <FormField
        data={{ year: undefined }}
        field={{ dataIndex: 'year', fieldType: FieldTypeEnum.YEAR, label: 'year' }}
        handleChange={handleChangeMock}
      />,
    );

    expect(container.container).toMatchSnapshot();
    expect(handleChangeMock).toBeCalledTimes(1);
  });
});
