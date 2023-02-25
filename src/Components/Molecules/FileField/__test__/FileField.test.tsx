import React from 'react';
import { render } from '@testing-library/react';

import { FileField } from '..';
import { FileStatusEnum } from '../../../Atoms/FileInput';

describe('FileField Component', () => {
  it('FileField renders', () => {
    const { container } = render(<FileField requestMethod='POST' requestUrl='test.url' />);
    expect(container).toMatchSnapshot();
  });

  it('FileField renders with values in readonly', () => {
    const { container } = render(
      <FileField
        inputValue={[{ uid: '1', name: 'file.pdf', size: 1234, type: 'application/pdf', status: FileStatusEnum.DONE }]}
        readOnly
        requestMethod='POST'
        requestUrl='test.url'
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileField renders with values in disabled highligted', () => {
    const { container } = render(
      <FileField
        inputValue={[{ uid: '1', name: 'file.pdf', size: 1234, type: 'application/pdf', status: FileStatusEnum.ERROR }]}
        disabled
        highlighted
        requestMethod='POST'
        requestUrl='test.url'
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('FileField renders with values with fieldSize and inline', () => {
    const { container } = render(
      <FileField
        inputValue={[{ uid: '1', name: 'file.pdf', size: 1234, type: 'application/pdf' }]}
        inline
        fieldSize={6}
        requestMethod='POST'
        requestUrl='test.url'
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
