/* eslint-disable @next/next/no-img-element */
import { Button, EvaluateItem, Modal } from '@components';

type IProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
export const ModalPerson: React.FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        visible={isOpen}
        onCancel={onClose}
        title="Thong tin ca nhan cua Huynh Nhat Hao"
      >
        <div className="flex space-x-4">
          <div>
            <img
              src="https://via.placeholder.com/300"
              width={200}
              height={200}
              alt=""
            />
          </div>

          <div className="divide-y ">
            <div className="font-medium text-primary-500">
              <span>Thông tin cơ bản:</span>
            </div>

            {infors.map((infor, index) => {
              return (
                <>
                  <div key={index} className="flex space-x-4">
                    <span className="font-medium">{infor.name}</span>
                    <span>{infor.value}</span>
                  </div>
                </>
              );
            })}

            <div className="flex items-center w-1/2 my-4">
              <Button title="Xem Form" type="primary" />
            </div>
          </div>
        </div>

        <div className="my-4">
          <div className="font-medium text-primary-500">
            <span>Nhận xét:</span>
          </div>

          <EvaluateItem
            title="Nhóm này làm việc chăm chỉ!"
            owner="Vũ Quang Huy"
          />
          <EvaluateItem
            title="Nhóm này làm việc chăm chỉ!"
            owner="Huỳnh Nhật Hào"
          />
        </div>
      </Modal>
    </>
  );
};
