import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';

export type MenuItemDropdown = {
  value: string;
  name: string;
  prefix?: JSX.Element;
};

type IProps = {
  menus?: MenuItemDropdown[];
  placement?: 'left' | 'right';
  overlay?: JSX.Element;
  animation?: boolean;
  customBox?: string;
  onClick?: (key: string) => void;
};
export const DropDown: React.FC<IProps> = ({
  menus = [],
  placement = 'left',
  overlay,
  animation = true,
  children,
  customBox,
  onClick,
}) => {
  const transition = animation
    ? {
      enter: 'transition ease-out duration-100',
      enterFrom: 'transform opacity-0 scale-95',
      enterTo: 'transform opacity-100 scale-100',
      leave: 'transition ease-in duration-75',
      leaveFrom: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-95',
    }
    : {};

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex focus:outline-none">
            {children}
          </Menu.Button>

          <Transition show={open} as={Fragment} {...transition}>
            <Menu.Items
              static
              className={classNames(
                'absolute w-56 mt-2 z-50 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none',
                {
                  'left-0': placement === 'left',
                  'right-0': placement !== 'left',
                }
              )}
            >
              {overlay ? (
                <Menu.Item>{overlay}</Menu.Item>
              ) : (
                <div className={classNames('py-1', customBox)}>
                  {menus.map((m) => {
                    return (
                      <Menu.Item
                        key={m.value}
                        onClick={() => onClick && onClick(m.value)}
                      >
                        {({ active }) => (
                          <a
                            className={classNames(
                              'flex items-center px-4 py-2 cursor-pointer transition-all duration-300 hover:text-primary-400',
                              {
                                'bg-gray-100 text-gray-900': active,
                                'text-gray-700': !active,
                              }
                            )}
                          >
                            {m.prefix}
                            {m.name}
                          </a>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
