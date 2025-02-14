import Image from 'next/image';
const LoadingAnimation = () => {
  return (
    <div className=' w-full grid place-content-center'>
      <Image
        width={25}
        height={25}
        alt='loading animation'
        src='/loading.gif'
      />
    </div>
  );
};

export default LoadingAnimation;
