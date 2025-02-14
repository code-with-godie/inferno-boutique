import Products from '@/app/api/v1/models/Product';
import connectToDB from '@/app/api/db/connect';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
export const GET = async () => {
  try {
    await connectToDB();
    const products = await Products.aggregate([
      {
        $group: {
          _id: '$category', // Group by the category field
          products: { $push: '$$ROOT' }, // Collect all products in an array
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          category: '$_id', // Rename _id to category
          products: { $slice: ['$products', 1] }, // Limit to 1 products per category
        },
      },
      {
        $limit: 6,
      },
    ]);
    return NextResponse.json(
      {
        success: true,
        nbHits: products?.size,
        products,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
