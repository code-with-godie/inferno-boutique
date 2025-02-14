import React, { useState } from "react";
import { v2 as cloudinary } from "cloudinary";
const apiKey = 212995595332791;
const apiSecret = "4muuEvc4S9ZeVaWtWdo_o1_PrDs";
const cloudName = "dmxqjeidz";
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const useCloudinary = (publicId) => {
  const [loading, setLoading] = useState(false);
  async function deleteImage(publicId) {
    if (!publicId) {
      throw new Error("Public ID is required");
    }

    try {
      setLoading(true);
      const result = await cloudinary.api.delete_resources([publicId]);
      console.log("image successfully deleted");

      return result;
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  }
  return { loading, deleteImage };
};

export default useCloudinary;
