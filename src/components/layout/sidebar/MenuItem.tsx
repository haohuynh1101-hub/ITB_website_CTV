import classNames from 'classnames';
import Link from 'next/link';
export type TMenuItem = {
  key: string;
  name: string;
  icon: JSX.Element;
  href: string;
  isActive?: boolean;
  isCompactMode?: boolean;
};
export const MenuItem: React.FC<TMenuItem> = ({
  icon,
  name,
  href,
  isActive,
}) => {
  const children = (
    <li>
      <Link href={href}>
        <a
          className={classNames(
            'group flex items-center w-full transition duration-300 ease-in-out px-4 py-4 font-medium',
            {
              'bg-primary-400 text-white': isActive,
              'hover:bg-primary-400': !isActive,
              'px-8': !icon,
            }
          )}
        >
          {icon && (
            <span className="mr-4">
              <i
                className={classNames(
                  ' w-8 flex justify-center transition-all duration-300',
                  {
                    'text-white': isActive,
                    'group-hover:text-white': !isActive,
                  }
                )}
              >
                {icon}
              </i>
            </span>
          )}

          <span
            className={classNames(
              'flex-1 w-full transition-all duration-300 overflow-hidden whitespace-nowrap group-hover:text-white'
            )}
          >
            {name}
          </span>
        </a>
      </Link>
    </li>
  );

  return children;
};
