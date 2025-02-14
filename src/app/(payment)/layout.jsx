import Footer from '@/components/footer/Footer';
// import Header from '@/components/header/Header';

const PaymentLayout = ({ children }) => {
  return (
    <section className=' w-screen flex justify-center bg-black'>
      <div className='w-full max-w-[1500px]  bg-white'>
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
    </section>
  );
};

export default PaymentLayout;
