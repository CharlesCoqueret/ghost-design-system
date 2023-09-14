import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';

import LineEditableModal, { columnToFieldMapper } from '../LineEditableModal';
import { ColumnType } from '../../Common/types';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';
import { FieldLegacyTypeEnum } from '../../../FormLegacy/types';
import { IFile } from '../../../../Atoms/FileInput';

describe('LineEditableModal component', () => {
  it('renders properly with amount and submitting', async () => {
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    const { container } = render(
      <LineEditableModal<{ amount?: number }>
        title='TITLE'
        showChanges={true}
        row={{ amount: 1 }}
        rowIndex={0}
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        columns={[{ dataIndex: 'amount', editable: true, title: 'Amount', type: ColumnType.AMOUNT }]}
        extra={{
          validationSchema: yup.object({
            amount: yup.number().optional(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();

    const input = screen.getByDisplayValue(1);
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onSubmitMock).toBeCalledTimes(1);
    expect(onSubmitMock).toBeCalledWith({ amount: 1 });
  });

  it('renders with amount hidden in form', () => {
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    const { container } = render(
      <LineEditableModal<{ amount?: number }>
        title='TITLE'
        showChanges={true}
        row={{ amount: 1 }}
        rowIndex={0}
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        columns={[
          { dataIndex: 'amount', editable: true, hiddenInForm: true, title: 'Amount', type: ColumnType.AMOUNT },
        ]}
        extra={{
          validationSchema: yup.object({
            amount: yup.number().optional(),
          }),
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with amount and cancelling', async () => {
    console.error = jest.fn();
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    render(
      <LineEditableModal<{ amount?: number }>
        title='TITLE'
        row={{ amount: 1 }}
        rowIndex={0}
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        columns={[{ dataIndex: 'amount', editable: true, title: 'Amount', type: ColumnType.AMOUNT }]}
        extra={{
          // eslint-disable-next-line
          // @ts-ignore
          validationSchema: undefined,
        }}
      />,
    );

    const input = screen.getByDisplayValue(1);
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onCancelMock).toBeCalledTimes(1);
    expect(onCancelMock).toBeCalledWith({ amount: 1 });
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(
      'could not retrieve if "amount" is mandatory. It looks like you haven\'t defined a proper validation schema.',
    );
  });

  it('renders with amount and submitting with invalid value', async () => {
    //scrollIntoView is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    console.error = jest.fn();
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    render(
      <LineEditableModal<{ amount?: number }>
        title='TITLE'
        row={{ amount: 1 }}
        rowIndex={0}
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        columns={[{ dataIndex: 'amount', editable: true, title: 'Amount', type: ColumnType.AMOUNT }]}
        extra={{
          validationSchema: yup.object({
            amount: yup.number().required(),
          }),
          localization: {
            cancelButton: 'cancelButton',
            submitButton: 'submitButton',
          },
        }}
      />,
    );

    const input = screen.getByDisplayValue(1);
    await userEvent.clear(input);
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onSubmitMock).toBeCalledTimes(0);
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith({ amount: 'amount is a required field' });
  });

  it('renders with amount and custon button', async () => {
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();
    const onClickMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });

    render(
      <LineEditableModal<{ amount?: number }>
        title='TITLE'
        row={{ amount: 1 }}
        rowIndex={0}
        onCancel={onCancelMock}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        columns={[{ dataIndex: 'amount', editable: true, title: 'Amount', type: ColumnType.AMOUNT }]}
        extra={{
          validationSchema: yup.object({
            amount: yup.number().required(),
          }),
          rowEditExtraActions: () => [
            {
              onClick: onClickMock,
              label: 'LABEL',
            },
          ],
        }}
      />,
    );

    const input = screen.getByDisplayValue(1);
    await userEvent.click(input);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onClickMock).toBeCalledTimes(1);
    expect(onCloseMock).toBeCalledTimes(1);
  });
});

describe('columnToFieldMapper helper', () => {
  it('converts', () => {
    expect(
      columnToFieldMapper<{
        amount?: number;
        badge?: string;
        checkbox: Array<IToggleEntry>;
        code: string;
        custom: string;
        date: Date;
        description: string;
        dynamicsearch: string;
        file: Array<IFile>;
        multiselect: Array<string>;
        number: number;
        percentage: number;
        richtext: string;
        section: string;
        switch: Array<IToggleEntry>;
        table: Array<{ number: number }>;
        text: string;
        textarea: string;
        year: number;
      }>([
        {
          dataIndex: 'amount',
          title: 'Amount',
          type: ColumnType.AMOUNT,
        },
        {
          dataIndex: 'badge',
          options: [{ value: 'badge', label: 'Badge' }],
          title: 'Badge',
          type: ColumnType.BADGE,
        },
        {
          buttons: [{ label: 'Button', icon: ['fal', 'gear'] }],
          moreActionsMessage: 'moreActionsMessage',
          title: 'Button',
          type: ColumnType.BUTTON,
        },
        {
          dataIndex: 'checkbox',
          title: 'Checkbox',
          type: ColumnType.CHECKBOX,
        },
        {
          dataIndex: 'code',
          title: 'Code',
          type: ColumnType.CODE,
        },
        {
          customRender: () => <></>,
          dataIndex: 'custom',
          title: 'Custom',
          type: ColumnType.CUSTOM,
        },
        {
          dataIndex: 'date',
          title: 'Date',
          type: ColumnType.DATE,
        },
        {
          dataIndex: 'description',
          description: <></>,
          title: 'Description',
          type: ColumnType.DESCRIPTION,
        },
        {
          dataIndex: 'dynamicsearch',
          noOptionsMessage: () => '',
          resolveValue: () => {
            return Promise.resolve(undefined);
          },
          searchOptions: () => {
            return Promise.resolve([]);
          },
          title: 'Dynamic search',
          type: ColumnType.DYNAMICSEARCH,
        },
        {
          dataIndex: 'file',
          onDelete: () => {
            return Promise.resolve();
          },
          requestMethod: 'POST',
          requestUrl: 'http://url.com',
          title: 'File',
          type: ColumnType.FILE,
        },
        {
          dataIndex: 'multiselect',
          numberOfItemLabel: 'numberOfItemLabel',
          numberOfItemsLabel: 'numberOfItemsLabel',
          options: [],
          title: 'Multi select',
          type: ColumnType.MULTISELECT,
        },
        {
          dataIndex: 'number',
          title: 'Number',
          type: ColumnType.NUMBER,
        },
        {
          dataIndex: 'percentage',
          title: 'Percentage',
          type: ColumnType.PERCENTAGE,
        },
        {
          dataIndex: 'richtext',
          title: 'Rich text',
          type: ColumnType.RICHTEXT,
        },
        {
          dataIndex: 'section',
          fields: [],
          label: 'Section',
          title: 'Section',
          type: ColumnType.SECTION,
        },
        {
          dataIndex: 'switch',
          title: 'Switch',
          type: ColumnType.SWITCH,
        },
        {
          columns: [
            {
              dataIndex: 'number',
              title: 'Number',
              type: ColumnType.NUMBER,
            },
          ],
          dataIndex: 'table',
          extra: {
            validationSchema: yup.object({
              amount: yup.number().optional(),
            }),
          },
          title: 'Table',
          type: ColumnType.TABLE,
        },
        {
          dataIndex: 'text',
          title: 'Text',
          type: ColumnType.TEXT,
        },
        {
          dataIndex: 'textarea',
          title: 'Textarea',
          type: ColumnType.TEXTAREA,
        },
        {
          dataIndex: 'year',
          title: 'Year',
          type: ColumnType.YEAR,
        },
      ]),
    ).toEqual([
      {
        allowNegative: undefined,
        dataIndex: 'amount',
        decimalScale: undefined,
        decimalSeparator: undefined,
        fieldType: FieldLegacyTypeEnum.AMOUNT,
        label: 'Amount',
        maxValue: undefined,
        minValue: undefined,
        placeholder: undefined,
        prefix: undefined,
        readOnly: true,
        suffix: undefined,
        thousandSeparator: undefined,
        thousandsGroupStyle: undefined,
      },
      {
        dataIndex: 'badge',
        fieldType: FieldLegacyTypeEnum.SELECT,
        isClearable: undefined,
        label: 'Badge',
        options: [
          {
            label: 'Badge',
            value: 'badge',
          },
        ],
        placeholder: undefined,
        readOnly: true,
        usePortal: undefined,
      },
      { dataIndex: 'checkbox', fieldType: FieldLegacyTypeEnum.CHECKBOX, label: 'Checkbox', readOnly: true },
      { dataIndex: 'code', fieldType: FieldLegacyTypeEnum.TEXT, label: 'Code', readOnly: true },
      {
        customField: expect.any(Function),
        dataIndex: 'custom',
        fieldType: FieldLegacyTypeEnum.CUSTOM,
        label: 'Custom',
        readOnly: true,
      },
      {
        calendarStartDay: undefined,
        dataIndex: 'date',
        dateFormat: undefined,
        fieldType: FieldLegacyTypeEnum.DATE,
        isClearable: undefined,
        label: 'Date',
        locale: undefined,
        readOnly: true,
        usePortal: undefined,
      },
      {
        dataIndex: 'description',
        description: <React.Fragment />,
        fieldType: 'description',
        label: 'Description',
      },
      {
        dataIndex: 'dynamicsearch',
        fieldType: 'dynamicsearch',
        isClearable: undefined,
        label: 'Dynamic search',
        noOptionsMessage: expect.any(Function),
        placeholder: undefined,
        readOnly: true,
        resolveValue: expect.any(Function),
        searchOptions: expect.any(Function),
        usePortal: undefined,
      },
      {
        acceptTypes: undefined,
        additionalInfo: undefined,
        dataIndex: 'file',
        fieldType: 'file',
        label: 'File',
        localization: undefined,
        maxFileSize: undefined,
        maxFiles: undefined,
        maxFolderDepth: undefined,
        onDelete: expect.any(Function),
        onDownload: undefined,
        onFailure: undefined,
        onSuccess: undefined,
        readOnly: true,
        requestHeaders: undefined,
        requestMethod: 'POST',
        requestUrl: 'http://url.com',
        requestWithCredentials: undefined,
        showFileSize: undefined,
        showProgressBar: undefined,
        uploadMessage: undefined,
      },
      {
        dataIndex: 'multiselect',
        eraseValueWhenNotInOptions: undefined,
        fieldType: 'multiselect',
        isClearable: undefined,
        label: 'Multi select',
        numberOfItemLabel: 'numberOfItemLabel',
        numberOfItemsLabel: 'numberOfItemsLabel',
        options: [],
        placeholder: undefined,
        readOnly: true,
        usePortal: undefined,
      },
      {
        allowNegative: undefined,
        dataIndex: 'number',
        decimalScale: undefined,
        decimalSeparator: undefined,
        fieldType: 'number',
        label: 'Number',
        maxValue: undefined,
        minValue: undefined,
        placeholder: undefined,
        prefix: undefined,
        readOnly: true,
        suffix: undefined,
        thousandSeparator: undefined,
        thousandsGroupStyle: undefined,
      },
      {
        allowNegative: undefined,
        dataIndex: 'percentage',
        decimalScale: undefined,
        decimalSeparator: undefined,
        fieldType: 'percentage',
        label: 'Percentage',
        maxValue: undefined,
        minValue: undefined,
        placeholder: undefined,
        readOnly: true,
        thousandSeparator: undefined,
        thousandsGroupStyle: undefined,
      },
      {
        convertImagesToBase64: undefined,
        dataIndex: 'richtext',
        enableImage: undefined,
        enableLink: undefined,
        fieldType: 'richtext',
        label: 'Rich text',
        locale: undefined,
        maxLength: undefined,
        readOnly: true,
      },
      {
        collapsible: undefined,
        dataIndex: 'section',
        fieldType: 'switch',
        fields: [],
        label: 'Section',
        openInitially: undefined,
      },
      {
        dataIndex: 'switch',
        fieldType: 'switch',
        label: 'Switch',
        readOnly: true,
      },
      {
        columns: [
          {
            dataIndex: 'number',
            title: 'Number',
            type: 'number',
          },
        ],
        dataIndex: 'table',
        extra: {
          validationSchema: expect.any(yup.ObjectSchema),
        },
        fieldType: 'lineeditabletable',
        label: 'Table',
        loading: undefined,
        onSortChange: undefined,
        readOnly: true,
      },
      {
        dataIndex: 'text',
        fieldType: 'text',
        label: 'Text',
        maxLength: undefined,
        minLendth: undefined,
        readOnly: true,
      },
      {
        dataIndex: 'textarea',
        fieldType: 'textarea',
        label: 'Textarea',
        maxLength: undefined,
        minLendth: undefined,
        readOnly: true,
      },
      {
        dataIndex: 'year',
        fieldType: 'year',
        label: 'Year',
        readOnly: true,
        usePortal: undefined,
      },
    ]);
  });
});