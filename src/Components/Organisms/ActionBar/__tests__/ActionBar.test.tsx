import React from 'react';
import { render } from '@testing-library/react';

import ActionBar from '../ActionBar';

describe('ActionBar Component', () => {
  it('ActionBar renders', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(
      <ActionBar
        actions={[{ label: 'action1', dataTestId: 'ACTION1' }]}
        backTooltip='BACKTOOLTIP'
        basicActions={[{ label: 'basicaction1', dataTestId: 'BASICACTION1' }]}
        className='CLASSNAME'
        entityId='ENTITYID'
        icon={<div id='ICON' />}
        indicator={<div id='INDICATOR' />}
        onBackClicked={() => {
          return;
        }}
        onTitleEdit={onTitleEditMock}
        placeholder='PLACEHOLDED'
        primary={true}
        prefix='PREFIX'
        renameTooltip='TOOLTIP'
        status={<div id='STATUS' />}
        suffix='SUFFIX'
        title='TITLE'
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onTitleEditMock).not.toBeCalled();
  });

  it('ActionBar renders without action, basicactions, icon, indicator or status', async () => {
    const onTitleEditMock = jest.fn();

    const { container } = render(
      <ActionBar
        backTooltip='BACKTOOLTIP'
        className='CLASSNAME'
        entityId='ENTITYID'
        onBackClicked={() => {
          return;
        }}
        onTitleEdit={onTitleEditMock}
        placeholder='PLACEHOLDED'
        primary={true}
        prefix='PREFIX'
        renameTooltip='TOOLTIP'
        suffix='SUFFIX'
        title='TITLE'
      />,
    );

    expect(container).toMatchSnapshot();
    expect(onTitleEditMock).not.toBeCalled();
  });
});
