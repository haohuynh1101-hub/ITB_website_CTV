import classnames from 'classnames';
import React from 'react';

// import { Spin } from "../spin";

const SIZE_MAPS = {
  small: 'btn-sm',
  default: '',
  large: 'btn-lg',
};

const TYPE_MAPS = {
  primary: 'btn-primary',
  default: 'btn-default',
};

const BLOCK_MAPS = {
  true: 'btn-block',
};

type IProps = {
  title: string;
  icon?: JSX.Element;
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  className?: string;
  loading?: boolean;
  size?: keyof typeof SIZE_MAPS;
  type?: keyof typeof TYPE_MAPS;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<IProps> = ({
  title,
  icon,
  htmlType = 'button',
  size = 'default',
  type = 'default',
  block = true,
  loading,
  className,
  onClick,
}) => {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={classnames(
        'btn',
        SIZE_MAPS[size],
        BLOCK_MAPS[block.toString()],
        TYPE_MAPS[type],
        className
      )}
    >
      {/* {loading && <Spin size={size} type={type} />} */}
      {icon}
      {title}
    </button>
  );
};
