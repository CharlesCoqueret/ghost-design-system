import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Title from '../Title';

describe('Title Component', () => {
  it('Title renders', () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(
      <Title
        entityId='ENTITYID'
        onTitleEdit={onTitleEditMock}
        placeholder='PLACEHOLDED'
        prefix='PREFIX'
        renameTooltip='TOOLTIP'
        suffix='SUFFIX'
        title='TITLE'
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onTitleEditMock).not.toBeCalled();
  });

  it('Title renders and handles changes', () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(input, 'ABCDE');
    input.blur();

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders and blurs on tab', () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(input, 'ABCDE');
    userEvent.tab();

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders and blurs on enter', () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(input, 'ABCDE{enter}');

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders restores title when too short', () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' title='TITLE' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(input, '{backspace}'.repeat(5) + '{delete}'.repeat(5) + '{enter}');

    expect((input as HTMLInputElement).value).toEqual('TITLE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('Title renders not editable', () => {
    const { container } = render(<Title dataTestId='DATA-TEST-ID' title='TITLE' />);
    const input = screen.getByTestId('DATA-TEST-ID');

    userEvent.type(input, 'ABCDE{enter}');

    expect((input as HTMLInputElement).value).toEqual('TITLE');

    expect(container).toMatchSnapshot();
  });
});
