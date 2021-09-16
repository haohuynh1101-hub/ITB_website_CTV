/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { CameraIcon } from '@heroicons/react/outline';
import React from 'react';

import { getColorFromText } from '@/components/elements/avatar/utils';
import { Spin } from '@/components/elements/spin';

type IProps = {
  src: string;
  char: string;
  loading: boolean;
};
export const ButtonUpload: React.FC<IProps> = ({ src, char, loading }) => {
  return (
    <div className="relative w-32 h-32 overflow-hidden rounded-md">
      {src ? (
        <img
          alt="user-avatar"
          src={src || '/images/default-avatar.png'}
          className="object-cover w-32 h-32 cursor-pointer"
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ backgroundColor: getColorFromText(char) }}
        >
          <span className="text-4xl text-white">{char}</span>
        </div>
      )}

      {loading ? (
        <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full ">
          <Spin />
        </div>
      ) : (
        <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full bg-black opacity-0 cursor-pointer hover:opacity-100 bg-opacity-20 transition-opacity duration-300">
          <CameraIcon width={40} height={40} color="#ffffff" />
        </div>
      )}
    </div>
  );
};
