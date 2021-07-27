import {
  DashboardIcon,
  ManageCTVIcon,
  ScoreIcon,
  TeamIcon,
} from '@components/icons';

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
    name: 'Đội nhóm CTV',
    icon: <TeamIcon />,
    href: '/ctv/evaluate',
  },
  {
    key: 'Score',
    name: 'Điểm thi CTV',
    icon: <ScoreIcon />,
    href: '/ctv/score',
  },
];
