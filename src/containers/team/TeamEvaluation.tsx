/* eslint-disable prettier/prettier */
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { toArray } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import slugify from 'slugify';

import { Evaluate, EvaluateEditor, IFormValue } from '@/components';
import {
  AlwaysScrollToBottom,
  FormItem,
  Tabs,
  Toggle,
} from '@/components/elements';
import { Skeleton } from '@/containers/evaluate-personal';
import { EvaluationGroup } from '@/containers/evaluate-personal';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  createEvaluationAsync,
  deleteEvaluationAsync,
  getEvaluationCandidateAsync,
  getMeAsync,
  getTeamDetailAsync,
  updateEvaluationAsync,
} from '@/redux/reducers';
import { IEvaluationGroup } from '@/redux/reducers/evaluation/types';
import { RequestEvaluationBody } from '@/services/api';
import { getCSSVar } from '@/utils/cssVar';

import { DrawerCTV } from '../manage-ctv/components';
import { IFormCandidateValue } from '../manage-ctv/components/type';
import { ProfileTeam } from './components/profile-team';

const TeamEvaluationContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const teamId = router.query?.id as string;

  const teamReducer = useAppSelector((state) => state.teams.team);
  const userReducer = useAppSelector((state) => state.auth.user);
  const evaluationsReducer = useAppSelector((state) => state.evaluations);
  const listEvaluation = evaluationsReducer.evaluations || [];
  const [sortDepartment, setSortDepartment] = useState(false);
  const [visible, setVisible] = useState(false);

  const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');
  const [evaluation, setEvaluation] = useState<IFormValue>(null);
  const [candidateSelected, setCandidateSelected] =
    useState<IFormCandidateValue>(null);

  const headerHeight = getCSSVar('header-height', '56px');
  const sidebarHeight = `calc(100vh - ${headerHeight} - ${headerHeight} - ${headerHeight} - ${headerHeight} - ${headerHeight})`;

  const data: Record<string, IEvaluationGroup> = {};
  listEvaluation.map((evaluation) => {
    const key = 'TEAM_LABEL/' + slugify(evaluation.user.department[0] || '___');
    if (!data[key]) {
      data[key] = {
        _id: key,
        teamLabel: evaluation.user.department[0] || '___',
        evaluations: [evaluation],
      };
    } else {
      data[key].evaluations.push(evaluation);
    }
  });
  useEffect(() => {
    if (teamId) {
      Promise.all([
        dispatch(getTeamDetailAsync(teamId)),
        dispatch(getEvaluationCandidateAsync({ teamId: teamId, round: tab })),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, tab]);

  useEffect(() => {
    if (!userReducer) {
      dispatch(getMeAsync()).then((result) => {
        if (result.meta.requestStatus === 'rejected') {
          router.push('/login');
        }
      });
    }
  }, [dispatch, router, userReducer]);

  const handleTabChange = (tab: 'ROUND_1' | 'ROUND_2' | 'ROUND_3') => {
    setTab(tab);
  };

  const handleCreate = async (data: RequestEvaluationBody) => {
    const result = await dispatch(createEvaluationAsync({ data }));
    if (result.meta.requestStatus === 'rejected') {
      return false;
    }

    return true;
  };

  const handleUpdate = async (
    evaluationId: string,
    data: RequestEvaluationBody
  ) => {
    const result = await dispatch(
      updateEvaluationAsync({ evaluationId: evaluationId, data })
    );
    if (result.meta.requestStatus === 'rejected') {
      return false;
    }

    return true;
  };

  const handleGetDetail = (evaluationId: string) => {
    const evaluation = listEvaluation.find(
      (evaluation) => evaluation._id === evaluationId
    );

    setEvaluation({
      _id: evaluation._id,
      content: evaluation.content,
      icon: evaluation.icon,
    });
  };

  const handleDelete = async (evaluationId: string) => {
    const result = await dispatch(deleteEvaluationAsync({ evaluationId }));
    if (result.meta.requestStatus === 'rejected') {
      return false;
    }

    return true;
  };

  const handleCloseDrawerCTV = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOpenDrawerCTV = useCallback(() => {
    setVisible(true);
  }, []);

  const handleGetDetailCTV = (candidateId: string) => {
    const candidate = teamReducer.members.find(
      (candidate) => candidate._id === candidateId
    );
    if (!candidate) {
      return;
    }
    const candidateValue: IFormCandidateValue = {
      _id: candidate?._id,
      fullName: candidate?.fullName,
      email: candidate?.email,
      birthday: new Date(candidate?.birthday),
      phone: candidate?.phone,
      studentId: candidate?.studentId,
      department: candidate?.department,
      address: candidate?.address,
      role: candidate?.role,
      gender: candidate?.gender,
      avatar: candidate?.avatar,
      major: candidate?.major,
      ability: candidate?.ability,
      linkFB: candidate?.linkFB,
    };
    setCandidateSelected(candidateValue);
    handleOpenDrawerCTV();
  };

  const handleAfterVisible = () => {
    if (!visible) {
      setCandidateSelected(null);
    }
  };

  const renderEvaluations = useMemo(() => {
    if (evaluationsReducer.pending) {
      return <Skeleton />;
    }
    return (
      <>
        {listEvaluation.length > 0 && (
          <>
            {!sortDepartment && (
              <>
                {listEvaluation.map((evaluation, index) => (
                  <FormItem key={index}>
                    <Evaluate
                      evaluation={evaluation}
                      onGetDetail={handleGetDetail}
                      onDelete={handleDelete}
                    />
                  </FormItem>
                ))}
              </>
            )}

            {sortDepartment && (
              <>
                {toArray(data).map((evaluationGroup, index) => (
                  <EvaluationGroup
                    key={index}
                    evaluationsGroup={evaluationGroup}
                    onDelete={handleDelete}
                    onGetDetail={handleGetDetail}
                  />
                ))}
              </>
            )}
            <AlwaysScrollToBottom />
          </>
        )}

        {listEvaluation.length === 0 && (
          <div className="flex items-center p-4 bg-white border rounded-md">
            <span>Hiện chưa có bình luận nào</span>
          </div>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationsReducer.pending, listEvaluation, sortDepartment]);

  return (
    <>
      <div className="px-8 py-4 grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <ProfileTeam team={teamReducer} onGetDetail={handleGetDetailCTV} />
        </div>

        <div className="px-8 col-span-9">
          <div className="flex items-center justify-between">
            <FormItem>
              <Tabs
                tabs={EVALUATE_INTERVAL_TABS}
                onChange={handleTabChange}
                activeKey={tab}
              />
            </FormItem>

            <Toggle
              title="Lọc theo ban"
              onChange={setSortDepartment}
              checked={sortDepartment}
            />
          </div>

          <div
            id="scrollableDiv"
            className="overflow-auto"
            style={{
              height: sidebarHeight,
            }}
          >
            {renderEvaluations}
          </div>

          <div className="w-full mb-4">
            <EvaluateEditor
              placeholder="Nhận xét ..."
              defaultValue={evaluation}
              round={tab}
              teamId={teamId}
              userId={userReducer?._id}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>

      <DrawerCTV
        visible={visible}
        onClose={handleCloseDrawerCTV}
        defaultValues={candidateSelected}
        disableCreate
        onCreate={null}
        onAfterVisibleChange={handleAfterVisible}
      />
    </>
  );
};

export default TeamEvaluationContainer;
