import FeaturedCategory from "./FeaturedCategory";
import { getFeaturedProducts } from "@/lib/lib";

const Featured = async () => {
  const products = await getFeaturedProducts();
  return (
    <div className=' grid2 w-ful '>
      {products?.map((item) => (
        <FeaturedCategory {...item} key={item.category} />
      ))}
    </div>
  );
};

export default Featured;
