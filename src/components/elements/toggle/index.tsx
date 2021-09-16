/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type IProps = {
  title?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export const Toggle: React.FC<IProps> = ({
  title,
  checked = false,
  disabled = false,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const uuidRef = useRef<string>();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    uuidRef.current = nanoid();
  }, []);

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      htmlFor={uuidRef.current}
      className={classNames(
        'inline-flex items-center cursor-pointer select-none space-x-3',
        className
      )}
    >
      {title && (
        <div className="font-normal leading-none text-black whitespace-nowrap">
          {title}
        </div>
      )}

      <div className="relative">
        <input
          disabled={disabled}
          onChange={_handleChange}
          checked={checked}
          type="checkbox"
          id={uuidRef.current}
          className="sr-only"
        />

        <div
          className={classNames(
            'block h-6 bg-gray-300 rounded-full w-11 transition',
            {
              'bg-primary-400': isChecked,
            }
          )}
        />

        <div
          className={classNames(
            'absolute w-5 h-5 rounded-full dot left-0.5 top-0.5 transition bg-white',
            {
              'transform translate-x-full': isChecked,
            }
          )}
        />
      </div>
    </label>
  );
};
