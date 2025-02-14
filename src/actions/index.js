"use server";
import Users from "@/app/api/v1/models/User";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const checkAdmin = async (clerk_id) => {
  try {
    const user = await Users.findOne({ clerk_id });
    if (user) {
      return user?.role === "admin" ? true : false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export async function deleteImage(publicId) {
  if (!publicId) {
    throw new Error("Public ID is required");
  }

  try {
    const result = await cloudinary.api.delete_resources([publicId]);
    console.log("image successfully deleted");

    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
}
