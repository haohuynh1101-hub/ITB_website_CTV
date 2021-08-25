import { SearchIcon } from 'components';
import { Button, Input } from 'components/elements';
import { useState } from 'react';

import { DrawerTeam, TableTeam } from './components';
import { dataDemo } from './constant';

export const TeamContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between space-x-4">
          <div className="text-lg font-medium">
            <span>Danh sách nhóm</span>
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder="Tìm kiếm theo tên nhóm"
              type="primary"
              bordered
              prefix={<SearchIcon />}
            />
            <Button
              title="Ghép nhóm"
              type="primary"
              block={false}
              onClick={handleOpen}
            />
          </div>
        </div>

        <div className="bg-white border rounded-md">
          <TableTeam users={dataDemo} />
        </div>
      </div>

      <DrawerTeam id="formCreateTeam" visible={isOpen} onClose={handleClose} />
    </>
  );
};
