import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonCell from '../ButtonCell';
import { ColumnType } from '../../types';

describe('ButtonCell component', () => {
  it('ButtonCell renders and handles click', async () => {
    const button1ClickMock = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <ButtonCell
              column={{
                buttons: [
                  {
                    dataTestId: 'BUTTON1',
                    icon: ['fal', 'briefcase'],
                    label: 'Button 1',
                    onClick: button1ClickMock,
                  },
                ],
                moreActionsMessage: 'MOREACTION',
                title: 'buttoncell',
                type: ColumnType.BUTTON,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const button = await screen.findByTestId('BUTTON1');
    await userEvent.click(button);

    expect(button1ClickMock).toBeCalledTimes(1);
    expect(button1ClickMock).toBeCalledWith({ data: 'DATA' }, 0);
  });

  it('ButtonCell renders with more than 3 buttons and handle click with conditionnally hidden entries', async () => {
    const button1ClickMock = jest.fn();
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <ButtonCell
              column={{
                buttons: [
                  {
                    dataTestId: 'BUTTON1',
                    icon: ['fal', 'gear'],
                    label: 'Button 1',
                    onClick: button1ClickMock,
                  },
                  {
                    icon: ['fal', 'gear'],
                    label: 'Button 2',
                  },
                  {
                    icon: ['fal', 'gear'],
                    label: 'Button 3',
                  },
                  {
                    icon: ['fal', 'gear'],
                    label: 'Button 4',
                  },
                  {
                    icon: ['fal', 'gear'],
                    label: 'Button 5',
                    hidden: () => true,
                  },
                ],
                moreActionsMessage: 'MOREACTION',
                title: 'buttoncell',
                type: ColumnType.BUTTON,
              }}
              dataTestId='MORE'
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();

    const buttonMore = await screen.findByTestId('MORE');
    await userEvent.click(buttonMore);

    expect(container).toMatchSnapshot();

    const button1 = await screen.findByTestId('BUTTON1');
    await userEvent.click(button1);

    expect(button1ClickMock).toBeCalledTimes(1);
    expect(button1ClickMock).toBeCalledWith({ data: 'DATA' }, 0);
  });

  it('ButtonCell renders hidden', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <ButtonCell
              column={{
                buttons: [
                  {
                    icon: ['fal', 'briefcase'],
                    label: 'Button 1',
                  },
                ],
                hidden: true,
                moreActionsMessage: 'MOREACTION',
                title: 'buttoncell',
                type: ColumnType.BUTTON,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('ButtonCell renders hidden conditionnally', () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <ButtonCell
              column={{
                buttons: [
                  {
                    hidden: () => true,
                    icon: ['fal', 'briefcase'],
                    label: 'Button 1',
                  },
                ],
                moreActionsMessage: 'MOREACTION',
                title: 'buttoncell',
                type: ColumnType.BUTTON,
              }}
              row={{ data: 'DATA' }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('ButtonCell runs an error when row is empty', () => {
    console.error = jest.fn();

    const { container } = render(
      <table>
        <tbody>
          <tr>
            <ButtonCell
              column={{
                buttons: [
                  {
                    label: 'Button 1',
                    icon: ['fal', 'briefcase'],
                  },
                ],
                moreActionsMessage: 'MOREACTION',
                title: 'buttoncell',
                type: ColumnType.BUTTON,
              }}
              rowIndex={0}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(container).toMatchSnapshot();

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith('missing row property');
  });
});
