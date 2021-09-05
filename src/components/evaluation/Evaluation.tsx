/* eslint-disable prettier/prettier */

import { Avatar, DropDown } from '@/components/elements';
import { IEvaluation } from '@/redux/reducers/evaluation/types';

import { MenuIcon } from '..';
import { menus } from './constants';


type IProps = {
    evaluation: IEvaluation
    onGetDetail: (evaluationId: string) => void
    onDelete: (evaluationId: string) => void
};
export const Evaluate: React.FC<IProps> = ({
    evaluation, onGetDetail, onDelete
}) => {

    const handleClick = (key?: string) => {
        if (key === "edit") {
            if (onGetDetail) {
                onGetDetail(evaluation._id)
            }
        } else {
            if (!onDelete) {
                return
            }
            onDelete(evaluation._id)
        }
    }
    return (
        <div className="flex items-center space-x-2">
            <div className="items-center flex-1 bg-white border divide-y rounded-md">
                <div className="flex items-center w-full px-4  py-2   ">
                    <div className="flex items-center justify-center pr-1 text-center rounded-full w-7 h-7 hover:bg-primary-50">
                        <span>{evaluation?.icon}</span>
                    </div>

                    <div className="flex-1">
                        <p>{evaluation?.content}</p>
                    </div>

                    <div className="flex items-center font-medium space-x-2">
                        <Avatar src={evaluation?.user.avatar} fullName={evaluation?.user.fullName} />
                        <span>{evaluation?.user.fullName}</span>
                    </div>
                </div>
            </div>
            <DropDown placement="right" menus={menus} onClick={handleClick}>
                <span className="p-2 rounded-full bg-gray-50 hover:bg-gray-100">
                    <MenuIcon />
                </span>
            </DropDown>
        </div>
    );
};
