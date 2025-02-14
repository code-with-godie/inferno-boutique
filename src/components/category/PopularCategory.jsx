import Product from '@/components/category/Popular';
import { getPopularProduct } from '@/lib/lib';

const PopularCategory = async () => {
  const products = await getPopularProduct();

  if (!products) {
    return <notFound />;
  }

  return (
    <div className=' flex  items-center flex-col gap-4 md:p-2'>
      <h1 className=' text-2xl font-bold'>Popular Products</h1>
      <div className=' w-full product-grid'>
        {/* <div className=' mygrid w-full max-w-[1100px] '> */}
        {products.map(item => (
          <Product
            {...item}
            key={item._id}
          />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default PopularCategory;
