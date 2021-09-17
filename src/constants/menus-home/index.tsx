import { HomeIcon, PeopleTeamIcon } from 'components';

export const menusHome = [
  {
    key: 'ManageHuman',
    name: 'Quản lý nội bộ',
    icon: <HomeIcon size={40} />,
    href: '/manage-human',
  },
  {
    key: 'ManageCTV',
    name: 'Quản lý CTV',
    icon: <PeopleTeamIcon size={40} />,
    href: '/ctv/manage-ctv',
  },
];
