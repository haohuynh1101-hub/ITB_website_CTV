import classNames from 'classnames';
import { DropDown } from 'components/elements';
import Image from 'next/image';

import { ChevronDownIcon, MenuToggleIcon } from '../../icons';
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
  return (
    <>
      <header className="fixed z-20 flex items-center justify-between w-screen pr-4 bg-white border-b h-header top-notice md:pr-8">
        <div className="flex items-center space-x-4">
          <div className="flex md:hidden">
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

          <div className="hidden text-lg font-medium md:flex">
            <span>ITB Club</span>
          </div>
        </div>

        <div className="flex items-center font-medium space-x-2">
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
