import Spinner from '@/app/components/common/Spinner';
import React from 'react';

const Loading = () => {
  return (
    <div className="max-w-[1400px] mx-auto pt-16">
      <div className="flex justify-center">
        <Spinner fill="fill-lime-500" wAndH="w-10 h-10" />
      </div>
    </div>
  );
};

export default Loading;
