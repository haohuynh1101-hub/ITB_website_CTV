import { CommentIcon, DashboardIcon, ManageCTVIcon } from '@components/icons';

export const menusCTV = [
  {
    key: 'Dashboard',
    name: 'Thống kê',
    icon: <DashboardIcon />,
    href: '/ctv/dashboard',
  },
  {
    key: 'ManageCTV',
    name: 'Quản lý CTV',
    icon: <ManageCTVIcon />,
    href: '/ctv/manage-ctv',
  },
  {
    key: 'Evaluate',
    name: 'Đánh giá',
    icon: <CommentIcon />,
    href: '/ctv/evaluate',
  },
];
