import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

import StaticDataTable from '../StaticDataTable';
import { ColumnType, SortDirectionEnum } from '../../Common/types';

describe('StaticDataTable component', () => {
  it('StaticDataTable renders and handles sort', () => {
    const onSortChangeMock = jest.fn();

    const { container } = render(
      <StaticDataTable<{ number: number }>
        columns={[
          {
            dataIndex: 'number',
            dataTestId: 'DATA-TEST-ID-number',
            sorter: true,
            title: 'Number',
            type: ColumnType.NUMBER,
          },
        ]}
        data={[{ number: 1 }]}
        onSortChange={onSortChangeMock}
      />,
    );

    expect(container).toMatchSnapshot();

    const numberSort = screen.getByTestId('DATA-TEST-ID-number-sort');
    userEvent.click(numberSort);

    expect(container).toMatchSnapshot();
    expect(onSortChangeMock).toBeCalledTimes(1);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.DESC);

    userEvent.click(numberSort);

    expect(container).toMatchSnapshot();
    expect(onSortChangeMock).toBeCalledTimes(2);
    expect(onSortChangeMock).toBeCalledWith('number', SortDirectionEnum.ASC);

    userEvent.click(numberSort);

    expect(container).toMatchSnapshot();
    expect(onSortChangeMock).toBeCalledTimes(3);
    expect(onSortChangeMock).toBeCalledWith();
  });
});
