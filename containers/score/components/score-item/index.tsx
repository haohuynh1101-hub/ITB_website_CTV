import classNames from 'classnames';
import _ from 'lodash';
import { KeyboardEvent, useRef, useState } from 'react';
type IProps = {
  className?: string;
  scoreId: string;
  width: number;
};

const STATUS_MAPS = {
  isEdit: 'bg-white',
  isEmptyValue: 'bg-white border',
  isCompleted: 'bg-green-200 text-green-600',
};
export const ScoreItem: React.FC<IProps> = ({ className, scoreId, width }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevInputValueRef = useRef<number>(0);

  const isEmptyInputValue = _.isNull(inputValue); // inputValue === null

  const handleToggleEdit = () => {
    setIsEdit((v) => !v);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 100);
  };

  const getStatus = () => {
    if (isEdit) {
      return 'isEdit';
    }
    if (isEmptyInputValue) {
      return 'isEmptyValue';
    }
    return 'isCompleted';
  };

  const handleBlur = () => {
    // handleSave();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      //   handleSave();
    }
  };
  return (
    <div
      itemID={scoreId}
      style={{ width }}
      className={classNames(
        'score-item flex items-center justify-center h-8 font-medium rounded-md',
        'hover:border-primary-300',
        'transition-colors duration-300',
        STATUS_MAPS[getStatus()],
        className
      )}
      aria-hidden="true"
      onClick={(e) => e.stopPropagation()}
    >
      {isEdit ? (
        <input
          ref={inputRef}
          type="number"
          defaultValue={inputValue}
          className="w-full h-8 font-medium text-center bg-transparent outline-none rounded-md focus:ring-2 ring-primary-300 hide-arrows"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className="flex items-center justify-center w-full h-full cursor-pointer"
          onClick={handleToggleEdit}
          aria-hidden="true"
        >
          {/* {!isEmptyInputValue
            ? numberFormat(_.toNumber(inputValue), { isCompact: true })
            : null} */}
        </span>
      )}
    </div>
  );
};
