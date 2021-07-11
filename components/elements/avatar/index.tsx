import classNames from 'classnames';
import React from 'react';

const SIZE_MAPS = {
  small: 'w-6 h-6', // 24px
  default: 'w-8 h-8', // 32px
  medium: 'w-10 h-10', // 40px
};

type IProps = {
  fullName: string;
  src?: string;
  size?: keyof typeof SIZE_MAPS;
  className?: string;
};

export const Avatar: React.FC<IProps> = ({
  fullName = 'TractionWork',
  src,
  size = 'default',
  className,
}) => {
  const char =
    typeof fullName === 'string'
      ? fullName.trim().slice(0, 1).toUpperCase()
      : 'T';

  return (
    <span
      className={classNames(
        'flex items-center justify-center rounded-full text-white overflow-hidden font-normal',
        SIZE_MAPS[size],
        className
      )}
      //   style={{ backgroundColor: getColorFromText(char) }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={fullName} className="w-full h-full" />
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="20"
            y="22"
            fontSize="24"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {char}
          </text>
        </svg>
      )}
    </span>
  );
};
