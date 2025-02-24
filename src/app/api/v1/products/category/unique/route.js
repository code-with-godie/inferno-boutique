// app/api/v1/categories/route.js
import { NextResponse } from "next/server";
import connectToDB from "@/app/api/db/connect";
import Products from "@/app/api/v1/models/Product";
import errorHandler from "@/app/api/errors/errorHandler";
import { StatusCodes } from "http-status-codes";

export const GET = async () => {
  try {
    await connectToDB();

    // Aggregate to get distinct categories and their product counts
    const categories = await Products.aggregate([
      {
        $project: {
          categoryLower: { $toLower: "$category" },
        },
      },
      {
        $group: {
          _id: "$categoryLower",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: StatusCodes.OK } // Use OK status for successful GET requests
    );
  } catch (error) {
    console.error(error);
    return errorHandler(error);
  }
};
