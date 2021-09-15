/* eslint-disable prettier/prettier */

import dayjs from 'dayjs';
import dayjsCalendar from "dayjs/plugin/calendar";

import { Avatar, DropDown } from '@/components/elements';
import { IEvaluation } from '@/redux/reducers/evaluation/types';

import { MenuIcon } from '..';
import { menus } from './constants';
dayjs.extend(dayjsCalendar);

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
            <div className="flex items-center space-x-4">
                <Avatar src={evaluation?.user.avatar} fullName={evaluation?.user.fullName} />
                <div className="flex flex-col p-2 bg-gray-100 space-y-2 rounded-md">
                    <span className="font-medium">{evaluation?.user.fullName}</span>
                    <span>{evaluation?.content}</span>
                </div>
            </div>
            {/* <div className="items-center flex-1 bg-white border divide-y rounded-md">
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
            </div> */}
            <div>
                <DropDown placement="left" menus={menus} onClick={handleClick}>
                    <span className="p-2 rounded-full bg-gray-50 hover:bg-gray-100">
                        <MenuIcon />
                    </span>
                </DropDown>
                <div className="text-xs text-gray-400">
                    <span>{dayjs(evaluation.createdAt).calendar()}</span>
                </div>
            </div>
        </div>
    );
};
