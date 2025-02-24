import { NextResponse } from "next/server";
import connectToDB from "@/app/api/db/connect";
import Products from "@/app/api/v1/models/Product";
import Users from "@/app/api/v1/models/User";
import Orders from "@/app/api/v1/models/Orders";
import errorHandler from "@/app/api/errors/errorHandler";
import { StatusCodes } from "http-status-codes";
export const GET = async () => {
  try {
    await connectToDB();
    const products = await Products.countDocuments({});
    const users = await Users.countDocuments({});
    const orders = await Orders.countDocuments({});
    return NextResponse.json(
      {
        success: true,
        starts: { products, users, orders },
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
