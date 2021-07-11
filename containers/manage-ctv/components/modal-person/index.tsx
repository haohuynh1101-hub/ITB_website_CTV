import { Modal, Button, EvaluateItem } from '@components';

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
              src="https://via.placeholder.com/250"
              width={200}
              height={150}
            />
          </div>

          <div className="divide-y ">
            <div className="text-primary-500 font-medium">
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
          <div className="text-primary-500 font-medium">
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
