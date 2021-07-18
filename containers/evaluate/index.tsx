/* eslint-disable react/display-name */
import {
  EditIcon,
  EvaluateIcon,
  IColumn,
  SelectControlled,
  Table,
} from '@components';
import { PLusIcon } from '@components';
import Link from 'next/link';
import { useState } from 'react';

import { EvaluatePersonalItem } from '../evaluate-personal/components/evaluate-personal-item';
import { dataDemo } from './constant';
import { FormEvaluate } from './form/form-evaluate';

const dataSelect = [
  {
    name: 'Nhóm 1',
    value: '1',
  },
  {
    name: 'Nhóm 2',
    value: '2',
  },
  {
    name: 'Nhóm 3',
    value: '3',
  },
  {
    name: 'Nhóm 4',
    value: '4',
  },
  {
    name: 'Nhóm 5',
    value: '5',
  },
];

const listJudge = [
  {
    owner: 'Trương Quốc Tuấn',
    judge: [
      {
        description: 'Làm việc tốt',
      },
    ],
  },
  {
    owner: 'Nguyễn Huyền Thương',
    judge: [
      {
        description: 'Làm việc tốt',
      },
    ],
  },
  {
    owner: 'Nguyễn Nhật Nguyên',
    judge: [
      {
        description: 'Làm việc tốt',
      },
    ],
  },
];
export const EvaluateContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  const [selected, setSelected] = useState<string>('');
  const [isInsert, setIsInsert] = useState(false);

  const handleSelect = (key: string) => {
    setSelected(key);
  };

  const onInsert = () => {
    setIsInsert((value) => !value);
  };
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="w-36">
            <SelectControlled
              value={selected}
              options={dataSelect}
              onChange={handleSelect}
              placeholder="Nhóm CTV"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Số thành viên:</span>
              <span className="font-medium">7</span>
            </div>

            <div className=" flex items-center space-x-2">
              <span>Supporter:</span>
              <span className="font-medium">Huyền Thương, Bảo Trâm</span>
            </div>
          </div>
        </div>

        <Table columns={columns} data={dataDemo} />

        <div className="space-y-4">
          <div className="flex items-center text-lg font-medium space-x-4">
            <span>Nhận xét nhóm:</span>

            <button onClick={onInsert}>
              <PLusIcon />
            </button>
          </div>

          {isInsert && <FormEvaluate />}

          {listJudge.map((item, index) => (
            <EvaluatePersonalItem
              key={index}
              owner={item.owner}
              judge={item.judge}
              isEditor={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};
