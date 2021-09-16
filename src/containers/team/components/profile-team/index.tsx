/* eslint-disable prettier/prettier */
import { Avatar } from "@/components/elements";
import { EyeIcon } from "@/components/icons";
import { ITeam } from "@/redux/reducers/team/type";

type IProps = {
    team: ITeam
    onGetDetail: (candidateId: string) => void
}
export const ProfileTeam: React.FC<IProps> = ({ team, onGetDetail }) => {
    const handleGetDetail = (id: string) => () => {
        if (onGetDetail) {
            onGetDetail(id)
        }
    }
    return (
        <div className="p-4 border space-y-4 rounded-md">
            <div className="flex items-center text-base font-medium space-x-2">
                <h4>Tên nhóm:</h4>
                <h2>{team?.teamName}</h2>

            </div>

            <div className="border-b border-dashed"></div>

            <div className=" space-y-2 ">
                <div className="text-base font-medium">
                    <h4>Người hỗ trợ</h4>
                </div>

                <div className="space-y-2">
                    {team?.supporters.length > 0 && team?.supporters.map((supporter, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Avatar src={supporter?.avatar} fullName={supporter?.fullName} />
                            <span className="flex-1">{supporter?.fullName}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-b border-dashed"></div>

            <div className="space-y-2">
                <div className="text-base font-medium">
                    <h4>Thành viên</h4>
                </div>

                {team?.members.length > 0 && team?.members.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Avatar src={member?.avatar} fullName={member?.fullName} />
                        <span className="flex-1">{member?.fullName}</span>
                        <button className="focus:outline-none" onClick={handleGetDetail(member?._id)}>
                            <EyeIcon />
                        </button>

                    </div>
                ))}

            </div>
        </div>
    );
};
