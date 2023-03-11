import React from 'react';
import { render } from '@testing-library/react';

import { Typography, TextTypeEnum } from '../';

describe('Typography.Title Component', () => {
  it('renders properly', () => {
    const { container } = render(
      <Typography.Title level={2} className='CLASSNAME' ellipsis style={{ height: '200px' }}>
        TITLE
      </Typography.Title>,
    );
    expect(container).toMatchSnapshot();
  });

  it('ellipsis with no text', () => {
    const { container } = render(
      <Typography.Title ellipsis>
        <div />
      </Typography.Title>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Typography.Text Component', () => {
  it('renders with no types', () => {
    const { container } = render(
      <Typography.Text className='CLASSNAME' ellipsis style={{ height: '200px' }}>
        TEXT
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with all types', () => {
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

  it('renders with eatch types', () => {
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

  it('ellipsis with no text', () => {
    const { container } = render(
      <Typography.Text ellipsis>
        <div />
      </Typography.Text>,
    );
    expect(container).toMatchSnapshot();
  });
});
