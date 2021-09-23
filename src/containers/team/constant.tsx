import { ITab } from 'components/elements';

import { DeleteIcon, EditIcon } from '@/components/icons';

export const EVALUATE_INTERVAL_TABS: ITab[] = [
  {
    key: 'ROUND_1',
    name: 'Vòng 1',
  },
  {
    key: 'ROUND_2',
    name: 'Vòng 2',
  },
  {
    key: 'ROUND_3',
    name: 'Vòng 3',
  },
];

export const EVALUATE_INTERVAL_TABS_TEAM: ITab[] = [
  {
    key: 'ROUND_2',
    name: 'Vòng 2',
  },
  {
    key: 'ROUND_3',
    name: 'Vòng 3',
  },
];

export const dataDemo = [
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '2',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '3',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '4',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '5',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
];

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
