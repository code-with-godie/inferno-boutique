import { getProducts } from '@/lib/lib';
import Link from 'next/link';
import Products from '@/components/dashboard/products/Products';
const ProductsPage = async ({ searchParams }) => {
  const { q: query } = searchParams;
  const page = searchParams?.page || 1;
  const { count, products: rows } = await getProducts(query, page);
  if (rows?.length === 0 && !query) {
    return (
      <div
        className={`flex flex-col gap-4 items-center justify-center h-[90vh] `}
      >
        <p className=' text-gray-400 italic'>
          you have not added any product yet
        </p>
        <Link
          className=' bg-sky-600 p-4 rounded-lg'
          href='/dashboard/new/product'
        >
          click here to add a product
        </Link>
      </div>
    );
  }
  return <Products rows={rows} />;
};

export default ProductsPage;
