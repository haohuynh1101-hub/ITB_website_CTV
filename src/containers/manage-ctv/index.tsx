import { SearchIcon } from 'components';
import { Button, Input, Toggle } from 'components/elements';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getCandidatesAsync } from '@/redux/reducers/candidate';
import { nonAccentVietnamese } from '@/utils/string';

import { DrawerCTV } from './components/drawer-ctv';
import { TableCTV } from './components/table';
import { IFormCandidateValue } from './components/type';

export const ManageCTVContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candidateSelected, setCandidateSelected] =
    useState<IFormCandidateValue>(null);
  const [filter, setFilter] = useState({ search: '' });
  const [archived, setArchived] = useState(false);

  const dispatch = useAppDispatch();
  const candidateReducer = useAppSelector((state) => state.candidate);
  const { candidates } = candidateReducer;

  useEffect(() => {
    dispatch(
      getCandidatesAsync({
        isArchived: !archived ? undefined : true,
        role: 'CANDIDATE',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archived]);

  const getCandidates = () => {
    let users = candidates.filter(
      (candidate) => candidate.isArchived === archived
    );
    if (filter.search) {
      users = users.filter(
        (user) =>
          nonAccentVietnamese(user.fullName + user.email).search(
            nonAccentVietnamese(filter.search)
          ) >= 0
      );
    }
    return users;
  };

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
        studentId: candidate?.studentId,
        major: candidate?.major,
        phone: candidate?.phone,
        address: candidate?.address,
        linkFB: candidate?.linkFB,
        department: candidate?.department,
        ability: candidate?.ability,
        role: candidate.role,
        avatar: candidate.avatar,
        isArchived: candidate.isArchived,
      });
      handleCreate();
    }
  };

  const handleAfterVisibleChange = (visible: boolean) => {
    if (!visible) {
      setCandidateSelected(null);
    }
  };

  const users = getCandidates();
  return (
    <>
      <div className="flex flex-col  space-y-8">
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b space-x-4">
          <div className="text-lg font-medium">
            <span>Danh sách cộng tác viên</span>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <Toggle
                title="Lưu trữ"
                checked={archived}
                onChange={() => setArchived((v) => !v)}
              />
            </div>

            <div>
              <Input
                placeholder="Tìm kiếm theo tên CTV"
                type="primary"
                bordered
                value={filter.search}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, search: e.target.value }))
                }
                prefix={<SearchIcon />}
              />
            </div>

            <div>
              <Button title="Thêm CTV" type="primary" onClick={handleCreate} />
            </div>
          </div>
        </div>

        <div className="mx-8 bg-white border rounded-md">
          <TableCTV users={users} onGetDetail={handleGetDetail} />
        </div>
      </div>

      <DrawerCTV
        visible={isOpen}
        onClose={onClose}
        defaultValues={candidateSelected}
        onAfterVisibleChange={handleAfterVisibleChange}
      />
    </>
  );
};
