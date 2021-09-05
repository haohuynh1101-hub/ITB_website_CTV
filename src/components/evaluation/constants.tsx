import { DeleteIcon, EditIcon } from '@/components/icons';
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
