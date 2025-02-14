import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Products from '@/app/api/v1/models/Product';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
export const GET = async (req, { params: { category } }) => {
  try {
    await connectToDB();
    let products = [];
    if (!category) {
      console.log('no category', category);
    }
    if (category && (category !== 'null' || category !== 'undefined')) {
      products = await Products.aggregate([
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
    }
    products = await Products.aggregate([
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
