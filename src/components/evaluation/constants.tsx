import { DeleteIcon, EditIcon } from '@/components/icons';

import { MenuItemDropdown } from '../elements';
export const menus = [
  {
    prefix: <EditIcon />,
    value: 'edit',
    name: 'Chỉnh sửa',
  },
  {
    prefix: <DeleteIcon size={20} />,
    value: 'delete',
    name: 'Xóa',
  },
];

export const EMOJI: MenuItemDropdown[] = [
  {
    value: '😃',
    name: '😃',
  },
  {
    value: '😍',
    name: '😍',
  },
  {
    value: '😠',
    name: '😠',
  },
  {
    value: '😓',
    name: '😓',
  },
];
