import { Drawer } from '@components';
import { SidebarContent } from './SidebarContent';
import { TMenuItem } from './MenuItem';
import Image from 'next/image';
type IProps = {
  isOpen: boolean;
  onClose: () => void;
  menuActiveKey: string;
  menus: TMenuItem[];
};

export const SidebarMobile: React.FC<IProps> = ({
  isOpen,
  onClose,
  menuActiveKey,
  menus,
}) => {
  return (
    <Drawer visible={isOpen} onClose={onClose} placement="left" width="272">
      <div className="-mx-6 -my-4">
        <div className="flex items-center h-16 px-4 border-b space-x-4 font-medium text-lg ">
          <Image src="/LogoITB.png" width={40} height={40} />
          <span>ITB Club</span>
        </div>

        <div style={{ height: 'calc(100vh - 64px)' }} className="my-4">
          <SidebarContent menuActiveKey={menuActiveKey} menus={menus} />
        </div>
      </div>
    </Drawer>
  );
};
