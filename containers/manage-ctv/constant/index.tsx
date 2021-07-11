import { IColumn } from '@components';
import { EditIcon, DeleteIcon } from '@components';

export const columns: IColumn[] = [
  {
    title: 'Họ và tên',
    dataIndex: 'FullName',
    key: 'FullName',
    align: 'center',
    width: '',
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
    align: 'center',

    width: '',
  },
  {
    title: 'Ban',
    dataIndex: 'Department',
    key: 'Department',
    align: 'center',

    width: '',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'Position',
    key: 'Position',
    align: 'center',

    width: '',
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    render: () => {
      return (
        <>
          <div className="flex items-center justify-center space-x-4">
            <button>
              <EditIcon />
            </button>

            <button>
              <DeleteIcon />
            </button>
          </div>
        </>
      );
    },
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
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
  {
    key: '1',
    FullName: 'Huynh Nhat Hao',
    Email: 'haohn19411c@st.uel.edu.vn',
    Department: 'Hoc Thuat',
    Position: 'Thanh vien',
  },
];
