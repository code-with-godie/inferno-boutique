import { NextResponse } from 'next/server';
import Users from '@/app/api/v1/models/User';
import connectToDB from '@/app/api/db/connect';
import errorHandler from '@/app/api/errors/errorHandler';
import { StatusCodes } from 'http-status-codes';
export const GET = async request => {
  try {
    // Extracting the query string parameter 'q'
    const query = request.nextUrl.searchParams.get('q');
    const page = request.nextUrl.searchParams.get('page');
    const ITEMS_PER_PAGE = 10;

    await connectToDB();
    const filter = {};
    if (query && query !== 'undefined') {
      const regex = new RegExp(query, 'i');
      filter.username = { $regex: regex };
    }
    let users = [];
    // const count = await Users.find({}).count();

    if (page === 'all') {
      users = await Users.find({}).sort({ createdAt: -1 });
    } else {
      users = await Users.find(filter)
        .limit(ITEMS_PER_PAGE)
        .skip(ITEMS_PER_PAGE * (page - 1))
        .sort({ createdAt: -1 });
    }
    const count = await Users.find({}).countDocuments();
    console.log('count', count);

    return NextResponse.json(
      {
        success: true,
        users,
        count,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
export const POST = async req => {
  try {
    await connectToDB();
    const body = await req.json();
    const user = new Users(body);
    if (body?.password) {
      const hashedPassword = await user.hashPassword();
      user.password = hashedPassword;
    }
    await user.save();
    const { password, ...newUser } = user._doc;
    return NextResponse.json(
      {
        success: true,
        user: newUser,
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    console.log(error);

    return errorHandler(error);
  }
};
