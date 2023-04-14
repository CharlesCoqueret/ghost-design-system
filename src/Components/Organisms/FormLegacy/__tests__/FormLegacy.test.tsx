import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

import FormLegacy from '../FormLegacy';
import { FieldLegacyTypeEnum } from '../types';

describe('FormLegacy Component', () => {
  it('FormLegacy renders with description and sections', () => {
    const handleDataChangeMock = jest.fn();
    const { container } = render(
      <FormLegacy
        fields={[
          {
            label: 'Title',
            fieldType: FieldLegacyTypeEnum.SECTION,
            fields: [],
          },
          {
            description: <>Description</>,
            fieldType: FieldLegacyTypeEnum.DESCRIPTION,
          },
          {
            description: <>Hidden function description</>,
            fieldType: FieldLegacyTypeEnum.DESCRIPTION,
            hidden: () => true,
          },
          {
            description: <>Hidden description</>,
            fieldType: FieldLegacyTypeEnum.DESCRIPTION,
            hidden: true,
          },
        ]}
        handleDataChange={handleDataChangeMock}
        initialData={{}}
        validationSchema={yup.object({})}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('FormLegacy renders with mandatory field', () => {
    const handleDataChangeMock = jest.fn();
    const { container } = render(
      <FormLegacy<{ number?: number }>
        fields={[
          {
            label: 'Number',
            fieldType: FieldLegacyTypeEnum.NUMBER,
            dataIndex: 'number',
          },
        ]}
        handleDataChange={handleDataChangeMock}
        initialData={{ number: undefined }}
        validationSchema={yup.object({ number: yup.number().required('Value for number is required') })}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('FormLegacy renders without validation schema', () => {
    const handleDataChangeMock = jest.fn();
    console.error = jest.fn();

    const { container } = render(
      <FormLegacy<{ number?: number }>
        fields={[
          {
            label: 'Number',
            fieldType: FieldLegacyTypeEnum.NUMBER,
            dataIndex: 'number',
          },
        ]}
        handleDataChange={handleDataChangeMock}
        initialData={{ number: undefined }}
        validationSchema={undefined as never}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(
      'could not retrieve if "number" is mandatory. It looks like you haven\'t defined a proper validation schema.',
    );
  });
});
