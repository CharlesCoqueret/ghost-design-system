import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavItem from '../NavItem';

describe('NavItem Component', () => {
  it('renders alone', async () => {
    const onClickMock = jest.fn();

    const { container } = render(
      <NavItem
        counter={1}
        customSubItem={<div data-testid={'CUSTOM-SUB-ITEM'} />}
        dataTestId='DATA-TEST-ID'
        icon={['fal', 'icons']}
        label='LABEL'
        onClick={onClickMock}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onClickMock).not.toBeCalled();

    const item = screen.getByTestId('DATA-TEST-ID');

    await userEvent.click(item);

    expect(container).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(1);

    await userEvent.click(item);

    expect(container).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(2);
  });

  it('renders handles counter as digits', () => {
    const { container } = render(<NavItem counter={100} icon={['fal', 'icons']} label='LABEL' />);
    expect(container).toMatchSnapshot();
  });

  it('renders handles counter as string', () => {
    const { container } = render(<NavItem counter='test' icon={['fal', 'icons']} label='LABEL' />);
    expect(container).toMatchSnapshot();
  });

  it('renders with subitems', async () => {
    const onClickMock = jest.fn();
    console.info = jest.fn();

    const { container } = render(
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

    expect(container).toMatchSnapshot();
    expect(onClickMock).not.toBeCalled();

    const item = screen.getByTestId('DATA-TEST-ID');

    await userEvent.click(item);

    expect(container).toMatchSnapshot();
    expect(onClickMock).not.toBeCalled();

    const subitem = screen.getByTestId('SUBITEMDATA-TEST-ID');

    await userEvent.click(subitem);

    expect(console.info).toBeCalledTimes(1);
    expect(console.info).toBeCalledWith('url pushed:', '#');

    expect(container).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(1);

    await userEvent.click(item);

    expect(container).toMatchSnapshot();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
