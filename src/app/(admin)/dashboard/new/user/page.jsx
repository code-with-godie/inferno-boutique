'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUser } from '@/lib/actions';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import { useRouter } from 'next/navigation';

const NewUserPage = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const schema = z.object({
    username: z
      .string()
      .min(2, { message: 'username must be greater than 2 charactor' })
      .max(30, { message: 'username must be less than 30 charactor' }),
    email: z.string().email({ message: 'invalid email' }),
    password: z
      .string()
      .min(8, { message: 'pasword must be greater than 8 charactor' }),
    role: z.enum(['normal', 'admin']).default('normal'),
  });
  const handleFile = e => {
    const file = e.target.files[0];
    const fileType = file.type.split('/')[0];
    if (fileType !== 'image') {
      //use react toastify
      alert('select an image');
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  };
  const onSubmit = async data => {
    try {
      const user = { ...data, avatar: image };
      await addUser(user);
      router.push('/dashboard/users');
    } catch (error) {
      console.log('error', error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <section className=' flex-col md:flex-row flex  bg-bg_main text-white md:h-[90vh] gap-2 flex-1'>
      <article className=' md:w-1/5 md:min-w-[200px] bg-bgSoft p-4 self-start rounded-lg'>
        <div className=' flex flex-col gap-2'>
          <Image
            src={image || '/noprofile.png'}
            alt='selected'
            width={200}
            height={200}
            className=' object-contain rounded-lg'
          />
        </div>
      </article>
      <article className=' w-4/5 bg-bgSoft p-2'>
        <form
          className=' flex flex-col gap-2 w-full p-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=' flex flex-col gap-1'>
            <label
              htmlFor='image'
              className='  p-2 bg-[#02817F] cursor-pointer '
            >
              select profile avatar
            </label>

            <input
              type='file'
              id='image'
              onChange={handleFile}
              hidden
            />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='username'>username</label>
            <input
              type='text'
              className=' flex-1 bg-transparent p-2 border border-gray-300 rounded-lg outline-none '
              placeholder='username'
              {...register('username')}
            />
            {errors?.username?.message && (
              <p className=' text-red-500 texsm'>
                {' '}
                {errors?.username?.message}{' '}
              </p>
            )}
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='username'>email</label>
            <input
              className=' flex-1 bg-transparent p-2 border border-gray-300 rounded-lg outline-none '
              placeholder='username'
              {...register('email')}
            />
            {errors?.email?.message && (
              <p className=' text-red-500 texsm'> {errors?.email?.message} </p>
            )}
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='username'>password</label>
            <input
              type='password'
              className=' flex-1 bg-transparent p-2 border border-gray-300 rounded-lg outline-none '
              placeholder='username'
              {...register('password')}
            />
            {errors?.password?.message && (
              <p className=' text-red-500 texsm'>
                {' '}
                {errors?.password?.message}{' '}
              </p>
            )}
          </div>
          <div className=' flex flex-col gap-1'>
            <FormControl fullWidth>
              <Select
                defaultValue='normal'
                {...register('role')}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiMenuItem-root': {
                    backgroundColor: '#182237',
                    color: 'white',
                  },
                }}
              >
                <MenuItem value='normal'>normal</MenuItem>
                <MenuItem value='admin'>admin</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className=' flex flex-col gap-1'>
            <button
              className=' flex-1  p-2 bg-[#02817F] border-none cursor-pointer outline-none disabled:cursor-not-allowed '
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingAnimation /> : 'submit'}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default NewUserPage;
