// app/auth/sign-in/page.js
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { IconButton, LinearProgress, TextField } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { login } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { SignIn as ClerkSignIn } from '@clerk/nextjs';

const SignIn = () => {
  const router = useRouter();

  const schema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password must be greater than 7 characters'),
  });

  const handleToast = () => {
    setShowToast(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async user => {
    try {
      const results = await login(user);
      // if (results.error) {
      //   throw new Error(results.error);
      // }
      console.log('signing in results ', results);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='h-screen flex gap-2'>
      <div className='relative flex-1 bg-white hidden md:block p-2'>
        <Image
          src={'/shoe.png'}
          alt='banner'
          fill
          className='object-contain'
        />
      </div>
      <div className='flex-1 flex justify-center items-center flex-col'>
        <ClerkSignIn />
        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-[400px] flex flex-col gap-6 p-2'
        >
          <IconButton
            onClick={() => router.push('/')}
            className='absolute z-10 top-4 left-4 bg-gray-200 md:hidden'
          >
            <KeyboardArrowLeft className='text-black text-2xl' />
          </IconButton>
          <div>
            <div
              className={`text-blue-500 ${isSubmitting ? 'visible' : 'hidden'}`}
            >
              <LinearProgress color='inherit' />
            </div>
            <h1 className='font-semibold text-2xl'>
              Sign in to your Account 👋
            </h1>
            <p className='text-sm text-gray-600'>Enter login credentials</p>
          </div>
          <div className='flex gap-1 flex-col'>
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563',
                  },
                  '&:hover fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.email ? 'tomato' : '#4b5563',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.email ? 'tomato' : '#4b5563',
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563',
                },
              }}
              className='flex-1'
              label='Email address*'
              variant='outlined'
              {...register('email')}
            />
          </div>
          <div className='flex gap-1 flex-col text-white'>
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563',
                  },
                  '&:hover fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.password ? 'tomato' : '#4b5563',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.password ? 'tomato' : '#4b5563',
                },
                '& .MuiInputBase-input': {
                  color: '#4b5563',
                },
              }}
              className='flex-1 text-white border-white outline-none placeholder:text-white'
              label='Password*'
              type='password'
              variant='outlined'
              {...register('password')}
            />
          </div>
          <div className='flex items-center text-white'>
            <button
              disabled={isSubmitting}
              className='p-2 capitalize text-center cursor-pointer bg-black rounded-lg flex-1 disabled:bg-gray-500 disabled:cursor-not-allowed'
            >
              Sign In
            </button>
          </div>
        </form> */}
        {/* <div>
          <Link
            href='/auth/sign-up'
            className='text-sm text-gray-600'
          >
            Don&apos;t have an account?{' '}
            <span className='text-blue-900'>Sign Up</span>
          </Link>
        </div> */}
        {/* <div>
          <p className='text-gray-400 text-xs'>
            &copy; All rights reserved. Inferno 2023 -{' '}
            {new Date().getFullYear()}
          </p>
        </div> */}
      </div>
      {/* {showToast && (
        <Toast
          message={toastError}
          handleToast={handleToast}
        />
      )} */}
    </div>
  );
};

export default SignIn;
