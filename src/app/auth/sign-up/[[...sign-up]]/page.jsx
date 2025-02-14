'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { IconButton, LinearProgress, TextField } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Toast from '@/components/models/Toast';
import { useState } from 'react';
import Image from 'next/image';
import { SignUp as ClearkSignUp } from '@clerk/nextjs';
const SignUp = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastError, setToastError] = useState(null);
  const handleToast = () => {
    setShowToast(false);
  };
  const router = useRouter();
  const schema = z.object({
    username: z
      .string({ message: 'username is required' })
      .min(2, 'usename must be greater than 2characters '),
    email: z.string().email('email is required'),
    phone: z.number().min(10, {
      message: 'phone cannot be less than number is  10 characters',
    }),
    // .max(13, 'phone number cannot be more than 13 characters'),
    password: z.string().min(8, 'password must be greater than 7 character'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async user => {
    try {
      console.log('signing up', user);
    } catch (error) {
      //show toast
      if (error instanceof Error) {
        if (
          error?.message?.includes('same id, email, or phone already exists')
        ) {
          setToastError('email is  alright used. use another email');
        } else {
          setToastError(error?.message);
        }
      }

      setShowToast(true);
      console.log(error);
    }
  };
  return (
    <div className=' h-screen flex gap-2'>
      <div className=' relative flex-1 bg-white  hidden md:block p-2'>
        <Image
          src={'/shoe.png'}
          alt='banner'
          fill
          className=' object-contain'
        />
      </div>
      <ClearkSignUp />
      {/* <div className=' flex-1 flex justify-center items-center flex-col'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' w-full max-w-[400px] flex flex-col gap-6 p-2 '
        >
          <IconButton
            onClick={() => router.push('/')}
            className=' absolute z-10 top-4 left-4 bg-gray-200 md:hidden'
          >
            <KeyboardArrowLeft className=' text-black text-2xl' />
          </IconButton>
          <div>
            <div
              className={`text-blue-950 ${isSubmitting ? 'visible' : 'hidden'}`}
            >
              <LinearProgress color='inherit' />
            </div>
           
          </div>
          <div className=' flex gap-1 flex-col'>
            <TextField
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.username ? 'tomato' : '#4b5563', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.username ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.username ? 'tomato' : '#4b5563', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.username ? 'tomato' : '#4b5563', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563', // Input text color
                },
              }}
              className=' flex-1'
              label='username*'
              variant='outlined'
              {...register('username')}
            />
          </div>
          <div className=' flex gap-1 flex-col'>
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.email ? 'tomato' : '#4b5563', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563', // Input text color
                },
              }}
              className=' flex-1'
              label='Email address*'
              variant='outlined'
              {...register('email')}
            />
          </div>
          <div className=' flex gap-1 flex-col text-white'>
            <TextField
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.phone ? 'tomato' : '#4b5563', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.phone ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.phone ? 'tomato' : '#4b5563', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.phone ? 'tomato' : '#4b5563', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563', // Input text color
                },
              }}
              className=' flex-1 text-white border-white outline-none placeholder:text-white'
              label='phone number*'
              type='number'
              variant='outlined'
              {...register('phone', { setValueAs: Number })}
            />
          </div>
          <div className=' flex gap-1 flex-col text-white'>
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.password ? 'tomato' : '#4b5563', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563', // Input text color
                },
              }}
              className=' flex-1 text-white border-white outline-none placeholder:text-white'
              label='password*'
              type='password'
              variant='outlined'
              {...register('password')}
            />
          </div>
          <div className=' flex items-center text-white'>
            <button
              disabled={isSubmitting}
              className=' p-2 capitalize text-center cursor-pointer bg-black rounded-lg flex-1 disabled:bg-gray-500 disabled:cursor-not-allowed'
            >
              sign up
            </button>
          </div>
        </form>
        <div>
          <Link
            href='/auth/sign-in'
            className=' text-sm text-gray-600'
          >
            Already have an account?{' '}
            <span className=' text-blue-900'>sing-in</span>
          </Link>
        </div>
        <div>
          <p className=' text-gray-400 text-xs'>
            &copy;{' '}
            {`All rights reserved.inferno 2023 -${new Date().getFullYear()}`}{' '}
          </p>
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastError}
          handleToast={handleToast}
        />
      )} */}
    </div>
  );
};

export default SignUp;
