/* eslint-disable prettier/prettier */
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Evaluate, EvaluateEditor, IFormValue } from '@/components';
import { Avatar, FormItem, Tabs } from '@/components/elements';
import { EyeIcon } from '@/components/icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteEvaluationAsync, getEvaluationCandidateAsync, getMeAsync, getTeamDetailAsync } from '@/redux/reducers';

import { ProfileTeam } from './components/profile-team';

const TeamEvaluationContainer = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const teamId = router.query?.id as string;

    const teamReducer = useAppSelector((state) => state.teams.team)
    const userReducer = useAppSelector((state) => state.auth.user);
    const evaluationsReducer = useAppSelector((state) => state.evaluations);
    const listEvaluation = evaluationsReducer.evaluations || [];

    const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');
    const [evaluation, setEvaluation] = useState<IFormValue>(null);

    useEffect(() => {
        if (teamId) {
            Promise.all([
                dispatch(getTeamDetailAsync(teamId)),
                dispatch(
                    getEvaluationCandidateAsync({ teamId: teamId, round: tab })
                ),
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamId, tab]);

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


    const handleDelete = async (evaluationId: string) => {
        const result = await dispatch(deleteEvaluationAsync({ evaluationId }));
        if (result.meta.requestStatus === 'rejected') {
            return false;
        }

        return true;
    };

    return (
        <div className="py-4 grid grid-cols-12 gap-4">
            <div className="col-span-4">

                <ProfileTeam team={teamReducer} />
            </div>

            <div className="col-span-8">
                <FormItem>
                    <Tabs
                        tabs={EVALUATE_INTERVAL_TABS}
                        onChange={handleTabChange}
                        activeKey={tab}
                    />
                </FormItem>

                {listEvaluation.length > 0 ? (
                    listEvaluation.map((evaluation, index) => (
                        <FormItem key={index}>
                            <Evaluate
                                evaluation={evaluation}
                                onGetDetail={handleGetDetail}
                                onDelete={handleDelete}
                            />
                        </FormItem>
                    ))
                ) : (
                    <div className="flex items-center p-4 bg-white border rounded-md">
                        <span>Hiện chưa có bình luận nào</span>
                    </div>
                )}

                <div className="w-full mb-4">
                    <EvaluateEditor
                        placeholder="Nhận xét ..."
                        defaultValue={evaluation}
                        round={tab}
                        teamId={teamId}
                        userId={null}
                        onCreate={null}
                        onUpdate={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamEvaluationContainer