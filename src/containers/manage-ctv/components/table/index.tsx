import { useRouter } from 'next/router';

import { Avatar, Tooltip } from '@/components/elements';
import { EditIcon, EvaluateIcon } from '@/components/icons';
import { ICandidate } from '@/redux/reducers/candidate/type';

import { getColorFromDepartment } from '../utils';

type IProps = {
  users?: ICandidate[];
  onGetDetail: (candidateId: string) => void;
};
export const TableCTV: React.FC<IProps> = ({ users = [], onGetDetail }) => {
  const router = useRouter();
  const handleGetDetail = (id: string) => () => {
    if (onGetDetail) {
      onGetDetail(id);
    }
  };

  const handleLink = (id: string) => () => {
    router.push({
      pathname: '/ctv/manage-ctv/[id]',
      query: { id },
    });
  };
  return (
    <div className="overflow-auto">
      <table className="w-full table-auto" style={{ minWidth: '768px' }}>
        <thead>
          <tr className=" border-b">
            <th className="w-24 p-4 font-medium text-left">STT</th>

            <th className="p-4 font-medium text-left w-72">Họ và tên</th>
            <th className="w-64 font-medium text-left">Email</th>
            <th className="w-40 p-4 font-medium text-left">Ban ứng tuyển</th>
            <th className="w-40 p-4 font-medium text-left">Hoạt động</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <div className="p-4">
                  <span className="text-base italic text-gray-400">
                    Không có dữ liệu
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={index}
                className=" border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 group last:border-b-0 transition-all duration-500"
              >
                <td className="w-16 p-4 text-left md:w-32">{index + 1}</td>

                <td className="p-4 w-72">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center font-medium space-x-2">
                      <Avatar fullName={user?.fullName} src={user?.avatar} />
                      <span>{user?.fullName}</span>
                    </div>
                  </div>
                </td>

                <td className="w-64">{user?.email}</td>

                <td className="w-64">
                  <div className="flex flex-wrap">
                    {user.department.map((value, index) => (
                      <span
                        key={index}
                        className="p-1 mx-1 my-1 text-sm font-medium text-center border rounded-md"
                        style={{
                          color: getColorFromDepartment(value),
                          borderColor: getColorFromDepartment(value),
                        }}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="w-40 p-4">
                  <div className="flex items-center space-x-4">
                    <Tooltip title="Đánh giá">
                      <button onClick={handleLink(user._id)}>
                        <EvaluateIcon />
                      </button>
                    </Tooltip>

                    <Tooltip title="Chỉnh sửa">
                      <button onClick={handleGetDetail(user._id)}>
                        <EditIcon />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
