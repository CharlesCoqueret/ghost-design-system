import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Tooltip } from '../../Atoms/Tooltip';
import { Typography } from '../../Atoms/Typography';

import styles from './Title.module.scss';

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

  const updateInputWidth = () => {
    setCurrentInputStyle({
      width:
        spanRef.current?.offsetWidth && Number.isFinite(spanRef.current.offsetWidth)
          ? spanRef.current.offsetWidth + 'px'
          : undefined,
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.currentTarget.blur();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.target.value);
    updateInputWidth();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length == 0) {
      setCurrentTitle(title);
      return;
    }
    if (onTitleEdit) {
      onTitleEdit(event.target.value.trim());
    }
  };

  useEffect(() => {
    updateInputWidth();
  }, [currentTitle]);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  return (
    <div className={styles.container}>
      {prefix && (
        <Typography.Title level={1} ellipsis className={styles.prefix}>
          {prefix}
        </Typography.Title>
      )}
      <span ref={spanRef} className={styles.hiddenTitle}>
        {currentTitle || placeholder}
      </span>
      <Tooltip tooltip={isEditable ? renameTooltip : undefined}>
        <input
          autoComplete='off'
          autoFocus={false}
          className={styles.title}
          data-testid={dataTestId}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={!isEditable}
          ref={inputRef}
          style={currentInputStyle}
          title={currentTitle}
          type='text'
          tabIndex={isEditable ? 0 : -1}
          value={currentTitle}
        />
      </Tooltip>
      {entityId && (
        <>
          <Typography.Title level={1} className={styles.entity}>
            {'- '}
          </Typography.Title>
          <Typography.Title level={1} ellipsis className={styles.entity}>
            {entityId}
          </Typography.Title>
        </>
      )}
      {suffix && (
        <Typography.Title level={1} ellipsis className={styles.suffix}>
          {suffix}
        </Typography.Title>
      )}
    </div>
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
