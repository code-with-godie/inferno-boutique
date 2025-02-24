"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import FileViewer from "@/components/dashboard/fileviewer/FileViewer";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addProduct } from "@/lib/actions";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { useRouter } from "next/navigation";
import { BsPlus } from "react-icons/bs";
import CloudinaryUpload from "@/components/cloudinary/CloudinaryWidget";
import toast, { Toaster } from "react-hot-toast";

const NewProductPage = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const removeImage = (public_id) => {
    setImages((prev) => prev.filter((item) => item?.public_id !== public_id));
    deleteImage(public_id);
  };
  const schema = z.object({
    title: z
      .string()
      .min(2, { message: "Product title must be greater than 2 characters" }),
    price: z.number({ message: "Price is required" }),
    category: z.string().min(2, {
      message: "Product category must be greater than 2 characters",
    }),
    description: z.string().optional(),
    brand: z
      .string()
      .min(2, { message: "Product brand must be greater than 2 characters" }),
    climates: z
      .array(z.enum(["winter", "spring"]), {
        message: "Please provide product climate",
      })
      .optional(),
    gender: z.enum(["male", "female", "unisex"], {
      message: "Please provide product gender",
    }),
    rating: z
      .number()
      .min(1, "Rating must be between 1-5")
      .max(5, "Rating must be between 1-5")
      .default(4.5),
    stock: z.number().default(1),
    discount: z.number().optional(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const inputRef = useRef();
  const sizesRef = useRef();
  const onSubmit = async (data) => {
    const { climates, ...product } = data;
    const newProduct = {
      ...product,
      colors,
      sizes,
      climates,
      images,
    };
    if (images.length < 2) {
      toast.error("Please select at least two product images 😒😒");
      return;
    }
    try {
      const done = await addProduct(newProduct);
      if (done) {
        router.push("/dashboard/products");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong 😒😒");
    }
  };

  return (
    <section className='flex-col md:flex-row flex bg-bg_main text-white md:h-[90vh] gap-2 flex-1 md:overflow-auto'>
      <article className='flex-1 md:min-w-[300px] md:max-w-[350px] bg-bgSoft p-4 rounded-lg md:overflow-auto'>
        <div className='flex flex-col gap-2 flex-1'>
          <CloudinaryUpload setImages={setImages} />
          <div className='flex justify-center h-40 relative'>
            <Image
              src={images[0]?.secure_url || "/product.png"}
              alt='selected'
              width={300}
              height={450}
              className='object-cover rounded-lg'
            />
            {images.length > 0 && (
              <IconButton
                className='absolute z-10 right-2 top-1 p-1 bg-white'
                onClick={() => removeImage(images[0]?.public_id)}
              >
                <Close className='text-sm ' />
              </IconButton>
            )}
          </div>
          <h1 className='lowercase italic text-lg text-gray-400'>
            related product images
          </h1>
          <FileViewer removeImage={removeImage} items={images?.slice(1)} />
          <h1 className='lowercase italic text-lg text-gray-400'>
            product size(s)
          </h1>
          <div>
            <div className='flex items-center gap-2 overflow-auto'>
              <div className=' flex items-center gap-2 p-2'>
                {sizes.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex flex-shrink-0 items-center gap-1'
                    >
                      <p className='bg-blue-500 text-sm p-2 px-4 rounded-lg relative mr-3'>
                        {item}
                        <button
                          onClick={() =>
                            setSizes((prev) =>
                              prev?.filter((_, i) => i !== index)
                            )
                          }
                          className='text-gray-400 bg-red-500 absolute -top-1 z-10 p-1 -right-2 hover:bg-gray-300'
                        >
                          <Close className='text-sm' />
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const sizeValue = sizesRef.current?.value.trim();
                  if (sizeValue) {
                    setSizes((prev) => [...prev, sizeValue]);
                  }
                  sizesRef.current.value = "";
                }}
              >
                <input
                  ref={sizesRef}
                  className=' bg-bg_main outline-none border-none p-2 flex-1 rounded-lg'
                  type='Enter color'
                />
              </form>
            </div>
          </div>
          <h1 className='lowercase italic text-lg text-gray-400'>
            product colors
          </h1>
          <div>
            <div className='flex items-center gap-2 overflow-auto'>
              <div className=' flex items-center gap-2 p-2'>
                {colors.map((item, index) => {
                  return (
                    <div key={index} className='flex items-center gap-1'>
                      <p
                        style={{
                          backgroundColor: item,
                          color: item === "white" ? "black" : "white",
                        }}
                        className='bg-bgSoft text-sm p-2 px-4 rounded-lg relative mr-3'
                      >
                        {item}
                        <button
                          onClick={() =>
                            setColors((prev) =>
                              prev?.filter((_, i) => i !== index)
                            )
                          }
                          className='text-gray-400 bg-red-500 absolute -top-1 z-10 p-1 -right-2 hover:bg-gray-300'
                        >
                          <Close className='text-sm' />
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const colorValue = inputRef.current?.value.trim();
                  if (colorValue) {
                    setColors((prev) => [...prev, colorValue]);
                  }
                  inputRef.current.value = "";
                }}
              >
                <input
                  ref={inputRef}
                  className=' bg-bg_main outline-none border-none p-2 flex-1 rounded-lg'
                  type='Enter color'
                />
              </form>
            </div>
          </div>
        </div>
      </article>
      <article className='flex-1 bg-bgSoft p-2 md:overflow-auto'>
        <form
          className='flex flex-col gap-2 w-full p-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col sm:flex-row gap-2 flex-wrap items-start'>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.title}
                name='title'
                helperText={errors.title?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.title ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.title ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.title ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.title ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product title*'
                variant='outlined'
                {...register("title")}
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.price}
                name='price'
                type='number'
                helperText={errors.price?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.price ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.price ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.price ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.price ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product price*'
                variant='outlined'
                {...register("price", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 flex-wrap items-center'>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.category}
                name='category'
                helperText={errors.category?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.category ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.category ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.category ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.category ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product category*'
                variant='outlined'
                {...register("category")}
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.brand}
                name='brand'
                helperText={errors.brand?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.brand ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.brand ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.brand ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.brand ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product brand*'
                variant='outlined'
                {...register("brand")}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2 flex-wrap items-center'>
            <div className='flex flex-col gap-1 flex-1 min-w-[100px]'>
              <FormControl fullWidth>
                <Select
                  placeholder='gender*'
                  name='gender'
                  defaultValue='unisex'
                  {...register("gender")}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    color: "white",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiMenuItem-root": {
                      backgroundColor: "#182237",
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value='unisex'>unisex</MenuItem>
                  <MenuItem value='male'>male</MenuItem>
                  <MenuItem value='female'>female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.stock}
                name='stock'
                helperText={errors.stock?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.stock ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.stock ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.stock ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.stock ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product stock*'
                variant='outlined'
                {...register("stock", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2 flex-wrap items-center'>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.rating}
                name='rating'
                helperText={errors.rating?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.rating ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.rating ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.rating ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.rating ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product rating*'
                variant='outlined'
                {...register("rating", { valueAsNumber: true })}
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <TextField
                error={!!errors.discount}
                name='discount'
                helperText={errors.discount?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.discount ? "tomato" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.discount ? "tomato" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.discount ? "tomato" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: errors.discount ? "tomato" : "white",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                className='flex-1'
                label='product discount'
                variant='outlined'
                {...register("discount", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div>
            <p className='capitalize'>select climate</p>
            <Controller
              name='climates'
              control={control}
              defaultValue={[]} // Provide a default value
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value?.includes("winter")}
                        onChange={() => {
                          const newValue = field.value?.includes("winter")
                            ? field.value.filter((v) => v !== "winter")
                            : [...(field.value || []), "winter"];
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label='Winter'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value?.includes("spring")}
                        onChange={() => {
                          const newValue = field.value?.includes("spring")
                            ? field.value.filter((v) => v !== "spring")
                            : [...(field.value || []), "spring"];
                          field.onChange(newValue);
                        }}
                      />
                    }
                    label='Spring'
                  />
                </>
              )}
            />
            {errors.climates && <p>{errors.climates.message}</p>}
          </div>
          <div className='flex flex-col gap-1 flex-1'>
            <label htmlFor='desc'>product description*</label>
            <textarea
              id='desc'
              className='flex-1 bg-transparent p-2 border border-gray-300 rounded-lg outline-none resize-y min-h-24 max-h-40'
              name='description'
              placeholder='product description'
              {...register("description")}
            />
            {errors?.description?.message && (
              <p className='text-red-500 texsm'>
                {errors?.description?.message}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <button
              disabled={isSubmitting}
              type='submit'
              className='flex-1 p-2  bg-blue-500 border-none cursor-pointer outline-none disabled:cursor-not-allowed bg-blue-500/80'
            >
              {isSubmitting ? <LoadingAnimation /> : "submit"}
            </button>
          </div>
        </form>
      </article>
      <Toaster />
    </section>
  );
};

export default NewProductPage;
