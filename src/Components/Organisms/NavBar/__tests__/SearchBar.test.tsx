import React from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  it('SearchBar renders', () => {
    const onSearchMock = jest.fn();

    const { container } = render(
      <SearchBar
        onSearch={onSearchMock}
        placeholder='PLACEHOLDER'
        searchingIndicator={<div data-testid={'SEARCH-INIDICATOR'} />}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onSearchMock).not.toBeCalled();
  });

  it('SearchBar handles search but no results', () => {
    const onSearchMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve([]);
    });

    const { container } = render(
      <SearchBar
        onSearch={onSearchMock}
        placeholder='PLACEHOLDER'
        searchingIndicator={<div data-testid={'SEARCH-INIDICATOR'} />}
        dataTestId='SEARCH'
      />,
    );

    const input = screen.getByTestId('SEARCH');

    act(() => {
      userEvent.type(input, 'my new search');
    });

    waitFor(() => {
      expect(onSearchMock).toBeCalledTimes(13);
    });
    expect(onSearchMock).lastCalledWith('my new search');
    expect(container).toMatchSnapshot();
  });

  it('SearchBar handles search with only spaces', () => {
    const onSearchMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve([]);
    });

    const { container } = render(<SearchBar onSearch={onSearchMock} placeholder='PLACEHOLDER' dataTestId='SEARCH' />);

    const input = screen.getByTestId('SEARCH');

    act(() => {
      userEvent.type(input, '         ');
    });

    expect(onSearchMock).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('SearchBar handles search with results', async () => {
    const onSearchMock = jest.fn().mockImplementation(async () => {
      return Promise.resolve([
        <div key='1' data-testid='ITEM1'>
          ITEM1
        </div>,
        <div key='2' data-testid='ITEM2'>
          ITEM2
        </div>,
      ]);
    });

    const { container } = render(
      <SearchBar
        onSearch={onSearchMock}
        placeholder='PLACEHOLDER'
        searchingIndicator={<div data-testid={'SEARCH-INIDICATOR'} />}
        dataTestId='SEARCH'
      />,
    );

    const input = screen.getByTestId('SEARCH');

    act(() => {
      userEvent.type(input, 'TEST');
    });

    await waitForElementToBeRemoved(() => screen.getByTestId('SEARCH-INIDICATOR'));

    expect(onSearchMock).toBeCalledTimes(4);
    expect(onSearchMock).lastCalledWith('TEST');
    expect(container).toMatchSnapshot();
  });
});
