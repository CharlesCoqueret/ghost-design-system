import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavItem from '../NavItem';

jest.unmock('@szhsin/react-menu');
jest.unmock('react-dom');
describe('NavItem unmocked Component', () => {
  it('NavItem unmocked submenu gets closed', () => {
    const onClickMock = jest.fn();

    const { baseElement } = render(
      <NavItem
        label='ITEM'
        dataTestId='DATA-TEST-ID'
        subItems={[
          {
            counter: 1,
            label: 'SUBITEM',
            icon: ['fal', 'icons'],
            onClick: onClickMock,
            dataTestId: 'SUBITEMDATA-TEST-ID',
          },
        ]}
      />,
    );

    expect(baseElement).toMatchSnapshot();
    expect(onClickMock).not.toBeCalled();

    const item = screen.getByTestId('DATA-TEST-ID');

    act(() => {
      userEvent.click(item);
    });

    expect(baseElement).toMatchSnapshot();
    expect(onClickMock).not.toBeCalled();

    const subitem = screen.getByTestId('SUBITEMDATA-TEST-ID');

    act(() => {
      userEvent.click(subitem);
    });

    expect(baseElement).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(1);

    act(() => {
      userEvent.click(item);
    });

    expect(baseElement).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
