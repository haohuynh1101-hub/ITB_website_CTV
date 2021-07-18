/* eslint-disable @typescript-eslint/ban-types */
import { Avatar, Button, ChevronRightIcon, Collapse } from '@components';
import classNames from 'classnames';
import { useState } from 'react';

import { EvaluateEditor } from '../../evaluate-personal/form';

type judgeType = {
  description: string;
};
type IProps = {
  owner: string;
  judge: judgeType[];
  isEditor?: boolean;
};
export const EvaluatePersonalItem: React.FC<IProps> = ({
  owner,
  judge,
  isEditor,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [evaluate, setEvaluate] = useState<Object[]>([]);

  const handleToggleCollapse = () => {
    setIsOpened((value) => !value);
  };

  const onChangeEditor = (description: string, icon: string, idx: number) => {
    setEvaluate((prev) =>
      prev.map((p, i) => {
        if (i === idx) {
          return { ...p, description, icon };
        } else return p;
      })
    );
  };
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <div
          className={classNames({
            'flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full cursor-pointer':
              true,
            'ease-in-out transition-all duration-500': true,
            'transform rotate-90': isOpened,
          })}
          onClick={handleToggleCollapse}
          aria-hidden="true"
        >
          <ChevronRightIcon />
        </div>
        <Avatar fullName={owner} />
        <span>{owner}</span>
      </div>

      <Collapse isOpened={isOpened}>
        <>
          {judge.map((description, index) => (
            <EvaluateEditor
              key={index}
              icon=""
              onChangeEditor={onChangeEditor}
              index={0}
              description={description.description}
              isEditor={isEditor}
            />
          ))}
        </>
      </Collapse>
    </div>
  );
};
