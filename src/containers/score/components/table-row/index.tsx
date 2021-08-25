import { Avatar } from 'components';

import { personalModal, TABLE_COL_WIDTH as COL_WIDTH } from '../../constant';
import { ScoreItem } from '../score-item';

type IProps = {
  personal: personalModal;
};
export const TableRow: React.FC<IProps> = ({ personal }) => {
  return (
    <tr className="border-b cursor-pointer last:border-0 group">
      <td
        className="px-4 cell-fixed group-hover:bg-gray-100"
        style={{ width: COL_WIDTH.avatar, left: COL_WIDTH.team }}
      >
        <span className="flex justify-start">
          <Avatar fullName={personal.fullName} src="" />
        </span>
      </td>

      <td
        className="cell-fixed group-hover:bg-gray-100"
        style={{
          width: COL_WIDTH.fullName,
          left: COL_WIDTH.team + COL_WIDTH.avatar,
        }}
      >
        {personal.fullName}
      </td>

      <td
        className="pr-4 font-medium text-right cell-fixed shadow-border-r group-hover:bg-gray-100"
        style={{
          width: COL_WIDTH.class,
          left: COL_WIDTH.team + COL_WIDTH.avatar + COL_WIDTH.fullName,
        }}
      >
        {personal.class}
      </td>

      <td className="h-full p-4 group-hover:bg-gray-1000">
        <div className="flex w-full h-full flex-nowrap space-x-2">
          {personal.scores.map((score, index) => {
            return (
              <div key={index} className="relative score-item">
                <ScoreItem width={COL_WIDTH.score} scoreId="1" />
              </div>
            );
          })}
        </div>
      </td>
    </tr>
  );
};
