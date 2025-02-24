import connectToDB from "../../db/connect";
import Orders from "@/app/api/v1/models/Orders";
import Users from "@/app/api/v1/models/User";
import errorHandler from "../../errors/errorHandler";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export const GET = async (request) => {
  try {
    const query = request.nextUrl.searchParams.get("q");
    let orders;

    if (query) {
      // If query parameter 'q' is present, sort by 'createdAt' in descending order and limit to 10
      orders = await Orders.find({})
        .populate({
          path: "userID",
          select: "username avatar email", // Specify the fields you want to populate
        })
        .populate({
          path: "products",
          select: "title images", // Specify the fields you want to populate
        })
        .sort({ createdAt: -1 })
        .limit(7);
    } else {
      // If query parameter 'q' is not present, retrieve all orders without filters
      orders = await Orders.find({})
        .populate({
          path: "userID",
          select: "username avatar email", // Specify the fields you want to populate
        })
        .populate({
          path: "products",
          select: "title images", // Specify the fields you want to populate
        });
    }

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: StatusCodes.OK } // Use OK status for successful GET requests
    );
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    const user = await Users.findOne({ clerk_id: body?.userID });

    if (!user) throw BadRequestError("User not found!!!");
    const order = await Orders.create({ ...body, userID: user._id });
    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    console.log(error);

    return errorHandler(error);
  }
};
