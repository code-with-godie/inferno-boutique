import Image from "next/image";

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-start'>
        <div className='md:w-1/2 mb-6 md:mb-0 flex  justify-center sticky top-0'>
          <Image
            src={"/advert-2.jpg"} // Replace with your network image URL
            alt='Inferno E-commerce'
            width={400}
            height={300}
            className='rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-1/2 md:pl-8 text-center md:text-left'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to Inferno</h1>
          <p className='text-gray-700 mb-6'>
            Igniting Passion, Inspiring Style
          </p>
          <p className='text-gray-700 mb-6'>
            At Inferno, we believe that shopping should be more than just a
            transaction—it should be an experience. Our platform is designed to
            ignite your passion and inspire your style, offering a curated
            selection of products that reflect the latest trends and timeless
            classics.
          </p>
          <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
          <p className='text-gray-700 mb-6'>
            Our mission is to provide a seamless and enjoyable shopping
            experience for everyone. We strive to connect you with products that
            resonate with your unique personality and lifestyle, making every
            purchase a reflection of who you are.
          </p>
          <h2 className='text-2xl font-semibold mb-4'>Our Values</h2>
          <ul className='text-gray-700 mb-6 list-disc list-inside'>
            <li>Quality: High-quality products that meet your expectations.</li>
            <li>
              Innovation: Latest trends and technologies in fashion and
              lifestyle.
            </li>
            <li>Customer-Centric: Your satisfaction is our top priority.</li>
            <li>Sustainability: Mindful of our environmental impact.</li>
          </ul>
          <h2 className='text-2xl font-semibold mb-4'>Why Choose Inferno?</h2>
          <ul className='text-gray-700 mb-6 list-disc list-inside'>
            <li>Curated Collections: Handpicked items by experts.</li>
            <li>
              Easy Shopping: User-friendly platform with secure payment options.
            </li>
            <li>Fast Delivery: Reliable shipping options.</li>
            <li>Exceptional Service: Dedicated customer service team.</li>
          </ul>
          <h2 className='text-2xl font-semibold mb-4'>Our Story</h2>
          <p className='text-gray-700 mb-6'>
            Inferno was born out of a passion for fashion and a desire to create
            a shopping experience that truly inspires. Founded by a team of
            enthusiasts with diverse backgrounds in fashion, technology, and
            e-commerce, we set out to build a platform that celebrates
            individuality and creativity.
          </p>
          <h2 className='text-2xl font-semibold mb-4'>
            Join the Inferno Community
          </h2>
          <p className='text-gray-700 mb-6'>
            We invite you to join our community of style enthusiasts. Follow us
            on social media, share your experiences, and be a part of the
            Inferno journey. Together, let&apos;s ignite the world with style
            and passion.
          </p>
        </div>
      </div>
    </div>
  );
}
