import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileField, IFileFieldProps } from './FileField';
import { Icon } from '../../Atoms/Icon';
import { FileStatusEnum, IFile } from '../../Atoms/FileInput';

export default {
  title: 'Molecule/FileField',
  component: FileField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof FileField>;

const Template: ComponentStory<typeof FileField> = (args: IFileFieldProps) => {
  return (
    <FileField
      {...args}
      onChange={(file: Array<IFile>) => {
        if (args.onChange) {
          args.onChange(file);
        }
        return Promise.resolve();
      }}
      onDelete={(file: IFile) => {
        if (args.onDelete) {
          args.onDelete(file);
        }
        return Promise.resolve();
      }}
      onDownload={(file: IFile) => {
        if (args.onDownload) {
          args.onDownload(file);
        }
        return Promise.resolve();
      }}
      onFailure={(file: IFile, statusText) => {
        return { ...file, error: statusText };
      }}
      onSuccess={(file: IFile, serverResponse) => {
        const response = serverResponse as { id: string };
        return { ...file, id: response.id };
      }}
    />
  );
};

const commonProps = {
  name: 'name',
  maxFileSize: 10 * 1024 * 1024,
  inputValue: [
    { uid: '1', name: 'test file.png', size: 1234, type: 'image/png', status: FileStatusEnum.DONE },
    { uid: '2', name: 'second test file.png', size: 1234, type: 'image/png', status: FileStatusEnum.DONE },
    {
      uid: '3',
      name: 'third test file.png',
      size: 1234,
      type: 'image/png',
      status: FileStatusEnum.ERROR,
      error: 'Error message',
    },
  ],
  onChange: () => {
    return;
  },
  onDelete: () => {
    return Promise.resolve();
  },
  onDownload: () => {
    return Promise.resolve();
  },
  requestMethod: 'POST',
  requestUrl: 'https://file-upload-tester.herokuapp.com/upload/file',
  showProgressBar: true,
};

export const Default = Template.bind({});
Default.args = {
  label: 'File field',
  ...commonProps,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'File field in read only',
  readOnly: true,
  ...commonProps,
};

export const Error = Template.bind({});
Error.args = {
  label: 'File field in error with label size = 4 and field size = 4',
  errorMessage: 'This file fied is on error',
  fieldSize: 4,
  labelSize: 4,
  ...commonProps,
};

export const HelperAndLimit = Template.bind({});
HelperAndLimit.args = {
  label: 'File field with helper',
  helperText: 'Helper text',
  additionalInfo: <div>This is addition info Element</div>,
  mandatory: true,
  ...commonProps,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  label: 'File field highlighted',
  readOnly: true,
  highlighted: true,
  helperText: 'Helper text',
  ...commonProps,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'File field disabled',
  disabled: true,
  helperText: 'Helper text',
  ...commonProps,
};

export const CustomUploadMessage = Template.bind({});
CustomUploadMessage.args = {
  label: 'File field disabled',
  helperText: 'Helper text',
  uploadMessage: (
    <div>
      <div>🤓 Customize your upload message 🤓</div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Icon icon={['fal', 'arrow-up-from-line']} size='3x' />
      </div>
    </div>
  ),
  ...commonProps,
};
