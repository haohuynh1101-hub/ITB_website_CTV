/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @next/next/no-img-element */
import { Button, DrawerCTV } from '@components';
import { useState } from 'react';

import { EvaluatePersonalItem } from './components/evaluate-personal-item';

const infors = [
  {
    name: 'Họ và tên:',
    value: 'Huynh Nhat Hao',
  },
  {
    name: 'Lớp:',
    value: 'k19411',
  },
  {
    name: 'Nhóm:',
    value: '2',
  },
  {
    name: 'Ban mong muốn:',
    value: 'Học thuật, Truyền thông',
  },
];

const listJudge = [
  {
    owner: 'Huynh Nhat Hao',
    judge: [
      {
        description: 'Làm việc tốt',
      },
      {
        description: 'Làm việc tốt',
      },
    ],
  },
  {
    owner: 'Vũ Quang Huy',
    judge: [
      {
        description: 'Làm việc tốt',
      },
    ],
  },
  {
    owner: 'Nguyễn Hữu Thuận',
    judge: [
      {
        description: 'Làm việc tốt',
      },
      {
        description: 'Làm việc tốt',
      },
      {
        description: 'Làm việc tốt',
      },
      {
        description: 'Làm việc tốt',
      },
    ],
  },
];
export const EvaluatePersonalContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex space-x-8">
          <div>
            <img
              src="https://via.placeholder.com/300"
              width={200}
              height={200}
              alt=""
            />
          </div>

          <div className="divide-y space-y-2">
            <div className="font-medium text-primary-500">
              <span>Thông tin cơ bản:</span>
            </div>

            {infors.map((infor, index) => {
              return (
                <>
                  <div key={index} className="flex flex-1 space-x-4">
                    <span className="font-medium">{infor.name}</span>
                    <span>{infor.value}</span>
                  </div>
                </>
              );
            })}

            <div className="flex items-center w-1/2 my-4">
              <Button
                title="Xem Form"
                type="primary"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
        {listJudge.map((item, index) => (
          <EvaluatePersonalItem
            key={index}
            owner={item.owner}
            judge={item.judge}
          />
        ))}
      </div>

      <DrawerCTV visible={isOpen} onClose={onClose} title="Chỉnh sửa" />
    </>
  );
};
