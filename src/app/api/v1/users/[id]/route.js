import { NextResponse } from 'next/server';
import connectToDB from '@/app/api/db/connect';
import Users from '@/app/api/v1/models/User';
import NotFoundError from '@/app/api/errors/not-found';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';

export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    const user = await Users.findById(id, { password: 0 });
    if (!user) throw new NotFoundError('no user with the provided id');
    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
export const PATCH = async (req, { params: { id } }) => {
  await connectToDB();
  const body = await req.json();
  const user = await Users.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });
  if (!user) throw new NotFoundError('no user with the provided id');
  try {
    return NextResponse.json(
      {
        success: true,
        messege: 'UPDATED a product',
        body: req.body,
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
    await Users.findByIdAndDelete(id);
    console.log('deleting user');

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
