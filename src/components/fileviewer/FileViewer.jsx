"use client";
import Image from "next/image";
import { useState } from "react";
import Discount from "../discount/Discount";
import Model from "@/components/models/Model";
const FileViewer = ({ items, price, discount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='p-2 flex flex-col gap-2'>
      <div className='w-full h-72 relative'>
        <Image
          alt='product image'
          src={items[currentIndex]?.secure_url || "/product.png"}
          fill
          className='object-cover rounded-md cursor-pointer'
          onClick={openModal}
        />
        {discount > 0 && <Discount price={price} discount={discount} />}
      </div>
      <div className='flex gap-1 flex-wrap justify-between items-center'>
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

      {isModalOpen && (
        <Model onClose={() => setIsModalOpen(false)}>
          <div className='relative max-w-full max-h-full bg-white  rounded-md'>
            <Image
              alt='product image'
              src={items[currentIndex]?.secure_url || "/product.png"}
              layout='intrinsic'
              width={600}
              height={500}
              className='object-contain rounded-md mb-4'
            />
            <div className='flex gap-2 overflow-x-auto'>
              {items.map((item, i) => (
                <div
                  key={item._id}
                  className='w-20 h-20 relative cursor-pointer'
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
        </Model>
      )}
    </div>
  );
};

export default FileViewer;
