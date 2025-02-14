import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const AppLayout = ({ children }) => {
  return (
    <section className=' w-screen flex justify-center h-screen'>
      <div className='w-full max-w-[1500px] h-full flex flex-col '>
        <Header />
        <article className='bg flex-1 overflow-auto'>
          {children}
          <Footer />
        </article>
      </div>
    </section>
  );
};

export default AppLayout;
