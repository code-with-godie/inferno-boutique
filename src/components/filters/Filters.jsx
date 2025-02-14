'use client';

import { getCategoryFilters } from '@/lib/lib';
import { MoreHoriz } from '@mui/icons-material';
import { FormControl, MenuItem, Select, Skeleton } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(null);

  const getFilters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCategoryFilters();
      setFilters(res);
    } catch (error) {
      setError('Faild to load Filters');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (e.target.value?.length > 0) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    getFilters();
  }, [getFilters]);
  if (loading)
    return (
      <div className='mt-12 flex items-end justify-between'>
        <div className='flex gap-6 flex-wrap '>
          <Skeleton
            variant='rounded'
            height={50}
            width={100}
          />
          <Skeleton
            variant='rounded'
            height={50}
            width={100}
          />
          <Skeleton
            variant='rounded'
            height={50}
            width={100}
          />
          <Skeleton
            variant='rounded'
            height={50}
            width={100}
          />
          <Skeleton
            variant='rounded'
            height={50}
            width={100}
          />
        </div>
        <Skeleton
          variant='rounded'
          height={50}
          width={100}
        />
      </div>
    );
  if (error) {
    return (
      <div className='mt-12 flex items-end justify-between'>
        <h1> {error} </h1>
      </div>
    );
  }
  return (
    <div className='mt-12 flex items-end justify-between'>
      <div className='flex gap-6 flex-wrap '>
        {filters?.genders && (
          <div className='flex flex-col gap-2'>
            <h1 className=' text-sm '>Gender</h1>
            <FormControl className=' w-32'>
              <Select
                name='gender'
                defaultValue=''
                onChange={handleFilterChange}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  color: '#fd7100',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '& .MuiSelect-icon': {
                    color: '#fd7100',
                  },
                  '& .MuiMenuItem-root': {
                    backgroundColor: '#fd7100',
                    color: '#fd7100',
                  },
                }}
              >
                <MenuItem value=''>Gender</MenuItem>
                {filters.genders?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        {filters?.brands && (
          <div className='flex flex-col gap-2'>
            <h1 className=' text-sm'>Brand:</h1>
            <FormControl className=' w-32'>
              <Select
                name='brand'
                defaultValue=''
                onChange={handleFilterChange}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  color: '#fd7100',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '& .MuiSelect-icon': {
                    color: '#fd7100',
                  },
                  '& .MuiMenuItem-root': {
                    backgroundColor: '#fd7100',
                    color: '#fd7100',
                  },
                }}
              >
                <MenuItem value=''>Brand</MenuItem>
                {filters.brands?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        {filters?.categories && (
          <div className='flex flex-col gap-2'>
            <h1 className=' text-sm '>Category:</h1>
            <FormControl className=' w-32'>
              <Select
                name='category'
                defaultValue={searchParams.get('category') || ''}
                onChange={handleFilterChange}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  color: '#fd7100',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fd7100',
                  },
                  '& .MuiSelect-icon': {
                    color: '#fd7100',
                  },
                  '& .MuiMenuItem-root': {
                    backgroundColor: '#fd7100',
                    color: '#fd7100',
                  },
                }}
              >
                {' '}
                <MenuItem value=''>categories</MenuItem>
                {filters.categories?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <div className=' flex flex-col gap-2 '>
          <h1 className=' text-sm '>Min Price:</h1>
          <input
            type='text'
            name='min'
            placeholder='min price'
            className='text-xs rounded-2xl bg-transparent pl-2 w-32 border border-golden outline-none flex-1'
            onChange={handleFilterChange}
          />
        </div>
        <div className=' flex flex-col gap-2'>
          <h1 className=' text-sm '>Max Price:</h1>
          <input
            type='text'
            name='max'
            placeholder='max price'
            className='text-xs rounded-2xl pl-2 w-32 bg-transparent border border-golden outline-none flex-1'
            onChange={handleFilterChange}
          />
        </div>

        {/* TODO: Filter Categories */}
      </div>
      <div className='flex flex-col gap-2'>
        <div className=' flex items-center  gap-2 justify-between'>
          <h1 className=' text-sm '>More</h1>
          <MoreHoriz />
        </div>
        <FormControl className=' w-32'>
          <Select
            name='sort'
            defaultValue=''
            onChange={handleFilterChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fd7100',
              },
              color: '#fd7100',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fd7100',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fd7100',
              },
              '& .MuiSelect-icon': {
                color: '#fd7100',
              },
              '& .MuiMenuItem-root': {
                backgroundColor: '#fd7100',
                color: '#fd7100',
              },
            }}
          >
            {' '}
            <MenuItem value=''>Sort</MenuItem>
            <MenuItem value='newest'>Newest first</MenuItem>
            <MenuItem value='oldest'>Oldest First</MenuItem>
            <MenuItem value='price_asc'>Price(ascending)</MenuItem>
            <MenuItem value='price_desc'>Price(decending)</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Filter;
