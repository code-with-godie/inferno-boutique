"use client";
import Image from "next/image";
import { useState } from "react";
import Discount from "../discount/Discount";

const FileViewer = ({ items, price, discount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(items);

  return (
    <div className=' p-2 flex flex-col gap-2'>
      <div className=' w-full h-72 relative'>
        <Image
          alt='product image'
          src={items[currentIndex]?.secure_url || "/product.png"}
          fill
          className=' object-cover rounded-md'
        />
        {discount > 0 && <Discount price={price} discount={discount} />}
      </div>
      <div className='flex gap-1 flex-wrap  justify-between  items-center'>
        {items.map((item, i) => (
          <div
            className='w-20 h-20 relative cursor-pointer'
            key={item._id}
            onClick={() => setCurrentIndex(i)}
          >
            <Image
              src={items[i]?.secure_url || "/product.png"}
              alt='other product image'
              fill
              className='object-cover rounded-md'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileViewer;
