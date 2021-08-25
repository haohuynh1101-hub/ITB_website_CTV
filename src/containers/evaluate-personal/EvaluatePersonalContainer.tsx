import {
  Avatar,
  Button,
  DrawerCTV,
  Evaluate,
  EvaluateEditor,
  FormItem,
  Tabs,
} from 'components';
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { useState } from 'react';

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
  const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');
  const onClose = () => {
    setIsOpen(false);
  };

  const handleTabChange = (tab: 'ROUND_1' | 'ROUND_2' | 'ROUND_3') => {
    setTab(tab);
  };

  return (
    <>
      <div className="py-4 grid grid-cols-12 gap-4">
        <div className="flex flex-col items-center justify-center space-y-2 col-span-4">
          <Avatar
            src="Huynh Nhat Hao"
            fullName="Huynh Nhat Hao"
            className="!w-28 !h-28 !rounded-md"
          />

          <div className="space-y-2">
            <div className="text-base font-medium text-center">
              <span>Huynh Nhat Hao</span>
            </div>

            <div className="text-center">
              <span>haohn19411c@st.uel.edu.vn</span>
            </div>

            <div className="p-4 border rounded-md">
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
            </div>

            <div className="flex items-center w-1/2">
              <Button
                title="Xem Form"
                type="primary"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>

        <div className="col-span-8">
          <FormItem>
            <Tabs
              tabs={EVALUATE_INTERVAL_TABS}
              onChange={handleTabChange}
              activeKey={tab}
            />
          </FormItem>

          <FormItem>
            <Evaluate />
          </FormItem>

          <div className="w-full mb-4">
            <EvaluateEditor
              placeholder="Nhận xét..."
              onChangeEditor={() => console.log()}
              index={1}
            />
          </div>
        </div>
      </div>

      <DrawerCTV visible={isOpen} onClose={onClose} title="Chỉnh sửa" />
    </>
  );
};
