import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Products from '@/app/api/v1/models/Product';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
export const GET = async () => {
  try {
    await connectToDB();
    const products = await Products.find({}).sort({ createdAt: -1 }).limit(20);
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
