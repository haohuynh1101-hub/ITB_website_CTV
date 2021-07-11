import classnames from 'classnames';
import React, { useRef } from 'react';

import { Prefix } from './Prefix';

const SIZE_MAPS = {
  small: {
    wrapper: 'input-wrapper-sm',
    input: 'input-sm',
  },
  middle: '',
  large: {
    wrapper: 'input-wrapper-lg',
    input: 'input-lg',
  },
};
const TYPE_MAPS = {
  primary: {
    wrapper: 'input-wrapper-primary',
    input: 'input-primary',
  },
  default: {
    wrapper: 'input-wrapper-default',
    input: 'input-default',
  },
};

const key = {
  wrapper: 'wrapper',
  input: 'input',
};
const BORDERED_MAPS = {
  true: 'border-2',
};

export type IProps = {
  placeholder?: string;
  label?: string;
  prefix?: React.ReactNode;
  size?: keyof typeof SIZE_MAPS;
  type?: keyof typeof TYPE_MAPS;
  htmlType?: 'password' | 'number' | 'text';
  value?: string;
  bordered?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
};
export const Input: React.FC<IProps> = ({
  placeholder,
  htmlType = 'text',
  label,
  size = 'middle',
  type = 'default',
  onChange,
  value,
  prefix,
  bordered = false,
  onPressEnter,
}) => {
  const inputRef = useRef(null);

  function onClickToFocus() {
    inputRef.current.focus();
  }
  function onKeyPress(e) {
    if (!onPressEnter) return;
    if (!e) e = window.event;
    const keyCode = e.code || e.key;
    if (keyCode == 'Enter') {
      if (value == '') {
        return;
      }
      onPressEnter(e);
    }
  }
  return (
    <>
      {label && (
        <label className="inline-block mb-2 text-base font-bold align-baseline font">
          {label}
        </label>
      )}
      <div
        className={classnames(
          'input-wrapper',
          SIZE_MAPS[size][key.wrapper],
          TYPE_MAPS[type][key.wrapper],
          BORDERED_MAPS[bordered.toString()]
        )}
        onClick={onClickToFocus}
        onKeyDown={onClickToFocus}
        role="textbox"
        tabIndex={0}
      >
        {prefix && <Prefix size={size} icon={prefix} />}
        <input
          ref={inputRef}
          placeholder={placeholder}
          type={htmlType}
          value={value}
          onChange={onChange}
          className={classnames(
            'input',
            SIZE_MAPS[size][key.input],
            TYPE_MAPS[type][key.input]
          )}
          onKeyPress={onKeyPress}
        />
      </div>
    </>
  );
};
