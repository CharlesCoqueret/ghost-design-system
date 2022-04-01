import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { Button, ColorButtonEnum, IButtonProps } from '../../Molecules/';
import { Icon } from '../../Atoms';
import Title from './Title';

export interface IActionBarProps {
  /** Main actions (optional, default: undefined) */
  actions?: Array<IButtonProps>;
  /** Tooltip for the back button (optional, default: 'Back') */
  backTooltip?: string;
  /** Basic buttons displayed as icon (optional, default: undefined) */
  basicActions?: Array<IButtonProps>;
  /** Additional classname (optional, default: undefined) */
  className?: string;
  /** Identifier of the object being controlled (optional, default: undefined) */
  entityId?: string;
  /** Icon positioned after the title (optional, default: undefined) */
  icon?: ReactElement;
  /** Indicator positioned after the icon (optional, default: undefined) */
  indicator?: ReactElement;
  /**
   * Provides a way to go back. When defined, enables the back button (optional, default: undefined)
   * If using history (https://github.com/remix-run/history), it is highly recommended to implement history.go(-1) or history.back() behind this callback.
   */
  onBackClicked?: () => void;
  /** Handler of title change. When defined, enables edition of the title (optional, default: undefined) */
  onTitleEdit?: (newTitle: string) => void;
  /** Placeholder when the input value has been emptied (optional, default: undefined) */
  placeholder?: string;
  /** Must be true if the action bar if the primary bar */
  primary?: boolean;
  /** Prefix of the title, useful when a part of the title is not editable (optional, default: undefined) */
  prefix?: string;
  /** Rename tooltip indicating if the title is editable (optional, default: 'Rename') */
  renameTooltip?: string;
  /** Status positioned after the indidcator (optional, default: undefined) */
  status?: ReactElement;
  /** Suffix of the title, useful when a part of the title is not editable (optional, default: undefined) */
  suffix?: string;
  /** Action bar title */
  title: string;
}

const ActionBar = (props: IActionBarProps): ReactElement => {
  const {
    actions,
    backTooltip,
    basicActions,
    className,
    entityId,
    icon,
    indicator,
    onBackClicked,
    onTitleEdit,
    placeholder,
    primary,
    prefix,
    status,
    suffix,
    title,
  } = props;

  return (
    <div className={classnames('gds-action-bar', { primary: primary }, className)}>
      <div className='left-side'>
        {onBackClicked && (
          <div className='back-icon'>
            <Button
              icon={['fal', 'arrow-left']}
              onClick={onBackClicked}
              tooltip={backTooltip}
              color={ColorButtonEnum.REVERSED}
            />
          </div>
        )}
        <div className='title'>
          <Title
            entityId={entityId}
            onTitleEdit={onTitleEdit}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            title={title}
          />
        </div>
        {(icon || indicator || status) && (
          <div className='badges'>
            {icon}
            {indicator}
            {status}
          </div>
        )}
      </div>
      <div className='right-side'>
        {actions && actions.length > 0 && (
          <div className='actions'>
            {actions?.map((action) => {
              return <Button key={action.label || action.tooltip} {...action} icon={undefined} />;
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
              return (
                <Button
                  key={basicAction.tooltip || basicAction.label}
                  {...basicAction}
                  color={ColorButtonEnum.REVERSED}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

ActionBar.defaultProps = {
  actions: undefined,
  backTooltip: 'Back',
  basicActions: undefined,
  className: undefined,
  entityId: undefined,
  icon: undefined,
  indicator: undefined,
  onBackClicked: undefined,
  onTitleEdit: undefined,
  placeholder: undefined,
  primary: false,
  prefix: undefined,
  renameTooltip: 'Rename',
  status: undefined,
  suffix: undefined,
};

export default ActionBar;
