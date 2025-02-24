import { NextResponse } from "next/server";
import Products from "@/app/api/v1/models/Product";
import connectToDB from "@/app/api/db/connect";
import errorHandler from "@/app/api/errors/errorHandler";
import { StatusCodes } from "http-status-codes";
export const GET = async (request) => {
  try {
    // Extracting the query string parameter 'q'
    const query = request.nextUrl.searchParams.get("q");
    const page = request.nextUrl.searchParams.get("page");
    const ITES_PER_PAGE = 10;
    const filters = {};
    if (query && query !== "undefined") {
      const regex = new RegExp(query, "i");
      filters.$and = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }
    await connectToDB();
    let products = [];
    // const count = Products.find({}).count();
    // console.log('counting produvts', count);

    if (page === "all") {
      products = await Products.find({});
    } else {
      products = await Products.find({}).limit(ITES_PER_PAGE);
    }

    return NextResponse.json(
      {
        success: true,
        products,
        count: 2,
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    const product = await Products.create(body);
    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
