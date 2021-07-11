import classNames from 'classnames';
import { SidebarContent } from './SidebarContent';
import { TMenuItem } from './MenuItem';
type IProps = {
  menuActiveKey: string;
  menus: TMenuItem[];
};
export const SidebarDesktop: React.FC<IProps> = ({ menuActiveKey, menus }) => {
  return (
    <aside
      className={classNames(
        'fixed z-10 hidden h-screen bg-white border-r md:block w-64 top-16 transition-width duration-300'
      )}
      style={{ height: 'calc (100vh-64px)' }}
    >
      <SidebarContent menuActiveKey={menuActiveKey} menus={menus} />
    </aside>
  );
};
