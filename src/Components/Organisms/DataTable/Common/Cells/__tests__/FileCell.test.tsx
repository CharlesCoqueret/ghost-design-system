import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileCell from '../FileCell';
import { ColumnType } from '../../types';
import { FileStatusEnum, IFile } from '../../../../../Atoms/FileInput';

describe('FileCell component', () => {
  it('renders properly', () => {
    const onDeleteMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <FileCell<{ data: Array<IFile> }>
              column={{
                dataIndex: 'data',
                onDelete: onDeleteMock,
                requestMethod: 'POST',
                requestUrl: 'http://url.com',
                title: 'FileCell',
                type: ColumnType.FILE,
              }}
              row={{
                data: [
                  {
                    uid: '1',
                    name: 'filename.png',
                    size: 1234,
                    type: 'image/png',
                    status: FileStatusEnum.ERROR,
                    error: 'Error message',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with forced value', () => {
    const onDeleteMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <FileCell<{ data: Array<IFile> }>
              column={{
                dataIndex: 'data',
                onDelete: onDeleteMock,
                requestMethod: 'POST',
                requestUrl: 'http://url.com',
                title: 'FileCell',
                type: ColumnType.FILE,
              }}
              forcedValue={[
                {
                  uid: '2',
                  name: 'filename2.png',
                  size: 4321,
                  type: 'image/png',
                  status: FileStatusEnum.DONE,
                },
              ]}
              row={{
                data: [
                  {
                    uid: '1',
                    name: 'filename.png',
                    size: 1234,
                    type: 'image/png',
                    status: FileStatusEnum.ERROR,
                    error: 'Error message',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders when hidden', () => {
    const onDeleteMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <FileCell<{ data: Array<IFile> }>
              column={{
                dataIndex: 'data',
                hidden: true,
                onDelete: onDeleteMock,
                requestMethod: 'POST',
                requestUrl: 'http://url.com',
                title: 'FileCell',
                type: ColumnType.FILE,
              }}
              row={{
                data: [
                  {
                    uid: '1',
                    name: 'filename.png',
                    size: 1234,
                    type: 'image/png',
                    status: FileStatusEnum.ERROR,
                    error: 'Error message',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles change', async () => {
    const onDeleteMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve();
    });
    const onChangeMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <FileCell<{ data: Array<IFile> }>
              column={{
                dataIndex: 'data',
                editable: true,
                onDelete: onDeleteMock,
                requestMethod: 'POST',
                requestUrl: 'http://url.com',
                title: 'FileCell',
                type: ColumnType.FILE,
              }}
              editing
              onChange={onChangeMock}
              row={{
                data: [
                  {
                    uid: '1',
                    name: 'filename.png',
                    size: 1234,
                    type: 'image/png',
                    status: FileStatusEnum.ERROR,
                    error: 'Error message',
                  },
                ],
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    expect(onDeleteMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith([
      {
        uid: '1',
        name: 'filename.png',
        size: 1234,
        type: 'image/png',
        status: FileStatusEnum.DELETING,
        error: 'Error message',
      },
    ]);
    expect(onChangeMock).toBeCalledWith([]);
  });
});
