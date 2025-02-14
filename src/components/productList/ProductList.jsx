import { getCategoryProducts } from "@/lib/lib";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Discount from "../discount/Discount";

// const PRODUCT_PER_PAGE = 8;

const ProductList = async ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);
  const category = params.get("category");
  const brand = params.get("brand");
  const gender = params.get("gender");
  const min = params.get("min");
  const max = params.get("max");
  const sort = params.get("sort");
  let filters = null;
  if (category) {
    filters = { category };
  }
  if (brand) {
    filters = { ...filters, brand };
  }
  if (gender) {
    filters = { ...filters, gender };
  }
  if (min) {
    filters = { ...filters, min };
  }
  if (max) {
    filters = { ...filters, max };
  }
  if (sort) {
    filters = { ...filters, sort };
  }
  const products = await getCategoryProducts({
    filters,
  });

  if (!products)
    return (
      <div className=' w-full h-full bg-white flex justify-center items-center gap-4 flex-col'>
        <Image
          src={"/nopost.png"}
          alt='no posts'
          width={400}
          height={300}
          className=' object-contain'
        />
        <h1>There is no posts</h1>
      </div>
    );
  if (filters && products?.length === 0) {
    return (
      <div className=' w-full h-full bg-white flex justify-center items-center gap-4 flex-col'>
        <Image
          src={"/nopost.png"}
          alt='no posts'
          width={400}
          height={300}
          className=' object-contain'
        />
        <h1>There is no products with the provided filters</h1>
      </div>
    );
  }
  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap '>
      {products.map((product) => (
        <Link
          href={`/category/${product._id}`}
          className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[25%] p-2 my-shadow'
          key={product._id}
        >
          <div className='relative w-full h-80'>
            <Image
              src={product?.images[0]?.secure_url || "/product.png"}
              alt=''
              fill
              sizes='25vw'
              className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
            />

            <Image
              src={product?.images[1]?.secure_url || "/product.png"}
              alt=''
              fill
              sizes='25vw'
              className='absolute object-cover rounded-md'
            />
            {product?.discount > 0 && (
              <Discount price={product?.price} discount={product?.discount} />
            )}
          </div>
          <div className='flex flex-col justify-between'>
            <span className='font-medium line-clamp-2'>{product.title}</span>
            <div className='flex items-center gap-2'>
              {product?.discount ? (
                <>
                  <h3 className='text-lg text-gray-500 line-through'>
                    ${product.price}
                  </h3>
                  <h2 className='font-medium text-lg'>
                    ${product?.price - product?.discount}
                  </h2>
                </>
              ) : (
                <>
                  <h2 className='font-medium text-lg'>${product?.price}</h2>
                </>
              )}
            </div>
          </div>
          <div className='flex justify-between'>
            <Rating readOnly value={product?.rating} />
          </div>
          <div className='flex justify-between'>
            {/* <span className='font-semibold'>{product?.description}</span> */}
          </div>
          {/* {product.additionalInfoSections && (
            <div
              className='text-sm text-gray-500'
              // dangerouslySetInnerHTML={{
              //   __html: DOMPurify.sanitize(
              //     product.additionalInfoSections.find(
              //       (section) => section.title === 'shortDesc'
              //     )?.description || ''
              //   ),
              // }}
            ></div>
          )} */}
          <button className='rounded-2xl ring-1 ring-golden w-max py-2 px-4 text-xs hover:bg-golden hover:text-white'>
            Add to Cart
          </button>
        </Link>
      ))}
      {/* {searchParams?.catgory ? (
         <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}/>
      ) :
      null} */}
    </div>
  );
};

export default ProductList;

// const productQuery = {};
// if (searchParams?.sort) {
//   const [sortType, sortBy] = searchParams.sort.split(' ');

//   if (sortType === 'asc') {
//     // productQuery.ascending(sortBy);
//   }
//   if (sortType === 'desc') {
//     // productQuery.descending(sortBy);
//   }
// }
