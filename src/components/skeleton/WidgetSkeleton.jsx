import { Skeleton } from '@mui/material';
import React from 'react';

const WidgetSkeleton = () => {
  return (
    <div className='flex-wrap md:flex-nowrap flex gap-2 p-2 h-[200px]'>
      <Skeleton
        variant='rectangular'
        className=' h-full flex-1'
      />
      <Skeleton
        variant='rectangular'
        className=' h-full flex-1'
      />
      <Skeleton
        variant='rectangular'
        className=' h-full flex-1'
      />
    </div>
  );
};

export default WidgetSkeleton;
