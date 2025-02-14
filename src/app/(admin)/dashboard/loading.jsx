import Image from 'next/image';
import React from 'react';

const loading = () => {
  return (
    <section className=' h-[90vh] grid place-content-center bg-[#000011]'>
      <Image
        src={'/admin.gif'}
        alt='loader'
        width={500}
        height={500}
        className=' object-contain'
      />
    </section>
  );
};

export default loading;
