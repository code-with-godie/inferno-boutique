"use client";
import { useState } from "react";
import { z } from "zod";
import Image from "next/image";

// Define the schema using Zod
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      // Set errors if validation fails
      setErrors(result.error.flatten().fieldErrors);
    } else {
      // Handle form submission (e.g., send data to server)
      console.log("Form submitted:", formData);
      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='p-2 rounded-lg flex flex-col md:flex-row items-center md:max-w-4xl w-full'>
        <div className='hidden md:block md:w-1/2 mt-2 md:mt-0 relative'>
          <Image
            src={"/advert-2.jpg"} // Replace with your network image URL
            alt='Contact Us'
            width={350}
            height={200}
            className='rounded-lg shadow-md'
          />
        </div>
        <div className=' flex-1 md:pr-2 bg-white p-2 '>
          <form onSubmit={handleSubmit} className=' flex-1'>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name[0]}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email[0]}</p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2' htmlFor='message'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows='4'
              ></textarea>
              {errors.message && (
                <p className='text-red-500 text-sm'>{errors.message[0]}</p>
              )}
            </div>
            <div className='text-center md:text-left'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
