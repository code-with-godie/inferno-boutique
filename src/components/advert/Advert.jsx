import Image from "next/image";
import React from "react";

const Advert = ({ url, bg, title }) => {
  return (
    <div
      style={{ background: bg }}
      className={`w-full h-full relative flex justify-center items-center`}
    >
      {title && (
        <div className=' absolute z-50  bg-black/20 w-full h-full flex  justify-center items-center'>
          <h1 className='  font-bold text-4xl font-serif text-center p-2 italic  text-white'>
            {title}
          </h1>
        </div>
      )}
      <Image
        src={url || "/woman.png"}
        alt='advertisement'
        fill
        className='object-cover'
      />
    </div>
  );
};

export default Advert;
