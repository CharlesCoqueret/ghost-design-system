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

  it('Title renders and handles changes', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    await userEvent.type(input, 'ABCDE');
    input.blur();

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders and blurs on tab', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    await userEvent.type(input, 'ABCDE');
    await userEvent.tab();

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders and blurs on enter', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    await userEvent.type(input, 'ABCDE{enter}');

    expect((input as HTMLInputElement).value).toEqual('ABCDE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(1);
    expect(onTitleEditMock).toHaveBeenLastCalledWith('ABCDE');
    expect(container).toMatchSnapshot();
  });

  it('Title renders restores title when too short', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(<Title dataTestId='DATA-TEST-ID' title='TITLE' onTitleEdit={onTitleEditMock} />);
    const input = screen.getByTestId('DATA-TEST-ID');

    await userEvent.type(input, '{backspace}'.repeat(5) + '{delete}'.repeat(5) + '{enter}');

    expect((input as HTMLInputElement).value).toEqual('TITLE');

    expect(onTitleEditMock).toHaveBeenCalledTimes(0);
    expect(container).toMatchSnapshot();
  });

  it('Title renders not editable', async () => {
    const { container } = render(<Title dataTestId='DATA-TEST-ID' title='TITLE' />);
    const input = screen.getByTestId('DATA-TEST-ID');

    await userEvent.type(input, 'ABCDE{enter}');

    expect((input as HTMLInputElement).value).toEqual('TITLE');

    expect(container).toMatchSnapshot();
  });
});
