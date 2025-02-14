'use client';
import React, { useEffect } from 'react';

const Toast = ({ message, handleToast }) => {
  useEffect(() => {
    setTimeout(handleToast, 3000);
  }, [handleToast]);
  return (
    <div className=' absolute top-20  w-full  grid place-content-center z-20'>
      <p className=' p-2 px-4 text-white bg-red-500 rounded-lg'> {message} </p>
    </div>
  );
};

export default Toast;
