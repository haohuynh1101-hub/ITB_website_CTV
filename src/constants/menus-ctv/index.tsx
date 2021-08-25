import { DashboardIcon, ManageCTVIcon, ScoreIcon, TeamIcon } from 'components';

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
    key: 'Team',
    name: 'Đội nhóm CTV',
    icon: <TeamIcon />,
    href: '/ctv/team',
  },
  {
    key: 'Score',
    name: 'Điểm thi CTV',
    icon: <ScoreIcon />,
    href: '/ctv/score',
  },
];
