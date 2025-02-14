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
        $sample: { size: 12 },
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
