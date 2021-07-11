import {
  Table,
  Input,
  Button,
  EditIcon,
  DeleteIcon,
  IColumn,
} from '@components';
import { useState } from 'react';
import { Statistic } from './components';
import { ModalPerson } from './components/modal-person';
import { dataDemo } from './constant';
import { SearchIcon } from './icons';

const data = [
  {
    title: 'Cộng tác viên',
    value: '52',
  },
  {
    title: 'Tham gia vòng 2',
    value: '30',
  },
  {
    title: 'Nhóm Teamwork',
    value: '10',
  },
  {
    title: 'Interview',
    value: '40',
  },
];
export const ManageCTVContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const columns: IColumn[] = [
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
              <button onClick={() => setIsOpen(true)}>
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

  return (
    <>
      <div className="flex flex-col ">
        <Statistic data={data} />

        <div className="flex items-center justify-between mt-16 mb-4">
          <div className="font-medium text-lg">
            <span>Danh sách cộng tác viên</span>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <Input
                placeholder="Tìm kiếm theo tên CTV"
                type="primary"
                bordered
                prefix={<SearchIcon />}
              />
            </div>

            <div>
              <Button title="Thêm CTV" type="primary" />
            </div>
          </div>
        </div>

        <Table columns={columns} data={dataDemo} />

        <ModalPerson isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};
