import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
