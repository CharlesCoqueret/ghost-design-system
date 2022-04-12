import React from 'react';
import { render } from '@testing-library/react';
import * as yup from 'yup';

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

import Form from '../Form';
import { FieldTypeEnum } from '../types';

describe('Form Component', () => {
  it('Form renders with description and sections', () => {
    const handleDataChangeMock = jest.fn();
    const { container } = render(
      <Form
        fields={[
          {
            label: 'Title',
            fieldType: FieldTypeEnum.SECTION,
            fields: [],
          },
          {
            description: <>Description</>,
            fieldType: FieldTypeEnum.DESCRIPTION,
          },
          {
            description: <>Hidden function description</>,
            fieldType: FieldTypeEnum.DESCRIPTION,
            hidden: () => true,
          },
          {
            description: <>Hidden description</>,
            fieldType: FieldTypeEnum.DESCRIPTION,
            hidden: true,
          },
        ]}
        handleDataChange={handleDataChangeMock}
        initialData={{}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('Form renders with mandatory field', () => {
    const handleDataChangeMock = jest.fn();
    const { container } = render(
      <Form<{ number?: number }>
        fields={[
          {
            label: 'Number',
            fieldType: FieldTypeEnum.NUMBER,
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

  it('Form renders without validation schema', () => {
    const handleDataChangeMock = jest.fn();
    const { container } = render(
      <Form<{ number?: number }>
        fields={[
          {
            label: 'Number',
            fieldType: FieldTypeEnum.NUMBER,
            dataIndex: 'number',
          },
        ]}
        handleDataChange={handleDataChangeMock}
        initialData={{ number: undefined }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
