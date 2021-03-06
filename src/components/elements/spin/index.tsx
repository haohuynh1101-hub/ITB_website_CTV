import classNames from 'classnames';
import React from 'react';

const SIZE_MAPS = {
  small: 'text-sm',
  default: 'text-base',
  large: 'text-lg',
};

const TYPE_MAPS = {
  primary: 'btn-primary',
  default: 'btn-default',
  gray: 'btn-gray',
  text: 'btn-text',
  'text-primary': 'btn-text-primary',
  success: 'btn-success',
};

type IProps = {
  className?: string;
  size?: keyof typeof SIZE_MAPS;
  type?: keyof typeof TYPE_MAPS;
};

export const Spin: React.FC<IProps> = ({
  className,
  size = 'default',
  type = 'default',
}) => {
  return (
    <svg
      className={classNames(
        'w-5 h-5 mr-3 -ml-1 animate-spin',
        SIZE_MAPS[size],
        TYPE_MAPS[type],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
