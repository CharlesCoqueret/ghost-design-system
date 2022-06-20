import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Tooltip } from '../../Atoms/Tooltip';
import { Typography } from '../../Atoms/Typography';

export interface ITitleProps {
  dataTestId?: string;
  entityId?: string;
  onTitleEdit?: (newTitle: string) => void;
  placeholder?: string;
  prefix?: string;
  renameTooltip?: string;
  suffix?: string;
  title?: string;
}

const Title = (props: ITitleProps): ReactElement => {
  const { dataTestId, entityId, onTitleEdit, placeholder, prefix, renameTooltip, suffix, title } = props;

  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const [currentInputStyle, setCurrentInputStyle] = useState<CSSProperties>({ display: 'flex', width: '0px' });
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditable = onTitleEdit !== undefined;

  const updateInputWidth = useCallback(() => {
    setCurrentInputStyle({
      display: 'flex',
      margin: 'auto',
      width: `${spanRef.current?.offsetWidth ? spanRef.current.offsetWidth + 1 : 0}px`,
    });
  }, [spanRef]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.currentTarget.blur();
    }
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentTitle(event.target.value);
      updateInputWidth();
    },
    [spanRef],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value.trim().length == 0) {
        setCurrentTitle(title);
        return;
      }
      if (onTitleEdit) {
        onTitleEdit(event.target.value.trim());
      }
    },
    [currentTitle],
  );

  useEffect(() => {
    updateInputWidth();
  }, [currentTitle]);

  return (
    <>
      {prefix && (
        <Typography.Title level={1} ellipsis className='align-edit'>
          {prefix}
        </Typography.Title>
      )}
      <span ref={spanRef} className={'title-edit-hidden'}>
        {currentTitle || placeholder}
      </span>
      <Tooltip tooltip={isEditable ? renameTooltip : undefined}>
        <input
          autoComplete='off'
          autoFocus={false}
          className='title-edit'
          data-testid={dataTestId}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={!isEditable}
          ref={inputRef}
          style={currentInputStyle}
          type='text'
          tabIndex={isEditable ? 0 : -1}
          value={currentTitle}
        />
      </Tooltip>
      {entityId && (
        <Typography.Title level={1} ellipsis className='align-edit'>
          - {entityId}
        </Typography.Title>
      )}
      {suffix && (
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
  title: '',
};

export default Title;
