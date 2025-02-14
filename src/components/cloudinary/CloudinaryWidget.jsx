import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const CloudinaryUpload = ({ setImages }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Load the Cloudinary widget script
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      // Initialize the Cloudinary widget
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: "inferno_products",
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            "google_drive",
            "facebook",
            "dropbox",
            "instagram",
            "shutterstock",
          ],
          googleApiKey: "<image_search_google_api_key>",
          showAdvancedOptions: true,
          cropping: true,
          maxFileSize: 9000000,
          multiple: true, // Allow multiple file uploads
          defaultSource: "local",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0284C7",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#1EA7FD",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1",
            },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                active: true,
              },
            },
          },
        },
        (error, result) => {
          if (error) {
            return toast.error(
              `${
                error?.message || "Something went wrong.Try Again Later"
              } 😒😒`,
              {
                duration: 4000,
                position: "top-center",
                removeDelay: 1000,
              }
            );
          }
          if (result && result.event === "success") {
            const { secure_url, public_id } = result?.info;
            setImages((prevImages) => {
              // Avoid duplicates using a Set or checking existing items
              if (!prevImages.some((img) => img.public_id === public_id)) {
                return [...prevImages, { secure_url, public_id }];
              }
              return prevImages;
            });
          }
        }
      );
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div className='flex items-center p-2 h-50 md:h-30'>
      <div
        className='flex flex-col items-center justify-center gap-4 p-2 flex-1 border border-dotted border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer'
        onClick={openWidget}
      >
        <p className='text-sm text-gray-500'>Select Product images</p>
      </div>
      <Toaster />
    </div>
  );
};

export default CloudinaryUpload;
