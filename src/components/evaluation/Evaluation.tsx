import classNames from 'classnames';
import dayjs from 'dayjs';
import dayjsCalendar from 'dayjs/plugin/calendar';

import { Avatar, DropDown } from '@/components/elements';
import { IEvaluation } from '@/redux/reducers/evaluation/types';

import { MenuIcon } from '..';
import { menus } from './constants';
dayjs.extend(dayjsCalendar);

type IProps = {
  userId?: string;
  evaluation: IEvaluation;
  onGetDetail: (evaluationId: string) => void;
  onDelete: (evaluationId: string) => void;
};
export const Evaluate: React.FC<IProps> = ({
  evaluation,
  userId,
  onGetDetail,
  onDelete,
}) => {
  const des = evaluation?.content?.split('\n').join('<br/>');

  const handleClick = (key?: string) => {
    if (key === 'edit') {
      if (onGetDetail) {
        onGetDetail(evaluation._id);
      }
    } else {
      if (!onDelete) {
        return;
      }
      onDelete(evaluation._id);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-4">
        <Avatar
          src={evaluation?.user.avatar}
          fullName={evaluation?.user.fullName}
        />
        <div className="flex flex-col p-2 bg-gray-100 space-y-2 rounded-md">
          <span className="font-medium">{evaluation?.user.fullName}</span>
          <div className="flex items-center space-x-2">
            {evaluation?.icon && <span>{evaluation?.icon}</span>}

            <div
              dangerouslySetInnerHTML={{
                __html: des || '...',
              }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <DropDown placement="left" menus={menus} onClick={handleClick}>
          <span
            className={classNames(
              'p-2 rounded-full bg-gray-50 hover:bg-gray-100',
              { hidden: userId !== evaluation?.user?._id }
            )}
          >
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
