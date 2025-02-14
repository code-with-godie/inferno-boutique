import Product from "@/components/category/Popular";
import { getNewArrivals } from "@/lib/lib";

const NewArrivals = async () => {
  const products = await getNewArrivals();

  if (!products) {
    return <div> could not load new arrivals</div>;
  }

  return (
    <div className=' flex  items-center flex-col md:p-2'>
      <h1 className=' text-2xl font-bold'>New Arrivals</h1>
      <div className=' product-grid w-full'>
        {/* <div className=' mygrid w-full max-w-[1100px]  '> */}
        {products.map((item) => (
          <Product {...item} key={item._id} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default NewArrivals;
