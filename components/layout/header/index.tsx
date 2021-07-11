import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { MenuToggleIcon, ChevronDownIcon } from '../../icons';
import { Collapse } from '@components';
import { DropDown } from '@components/elements';
type IProps = {
  handleToggleSidebar: () => void;
};

const MENUS = [
  {
    value: 'my-account',
    name: 'Thông tin tài khoản',
  },
  {
    value: 'logout',
    name: 'Đăng xuất',
  },
];

export const Header: React.FC<IProps> = ({ handleToggleSidebar }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    setIsCollapse((value) => !value);
  };
  return (
    <>
      <header className="fixed z-20 flex items-center justify-between w-screen h-16 p-4 pr-8 bg-white border-b d-flex">
        <div className="flex items-center space-x-4">
          <div className="md:hidden flex">
            <button
              className={classNames(
                'mr-4 w-8 h-8  items-center justify-center text-gray-400 outline-none focus:outline-none hover:bg-gray-100 rounded-full transition-all duration-300'
              )}
              onClick={handleToggleSidebar}
            >
              <MenuToggleIcon />
            </button>
          </div>

          <Image src="/LogoITB.png" width={60} height={60} />

          <div className="font-medium text-lg hidden md:flex">
            <span>ITB Club</span>
          </div>
        </div>

        <div className="font-medium flex items-center space-x-2">
          <span>Huynh Nhat Hao</span>

          <DropDown
            menus={MENUS}
            onClick={() => console.log('')}
            placement="right"
          >
            <ChevronDownIcon size="h-4 w-4" />
          </DropDown>
        </div>
      </header>
    </>
  );
};
