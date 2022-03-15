import React, { FocusEvent, KeyboardEvent, ReactElement, useState } from 'react';
import classnames from 'classnames';

import { Tooltip } from '../../Atoms/Tooltip';
import { Typography } from '../../Atoms/Typography';

export interface ITitleProps {
  entityId?: string;
  onTitleEdit?: (newTitle: string) => void;
  placeholder?: string;
  prefix?: string;
  renameTooltip?: string;
  suffix?: string;
  title?: string;
}

const Title = (props: ITitleProps): ReactElement => {
  const { entityId, onTitleEdit, placeholder, prefix, renameTooltip, suffix, title } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);

  return (
    <>
      {prefix && !isEditing && (
        <Typography.Title level={1} ellipsis className='align-edit'>
          {prefix}
        </Typography.Title>
      )}

      {isEditing ? (
        <input
          type='text'
          autoFocus={true}
          defaultValue={currentTitle}
          className='title-edit'
          placeholder={placeholder}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === 'Tab') {
              event.currentTarget.blur();
            }
          }}
          onBlur={(event: FocusEvent<HTMLInputElement>) => {
            if (event.target.value.trim().length > 0) {
              setCurrentTitle(event.target.value.trim());
            }
            setIsEditing(false);
            if (onTitleEdit) {
              onTitleEdit(event.target.value.trim());
            }
          }}
        />
      ) : (
        <Tooltip
          tooltip={onTitleEdit ? renameTooltip : undefined}
          style={{
            display: 'flex',
          }}>
          <Typography.Title
            level={1}
            ellipsis
            onClick={
              onTitleEdit
                ? () => {
                    setIsEditing(true);
                  }
                : undefined
            }
            className={classnames({ clickable: onTitleEdit !== undefined })}>
            {currentTitle}
          </Typography.Title>
        </Tooltip>
      )}
      {entityId && !isEditing && (
        <Typography.Title level={1} className='align-edit'>
          - {entityId}
        </Typography.Title>
      )}

      {suffix && !isEditing && (
        <Typography.Title level={1} ellipsis className='align-edit'>
          {suffix}
        </Typography.Title>
      )}
    </>
  );
};

Title.defaultProps = {
  entityId: undefined,
  onTitleEdit: undefined,
  placeholder: undefined,
  prefix: undefined,
  renameTooltip: 'Rename',
  suffix: undefined,
  title: undefined,
};

export default Title;
