import classNames from 'classnames';
import { Avatar, DropDown } from 'components/elements';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ICandidate } from '@/redux/reducers/candidate/type';

import { ChevronDownIcon, MenuToggleIcon } from '../../icons';
type IProps = {
  user: ICandidate;
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

export const Header: React.FC<IProps> = ({ user, handleToggleSidebar }) => {
  const router = useRouter();
  const handleCLick = (key: string) => {
    if (key === 'logout') {
      localStorage.clear();
      router.push('/login');
    }
  };
  return (
    <>
      <header className="fixed z-20 flex items-center justify-between w-screen px-4 bg-white border-b h-header top-notice md:pr-8">
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

          <Image src="/LogoITB.png" width={40} height={40} />

          <div className="hidden text-lg font-medium md:flex">
            <span>ITB Club</span>
          </div>
        </div>

        <div className="flex items-center font-medium space-x-2">
          <div className="flex items-center space-x-2">
            <Avatar src={user?.avatar || ''} fullName={user?.fullName} />
            <span>{user?.fullName}</span>
          </div>

          <DropDown menus={MENUS} onClick={handleCLick} placement="right">
            <ChevronDownIcon size="h-4 w-4" />
          </DropDown>
        </div>
      </header>
    </>
  );
};
