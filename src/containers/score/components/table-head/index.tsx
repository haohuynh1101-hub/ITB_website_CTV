import { TABLE_COL_WIDTH as COL_WIDTH } from '../../constant';

export const TableHead = () => {
  return (
    <thead
      className="sticky top-0 text-xs leading-none text-gray-400 shadow z"
      style={{ zIndex: 4 }}
    >
      <tr>
        <th
          className="p-0 pl-4 font-medium text-left cell-fixed"
          style={{ width: COL_WIDTH.avatar, left: COL_WIDTH.team }}
        >
          Avatar
        </th>
        <th
          className="p-0  font-medium text-left cell-fixed"
          style={{
            width: COL_WIDTH.fullName,
            left: COL_WIDTH.team + COL_WIDTH.avatar,
          }}
        >
          Họ và tên
        </th>
        <th
          className="p-0 pr-4 font-medium text-right cell-fixed shadow-border-r"
          style={{
            width: COL_WIDTH.class,
            left: COL_WIDTH.team + COL_WIDTH.avatar + COL_WIDTH.fullName,
          }}
        >
          Lớp
        </th>

        <th className="px-4 py-0 font-medium bg-white">
          <div className="flex items-center justify-center h-14 flex-nowrap ">
            <div
              className="flex flex-col items-center justify-center w-full h-full leading-none"
              style={{ width: COL_WIDTH.score }}
            >
              Điểm
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};
