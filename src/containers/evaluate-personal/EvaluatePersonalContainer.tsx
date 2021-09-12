import { Evaluate, EvaluateEditor, IFormValue } from 'components/evaluation';
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FormItem, Tabs } from '@/components/elements';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  createEvaluationAsync,
  deleteEvaluationAsync,
  getCandidateDetailAsync,
  getEvaluationCandidateAsync,
  getMeAsync,
  updateEvaluationAsync,
} from '@/redux/reducers';
import { RequestEvaluationBody } from '@/services/api';

import { Profile } from './components/profile';
import { Skeleton } from './components/skeleton';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (!elementRef || !elementRef.current) return;
    elementRef.current.scrollIntoView();
  }, []);
  return <div ref={elementRef} />;
};
const EvaluatePersonalContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const candidateId = router.query?.id as string;

  const candidateReducer = useAppSelector((state) => state.users.candidate);
  const userReducer = useAppSelector((state) => state.auth.user);
  const evaluationsReducer = useAppSelector((state) => state.evaluations);
  const listEvaluation = evaluationsReducer.evaluations || [];

  const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');
  const [evaluation, setEvaluation] = useState<IFormValue>(null);
  // const [initEvaluations, setInitEvaluations] = useState<IEvaluation[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (candidateId) {
      Promise.all([
        dispatch(getCandidateDetailAsync(candidateId)),
        dispatch(
          getEvaluationCandidateAsync({ candidateId: candidateId, round: tab })
        ),
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId, tab]);

  useEffect(() => {
    if (!userReducer) {
      dispatch(getMeAsync());
    }
  }, [dispatch, userReducer]);
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

  // const handleMoreData = async () => {
  //   const lastItemId = initEvaluations.length - 1;
  //   const lastId = initEvaluations[lastItemId]._id;
  //   setTimeout(async () => {
  //     const result: IEvaluation[] = await EvaluationApi.getEvaluationCandidate({
  //       candidateId: candidateId,
  //       round: tab,
  //       lastId: lastId,
  //     });
  //     if (result.length === 0) {
  //       setHasMore(false);
  //       setInitEvaluations((old) => [...old, ...[]]);

  //       return;
  //     }
  //     setInitEvaluations((old) => [...old, ...result]);
  //   }, 1500);
  // };

  const renderEvaluations = useMemo(() => {
    if (evaluationsReducer.pending) {
      return <Skeleton />;
    }
    return (
      <>
        {listEvaluation.length > 0 && (
          // <InfiniteScroll
          //   dataLength={listEvaluation.length}
          //   next={null}
          //   hasMore={hasMore}
          //   scrollableTarget="scrollableDiv"
          //   loader={<div className="loader">Loading ...</div>}
          // >
          <>
            <AlwaysScrollToBottom />

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

        {listEvaluation.length === 0 && (
          <div className="flex items-center p-4 bg-white border rounded-md">
            <span>Hiện chưa có bình luận nào</span>
          </div>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationsReducer.pending, listEvaluation]);

  return (
    <div>
      <div className="px-8 py-4 grid grid-cols-12 gap-4">
        <Profile user={candidateReducer} />

        <div className="col-span-8">
          <FormItem>
            <Tabs
              tabs={EVALUATE_INTERVAL_TABS}
              onChange={handleTabChange}
              activeKey={tab}
            />
          </FormItem>

          <div className="overflow-auto" style={{ height: '100vh - 330px' }}>
            {renderEvaluations}
          </div>

          <div className="sticky w-full mb-4 top-header">
            <EvaluateEditor
              placeholder="Nhận xét ..."
              defaultValue={evaluation}
              round={tab}
              candidateId={candidateId}
              userId={userReducer?._id}
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
