import { Skeleton } from '@mui/material';
import React from 'react';

const PopularSkeleton = () => {
  return (
    <div className=' flex  items-center flex-col md:p-2'>
      <div className=' mygrid w-full max-w-[1100px] h-72 '>
        <Skeleton
          variant='rectangular'
          className=' h-full'
        />
        <Skeleton
          variant='rectangular'
          className=' h-full'
        />
        <Skeleton
          variant='rectangular'
          className=' h-full'
        />
      </div>
    </div>
  );
};

export default PopularSkeleton;
