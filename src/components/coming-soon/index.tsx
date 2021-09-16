import React from 'react';

import { getCSSVar } from '@/utils/cssVar';

type IProps = {
    imageSrc: string;
    height?: string | number;
};

const ComingSoon: React.FC<IProps> = ({ imageSrc, height }) => {
    return (
        <div
            className="flex items-center justify-center -my-8"
            style={{
                height:
                    height || `calc(100vh - 2 * ${getCSSVar('header-height', '56px')})`,
            }}
        >
            <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Coming Soon" className="h-64 mb-10" />
                <div className="flex flex-col items-center">
                    <span className="mb-1 text-xl font-medium">Coming Soon!</span>
                    <span className="text-base text-gray-400">
                        We will notify you when it has been updated.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
