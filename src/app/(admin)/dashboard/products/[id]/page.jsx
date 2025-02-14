import { getProduct, getProducts } from '@/lib/lib';
import { notFound } from 'next/navigation';
import ProductDetails from '../../new/product/ProductDetails';
export async function generateMetadata({ params: { id } }) {
  const product = await getProduct(id);
  if (!product?.title) {
    return {
      title: 'product does not exist',
      description: 'no product description',
    };
  }

  return {
    title: product?.title,
    description: product?.description,
  };
}
export async function generateStaticParams() {
  const res = await getProducts(null, 'all');
  if (!res) return [];
  return res?.products?.map(product => ({
    id: product?._id,
  }));
}
const SingleProduct = async ({ params: { id } }) => {
  const product = await getProduct(id);
  if (!product) return notFound();
  return <ProductDetails {...product} />;
};

export default SingleProduct;
