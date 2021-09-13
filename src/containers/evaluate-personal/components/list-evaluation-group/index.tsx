/* eslint-disable prettier/prettier */
import { Evaluate } from 'components/evaluation';

import { FormItem } from "@/components/elements"
import { IEvaluationGroup } from '@/redux/reducers/evaluation/types';

type IProps = {
    evaluationsGroup: IEvaluationGroup[];
    onGetDetail: (id: string) => void
    onDelete: () => void
};
export const ListEvaluationGroup: React.FC<IProps> = ({ evaluationsGroup, onDelete, onGetDetail }) => {
    return (
        <>
            {evaluationsGroup.map((evaluation, index) => {
                return (
                    <div key={index}>
                        <h2>{evaluation.teamLabel}</h2>

                        {evaluation.evaluations.map((e) => (
                            <FormItem key={index}>
                                <Evaluate
                                    evaluation={e}
                                    onGetDetail={onGetDetail}
                                    onDelete={onDelete}
                                />
                            </FormItem>
                        ))}
                    </div>
                )
            })}
        </>
    );
};
