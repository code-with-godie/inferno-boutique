import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Products from '@/app/api/v1/models/Product';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
export const GET = async request => {
  try {
    const category = request.nextUrl.searchParams.get('category');
    const brand = request.nextUrl.searchParams.get('brand');
    const gender = request.nextUrl.searchParams.get('gender');
    const min = request.nextUrl.searchParams.get('min');
    const max = request.nextUrl.searchParams.get('max');
    const sort = request.nextUrl.searchParams.get('sort');
    const filters = {};
    if (category && category !== 'undefined') {
      filters.category = category;
    }
    if (brand && brand !== 'undefined') {
      filters.brand = brand;
    }
    if (gender && gender !== 'undefined') {
      filters.gender = gender;
    }
    // if (max && max !== 'undefined') {
    //   filters.price = { $lte: max };
    // }
    // if (min && min !== 'undefined') {
    //   console.log('min', min);
    //   filters.price.$gt = min;
    // }
    // if (sort && sort !== 'undefined') {
    //   if (sort === 'price_asc') filters.price = { $gte: min };
    // }
    let query = {};
    query.$and = [filters];
    await connectToDB();
    const products = await Products.aggregate([
      {
        $match: query,
      },
      {
        $sample: { size: 30 },
      },
    ]);
    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
