import React from 'react';
import { render } from '@testing-library/react';

import { ColumnType } from '../../../Organisms/DataTable/Common/types';
import { FilterTypeEnum } from '../../../Organisms/Filter/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import PortfolioWrapped, { IPortfolioProps } from '../PortfolioWrapped';

// Mocking RichTextField as suneditor which is problematic with Jest
jest.mock('../../../Molecules/RichTextField', () => {});
jest.mock('react-intersection-observer', () => ({
  __esModule: true,
  useInView: () => {
    return {
      ref: null,
      inView: true,
    };
  },
}));

describe('PortfolioWrapped', () => {
  const convertData = jest.fn();
  const getData = jest.fn();
  const getNextPageParam = jest.fn();
  const handleError = jest.fn();

  const props: IPortfolioProps<
    { number: number },
    { number: number },
    Array<{ number: number }>,
    { page: number; count: number }
  > = {
    convertData,
    getData,
    getNextPageParam,
    handleError,
    filter: {
      localization: {
        advancedSearch: 'Advanced search',
        advancedSearchTitle: 'Advanced search',
        search: 'Search',
        reset: 'Reset',
      },
      searchBarItems: [
        {
          filterType: FilterTypeEnum.NUMBER,
          dataIndex: 'number',
          placeholder: 'Number',
        },
      ],
    },
    filterClassName: 'test-filter-classname',
    table: {
      columns: [
        {
          title: 'Number',
          dataIndex: 'number',
          editable: false,
          type: ColumnType.NUMBER,
          sorter: true,
        },
      ],
    },
    tableClassName: 'test-table-classname',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter component when filter prop is provided', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PortfolioWrapped {...props} />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should not render filter component when filter prop is not provided', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PortfolioWrapped {...props} filter={undefined} />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
