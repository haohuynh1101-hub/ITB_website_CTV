import { TMenuItem } from './MenuItem';
import { MenuItem } from './MenuItem';
type IProps = {
  menuActiveKey?: string;
  menus: TMenuItem[];
  isCompactMode?: boolean;
};

export const SidebarContent: React.FC<IProps> = ({ menus, menuActiveKey }) => {
  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 overflow-y-auto list-none">
        {menus.map((menuItem) => {
          return (
            <MenuItem
              key={menuItem.key}
              icon={menuItem.icon}
              href={menuItem.href}
              name={menuItem.name}
              isActive={menuItem.key === menuActiveKey}
            />
          );
        })}
      </ul>
    </div>
  );
};
