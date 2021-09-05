import classNames from 'classnames';

import { getCSSVar } from '@/utils/cssVar';

import { TMenuItem } from './MenuItem';
import { SidebarContent } from './SidebarContent';
type IProps = {
  menuActiveKey: string;
  menus: TMenuItem[];
};
export const SidebarDesktop: React.FC<IProps> = ({ menuActiveKey, menus }) => {
  const headerHeight = getCSSVar('header-height', '56px');
  const sidebarHeight = `calc(100vh - ${headerHeight})`;
  return (
    <div
      className="fixed z-10 pr-4 top-header transition-width duration-300 w-sidebar-space-r"
      style={{ height: sidebarHeight }}
    >
      <div
        className={classNames(
          'bg-white border-r transition-width duration-300 relative w-sidebar'
        )}
        style={{ height: sidebarHeight }}
      >
        <SidebarContent menuActiveKey={menuActiveKey} menus={menus} />
      </div>
    </div>
  );
};
