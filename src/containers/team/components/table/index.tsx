/* eslint-disable prettier/prettier */
import { EditIcon, EvaluateIcon } from 'components';
import { useRouter } from 'next/router';

type userTypes = {
    key: string;
    FullName: string;
    Email: string;
    Department: string;
    Position: string;
};
type IProps = {
    users?: userTypes[];
};
export const TableTeam: React.FC<IProps> = ({ users = [] }) => {
    const router = useRouter();
    const handleLink = (id: string) => () => {
        router.push({
            pathname: '/ctv/team/[id]',
            query: { id },
        });
    };
    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="border-b">
                    <th className="p-4 font-medium text-left"></th>

                    <th className="p-4 font-medium text-left">Tên nhóm</th>
                    <th className="w-64 font-medium text-left">Nhóm trưởng</th>
                    <th className="w-40 p-4 font-medium text-left">Số thành viên</th>
                    <th className="w-40 p-4 font-medium text-left"></th>
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
                            className="border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 group last:border-b-0 transition-all duration-500"
                        >
                            <td className="p-4 text-center">{index + 1}</td>

                            <td className="p-4">
                                <span>Nhom 1</span>
                            </td>
                            <td className="w-64">{user.Email}</td>
                            <td className="p-4 text-center">
                                <span className="text-center">
                                    1
                                </span>
                            </td>
                            <td className="w-40 p-4">
                                <div className="flex items-center space-x-4">
                                    <button onClick={handleLink(user.key)}>
                                        <EvaluateIcon />
                                    </button>
                                    <button>
                                        <EditIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};
