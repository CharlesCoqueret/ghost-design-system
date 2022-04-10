import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterTypeEnum } from '../types';
import { act } from 'react-dom/test-utils';

let onChangeHandlerFilterItemFilterBar: ((key: string, value: number) => void) | undefined;
let onChangeHandlerFilterItemAdvancedSearch: ((key: string, value: number) => void) | undefined;

jest.mock('../FilterItem', () => {
  return {
    __esModule: true,
    default: (props: {
      item: { dataTestId?: string };
      onChange: typeof onChangeHandlerFilterItemAdvancedSearch;
    }): ReactElement => {
      if (props?.item?.dataTestId === 'NUMBER-FILTER-BAR') {
        onChangeHandlerFilterItemFilterBar = props.onChange;
      }
      if (props?.item?.dataTestId === 'NUMBER-ADVANCED-SEARCH') {
        onChangeHandlerFilterItemAdvancedSearch = props.onChange;
      }
      return <div>Mocked FilterItem props: {JSON.stringify(props)}</div>;
    },
  };
});

const Filter = require('../Filter').default;

describe('Filter Component', () => {
  it('Filter renders filterbar and handles changes', async () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <Filter<{ number: number }>
        dataTestId='DATA-TEST-ID'
        localization={{
          advancedSearch: 'advancedSearch',
          advancedSearchTitle: 'advancedSearchTitle',
          search: 'search',
          reset: 'reset',
        }}
        onChange={onChangeMock}
        searchBarItems={[
          {
            dataIndex: 'number',
            dataTestId: 'NUMBER-FILTER-BAR',
            filterType: FilterTypeEnum.NUMBER,
            label: 'Number',
            placeholder: 'Search number',
          },
        ]}
      />,
    );

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);

    expect(container).toMatchSnapshot();

    expect(onChangeHandlerFilterItemFilterBar).toBeDefined();

    act(() => {
      if (onChangeHandlerFilterItemFilterBar) {
        onChangeHandlerFilterItemFilterBar('number', 10);
      }
    });

    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith({ number: 10 });

    const resetButton = await screen.findByTestId('DATA-TEST-ID-reset');

    userEvent.click(resetButton);

    expect(onChangeMock).toBeCalledTimes(3);
    expect(onChangeMock).toBeCalledWith(undefined);
  });

  it('Filter renders advanced filter and handles changes', async () => {
    const onChangeMock = jest.fn();

    const { baseElement } = render(
      <Filter<{ number: number }>
        advancedSearchItems={[
          {
            dataIndex: 'number',
            filterType: FilterTypeEnum.NUMBER,
            label: 'Number',
            placeholder: 'Search number',
            dataTestId: 'NUMBER-ADVANCED-SEARCH',
          },
        ]}
        dataTestId='DATA-TEST-ID'
        initialValues={{ number: 1 }}
        localization={{
          advancedSearch: 'advancedSearch',
          advancedSearchTitle: 'advancedSearchTitle',
          search: 'search',
          reset: 'reset',
        }}
        onChange={onChangeMock}
        searchBarItems={[
          {
            dataIndex: 'number',
            filterType: FilterTypeEnum.NUMBER,
            label: 'Number',
            placeholder: 'Search number',
          },
        ]}
      />,
    );

    expect(baseElement).toMatchSnapshot();

    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith({ number: 1 });

    // Opening the advanced filter modal
    const openAdvanceFilterButton = await screen.findByTestId('DATA-TEST-ID-open-advanced');
    act(() => {
      userEvent.click(openAdvanceFilterButton);
    });

    expect(baseElement).toMatchSnapshot();

    // Simulating changes in the modal
    expect(onChangeHandlerFilterItemAdvancedSearch).toBeDefined();
    act(() => {
      if (onChangeHandlerFilterItemAdvancedSearch) {
        onChangeHandlerFilterItemAdvancedSearch('number', 10);
      }
    });
    expect(onChangeMock).toBeCalledTimes(1);

    // Resetting the value in the modal
    const resetAdvanceSearchButton = await screen.findByTestId('DATA-TEST-ID-advanced-reset');
    userEvent.click(resetAdvanceSearchButton);
    expect(onChangeMock).toBeCalledTimes(1);

    // Submitting the value and closing the modal
    act(() => {
      if (onChangeHandlerFilterItemAdvancedSearch) {
        onChangeHandlerFilterItemAdvancedSearch('number', 100);
      }
    });

    const submitAdvanceSearchButton = await screen.findByTestId('DATA-TEST-ID-advanced-submit');
    userEvent.click(submitAdvanceSearchButton);

    expect(baseElement).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith({ number: 100 });
  });

  it('Filter renders without data-testid', async () => {
    const onChangeMock = jest.fn();

    const { baseElement } = render(
      <Filter<{ number: number }>
        advancedSearchItems={[
          {
            filterType: FilterTypeEnum.TITLE,
            label: 'Title',
          },
        ]}
        initialValues={{ number: 1 }}
        localization={{
          advancedSearch: 'advancedSearch',
          advancedSearchTitle: 'advancedSearchTitle',
          search: 'search',
          reset: 'reset',
        }}
        onChange={onChangeMock}
        searchBarItems={[
          {
            dataIndex: 'number',
            filterType: FilterTypeEnum.NUMBER,
            label: 'Number',
            placeholder: 'Search number',
          },
        ]}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('Filter renders with no item in the filter bar', async () => {
    const Filter = require('../Filter').default;

    const onChangeMock = jest.fn();

    const { container } = render(
      <Filter<{ number: number }>
        localization={{
          advancedSearch: 'advancedSearch',
          advancedSearchTitle: 'advancedSearchTitle',
          search: 'search',
          reset: 'reset',
        }}
        onChange={onChangeMock}
        searchBarItems={[]}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(undefined);
  });
});
