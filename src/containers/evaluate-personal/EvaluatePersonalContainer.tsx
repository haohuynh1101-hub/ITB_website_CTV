import { Evaluate, EvaluateEditor, IFormValue } from 'components/evaluation';
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { toArray } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import slugify from 'slugify';

import {
  AlwaysScrollToBottom,
  FormItem,
  Tabs,
  Toggle,
} from '@/components/elements';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  createEvaluationAsync,
  deleteEvaluationAsync,
  getCandidateDetailAsync,
  getEvaluationCandidateAsync,
  getMeAsync,
  updateEvaluationAsync,
} from '@/redux/reducers';
import { IEvaluationGroup } from '@/redux/reducers/evaluation/types';
import { RequestEvaluationBody } from '@/services/api';
import { getCSSVar } from '@/utils/cssVar';

import { EvaluationGroup } from '.';
import { Profile } from './components/profile';
import { Skeleton } from './components/skeleton';

const EvaluatePersonalContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const candidateId = router.query?.id as string;

  const candidateReducer = useAppSelector((state) => state.candidate);
  const userReducer = useAppSelector((state) => state.auth.user);
  const evaluationsReducer = useAppSelector((state) => state.evaluations);
  const listEvaluation = evaluationsReducer.evaluations || [];

  const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');
  const [evaluation, setEvaluation] = useState<IFormValue>(null);
  const [sortDepartment, setSortDepartment] = useState(false);

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
  // const [initEvaluations, setInitEvaluations] = useState<IEvaluation[]>([]);
  const headerHeight = getCSSVar('header-height', '56px');
  const sidebarHeight = `calc(100vh - ${headerHeight} - ${headerHeight} - ${headerHeight} - ${headerHeight} - ${headerHeight})`;

  useEffect(() => {
    if (candidateId) {
      Promise.all([
        dispatch(getCandidateDetailAsync(candidateId)),
        dispatch(
          getEvaluationCandidateAsync({ candidateId: candidateId, round: tab })
        ),
      ]);
    }
    setEvaluation(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId, tab, sortDepartment]);

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

  const handleDelete = async (evaluationId: string) => {
    const result = await dispatch(deleteEvaluationAsync({ evaluationId }));
    if (result.meta.requestStatus === 'rejected') {
      return false;
    }

    return true;
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
    <div>
      <div className="px-8 py-4  grid grid-cols-12 gap-4">
        <Profile user={candidateReducer.candidate} />

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

          <div className="sticky w-full mb-4 top-header">
            <EvaluateEditor
              placeholder="Nhận xét ..."
              defaultValue={evaluation}
              round={tab}
              candidateId={candidateId}
              userId={userReducer?._id}
              hasScore
              onCreate={handleCreate}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatePersonalContainer;
