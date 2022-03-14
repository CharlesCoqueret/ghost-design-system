import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';

import { Button, ColorButtonEnum, IButtonProps } from '../../Molecules/';
import { Icon } from '../../Atoms';
import Title from './Title';

export interface IActionBarProps {
  /** Additional classname (optional, default: undefined) */
  className?: string;
  /** Action bar title */
  title: string;
  /** Handler of title change (optional, default: undefined) */
  onTitleEdit?: (newTitle: string) => void;
  /** Prefix of the title, useful when a part of the title is not editable (optional, default: undefined) */
  prefix?: string;
  /** Suffix of the title, useful when a part of the title is not editable (optional, default: undefined) */
  suffix?: string;
  /** Placeholder when the input value has been emptied (optional, default: undefined) */
  placeholder?: string;

  /** Identifier of the object being controlled (optional, default: undefined) */
  entityId?: string;

  /** Main actions (optional, default: undefined) */
  actions?: Array<IButtonProps>;
  /** Basic buttons displayed as icon (optional, default: undefined) */
  basicActions?: Array<IButtonProps>;

  /** determine if a back button is displayed (optional) */
  back?: boolean;
  /** callback when user click on 'back' (optional, windows.back() backCallback is undefined) */
  backCallback?: () => void;
  /** determine the back button tooltip if present (optional) */
  backTooltip?: string;
  /** action bar indicator (optional) */
  indicator?: React.ReactNode;
  /** action bar entity status (optional) */
  status?: string;
  /** determine if the title is editable */
  titleEditable?: boolean;
  /** determine the title tooltip if editable (optional) */
  editTooltip?: string;

  /** Display the action bar as secondary action bar (no shadow, sticky, lower height) */
  secondary?: boolean;
  /** override css property (optional) */
  style?: React.CSSProperties;
  /** max characters for title bar before ellipsis. Set to 0 for no limit. (optional - default : 30) */
  maxTitleChar?: number;
}

const ActionBar = (props: IActionBarProps): ReactElement => {
  const { actions, basicActions, className, entityId, onTitleEdit, prefix, suffix, title } = props;

  return (
    <div className={classnames('action-bar', { primary: true }, className)}>
      <div className='left-side'>
        <Title entityId={entityId} onTitleEdit={onTitleEdit} prefix={prefix} suffix={suffix} title={title} />
      </div>
      <div className='right-side'>
        {actions && actions.length > 0 && (
          <div className='actions'>
            {actions?.map((action) => {
              return <Button key={action.label} {...action} icon={undefined} />;
            })}
          </div>
        )}
        {actions && actions.length > 0 && basicActions && basicActions.length > 0 && (
          <div className='separator'>
            <Icon icon={['fal', 'pipe']} size='lg' />
          </div>
        )}
        {basicActions && basicActions.length > 0 && (
          <div className='basic-actions'>
            {basicActions?.map((basicAction) => {
              return <Button key={basicAction.label} {...basicAction} color={ColorButtonEnum.REVERSED} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
