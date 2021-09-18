import { Listbox, Transition } from '@headlessui/react';
import classnames from 'classnames';
import { Fragment, useMemo } from 'react';

import { ChevronDownIcon } from '../../icons';
import { Avatar } from '../avatar';
import { EmptyIcon } from './EmptyIcon';

export type ISelectOption = {
  icon?: JSX.Element | string;
  name: string;
  value: string;
};

const TYPE_MAPS = {
  default: 'select-default',
  outline: 'select-outline',
};

const SIZE_MAPS = {
  small: {
    select: 'select-sm',
    dropdownItem: 'dropdown-item-sm',
  },
  middle: '',
  large: {
    select: 'select-lg',
    dropdownItem: 'dropdown-item-lg',
  },
};

const KEY = {
  select: 'select',
  dropdownItem: 'dropdownItem',
};

const BORDER = {
  true: 'border border-gray-200',
};
type IProps = {
  options: ISelectOption[];
  value?: string;
  size?: keyof typeof SIZE_MAPS;
  type?: keyof typeof TYPE_MAPS;
  onChange: (key: string) => void;
  label?: string;
  placeholder?: string;
  isShowIcon?: boolean;
  border?: boolean;
};

export const SelectControlled: React.FC<IProps> = ({
  options = [],
  value,
  size = 'middle',
  type = 'default',
  label,
  border = false,
  onChange,
  placeholder,
  isShowIcon,
}) => {
  const selected = options.find((option) => option.value === value);

  const handleChange = (selected: ISelectOption) => {
    if (onChange) {
      onChange(selected?.value);
    }
  };

  const renderMenuItem = useMemo(() => {
    if (!options?.length) {
      return (
        <Listbox.Options className="flex flex-col items-center justify-center py-4 text-gray-300 dropdown-item">
          <EmptyIcon />
          <span className="mt-2">Empty Data</span>
        </Listbox.Options>
      );
    }

    return (
      <Listbox.Options
        static
        className={classnames(
          'dropdown-item',
          SIZE_MAPS[size][KEY.dropdownItem]
        )}
      >
        {options.map((option) => (
          <Listbox.Option
            key={option.value}
            className={({ active }) =>
              classnames(
                active ? 'text-gray-600  bg-gray-100' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 px-4'
              )
            }
            value={option}
          >
            {({ selected }) => (
              <>
                <div className="flex items-center space-x-2">
                  {isShowIcon &&
                    (typeof option?.icon === 'string' ? (
                      <Avatar
                        src={option.icon}
                        fullName={option.name}
                        size="small"
                      />
                    ) : (
                      option?.icon
                    ))}
                  <span
                    className={classnames('block truncate', {
                      'font-medium': selected,
                    })}
                  >
                    {option.name}
                  </span>
                </div>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    );
  }, [options, size, isShowIcon]);

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block mb-2 font-medium text-gray-900">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <Listbox.Button
              className={classnames(
                'select w-full cursor-pointer px-4 space-x-2',
                SIZE_MAPS[size][KEY.select],
                TYPE_MAPS[type],
                BORDER[border.toString()],

                {
                  'ring-1 ring-primary-400': open,
                }
              )}
            >
              {selected?.name ? (
                <div className="flex items-center space-x-2">
                  {isShowIcon &&
                    (typeof selected?.icon === 'string' ? (
                      <Avatar
                        src={selected.icon}
                        fullName={selected.name}
                        size="small"
                      />
                    ) : (
                      selected?.icon
                    ))}
                  <span className="block font-normal text-left text-black truncate">
                    {selected.name}
                  </span>
                </div>
              ) : (
                <span className="block font-normal text-gray-400 truncate">
                  {placeholder}
                </span>
              )}
              <span className="text-gray-400 pointer-events-none">
                <ChevronDownIcon size="h-4 w-4" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {renderMenuItem}
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
