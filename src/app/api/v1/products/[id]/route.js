import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Products from '@/app/api/v1/models/Product';
import NotFoundError from '@/app/api/errors/not-found';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    const product = await Products.findById(id);
    if (!product) throw new NotFoundError('no product with the provided id');
    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
export const PATCH = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    console.log('UPDATING PRODUCT');

    const body = await req.json();
    const product = await Products.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
    });
    if (!product) throw new NotFoundError('no product with the provided id');
    return NextResponse.json(
      {
        success: true,
        messege: 'UPDATED a product',
        product,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
export const DELETE = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    await Products.findByIdAndDelete(id);
    return NextResponse.json(
      {
        success: true,
        messege: 'product successfully deleted!',
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
