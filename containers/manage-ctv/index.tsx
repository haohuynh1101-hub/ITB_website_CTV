/* eslint-disable react/display-name */
import {
  Button,
  EditIcon,
  EvaluateIcon,
  IColumn,
  Input,
  SelectControlled,
  Table,
} from '@components';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

import { DrawerCTV } from './components/drawer-ctv';
import { ModalPerson } from './components/modal-person';
import { dataDemo } from './constant';
import { SearchIcon } from './icons';

export const ManageCTVContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const onCloseModal = () => {
    setIsModal(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreate = () => {
    setIsOpen(true);
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
      render: (text, record) => {
        console.log(record, '==>record');
        return (
          <>
            <div className="flex items-center justify-center space-x-4 ">
              <Link
                href={{
                  pathname: '/ctv/manage-ctv/[id]',
                  query: { id: `${record.key}` },
                }}
              >
                <a>
                  <EvaluateIcon />
                </a>
              </Link>
              <button onClick={() => setIsOpen(true)}>
                <EditIcon />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        {/* <Statistic data={data} /> */}

        <div className="flex items-center justify-between  mb-4">
          <div className="text-lg font-medium">
            <span>Danh sách cộng tác viên</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-40">
              <SelectControlled
                options={[]}
                onChange={() => console.log('')}
                placeholder="Ban"
              />
            </div>

            <div>
              <Input
                placeholder="Tìm kiếm theo tên CTV"
                type="primary"
                bordered
                prefix={<SearchIcon />}
              />
            </div>

            <div>
              <Button title="Thêm CTV" type="primary" onClick={handleCreate} />
            </div>
          </div>
        </div>

        <Table columns={columns} data={dataDemo} />

        <DrawerCTV visible={isOpen} onClose={onClose} title="Tạo mới CTV" />
        <ModalPerson isOpen={isModal} onClose={onCloseModal} />
      </div>
    </>
  );
};
