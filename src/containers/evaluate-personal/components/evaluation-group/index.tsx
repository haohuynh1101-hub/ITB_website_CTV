/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { Evaluate } from 'components/evaluation';
import { useState } from 'react';

import { ChevronRightIcon } from '@/components';
import { Collapse, FormItem } from '@/components/elements';
import { IEvaluationGroup } from '@/redux/reducers/evaluation/types';

type IProps = {
  userId?: string
  evaluationsGroup: IEvaluationGroup;
  onGetDetail: (evaluationId: string) => void;
  onDelete: (evaluationId: string) => void;
};
export const EvaluationGroup: React.FC<IProps> = ({
  evaluationsGroup,
  userId,
  onDelete,
  onGetDetail,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen((v) => !v);
  };

  return (
    <>
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2"
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyPress={null}
        >
          <div className="flex items-center justify-center">
            <div
              className={classNames({
                'flex items-center justify-center rounded-full cursor-pointer w-4 h-4':
                  true,
                'ease-in-out transition-all duration-500': true,
                'transform rotate-90': isOpen,
              })}
            >
              <ChevronRightIcon />
            </div>
          </div>
          <span className="font-medium">{evaluationsGroup.teamLabel}</span>
        </div>

        <Collapse isOpened={isOpen}>
          <>
            {evaluationsGroup.evaluations.map((e, index) => (
              <FormItem key={index}>
                <Evaluate
                  userId={userId}
                  evaluation={e}
                  onGetDetail={onGetDetail}
                  onDelete={onDelete}
                />
              </FormItem>
            ))}
          </>
        </Collapse>
      </div>
    </>
  );
};
