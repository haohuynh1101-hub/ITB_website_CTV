import { SearchIcon } from 'components';
import { Button, Input, SelectControlled } from 'components/elements';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getCandidatesAsync } from '@/redux/reducers/candidate';

import { departments } from './components/constants';
import { DrawerCTV } from './components/drawer-ctv';
import { TableCTV } from './components/table';
import { IFormValue } from './components/type';

export const ManageCTVContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candidateSelected, setCandidateSelected] = useState<IFormValue>(null);

  const dispatch = useAppDispatch();
  const candidateReducer = useAppSelector((state) => state.users);
  const { candidates } = candidateReducer;
  useEffect(() => {
    dispatch(getCandidatesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleGetDetail = (candidateId: string) => {
    const candidate = candidates.find((user) => user._id === candidateId);
    if (candidate) {
      // setCandidateSelected(candidate);
      setCandidateSelected({
        _id: candidate?._id,
        fullName: candidate?.fullName,
        email: candidate?.email,
        gender: candidate?.gender,
        birthday: new Date(candidate?.birthday),
        mssv: candidate?.mssv,
        major: candidate?.major,
        phone: candidate?.phone,
        address: candidate?.address,
        linkFB: candidate?.linkFB,
        department: candidate?.department,
        ability: candidate?.ability,
        role: candidate.role,
      });
      handleCreate();
    }
  };

  const handleAfterVisibleChange = (visible: boolean) => {
    if (!visible) {
      setCandidateSelected(null);
    }
  };
  return (
    <>
      <div className="flex flex-col">
        {/* <Statistic data={data} /> */}

        <div className="flex items-center justify-between  mb-4">
          <div className="text-lg font-medium">
            <span>Danh sách cộng tác viên</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-40">
              <SelectControlled
                options={departments}
                onChange={() => console.log('')}
                placeholder="Ban"
              />
            </div>

            <div>
              <Input
                placeholder="Tìm kiếm theo tên CTV"
                type="primary"
                bordered
                prefix={<SearchIcon />}
              />
            </div>

            <div>
              <Button title="Thêm CTV" type="primary" onClick={handleCreate} />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-md">
          <TableCTV
            users={candidateReducer.candidates}
            onGetDetail={handleGetDetail}
          />
        </div>

        <DrawerCTV
          visible={isOpen}
          onClose={onClose}
          defaultValues={candidateSelected}
          onAfterVisibleChange={handleAfterVisibleChange}
        />
      </div>
    </>
  );
};
