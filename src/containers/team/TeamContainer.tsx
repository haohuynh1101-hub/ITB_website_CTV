import { SearchIcon } from 'components';
import { Button, Input } from 'components/elements';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getTeamsAsync } from '@/redux/reducers';

import { DrawerTeam, TableTeam } from './components';
import { IFormValues } from './components/type';

export const TeamContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teamSelectecd, setTeamSelected] = useState<IFormValues>(null);
  const dispatch = useAppDispatch();
  const teamReducer = useAppSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeamsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleUpdate = (teamId: string) => {
    const team = teamReducer.teams.find((team) => team._id === teamId);
    const memberIds = team.members.map((member) => member._id);
    const supporterIds = team.supporters.map((supporter) => supporter._id);

    setTeamSelected({
      _id: team._id,
      teamName: team.teamName,
      leaderId: team.leader._id,
      memberIds: memberIds,
      supporterIds: supporterIds,
    });

    handleOpen();
  };

  const handleAfterChangeVisibile = (visible: boolean) => {
    if (!visible) {
      setTeamSelected(null);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b space-x-4">
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
              title="Tạo nhóm"
              type="primary"
              block={false}
              onClick={handleOpen}
            />
          </div>
        </div>

        <div className="mx-8 bg-white border rounded-md">
          <TableTeam teams={teamReducer.teams} onUpdate={handleUpdate} />
        </div>
      </div>

      <DrawerTeam
        id="formCreateTeam"
        visible={isOpen}
        onClose={handleClose}
        defaultValues={teamSelectecd}
        onAfterVisibleChange={handleAfterChangeVisibile}
      />
    </>
  );
};
