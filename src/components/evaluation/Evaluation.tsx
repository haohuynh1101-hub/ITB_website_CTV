/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import {
    Avatar,
    ChevronRightIcon,
    Collapse,
    DeleteIcon,
    EditIcon,
} from 'components';
import { useState } from 'react';


type judgeType = {
    description: string;
};
type IProps = {
    owner?: string;
    judge?: judgeType[];
    isEditor?: boolean;
    icon?: string;
};
export const Evaluate: React.FC<IProps> = ({
    owner,
    judge,
    icon,
    isEditor,
}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [evaluate, setEvaluate] = useState<Object[]>([]);
    const [emoji, setEmoji] = useState(icon || '');

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
                <Avatar fullName="Nhat Hao" />
                <span>{owner}</span>
            </div>

            <Collapse isOpened={isOpened}>
                <div className="items-center bg-white border divide-y rounded-md">
                    <div className="flex items-center w-full px-4  py-2   ">
                        <div className="flex items-center justify-center pr-1 text-center rounded-full w-7 h-7 hover:bg-primary-50">
                            <span>{emoji || '😍'}</span>
                        </div>

                        <div className="flex-1">
                            <span>Danh gia ne</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button>
                                <EditIcon />
                            </button>
                            <button>
                                <DeleteIcon size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center w-full px-4  py-2   ">
                        <div className="flex items-center justify-center pr-1 text-center rounded-full w-7 h-7 hover:bg-primary-50">
                            <span>{emoji || '😍'}</span>
                        </div>

                        <div className="flex-1">
                            <span>Danh gia ne</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button>
                                <EditIcon />
                            </button>
                            <button>
                                <DeleteIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};
