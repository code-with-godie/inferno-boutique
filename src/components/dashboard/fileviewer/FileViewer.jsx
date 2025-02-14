"use client";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";

const FileViewer = ({ items, removeImage }) => {
  return (
    <div className=' p-2'>
      <div className='flex gap-1 flex-wrap  justify-between  items-center'>
        {items?.length === 0 ? (
          <>
            <div className='w-20 h-20 relative'>
              <Image
                src={"/product.png"}
                alt='other product image'
                fill
                className='object-cover rounded-md'
              />
            </div>
            <div className='w-20 h-20 relative'>
              <Image
                src={"/product.png"}
                alt='other product image'
                fill
                className='object-cover rounded-md'
              />
            </div>
          </>
        ) : (
          items.map((item, i) => (
            <div className='w-20 h-20 relative' key={item?.public_id}>
              <Image
                src={items[i]?.secure_url || "/product.png"}
                alt='other product image'
                fill
                className='object-cover rounded-md'
              />

              <IconButton
                onClick={() => removeImage(item?.public_id)}
                className=' absolute z-10 right-0 top-0 bg-white'
              >
                <Close className=' text-sm' />
              </IconButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileViewer;
