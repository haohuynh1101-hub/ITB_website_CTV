import classnames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

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
  htmlType?: 'password' | 'number' | 'text' | 'checkbox';
  value?: string;
  bordered?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
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
  onBlur,
  onFocus,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uuid = useRef<string>();

  useEffect(() => {
    uuid.current = nanoid();
  }, []);

  function onClickToFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <>
      {label && (
        <label
          htmlFor={uuid.current}
          className="inline-block mb-2 text-base font-bold align-baseline font"
        >
          {label}
        </label>
      )}
      <div
        onClick={onClickToFocus}
        aria-hidden="true"
        className={classnames(
          'input-wrapper',
          SIZE_MAPS[size][key.wrapper],
          TYPE_MAPS[type][key.wrapper],
          BORDERED_MAPS[bordered.toString()],
          {
            'ring-1 ring-primary-400': isFocused,
            'opacity-40 border-gray-300 border cursor-not-allowed': disabled,
          }
        )}
      >
        {prefix && <Prefix size={size} icon={prefix} />}
        <input
          id={uuid.current}
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
          disabled={disabled}
          onKeyPress={onKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
};
