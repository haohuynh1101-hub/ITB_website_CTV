import classNames from 'classnames';
import React from 'react';

const SIZE_MAPS = {
  small: 'text-sm',
  middle: 'text-base',
  large: 'text-lg',
};

type IProps = {
  className?: string;
  size?: keyof typeof SIZE_MAPS;
  icon?: React.ReactNode;
};

export const Prefix: React.FC<IProps> = ({
  className,
  size = 'default',
  icon,
}) => {
  return (
    <i className={classNames('p-0 mr-2', SIZE_MAPS[size], className)}>{icon}</i>
  );
};
