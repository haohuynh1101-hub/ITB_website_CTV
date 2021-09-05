// import classnames from 'classnames';
// import React from 'react';

// import { Spin } from '../spin';

// const SIZE_MAPS = {
//   small: 'btn-sm',
//   default: '',
//   large: 'btn-lg',
// };

// const TYPE_MAPS = {
//   primary: 'btn-primary',
//   default: 'btn-default',
// };

// const BLOCK_MAPS = {
//   true: 'btn-block',
// };

// type IProps = {
//   title: string;
//   icon?: JSX.Element;
//   htmlType?: 'button' | 'submit' | 'reset';
//   block?: boolean;
//   className?: string;
//   loading?: boolean;
//   size?: keyof typeof SIZE_MAPS;
//   type?: keyof typeof TYPE_MAPS;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
// };

// export const Button: React.FC<IProps> = ({
//   title,
//   icon,
//   htmlType = 'button',
//   size = 'default',
//   type = 'default',
//   block = true,
//   loading,
//   className,
//   onClick,
// }) => {
//   return (
//     <button
//       type={htmlType}
//       onClick={onClick}
//       className={classnames(
//         'btn',
//         SIZE_MAPS[size],
//         BLOCK_MAPS[block.toString()],
//         TYPE_MAPS[type],
//         className
//       )}
//     >
//       {loading && <Spin size={size} type={type} />}
//       {icon}
//       {title}
//     </button>
//   );
// };

import classnames from 'classnames';
import { forwardRef } from 'react';

import { Spin } from '../spin';

const SIZE_MAPS = {
  small: 'btn-sm',
  default: '',
  large: 'btn-lg',
};

const TYPE_MAPS = {
  primary: 'btn-primary',
  default: 'btn-default',
  gray: 'btn-gray',
  text: 'btn-text',
  'text-primary': 'btn-text-primary',
  success: 'btn-success',
};

const BLOCK_MAPS = {
  true: 'btn-block',
};

type IProps = (
  | { title: string; icon: JSX.Element }
  | { title?: string; icon: JSX.Element }
  | { title: string; icon?: JSX.Element }
) & {
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  className?: string;
  loading?: boolean;
  size?: keyof typeof SIZE_MAPS;
  type?: keyof typeof TYPE_MAPS;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      title,
      icon,
      htmlType = 'button',
      size = 'default',
      type = 'default',
      block = false,
      loading,
      className,
      disabled,
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        type={htmlType}
        onClick={onClick}
        className={classnames(
          'btn space-x-2',
          SIZE_MAPS[size],
          BLOCK_MAPS[block.toString()],
          TYPE_MAPS[disabled ? '' : type],
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          disabled ? 'bg-gray-100' : '',
          className
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {loading ? <Spin size={size} type={type} /> : icon}
        {title && <span className="leading-6">{title}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
