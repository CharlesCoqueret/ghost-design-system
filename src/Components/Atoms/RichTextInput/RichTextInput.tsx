import React, { CSSProperties, ReactElement } from 'react';
import SunEditor from 'suneditor-react';
import lang from 'suneditor-react/dist/types/lang';
import fontColor from 'suneditor/src/plugins/submenu/fontColor';
import fontSize from 'suneditor/src/plugins/submenu/fontSize';
import formatBlock from 'suneditor/src/plugins/submenu/formatBlock';
import hiliteColor from 'suneditor/src/plugins/submenu/hiliteColor';
import horizontalRule from 'suneditor/src/plugins/submenu/horizontalRule';
import image from 'suneditor/src/plugins/dialog/image';
import link from 'suneditor/src/plugins/dialog/link';
import list from 'suneditor/src/plugins/submenu/list';
import table from 'suneditor/src/plugins/submenu/table';
import { SunEditorOptions } from 'suneditor/src/options';
import classnames from 'classnames';

export interface IRichTextInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Enable image (optional, default: false) */
  enableImage?: boolean;
  /** Enable link  (optional, default: false) */
  enableLink?: boolean;
  /** Initial values for the field (optional, default: undefined or '-' when disabled or readOnly) */
  inputValue?: string;
  /** Field is in error state (optional, default: false) */
  isInError?: boolean;
  /** Locale for tooltips (optional, default: undefined, meaning english) */
  locale?: lang;
  /** Maximum number of character of the field (optionsl, default: undefined) */
  maxLength?: number;
  /** Name of the field (optional, default: undefined) */
  name?: string;
  /** handler of changes notifying only on blur of the input for performance reason */
  onChange: (newValue: string) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
}

const forbiddenTags = ['video', 'audio', 'track', 'source', 'script', 'object', 'iframe', 'embed', 'input', 'select'];
const imageTags = ['img', 'svg', 'picture'];
const linkTags = ['a'];

const RichTextInput = (props: IRichTextInputProps): ReactElement => {
  const {
    dataTestId,
    disabled,
    enableImage,
    enableLink,
    inputValue,
    isInError,
    locale,
    maxLength,
    name,
    onChange,
    readOnly,
    style,
  } = props;

  const editorOptions: SunEditorOptions = {
    plugins: [fontColor, fontSize, formatBlock, hiliteColor, horizontalRule, image, link, list, table],
    buttonList: [
      ['bold', 'italic', 'underline', 'strike'],
      ['formatBlock', 'list', 'indent', 'outdent'],
      ['fontSize', 'fontColor', 'hiliteColor', 'horizontalRule', 'table'],
      enableLink && enableImage ? ['link', 'image'] : enableImage ? ['image'] : enableLink ? ['link'] : [],
    ],
    // Do not replace <i></i> by <i /> as it breaks ol ul alignment
    icons: {
      bold: '<i class="far fa-bold"></i>',
      font_color: '<i class="far fa-palette"></i>',
      highlight_color: '<i class="fal fa-highlighter"></i>',
      horizontal_rule: '<i class="far fa-horizontal-rule"></i>',
      image: '<i class="far fa-image"></i>',
      // indent/outdent might need to be swapped when https://github.com/JiHong88/SunEditor/issues/884 gets fixed
      indent: '<i class="far fa-outdent"></i>',
      italic: '<i class="far fa-italic"></i>',
      link: '<i class="far fa-link"></i>',
      list_bullets: '<i class="fal fa-list-ul"></i>',
      list_number: '<i class="fal fa-list-ol"></i>',
      // indent/outdent might need to be swapped when https://github.com/JiHong88/SunEditor/issues/884 gets fixed
      outdent: '<i class="far fa-indent"></i>',
      strike: '<i class="far fa-strikethrough"></i>',
      table: '<i class="fal fa-table"></i>',
      underline: '<i class="far fa-underline"></i>',
    },
    showPathLabel: false,
    height: 'auto',
    formats: ['p', 'div', 'blockquote', 'h1', 'h2', 'h3'],
    fontSize: [10, 12, 14, 18, 22],
    imageUploadUrl: undefined,
    imageUrlInput: false,
    videoFileInput: false,
    resizingBar: maxLength !== undefined ? true : false,
    charCounter: maxLength !== undefined ? true : false,
    maxCharCount: maxLength,
    minHeight: readOnly || disabled ? undefined : '250px',
    maxHeight: readOnly || disabled ? undefined : '600px',
    pasteTagsBlacklist: [
      ...forbiddenTags,
      ...[enableImage ? imageTags : undefined],
      ...[enableLink ? linkTags : undefined],
    ].join('|'),
  };

  /**
   * Handles blur event and triggers the provided onChange callback.
   * This choice is for performance reason, as HTML can be very heavy to manipulate at every key stroke or copy.
   * @param _event Focus event
   * @param newValue new value
   */
  const blurHandler = (_event: FocusEvent, newValue: string) => {
    if (onChange) {
      // onChange(processImages(newValue));
      onChange(newValue);
    }
  };

  return (
    <div
      className={classnames('field', 'gds-rich-text-container', {
        disabled: disabled,
        readonly: readOnly,
        error: !disabled && !readOnly && isInError,
      })}
      style={style}>
      <SunEditor
        data-testid={dataTestId}
        defaultValue={(readOnly || disabled) && inputValue === undefined ? '-' : inputValue}
        disable={disabled || readOnly}
        hideToolbar={readOnly || disabled}
        lang={locale}
        name={name}
        onBlur={blurHandler}
        setOptions={editorOptions}
      />
    </div>
  );
};

RichTextInput.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  disabled: false,
  enableImage: false,
  enableLink: false,
  inputValue: undefined,
  isInError: false,
  locale: undefined,
  maxLength: undefined,
  name: undefined,
  readOnly: false,
  style: undefined,
};

export default RichTextInput;
