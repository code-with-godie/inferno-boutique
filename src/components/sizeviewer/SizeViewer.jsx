import React from 'react';

const SizeViewer = ({ size }) => {
  const colors = [];
  const newSizes = size.map(item => item?.size);
  size?.forEach(item => {
    const { colors: tempColors } = item;
    tempColors.forEach(color => {
      if (!colors.includes(color)) {
        colors.push(color);
      }
    });
  });

  return (
    <div className=' flex flex-col gap-2'>
      {/* <div className=' flex gap-2 flex-wrap p-2'>
        {newSizes.map((item, index) => (
          <p key={index}> {item} </p>
        ))}
      </div>
      <div className=' flex gap-2 flex-wrap p-2'>
        {colors.map((item, index) => (
          <p
            key={index}
            className={` w-2 h-2 rounded-full bg-[${item}]`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SizeViewer;
