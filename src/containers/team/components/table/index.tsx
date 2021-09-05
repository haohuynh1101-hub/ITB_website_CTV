/* eslint-disable prettier/prettier */
import { EditIcon, EvaluateIcon, Tooltip } from 'components';
import { useRouter } from 'next/router';

import { ITeam } from '@/redux/reducers/team/type';

type IProps = {
    teams?: ITeam[];
    onUpdate: (teamId: string) => void
};
export const TableTeam: React.FC<IProps> = ({ teams = [], onUpdate }) => {
    const router = useRouter();
    const handleLink = (id: string) => () => {
        router.push({
            pathname: '/ctv/team/[id]',
            query: { id },
        });
    };

    const handleUpdate = (teamId: string) => () => {
        if (onUpdate) {
            onUpdate(teamId)
        }
    }
    return (
        <div className="overflow-auto">
            <table className="w-full table-auto" style={{ minWidth: '768px' }}>
                <thead>
                    <tr className="border-b">
                        <th className="w-24 p-4 font-medium text-left">STT</th>

                        <th className="p-4 font-medium text-left w-72">Tên nhóm</th>
                        <th className="w-64 font-medium text-left">Nhóm trưởng</th>
                        <th className="w-40 p-4 font-medium text-center">Số thành viên</th>
                        <th className="w-40 p-4 font-medium text-left">Hoạt động</th>
                    </tr>
                </thead>

                <tbody>
                    {teams.length === 0 ? (
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
                        teams.map((team, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 group last:border-b-0 transition-all duration-500"
                            >
                                <td className="w-24 p-4 text-left">{index + 1}</td>

                                <td className="p-4">
                                    <span>{team.teamName}</span>
                                </td>
                                <td className="w-64">{team.leader?.email}</td>
                                <td className="p-4 text-center">
                                    <span className="text-center">
                                        {team.memberCount}
                                    </span>
                                </td>
                                <td className="w-40 p-4">
                                    <div className="flex items-center space-x-4">
                                        <Tooltip title="Đánh giá">
                                            <button onClick={handleLink(team._id)}>
                                                <EvaluateIcon />
                                            </button>
                                        </Tooltip>

                                        <Tooltip title="Chỉnh sửa">
                                            <button onClick={handleUpdate(team._id)}>
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
