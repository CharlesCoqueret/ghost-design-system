import React from 'react';
import { EditableDataTable } from '..';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColumnType, IColumnType } from '../../StaticDataTable/types';

interface ITestType {
  id: string;
  name: string;
  status: string;
  price: number;
  parts: number;
  startDate: Date;
}

const columns: IColumnType<ITestType>[] = [
  {
    title: 'Code',
    dataIndex: 'id',
    sorter: true,
    type: ColumnType.CODE,
  },
  {
    title: 'Text',
    dataIndex: 'name',
    type: ColumnType.TEXT,
    ellipsis: true,
    sorter: true,
    editable: true,
  },
  {
    title: 'Badge',
    dataIndex: 'status',
    sorter: true,
    type: ColumnType.BADGE,
    editable: true,
    options: [{ label: 'Status', value: 'status' }],
  },
  {
    title: 'Amount',
    dataIndex: 'price',
    sorter: true,
    type: ColumnType.AMOUNT,
    currency: '€',
    editable: true,
  },
  {
    title: 'Percentage',
    dataIndex: 'parts',
    sorter: true,
    type: ColumnType.PERCENTAGE,
    editable: true,
  },
  {
    title: 'Date',
    dataIndex: 'startDate',
    sorter: true,
    type: ColumnType.DATE,
    editable: true,
  },
];

const initialData = [
  {
    id: 'id',
    name: 'name',
    status: 'status',
    price: -100000,
    parts: -10,
    startDate: new Date(2021, 2, 24),
  },
];

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: (props: Record<string, string>) => {
      return <i className='fa' {...props} />;
    },
  };
});

describe('EditableDataTable Component', () => {
  it('EditableDataTable renders with all buttons', async () => {
    const onEditMock = jest.fn();
    const isEditableMock = jest.fn().mockImplementation(() => true);
    const onRowDeleteMock = jest.fn();
    const isDeletableMock = jest.fn().mockImplementation(() => true);
    const onRowDownloadMock = jest.fn();
    const isDownloadableMock = jest.fn().mockImplementation(() => true);
    const canAddNewLineMock = jest.fn();
    const onNewLineMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
      isEditable: isEditableMock,
      onRowDelete: onRowDeleteMock,
      isDeletable: isDeletableMock,
      onRowDownload: onRowDownloadMock,
      isDownloadable: isDownloadableMock,
      canAddNewLine: canAddNewLineMock,
      onNewLine: onNewLineMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    expect(container).toMatchSnapshot();
    expect(onEditMock).not.toBeCalled();
    expect(onRowDeleteMock).not.toBeCalled();
    expect(onRowDownloadMock).not.toBeCalled();
    expect(onNewLineMock).not.toBeCalled();
    expect(isDeletableMock).toBeCalledTimes(initialData.length);
    expect(isEditableMock).toBeCalledTimes(initialData.length);
    expect(isDownloadableMock).toBeCalledTimes(initialData.length);
    expect(canAddNewLineMock).toBeCalledTimes(1);
  });

  it('EditableDataTable renders with no buttons', async () => {
    const onEditMock = jest.fn();
    const isEditableMock = jest.fn().mockImplementation(() => false);

    const extra = {
      onEdit: onEditMock,
      isEditable: isEditableMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    expect(container).toMatchSnapshot();
    expect(onEditMock).not.toBeCalled();
    expect(isEditableMock).toBeCalledTimes(initialData.length);
  });

  it('EditableDataTable renders with all methods saying false', async () => {
    const onEditMock = jest.fn();
    const isEditableMock = () => {
      return false;
    };
    const onRowDeleteMock = jest.fn();
    const isDeletableMock = () => {
      return false;
    };
    const onRowDownloadMock = jest.fn();
    const isDownloadableMock = () => {
      return false;
    };
    const canAddNewLineMock = () => {
      return false;
    };
    const onNewLineMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
      isEditable: isEditableMock,
      onRowDelete: onRowDeleteMock,
      isDeletable: isDeletableMock,
      onRowDownload: onRowDownloadMock,
      isDownloadable: isDownloadableMock,
      canAddNewLine: canAddNewLineMock,
      onNewLine: onNewLineMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    expect(container).toMatchSnapshot();
    expect(onEditMock).not.toBeCalled();
    expect(onRowDeleteMock).not.toBeCalled();
    expect(onRowDownloadMock).not.toBeCalled();
    expect(onNewLineMock).not.toBeCalled();
  });

  it('EditableDataTable renders and new button clicked', async () => {
    const onEditMock = jest.fn();
    const isEditableMock = jest.fn().mockImplementation(() => true);
    const onRowDeleteMock = jest.fn();
    const isDeletableMock = jest.fn().mockImplementation(() => true);
    const onRowDownloadMock = jest.fn();
    const isDownloadableMock = jest.fn().mockImplementation(() => true);
    const onNewLineMock = jest.fn().mockImplementation(() => {
      return {
        id: 'test',
      };
    });
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);

    const extra = {
      onEdit: onEditMock,
      isEditable: isEditableMock,
      onRowDelete: onRowDeleteMock,
      isDeletable: isDeletableMock,
      onRowDownload: onRowDownloadMock,
      isDownloadable: isDownloadableMock,
      onNewLine: onNewLineMock,
      canAddNewLine: canAddNewLineMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    const addLineButton = await screen.findAllByText('Add Line');

    act(() => {
      if (addLineButton.length > 0) {
        userEvent.click(addLineButton[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onEditMock).not.toBeCalled();
    expect(onRowDeleteMock).not.toBeCalled();
    expect(onRowDownloadMock).not.toBeCalled();
    expect(onNewLineMock).toBeCalledTimes(1);
    expect(isDeletableMock).toBeCalledTimes(1 + 2);
    expect(isEditableMock).toBeCalledTimes(1 + 2);
    expect(isDownloadableMock).toBeCalledTimes(1 + 2);
    expect(canAddNewLineMock).toBeCalledTimes(1 + 1);
  });

  it('EditableDataTable renders and warn when onNewLine is not defined and new button is clicked', async () => {
    const onEditMock = jest.fn();
    const isEditableMock = jest.fn().mockImplementation(() => true);
    const onRowDeleteMock = jest.fn();
    const isDeletableMock = jest.fn().mockImplementation(() => true);
    const onRowDownloadMock = jest.fn();
    const isDownloadableMock = jest.fn().mockImplementation(() => true);
    const canAddNewLineMock = jest.fn().mockImplementation(() => true);
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

    const extra = {
      onEdit: onEditMock,
      isEditable: isEditableMock,
      onRowDelete: onRowDeleteMock,
      isDeletable: isDeletableMock,
      onRowDownload: onRowDownloadMock,
      isDownloadable: isDownloadableMock,
      canAddNewLine: canAddNewLineMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    const addLineButton = await screen.findAllByText('Add Line');

    act(() => {
      if (addLineButton.length > 0) {
        userEvent.click(addLineButton[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(console.warn).toBeCalled();
    expect(onEditMock).not.toBeCalled();
    expect(onRowDeleteMock).not.toBeCalled();
    expect(onRowDownloadMock).not.toBeCalled();
    expect(isDeletableMock).toBeCalledTimes(1 + 1);
    expect(isEditableMock).toBeCalledTimes(1 + 1);
    expect(isDownloadableMock).toBeCalledTimes(1 + 1);
    expect(canAddNewLineMock).toBeCalledTimes(1);
    consoleWarnMock.mockRestore();
  });

  it('EditableDataTable renders and handles sort', async () => {
    const onEditMock = jest.fn();
    const onSortChangeMock = jest.fn().mockImplementation(() => {
      return {};
    });

    const extra = {
      onEdit: onEditMock,
    };

    const container = render(
      <EditableDataTable<ITestType>
        columns={columns}
        data={initialData}
        extra={extra}
        onSortChange={onSortChangeMock}
      />,
    );

    const sortBadgeButton = await screen.findAllByText('Badge');
    expect(sortBadgeButton.length).toBeGreaterThan(0);

    act(() => {
      if (sortBadgeButton.length > 0) {
        userEvent.click(sortBadgeButton[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onEditMock).not.toBeCalled();
    expect(onSortChangeMock).toHaveBeenCalledWith('status', 'desc');

    act(() => {
      if (sortBadgeButton.length > 0) {
        userEvent.click(sortBadgeButton[0]);
      }
    });

    expect(onSortChangeMock).toHaveBeenCalledWith('status', 'asc');

    act(() => {
      if (sortBadgeButton.length > 0) {
        userEvent.click(sortBadgeButton[0]);
      }
    });

    expect(onSortChangeMock).toHaveBeenCalledWith();
  });

  it('EditableDataTable renders and handles line download and line delete', async () => {
    const onEditMock = jest.fn();
    const onRowDeleteMock = jest.fn();
    const onRowDownloadMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
      onRowDelete: onRowDeleteMock,
      onRowDownload: onRowDownloadMock,
    };

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    const downloadButton = await screen.findAllByTestId('download');
    expect(downloadButton.length).toBeGreaterThan(0);

    act(() => {
      if (downloadButton.length > 0) {
        userEvent.click(downloadButton[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onRowDownloadMock).toBeCalledWith(initialData[0], 0);

    const deleteButton = await screen.findAllByTestId('delete');
    expect(deleteButton.length).toBeGreaterThan(0);

    act(() => {
      if (deleteButton.length > 0) {
        userEvent.click(deleteButton[0]);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onRowDeleteMock).toBeCalledWith(initialData[0], 0);
  });

  it('EditableDataTable renders and handles changes', async () => {
    const onEditMock = jest.fn();

    const extra = {
      onEdit: onEditMock,
    };

    const newInput = 'test input';

    const container = render(<EditableDataTable<ITestType> columns={columns} data={initialData} extra={extra} />);

    const nameInputField = await screen.findAllByTestId('name-0');
    expect(nameInputField.length).toBeGreaterThan(0);

    act(() => {
      if (nameInputField.length > 0) {
        userEvent.click(nameInputField[0]);
        userEvent.clear(nameInputField[0]);
        userEvent.type(nameInputField[0], newInput);
      }
    });

    expect(container).toMatchSnapshot();
    expect(onEditMock).toHaveBeenCalledTimes(newInput.length + 1);
  });
});
