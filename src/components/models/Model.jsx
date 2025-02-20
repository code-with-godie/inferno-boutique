import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 p-4 flex justify-center items-center z-[90000000000] bg-black bg-opacity-50'>
      <div
        className={`p-8 rounded-md shadow-md bg-white max-w-md w-full text-black`}
      >
        <button
          className='absolute top-4 right-4 text-xl cursor-pointer'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
