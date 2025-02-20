import Add from "@/components/add/Add";
import FileViewer from "@/components/fileviewer/FileViewer";
import SizeViewer from "@/components/sizeviewer/SizeViewer";
import { getProduct, getProducts, NumberFormatter } from "@/lib/lib";
import { Rating } from "@mui/material";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params: { id } }) => {
  const product = await getProduct(id);
  if (!product?.title) {
    return {
      title: "404 product not found!",
    };
  }
  return {
    title: product?.title,
    description: product?.description,
  };
};
export const generateStaticParams = async () => {
  let res = await getProducts(null, "all");
  if (!res) return [];
  return res?.products?.map((item) => ({
    id: item._id,
  }));
};
const SinglePage = async ({ params: { id } }) => {
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
      {/* IMG */}

      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max flex flex-col gap-2 p-2'>
        <FileViewer
          price={product?.price}
          discount={product?.discount}
          items={product.images}
        />
      </div>
      {/* TEXTS */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-xl py-2 font-medium font-serif'>{product.title}</h1>
        <div className='h-[2px] bg-gray-300' />
        <div className='flex items-center gap-4'>
          {product?.discount ? (
            <>
              <h4 className='font-medium  text-gray-500'>Price </h4>:
              <h3 className='text-xl text-gray-500 line-through'>
                ${NumberFormatter(product.price)}
              </h3>
              <h2 className='font-medium text-2xl'>
                ${NumberFormatter(product?.price - product?.discount)}
              </h2>
            </>
          ) : (
            <>
              <h2 className='font-medium text-2xl'>Price: ${product?.price}</h2>
            </>
          )}
        </div>

        <div className='text-sm flex items-center gap-2'>
          <h4 className='font-medium  text-gray-500'>brand</h4>:
          <p className=' text-gray-500'>{product.brand}</p>
        </div>
        {product?.climates?.length > 0 && (
          <div className='text-sm flex items-center gap-2'>
            <h4 className='font-medium  text-gray-500'>climate</h4>:
            {product?.climates?.map((item, index) => (
              <p key={index} className=' text-gray-500'>
                {item}
              </p>
            ))}
          </div>
        )}
        <div>
          <Rating readOnly value={product?.rating} />
        </div>
        <div className='h-[2px] bg-gray-300' />
        <Add
          images={product?.images}
          _id={product?._id}
          price={product?.price}
          sizes={product?.sizes}
          colors={product?.colors}
          stock={product?.stock}
          discount={product?.discount}
          description={product?.description}
          title={product?.title}
        />
        <div className='h-[2px] bg-gray-300' />
        <p className='text-black text-xl font-semibold '>Description</p>
        <p className='text-black'>{product.description}</p>
        {/* REVIEWS */}
      </div>
    </div>
  );
};

export default SinglePage;
