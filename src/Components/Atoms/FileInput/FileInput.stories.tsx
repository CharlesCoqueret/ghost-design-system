import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FileInput, { IFileInputProps } from './FileInput';
import { FileStatusEnum, IFile } from './types';

export default {
  title: 'Atom/FileInput',
  component: FileInput,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args: IFileInputProps) => {
  return (
    <FileInput
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

export const Default = Template.bind({});
Default.args = {
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
  requestMethod: 'POST',
  requestUrl: 'https://file-upload-tester.herokuapp.com/upload/file',
  showProgressBar: true,
};
