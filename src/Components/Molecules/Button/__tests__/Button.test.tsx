import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '..';
import { ButtonColorEnum } from '../Button';
import { MenuDirectionEnum } from '../../../Atoms/Tooltip';

jest.unmock('@szhsin/react-menu');
jest.unmock('react-dom');

describe('Button Component', () => {
  it('renders without label and icon', () => {
    const { baseElement } = render(<Button />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders when loading', async () => {
    const onClickMock = jest.fn();
    const { baseElement } = render(
      <Button
        color={ButtonColorEnum.PRIMARY}
        dataTestId='DATA-TEST-ID'
        onClick={onClickMock}
        label='LABEL'
        loading={true}
      />,
    );

    expect(baseElement).toMatchSnapshot();

    const button = await screen.findByTestId('DATA-TEST-ID');

    await userEvent.click(button);

    expect(onClickMock).toBeCalledTimes(0);
  });

  it('renders and handle click', async () => {
    const onClickMock = jest.fn();
    const { baseElement } = render(
      <Button
        dataTestId='DATA-TEST-ID'
        icon={['fal', 'paper-plane']}
        onClick={onClickMock}
        label='LABEL'
        type='submit'
      />,
    );

    expect(baseElement).toMatchSnapshot();

    const button = await screen.findByTestId('DATA-TEST-ID');

    await userEvent.click(button);

    expect(onClickMock).toBeCalledTimes(1);
  });

  it('renders with list and handle open menu and click on item', async () => {
    const mainButtonClickMock = jest.fn();
    const button1ClickMock = jest.fn();
    const button2ClickMock = jest.fn();

    const { baseElement } = render(
      <Button
        dataTestId='MAIN-BUTTON'
        dropdownAlign={'start'}
        itemList={[
          { dataTestId: 'BUTTON1', itemId: 'item 1', label: 'Label 1', onClick: button1ClickMock },
          { dataTestId: 'BUTTON2', divider: true, itemId: 'item 2', label: 'Label 2', onClick: button2ClickMock },
          { hidden: true, itemId: 'item 3', label: 'Label 3' },
        ]}
        label='Menu button'
        onClick={mainButtonClickMock}
      />,
    );
    expect(baseElement).toMatchSnapshot();

    const mainButton = await screen.findByTestId('MAIN-BUTTON');

    await userEvent.click(mainButton);

    expect(baseElement).toMatchSnapshot();
    expect(mainButtonClickMock).toBeCalledTimes(1);
    expect(button1ClickMock).toBeCalledTimes(0);
    expect(button2ClickMock).toBeCalledTimes(0);

    const button1 = await screen.findByTestId('BUTTON1');

    await userEvent.click(button1);

    expect(baseElement).toMatchSnapshot();
    expect(mainButtonClickMock).toBeCalledTimes(1);
    expect(button1ClickMock).toBeCalledTimes(1);
    expect(button1ClickMock).toBeCalledWith('item 1');
    expect(button2ClickMock).toBeCalledTimes(0);
  });

  it('renders with list and handle open menu and close on click outside', async () => {
    const mainButtonClickMock = jest.fn();

    const { baseElement } = render(
      <Button
        dataTestId='MAIN-BUTTON'
        dropdownAlign={'start'}
        itemList={[
          { itemId: 'item 1', label: 'Label 1' },
          { divider: true, itemId: 'item 2', label: 'Label 2' },
        ]}
        label='Menu button'
        onClick={mainButtonClickMock}
      />,
    );
    expect(baseElement).toMatchSnapshot();

    const mainButton = await screen.findByTestId('MAIN-BUTTON');

    await userEvent.click(mainButton);

    expect(baseElement).toMatchSnapshot();
    expect(mainButtonClickMock).toBeCalledTimes(1);

    await userEvent.click(baseElement);

    expect(baseElement).toMatchSnapshot();
    expect(mainButtonClickMock).toBeCalledTimes(1);
  });

  it('renders with tooltip', () => {
    const { baseElement } = render(
      <Button label='Tooltip button' tooltip='TOOLTIP' tooltipDirection={MenuDirectionEnum.TOP} />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders with popover', async () => {
    const button1ClickMock = jest.fn();
    const button2ClickMock = jest.fn();

    const { baseElement } = render(
      <Button
        dataTestId='MAIN-BUTTON'
        label='Tooltip button'
        popover={{
          title: 'POPOVER',
          buttons: [
            {
              color: ButtonColorEnum.PRIMARY,
              dataTestId: 'BUTTON1',
              icon: ['fal', 'paper-plane'],
              label: 'Button 1',
              onClick: button1ClickMock,
            },
            {
              color: ButtonColorEnum.SECONDARY,
              dataTestId: 'BUTTON2',
              label: 'Button 2',
              onClick: button2ClickMock,
            },
          ],
        }}
      />,
    );
    expect(baseElement).toMatchSnapshot();

    const mainButton = await screen.findByTestId('MAIN-BUTTON');

    await userEvent.click(mainButton);

    expect(baseElement).toMatchSnapshot();
    expect(button1ClickMock).toBeCalledTimes(0);

    const button1 = await screen.findByTestId('BUTTON1');

    await userEvent.click(button1);

    expect(baseElement).toMatchSnapshot();
    expect(button1ClickMock).toBeCalledTimes(1);
  });

  it('renders with popover without buttons', async () => {
    const { baseElement } = render(
      <Button
        dataTestId='MAIN-BUTTON'
        label='Tooltip button'
        popover={{
          title: 'POPOVER',
          buttons: [],
        }}
      />,
    );
    expect(baseElement).toMatchSnapshot();

    const mainButton = await screen.findByTestId('MAIN-BUTTON');

    await userEvent.click(mainButton);

    expect(baseElement).toMatchSnapshot();

    await userEvent.click(baseElement);

    expect(baseElement).toMatchSnapshot();
  });
});