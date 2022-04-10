import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Typography, { TextTypeEnum } from '../Typography';

describe('Typography.Title Component', () => {
  it('Typography.Title renders', async () => {
    const { container } = render(
      <Typography.Title level={2} className='CLASSNAME' ellipsis style={{ height: '200px' }}>
        TITLE
      </Typography.Title>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Typography.Title ellipsis with no text', async () => {
    const { container } = render(
      <Typography.Title ellipsis>
        <div />
      </Typography.Title>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Typography.Title handles click', async () => {
    const onClickMock = jest.fn();

    const { container } = render(
      <Typography.Title dataTestId={'DATA-TEST-ID'} level={1} onClick={onClickMock}>
        TITLE
      </Typography.Title>,
    );
    expect(container).toMatchSnapshot();

    const title = await screen.findByTestId('DATA-TEST-ID');

    userEvent.click(title);

    expect(onClickMock).toBeCalledTimes(1);
  });
});

describe('Typography.Text Component', () => {
  it('Typography.Text renders with no types', async () => {
    const { container } = render(
      <Typography.Text className='CLASSNAME' ellipsis style={{ height: '200px' }}>
        TEXT
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Typography.Text renders with all types', async () => {
    const { container } = render(
      <Typography.Text
        type={[
          TextTypeEnum.BODY,
          TextTypeEnum.DISABLED,
          TextTypeEnum.ERROR,
          TextTypeEnum.HELPER,
          TextTypeEnum.HIGHLIGHTED,
          TextTypeEnum.LABEL,
          TextTypeEnum.PLACEHOLDER,
          TextTypeEnum.TINY,
        ]}>
        TEXT
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Typography.Text renders with all types', async () => {
    const { container: containerBody } = render(<Typography.Text type={TextTypeEnum.BODY}>TEXT</Typography.Text>);
    expect(containerBody).toMatchSnapshot();

    const { container: containerDisabled } = render(
      <Typography.Text type={TextTypeEnum.DISABLED}>TEXT</Typography.Text>,
    );
    expect(containerDisabled).toMatchSnapshot();

    const { container: containerError } = render(<Typography.Text type={TextTypeEnum.ERROR}>TEXT</Typography.Text>);
    expect(containerError).toMatchSnapshot();

    const { container: containerHelper } = render(<Typography.Text type={TextTypeEnum.HELPER}>TEXT</Typography.Text>);
    expect(containerHelper).toMatchSnapshot();

    const { container: containerHightlighted } = render(
      <Typography.Text type={TextTypeEnum.HIGHLIGHTED}>TEXT</Typography.Text>,
    );
    expect(containerHightlighted).toMatchSnapshot();

    const { container: containerLabel } = render(<Typography.Text type={TextTypeEnum.LABEL}>TEXT</Typography.Text>);
    expect(containerLabel).toMatchSnapshot();

    const { container: containerPlaceholder } = render(
      <Typography.Text type={TextTypeEnum.PLACEHOLDER}>TEXT</Typography.Text>,
    );
    expect(containerPlaceholder).toMatchSnapshot();

    const { container: containerTiny } = render(<Typography.Text type={TextTypeEnum.TINY}>TEXT</Typography.Text>);
    expect(containerTiny).toMatchSnapshot();
  });

  it('Typography.Text ellipsis with no text', async () => {
    const { container } = render(
      <Typography.Text ellipsis>
        <div />
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Typography.Text handles click', async () => {
    const onClickMock = jest.fn();

    const { container } = render(
      <Typography.Text dataTestId={'DATA-TEST-ID'} onClick={onClickMock}>
        TEXT
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();

    const text = await screen.findByTestId('DATA-TEST-ID');

    userEvent.click(text);

    expect(onClickMock).toBeCalledTimes(1);
  });
});
