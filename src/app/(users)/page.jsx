import Advert from '@/components/advert/Advert';
import NewArrivals from '@/components/arrivals/NewArrivals';
import FirstBanner from '@/components/banner/FirstBanner';
import SecondBanner from '@/components/banner/SecondBanner';
import PopularCategory from '@/components/category/PopularCategory';
import Featured from '@/components/featured/Featured';
import Shoe from '@/components/shoes/Shoe';
import PopularSkeleton from '@/components/skeleton/PopularSkeleton';
import Slider from '@/components/slider/Slider';
import { Suspense } from 'react';

const Home = () => {
  return (
    <section>
      <Slider />
      <article className=' flex gap-2 relative'>
        <aside className='hidden md:flex flex-1 max-w-[200px] sticky top-0 h-[80vh]'>
          <Advert
            title={'Deals are getting better and better'}
            bg='#FCE7F3'
            url='/advert-1.jpg'
          />
        </aside>
        <aside className=' overflow-auto flex-1'>
          <NewArrivals />
          <SecondBanner />
          <Shoe />
          <FirstBanner />
          <Suspense fallback={<PopularSkeleton />}>
            <PopularCategory />
          </Suspense>

          <Suspense fallback={<PopularSkeleton />}>
            <Featured />
          </Suspense>
        </aside>
        <aside className='hidden md:flex flex-1 max-w-[200px] sticky top-0 h-[80vh] '>
          <Advert
            bg='#FCE7F3'
            url='/advert-2.jpg'
          />
        </aside>
      </article>
    </section>
  );
};

export default Home;
