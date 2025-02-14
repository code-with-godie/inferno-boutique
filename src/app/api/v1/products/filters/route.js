import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Products from '@/app/api/v1/models/Product';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Get unique values for brand, category, and gender from the products collection
    const uniqueBrands = await Products.distinct('brand');
    const uniqueCategories = await Products.distinct('category');
    const uniqueGenders = await Products.distinct('gender');

    return NextResponse.json(
      {
        success: true,
        starts: {
          brands: uniqueBrands,
          categories: uniqueCategories,
          genders: uniqueGenders,
        },
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    // Handle any errors
    return errorHandler(error);
  }
};
